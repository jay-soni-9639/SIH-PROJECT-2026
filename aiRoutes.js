import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { transcribeAndSummarize } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `audio-${Date.now()}.webm`);
    },
  }),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});
// Max 5 AI requests per 15 minutes per IP
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      'Too many transcription requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/transcribe',
  protect,
  aiRateLimiter,
  upload.single('audio'),
  transcribeAndSummarize
);

export default router;