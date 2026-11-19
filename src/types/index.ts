// KH Educational Services – Type Definitions

export interface Course {
  id: string;
  name: string;
  category: string;
  duration: string;
  description: string;
  eligibility: string;
  careers: string[];
  level: 'Diploma' | 'UG' | 'PG' | 'Doctoral';
  popular?: boolean;
}

export interface University {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'Government' | 'Private' | 'Deemed';
  courses: string[];
  feeRange: string;
  description: string;
  established?: string;
  note: string; // Always label as demo data
}

export interface Enquiry {
  id: string;
  submittedAt: string;
  status: EnquiryStatus;
  counsellorNotes: string;
  followUpDate?: string;
  assignedTo?: string;

  // Step 1 – Student Details
  studentName: string;
  parentName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  dob?: string;

  // Step 2 – Academic
  qualification: string;
  currentClass: string;
  board: string;
  yearOfPassing: string;
  percentage: string;
  entranceExam?: string;
  stream: string;

  // Step 3 – Preferences
  preferredCourse: string;
  courseLevel: string;
  specialisation?: string;
  preferredUniversity?: string;
  preferredCollege?: string;
  preferredStates: string[];
  preferredCities: string[];
  universityType: string;

  // Step 4 – Budget
  budget: string;
  paymentMethod: string;
  hostelRequired: string;
  scholarshipRequired: string;

  // Step 5 – Additional
  admissionYear: string;
  urgency: string;
  additionalInfo?: string;
  privacyConsent: boolean;
}

export type EnquiryStatus =
  | 'New Lead'
  | 'Contacted'
  | 'Counselling Scheduled'
  | 'Counselling Completed'
  | 'University Shortlisted'
  | 'Application Submitted'
  | 'Admission Confirmed'
  | 'Not Interested'
  | 'Follow-up Required';

export const ENQUIRY_STATUSES: EnquiryStatus[] = [
  'New Lead', 'Contacted', 'Counselling Scheduled', 'Counselling Completed',
  'University Shortlisted', 'Application Submitted', 'Admission Confirmed',
  'Not Interested', 'Follow-up Required',
];

export const STATUS_COLORS: Record<EnquiryStatus, string> = {
  'New Lead':               'bg-blue-100 text-blue-800',
  'Contacted':              'bg-indigo-100 text-indigo-800',
  'Counselling Scheduled':  'bg-yellow-100 text-yellow-800',
  'Counselling Completed':  'bg-orange-100 text-orange-800',
  'University Shortlisted': 'bg-purple-100 text-purple-800',
  'Application Submitted':  'bg-cyan-100 text-cyan-800',
  'Admission Confirmed':    'bg-green-100 text-green-800',
  'Not Interested':         'bg-red-100 text-red-800',
  'Follow-up Required':     'bg-pink-100 text-pink-800',
};
