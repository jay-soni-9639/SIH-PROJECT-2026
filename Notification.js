import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: String, // patientId or doctorId or mongo ObjectId string
      required: true,
      index: true,
    },
    recipientRole: {
      type: String,
      enum: ['patient', 'doctor'],
      default: 'patient',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['info', 'prescription', 'status', 'alert'],
      default: 'info',
    },
    read: {
      type: Boolean,
      default: false,
    },
    caseId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
