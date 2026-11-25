import mongoose from 'mongoose';
import { generateCaseId } from '../utils/generateId.js';

const medicineItemSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => `med_${Date.now()}_${Math.floor(Math.random() * 1000)}` },
    name: { type: String, required: true },
    dosage: { type: String, default: '' },
    frequency: { type: String, default: '' },
    duration: { type: String, default: '' },
    instructions: { type: String, default: '' },
  },
  { _id: false }
);

const medicalRecordSchema = new mongoose.Schema(
  {
    caseId: {
      type: String,
      unique: true,
      index: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
      index: true,
    },
    patientId: {
      type: String,
      required: true,
      index: true,
      uppercase: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    assignedDoctorId: {
      type: String,
      default: '',
      index: true,
    },
    assignedDoctorName: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'Completed'],
      default: 'Pending',
      index: true,
    },
    riskLevel: {
      type: String,
      enum: ['Low', 'Moderate', 'High'],
      default: 'Low',
    },

    // 1. Personal Details
    personalDetails: {
      fullName: { type: String, default: '' },
      age: { type: Number, default: 0 },
      gender: { type: String, default: 'Male' },
      mobile: { type: String, default: '' },
      email: { type: String, default: '' },
      address: { type: String, default: '' },
      emergencyContact: { type: String, default: '' },
    },

    // 2. Chief Complaint
    chiefComplaint: {
      primaryComplaint: { type: String, default: '' },
      duration: { type: String, default: '' },
      onset: { type: String, enum: ['Sudden', 'Gradual', ''], default: 'Gradual' },
      severity: { type: Number, default: 5, min: 1, max: 10 },
    },

    // 3. Symptoms & Dynamic Questions
    symptoms: {
      selectedSymptoms: [{ type: String }],
      dynamicAnswers: { type: mongoose.Schema.Types.Mixed, default: {} },
    },

    // 4. Pain Details
    painDetails: {
      hasPain: { type: Boolean, default: false },
      location: { type: String, default: '' },
      character: { type: String, default: '' },
      intensityScore: { type: Number, default: 0, min: 0, max: 10 },
      aggravatingFactors: { type: String, default: '' },
      relievingFactors: { type: String, default: '' },
    },

    // 5. Medical History
    medicalHistory: {
      conditions: [{ type: String }],
      pastSurgeries: { type: String, default: '' },
      chronicDiseases: { type: String, default: '' },
    },

    // 6. Current Medicines
    currentMedicines: {
      takingMedicines: { type: Boolean, default: false },
      details: { type: String, default: '' },
    },

    // 7. Allergies
    allergies: {
      hasAllergies: { type: Boolean, default: false },
      drugAllergies: { type: String, default: '' },
      foodAllergies: { type: String, default: '' },
      otherAllergies: { type: String, default: '' },
    },

    // 8. Family History
    familyHistory: {
      hereditaryConditions: [{ type: String }],
      otherDetails: { type: String, default: '' },
    },

    // 9. Lifestyle
    lifestyle: {
      smoking: { type: String, default: 'Non-Smoker' },
      alcohol: { type: String, default: 'Non-Drinker' },
      exercise: { type: String, default: 'Light' },
      sleepHours: { type: String, default: '7-8 hours' },
      stressLevel: { type: String, default: 'Moderate' },
    },

    // 10. Food / Diet
    diet: {
      dietType: { type: String, default: 'Vegetarian' },
      waterIntakeLitres: { type: String, default: '2-3 Litres' },
      appetite: { type: String, default: 'Normal' },
    },

    // 11. Additional Information
    additionalInfo: {
      notes: { type: String, default: '' },
      preferredDoctorId: { type: String, default: '' },
    },

    // Doctor Clinical Examination (Vitals)
    vitals: {
      temperature: { type: String, default: '' },
      bloodPressure: { type: String, default: '' },
      pulse: { type: String, default: '' },
      spo2: { type: String, default: '' },
      weight: { type: String, default: '' },
      physicalExamNotes: { type: String, default: '' },
      clinicalObservations: { type: String, default: '' },
      recordedAt: { type: Date },
      recordedByDocId: { type: String, default: '' },
    },

    // Doctor Assessment & Prescription
    assessment: {
      doctorReviewNotes: { type: String, default: '' },
      doctorAssessment: { type: String, default: '' },
      finalDiagnosis: { type: String, default: '' },
      treatmentPlan: { type: String, default: '' },
      medicines: [medicineItemSchema],
      followUpDate: { type: String, default: '' },
      prescribedAt: { type: Date },
      prescribedByDocId: { type: String, default: '' },
      prescribedByDocName: { type: String, default: '' },
    },

    // AI Analysis Cache
    aiAnalysis: {
      summary: { type: String, default: '' },
      possibleConditions: [{ type: String }],
      riskScore: { type: String, default: 'Low' },
      recommendedTests: [{ type: String }],
      redFlags: [{ type: String }],
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate caseId
medicalRecordSchema.pre('save', function (next) {
  if (!this.caseId) {
    this.caseId = generateCaseId();
  }
  next();
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);
export default MedicalRecord;
