import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response) => {
  const { title, description, category, location, dateTime, price } = req.body;
  const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : "";

  const organizerId = req.user?.id; 

  try {
    console.log("Received dateTime:", dateTime);
    const parsedDateTime = new Date(dateTime);
    console.log("Parsed dateTime:", parsedDateTime);

    if (isNaN(parsedDateTime.getTime())) {
      res.status(400).json({ error: "Invalid date-time format." });
      return;
    }

    const formattedPrice = parseFloat(price.replace(/\./g, ""));
    if (isNaN(formattedPrice)) {
      res.status(400).json({ error: "Invalid price value." });
      return;
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        image,
        date: parsedDateTime,
        time: dateTime.split("T")[1],
        location,
        price: formattedPrice,
        category,
        organizerId,
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      error: "Failed to create an event!",
    });
  }
};
