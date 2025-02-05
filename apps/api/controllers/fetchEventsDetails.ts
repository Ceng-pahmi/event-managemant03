import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

export const fetchEventsDetails = async (req: Request, res: Response) => {

    try {
        const id = Number(req.params.id);

        const events = await prisma.event.findUnique({
            where: {
                id:id
            }
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch events!"
        });
    }
};
