import { Card } from "../../components/ui/card";
import { MainNav } from "../../components/main-nav";
import { Footer } from "../../components/footer";
import { AuthDialog } from "@/components/auth-dialog";
import { useState } from "react";

export default function About() {

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <MainNav onAuthClick={() => setIsAuthOpen(true)} />

      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            At EventHub, our mission is to connect people through unforgettable
            experiences. We believe that events have the power to inspire,
            educate, and bring communities together. Our platform is designed to
            make it easy for anyone to discover, create, and participate in
            events that matter to them.
          </p>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            Founded in 2023, EventHub was born out of a passion for bringing
            people together. Our founders, avid event-goers themselves,
            recognized the need for a more intuitive and comprehensive event
            management platform. What started as a small idea has grown into a
            thriving community of event organizers and attendees from all walks
            of life.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-muted-foreground mb-4">
            We're a diverse group of tech enthusiasts, event planners, and
            community builders. Our team is dedicated to creating the best
            possible experience for our users, constantly innovating and
            improving our platform based on feedback and emerging trends in the
            event industry.
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
