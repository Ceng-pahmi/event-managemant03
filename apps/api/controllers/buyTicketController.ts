import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const buyTicket = async (req: Request, res: Response) => {
  const { eventId, userId, quantity } = req.body;

  try {
    
    if (!eventId || !userId || !quantity) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
    
    const ticketPurchase = await prisma.ticket.create({
      data: {
        eventId,
        userId,
        quantity,
      },
    });

    res.status(201).json(ticketPurchase);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
