// types/express.d.ts
import jwtPayLoad from "../interfaces/jwtPayLoad"; // Adjust the import path as necessary

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayLoad;
    }
  }
}
