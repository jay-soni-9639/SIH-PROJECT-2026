import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateDoctorId } from '../utils/generateId.js';

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: String,
      unique: true,
      index: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    specialty: {
      type: String,
      required: [true, 'Specialty is required'],
      trim: true,
    },
    licenseNo: {
      type: String,
      default: '',
      trim: true,
    },
    experience: {
      type: String,
      default: '5+ years',
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    isBuiltIn: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'doctor',
      immutable: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Pre-save hook to ensure unique doctorId and hash password
doctorSchema.pre('save', async function (next) {
  if (!this.doctorId) {
    let unique = false;
    let newId = '';
    while (!unique) {
      newId = generateDoctorId();
      const existing = await mongoose.models.Doctor.findOne({ doctorId: newId });
      if (!existing) unique = true;
    }
    this.doctorId = newId;
  }

  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
