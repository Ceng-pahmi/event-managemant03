import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import JwtPayload from "../interfaces/jwtPayload"; 

dotenv.config(); 

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.sendStatus(401); 
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      res.sendStatus(403); 
    }
    req.user = decoded as JwtPayload; 
    next(); 
  });
};
