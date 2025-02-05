import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const fetchTransactions = async (req: Request, res: Response) => {
  try {
    console.log('Fetching transactions...');

    // Fetch transactions and join with the event table to get event title
    const transactions = await prisma.ticket.findMany({
      include: {
        event: {
          select: {
            title: true, // Select the event title
          },
        },
        user: {
          // Include user details
          select: {
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });

    // Map the transactions to include the event title as eventName
    const response = transactions.map((transaction) => ({
      id: transaction.id,
      eventName: transaction.event.title, // Map event title to eventName
      date: transaction.purchaseDate,
      amount: transaction.quantity,
      status: 'success!',
      customerName: `${transaction.user.first_name} ${transaction.user.last_name}`, // Map customer name
      customerEmail: transaction.user.email, // Map customer email
    }));

    console.log('Transactions fetched successfully:', response);

    res.status(200).json({
      message: 'Transactions fetched successfully',
      data: response,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);

    res.status(500).json({
      error: 'Failed to fetch transactions!',
      details: (error as Error).message,
    });
  }
};
