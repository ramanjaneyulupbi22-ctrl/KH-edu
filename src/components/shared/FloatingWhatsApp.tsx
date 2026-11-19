import React from 'react';
import { MessageCircle } from 'lucide-react';

const WA_URL = 'https://wa.me/917093794711?text=Hello%20KH%20Educational%20Services%2C%20I%20would%20like%20guidance%20regarding%20university%20admissions%20and%20courses.';

export default function FloatingWhatsApp() {
  return (
    <a href={WA_URL} target="_blank" rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label="Chat with us on WhatsApp">
      <div className="relative">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
          <MessageCircle size={28} className="text-white" fill="white" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 w-max max-w-[200px] bg-navy-900 text-white text-xs font-medium px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
          Chat on WhatsApp
          <div className="absolute top-full right-4 border-4 border-transparent border-t-navy-900" />
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
      </div>
    </a>
  );
}
