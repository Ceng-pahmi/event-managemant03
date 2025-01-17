import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const prisma = new PrismaClient();

// Function to generate a unique referral code
const generateReferralCode = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let referralCode = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    referralCode += characters[randomIndex];
  }
  return referralCode;
};

// POST endpoint to register a new user
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { first_name, last_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = generateReferralCode(6); // Generate a 6-character referral code
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        referral_code: referralCode
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "User registration failed" });
  }
};
