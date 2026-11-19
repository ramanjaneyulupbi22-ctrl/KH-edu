import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone, FileText, BookOpen, Building2, GraduationCap, Users, CheckCircle, IndianRupee, Calendar } from 'lucide-react';

const SERVICES = [
  { icon: GraduationCap, title: 'Career Counselling', desc: 'One-on-one sessions to identify strengths, interests, and suitable career paths. We help students choose careers that align with their abilities and goals.' },
  { icon: BookOpen, title: 'Course Selection', desc: 'Guidance on selecting the right course — matching academic background, career goals, and market demand to identify the best-fit programme.' },
  { icon: Building2, title: 'University Selection', desc: 'Shortlisting universities based on eligibility, location preference, fees, infrastructure, faculty reputation, and future prospects.' },
  { icon: FileText, title: 'Application Guidance', desc: 'Step-by-step assistance with filling applications correctly, meeting deadlines, and preparing documents for submission.' },
  { icon: CheckCircle, title: 'Documentation Assistance', desc: 'Support in gathering and verifying required documents including mark sheets, certificates, transfer documents, and entrance exam scorecards.' },
  { icon: IndianRupee, title: 'Fee & Budget Planning', desc: 'Transparent guidance on total cost of education — tuition, hostel, transport, books — and options for education loans and scholarships.' },
  { icon: Users, title: 'Parent Counselling', desc: 'Dedicated sessions for parents to understand the educational landscape, university options, fees, and long-term career prospects.' },
  { icon: Calendar, title: 'Admission Process Support', desc: 'Full support through every admission step — from initial enquiry to final admission confirmation, ensuring no step is missed.' },
];

export default function AdmissionGuidance() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">Admission Guidance Services</h1>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">From course selection to final admission – KH Educational Services guides you at every step of your higher education journey.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/enquiry" className="btn-gold">Get Free Counselling <ArrowRight size={16} /></Link>
            <a href="tel:7093794711" className="btn-outline-white"><Phone size={16} /> Call 70937 94711</a>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle mx-auto">Comprehensive support across every stage of the admission process.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="card p-6 hover:border-navy-200 group">
                <div className="w-12 h-12 bg-navy-50 group-hover:bg-navy-800 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <s.icon size={22} className="text-navy-800 group-hover:text-gold-400 transition-colors duration-300" />
                </div>
                <h3 className="font-display font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 gradient-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="section-title text-center mb-12">How the Admission Process Works</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Submit Your Enquiry', desc: 'Fill in our student enquiry form with your academic details, course preferences, and budget. It takes less than 5 minutes.' },
              { step: '2', title: 'Free Counselling Session', desc: 'Our counsellor will contact you within 24 hours to schedule a free one-on-one counselling session, either in-person or over phone/WhatsApp.' },
              { step: '3', title: 'Shortlist Universities & Courses', desc: 'Based on your profile, we shortlist 3–5 universities and courses that match your eligibility, goals, and budget.' },
              { step: '4', title: 'Application & Documentation', desc: 'We guide you through the application process — forms, documents, deadlines — and help you submit error-free applications.' },
              { step: '5', title: 'Admission Confirmed', desc: 'Once admitted, we assist with fee payments, hostel arrangements, and other pre-joining requirements.' },
            ].map((p, i) => (
              <div key={i} className="card p-6 flex items-start gap-5">
                <div className="w-12 h-12 bg-gold-500 rounded-xl flex items-center justify-center font-display font-bold text-navy-950 text-lg flex-shrink-0">
                  {p.step}
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy-900 mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-800 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Start Your Admission Journey Today</h2>
          <p className="text-navy-200 mb-7">Free counselling. No pressure. Transparent guidance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enquiry" className="btn-gold">Fill Enquiry Form <ArrowRight size={16} /></Link>
            <a href="https://wa.me/917093794711?text=Hello%20KH%20Educational%20Services%2C%20I%20would%20like%20guidance%20regarding%20university%20admissions%20and%20courses." target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle size={16} /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
