import express from 'express';
import {
  getAllDoctors,
  searchPatientByUniqueId,
  getDoctorCases,
  getCaseDetails,
  updateCaseVitals,
  updateCaseAssessment,
  createPatientRecord,
} from '../controllers/doctorController.js';
import { flexibleDoctorAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Get all registered doctors list
router.get('/', getAllDoctors);

// Apply flexible doctor authentication (supports JWT token, x-doctor-id header, or query fallback)
router.use(flexibleDoctorAuth);

// Crucial: Doctor checks any patient's detail and medical history by unique ID
router.get('/patients/search/:uniqueId', searchPatientByUniqueId);

// Doctor directly creates medical record for a patient
router.post('/patients/:patientId/records', createPatientRecord);

// Cases management for doctor (returns all clinic cases or doctor's cases)
router.get('/cases', getDoctorCases);
router.get('/cases/:caseId', getCaseDetails);
router.put('/cases/:caseId/vitals', updateCaseVitals);
router.put('/cases/:caseId/assessment', updateCaseAssessment);

export default router;
