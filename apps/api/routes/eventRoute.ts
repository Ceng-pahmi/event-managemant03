import { Router } from 'express';
import { createEvent } from '../controllers/createEvent';
import { fetchEvents } from '../controllers/fetchEvents';
import { fetchEventsDetails } from '../controllers/fetchEventsDetails';
import { eventAuthenticateToken } from '../middleware/createEventMiddleware';
import { buyTicket } from '../controllers/buyTicketController';
import { fetchTransactions } from '../controllers/fetchTransactions'; 
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname
      .replace(ext, '')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const router = Router();

router.post(
  '/create-event',
  eventAuthenticateToken,
  upload.single('image'),
  createEvent,
);

router.get('/', fetchEvents);
router.post('/buy-ticket', buyTicket);
router.get('/transactions', fetchTransactions); 
router.get('/:id', fetchEventsDetails);

export default router;
