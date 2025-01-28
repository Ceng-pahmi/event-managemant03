"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Cookies from "js-cookie";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MainNav } from "../../components/main-nav";
import { Footer } from "../../components/footer";

const CreateEventPage: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [image, setImage] = useState<File | null>(null);
  const organizerId = "organizerId";
  
  const token = Cookies.get("token");
  const isLoggedIn = !!token; // Check if user is logged in

  const handleAuthClick = () => {
    // Logic for authentication click
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedPrice = e.target.value
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setPrice(formattedPrice);
  };

  const handleCreateEvent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateTime) {
      alert("Date and time are required.");
      return;
    }

    const formattedDateTime = dateTime.toISOString();
    const url = "http://localhost:5000/api/events/create-event";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("dateTime", formattedDateTime);
    formData.append("price", price.replace(/\./g, ""));
    if (image) {
      formData.append("image", image);
    }
    formData.append("organizerId", organizerId);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Event created successfully:", data);
      } else {
        console.error("Error creating event:", response.statusText);
      }
    } catch (error) {
      console.error("Error during event creation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNav onAuthClick={handleAuthClick} isLoggedIn={isLoggedIn} />
      <div className="container px-4 py-8 border-background">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Create Event</h1>
          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Event Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Ticket Price (IDR)
              </label>
              <div className="flex items-center">
                <span className="mr-4">IDR</span>
                <Input
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              <DatePicker
                selected={dateTime}
                onChange={(date: Date | null) => setDateTime(date)}
                showTimeSelect
                dateFormat="Pp"
                className="rounded-md border w-full bg-neutral-900 items-center"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">
                Event Poster
              </label>
              <Input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <Button type="submit" className="w-full">
              Create Event
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateEventPage;
