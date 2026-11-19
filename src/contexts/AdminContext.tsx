import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Enquiry, EnquiryStatus } from '../types';

const ADMIN_USER = { username: 'admin', password: 'khedu2024' };
const STORAGE_KEY = 'kh_enquiries';

interface AdminContextType {
  isLoggedIn: boolean;
  enquiries: Enquiry[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addEnquiry: (e: Omit<Enquiry, 'id' | 'submittedAt' | 'status' | 'counsellorNotes'>) => string;
  updateEnquiry: (id: string, updates: Partial<Enquiry>) => void;
  deleteEnquiry: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

function generateId(): string {
  return 'KH' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100);
}

// Demo seed enquiries so the dashboard is not empty
const SEED: Enquiry[] = [
  { id:'KH100001', submittedAt:'2024-11-01T09:15:00', status:'Admission Confirmed', counsellorNotes:'Admitted to KL University B.Tech CSE.',
    studentName:'Priya Sharma', parentName:'Ramesh Sharma', mobile:'9876543210', whatsapp:'9876543210',
    email:'priya.sharma@email.com', city:'Vijayawada', state:'Andhra Pradesh', dob:'',
    qualification:'10+2', currentClass:'12th (Completed)', board:'CBSE', yearOfPassing:'2024', percentage:'87', entranceExam:'JEE Main', stream:'Science (PCM)',
    preferredCourse:'B.Tech – Computer Science', courseLevel:'UG', specialisation:'AI & ML', preferredUniversity:'KL University', preferredCollege:'',
    preferredStates:['Andhra Pradesh'], preferredCities:['Vijayawada','Guntur'], universityType:'Deemed',
    budget:'₹1,00,000 – ₹2,00,000 per year', paymentMethod:'Annual payment', hostelRequired:'Yes', scholarshipRequired:'No',
    admissionYear:'2024', urgency:'Immediately', additionalInfo:'Interested in CSE with AI specialisation.', privacyConsent:true },
  { id:'KH100002', submittedAt:'2024-11-05T11:30:00', status:'Counselling Scheduled', counsellorNotes:'Meeting scheduled for Nov 10.',
    studentName:'Ravi Kumar', parentName:'Suresh Kumar', mobile:'8765432109', whatsapp:'8765432109',
    email:'ravi.kumar@email.com', city:'Guntur', state:'Andhra Pradesh', dob:'',
    qualification:'10+2', currentClass:'12th (Completed)', board:'AP State Board', yearOfPassing:'2024', percentage:'72', entranceExam:'', stream:'Science (PCB)',
    preferredCourse:'MBBS', courseLevel:'UG', specialisation:'General Medicine', preferredUniversity:'',  preferredCollege:'',
    preferredStates:['Andhra Pradesh','Telangana'], preferredCities:['Hyderabad','Visakhapatnam'], universityType:'Government',
    budget:'₹1,00,000 – ₹2,00,000 per year', paymentMethod:'Education loan', hostelRequired:'Yes', scholarshipRequired:'Yes',
    admissionYear:'2024', urgency:'Within 1 month', additionalInfo:'Preparing for NEET.', privacyConsent:true },
  { id:'KH100003', submittedAt:'2024-11-08T14:00:00', status:'New Lead', counsellorNotes:'',
    studentName:'Ananya Reddy', parentName:'Venkat Reddy', mobile:'7654321098', whatsapp:'7654321098',
    email:'ananya.reddy@email.com', city:'Visakhapatnam', state:'Andhra Pradesh', dob:'',
    qualification:'Graduation', currentClass:'B.Sc (Completed)', board:'Andhra University', yearOfPassing:'2024', percentage:'78', entranceExam:'', stream:'Science',
    preferredCourse:'MBA', courseLevel:'PG', specialisation:'Finance', preferredUniversity:'',  preferredCollege:'',
    preferredStates:['Andhra Pradesh','Telangana','Karnataka'], preferredCities:['Hyderabad','Bangalore'], universityType:'Any',
    budget:'₹2,00,000 – ₹3,00,000 per year', paymentMethod:'Annual payment', hostelRequired:'No', scholarshipRequired:'No',
    admissionYear:'2025', urgency:'Planning for next academic year', additionalInfo:'Looking for top MBA college.', privacyConsent:true },
  { id:'KH100004', submittedAt:'2024-11-10T10:45:00', status:'University Shortlisted', counsellorNotes:'Shortlisted VIT and Manipal for B.Tech CSE.',
    studentName:'Mohammed Irfan', parentName:'Abdul Khader', mobile:'9988776655', whatsapp:'9988776655',
    email:'irfan.m@email.com', city:'Kurnool', state:'Andhra Pradesh', dob:'',
    qualification:'10+2', currentClass:'12th (Completed)', board:'AP State Board', yearOfPassing:'2024', percentage:'92', entranceExam:'JEE Main', stream:'Science (PCM)',
    preferredCourse:'B.Tech – Computer Science', courseLevel:'UG', specialisation:'Data Science', preferredUniversity:'',  preferredCollege:'',
    preferredStates:['Tamil Nadu','Karnataka'], preferredCities:['Vellore','Bangalore'], universityType:'Deemed',
    budget:'₹2,00,000 – ₹3,00,000 per year', paymentMethod:'Annual payment', hostelRequired:'Yes', scholarshipRequired:'No',
    admissionYear:'2024', urgency:'Immediately', additionalInfo:'Interested in Data Science specialisation.', privacyConsent:true },
  { id:'KH100005', submittedAt:'2024-11-12T16:20:00', status:'Follow-up Required', counsellorNotes:'Not picking up. Try WhatsApp.',
    studentName:'Lakshmi Devi', parentName:'Krishnamurthy', mobile:'9876012345', whatsapp:'9876012345',
    email:'lakshmi.d@email.com', city:'Nellore', state:'Andhra Pradesh', dob:'',
    qualification:'10+2', currentClass:'12th (Completed)', board:'AP State Board', yearOfPassing:'2024', percentage:'65', entranceExam:'', stream:'Science (PCB)',
    preferredCourse:'B.Sc Nursing', courseLevel:'UG', specialisation:'General Nursing', preferredUniversity:'',  preferredCollege:'',
    preferredStates:['Andhra Pradesh'], preferredCities:['Vijayawada','Guntur'], universityType:'Any',
    budget:'₹50,000 – ₹1,00,000 per year', paymentMethod:'Scholarship', hostelRequired:'Yes', scholarshipRequired:'Yes',
    admissionYear:'2024', urgency:'Immediately', additionalInfo:'Looking for affordable nursing colleges.', privacyConsent:true },
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('kh_admin') === 'true');
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SEED;
    } catch { return SEED; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
  }, [enquiries]);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      setIsLoggedIn(true);
      sessionStorage.setItem('kh_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('kh_admin');
  };

  const addEnquiry = (data: Omit<Enquiry, 'id' | 'submittedAt' | 'status' | 'counsellorNotes'>): string => {
    const id = generateId();
    const newEnquiry: Enquiry = {
      ...data, id,
      submittedAt: new Date().toISOString(),
      status: 'New Lead',
      counsellorNotes: '',
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    return id;
  };

  const updateEnquiry = (id: string, updates: Partial<Enquiry>) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
  };

  return (
    <AdminContext.Provider value={{ isLoggedIn, enquiries, login, logout, addEnquiry, updateEnquiry, deleteEnquiry }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
};
