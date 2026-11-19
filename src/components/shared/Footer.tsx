import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, MessageCircle, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Courses', to: '/courses' },
    { label: 'Universities', to: '/universities' },
    { label: 'Admission Guidance', to: '/admission-guidance' },
  ],
  'Student Services': [
    { label: 'Student Enquiry Form', to: '/enquiry' },
    { label: 'Course Counselling', to: '/courses' },
    { label: 'University Selection', to: '/universities' },
    { label: 'Admission Assistance', to: '/admission-guidance' },
    { label: 'Contact Us', to: '/contact' },
  ],
  'Information': [
    { label: 'Privacy Policy', to: '/privacy-policy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 border-b border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-2xl text-white">Ready to Find Your Dream University?</h3>
              <p className="text-navy-200 mt-1">Get personalised counselling from our expert team. It's free.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/enquiry" className="btn-gold">
                Start Free Counselling <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/917093794711?text=Hello%20KH%20Educational%20Services%2C%20I%20would%20like%20guidance%20regarding%20university%20admissions%20and%20courses."
                target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-gold-500 rounded-xl flex items-center justify-center">
                <GraduationCap size={22} className="text-navy-950" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">KH Educational Services</div>
                <div className="text-gold-400 text-xs font-medium">Your Education. Your Future. Our Guidance.</div>
              </div>
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-6 max-w-xs">
              KH Educational Services is a trusted educational consultancy in Vijayawada, Andhra Pradesh, helping students find the right university, course, and career path.
            </p>
            <p className="text-navy-400 text-xs mb-5">Director: <span className="text-white font-semibold">Nagarjothi</span></p>

            {/* Contact */}
            <div className="space-y-3">
              <a href="tel:7093794711" className="flex items-center gap-3 text-navy-300 hover:text-gold-400 transition-colors text-sm">
                <Phone size={15} className="text-gold-500 flex-shrink-0" /> 7093794711
              </a>
              <div className="flex items-start gap-3 text-navy-300 text-sm">
                <MapPin size={15} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span>Opposite JSN Grand, MZ Road, Near Ben Circle, Vijayawada, Andhra Pradesh</span>
              </div>
              <a href="https://wa.me/917093794711" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-navy-300 hover:text-green-400 transition-colors text-sm">
                <MessageCircle size={15} className="text-green-500 flex-shrink-0" /> WhatsApp: 70937 94711
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wide">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-navy-300 hover:text-gold-400 transition-colors text-sm flex items-center gap-1.5 group">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-navy-400 text-sm">© 2024 KH Educational Services. All rights reserved.</p>
          <p className="text-navy-500 text-xs">Educational consultancy services in Vijayawada, Andhra Pradesh, India.</p>
        </div>
      </div>
    </footer>
  );
}
