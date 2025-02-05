import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// POST endpoint to login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.first_name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' },
    );
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
