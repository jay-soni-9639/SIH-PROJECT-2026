import crypto from 'crypto';

/**
 * Generates a random alphanumeric or numeric unique Patient ID like PAT-839201
 */
export const generatePatientId = (prefix = 'PAT') => {
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digit number
  return `${prefix}-${randomNum}`;
};

/**
 * Generates a Doctor ID like DOC-4012
 */
export const generateDoctorId = (prefix = 'DOC') => {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit number
  return `${prefix}-${randomNum}`;
};

/**
 * Generates a unique Case ID like CASE-20260905-XXXX
 */
export const generateCaseId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomHex = crypto.randomBytes(2).toString('hex').toUpperCase();
  return `CASE-${dateStr}-${randomHex}`;
};
