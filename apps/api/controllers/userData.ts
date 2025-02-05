import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

export const userData = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const email = (decoded as any).email; 
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            res.status(404).json({
                message: "User not found"
            });
            return; 
        }

        res.status(200).json({
            message: "User data fetched successfully",
            data: user 
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch user data!'
        });
    }
};
