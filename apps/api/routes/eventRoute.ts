import { Router } from "express";
import { createEvent } from "../controllers/createEvent";
import { fetchEvents } from "../controllers/fetchEvents";
import { authenticateToken } from "../middleware/authMiddleware";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

const router = Router();

router.post("/create-event", authenticateToken, upload.single("image"), createEvent);

router.get("/", fetchEvents);

export default router;
