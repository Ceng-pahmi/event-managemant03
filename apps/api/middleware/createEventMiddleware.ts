import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import JwtPayload from "../interfaces/jwtPayLoad"; 

dotenv.config(); 

export const eventAuthenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("Authorization Header:", req.headers["authorization"]); 

  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) { 
      console.error("Token verification error:", err); 
      return res.sendStatus(403);
    }
    
    req.user = decoded as JwtPayload; 
    console.log("Decoded User:", req.user); 

    if (req.user.role !== "EventOrganizer") {
      return res.sendStatus(403);
    }

    next();
  });
};
