import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AdminProvider, useAdmin } from './contexts/AdminContext';

import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import FloatingWhatsApp from './components/shared/FloatingWhatsApp';

import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Universities from './pages/Universities';
import AdmissionGuidance from './pages/AdmissionGuidance';
import Contact from './pages/Contact';
import EnquiryForm from './pages/EnquiryForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

/* Layout that wraps public pages with Navbar + Footer + WhatsApp button */
const PublicLayout: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
    <FloatingWhatsApp />
  </>
);

/* Guard: redirect to /admin if not authenticated */
const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAdmin();
  return isLoggedIn ? <Outlet /> : <Navigate to="/admin" replace />;
};

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <Routes>
          {/* Public pages */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/admission-guidance" element={<AdmissionGuidance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquiry" element={<EnquiryForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Route>

          {/* Admin login (no Navbar/Footer) */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Protected admin dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AdminProvider>
  );
};

export default App;
