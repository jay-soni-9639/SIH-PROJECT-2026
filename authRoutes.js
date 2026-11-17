import express from 'express';
import {
  registerPatient,
  loginPatient,
  registerDoctor,
  loginDoctor,
  getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Patient Authentication
router.post('/patient/register', registerPatient);
router.post('/patient/login', loginPatient);

// Doctor Authentication
router.post('/doctor/register', registerDoctor);
router.post('/doctor/login', loginDoctor);

// Current User Profile
router.get('/me', protect, getMe);

export default router;
