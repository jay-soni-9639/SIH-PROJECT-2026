import express from 'express';
import {
  getPatientProfile,
  updatePatientProfile,
  getPatientHistory,
  submitCase,
  getPatientCaseById,
} from '../controllers/patientController.js';
import { protect, patientOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes here require patient authentication
router.use(protect, patientOnly);

router.get('/me', getPatientProfile);
router.put('/me', updatePatientProfile);
router.get('/me/history', getPatientHistory);
router.post('/me/cases', submitCase);
router.get('/me/cases/:caseId', getPatientCaseById);

export default router;
