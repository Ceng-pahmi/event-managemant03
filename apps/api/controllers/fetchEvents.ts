import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const fetchEvents = async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch events!"
        });
    }
};
