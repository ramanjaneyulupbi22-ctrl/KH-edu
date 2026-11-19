import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.mobile.trim()) e.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) e.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  const set = (k: string, v: string) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => { const n = { ...e }; delete n[k]; return n; }); };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">Contact Us</h1>
          <p className="text-navy-200 text-lg">Reach out to KH Educational Services for free counselling and admission guidance.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Info panel */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl text-navy-900 mb-2">Get In Touch</h2>
                <p className="text-gray-500 text-sm leading-relaxed">Our counsellors are available to answer your questions and guide you towards the right course and university. Contact us through any channel below.</p>
              </div>

              {[
                { icon: Phone, label: 'Call / WhatsApp', value: '70937 94711', href: 'tel:7093794711', color: 'bg-blue-50 text-blue-700' },
                { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/917093794711?text=Hello%20KH%20Educational%20Services%2C%20I%20would%20like%20guidance%20regarding%20university%20admissions%20and%20courses.', color: 'bg-green-50 text-green-700', ext: true },
                { icon: MapPin, label: 'Office Address', value: 'Opposite JSN Grand, MZ Road, Near Ben Circle, Vijayawada, Andhra Pradesh', href: '', color: 'bg-gold-50 text-gold-700' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-navy-200 transition-colors">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} {...(item.ext ? { target:'_blank', rel:'noopener noreferrer' } : {})}
                        className="text-navy-900 font-semibold text-sm hover:text-navy-700 transition-colors">{item.value}</a>
                    ) : (
                      <span className="text-navy-900 text-sm">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick action buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <a href="tel:7093794711" className="btn-primary justify-center"><Phone size={16} /> Call Now</a>
                <a href="https://wa.me/917093794711?text=Hello%20KH%20Educational%20Services%2C%20I%20would%20like%20guidance%20regarding%20university%20admissions%20and%20courses."
                  target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center">
                  <MessageCircle size={16} /> WhatsApp Now
                </a>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <div className="bg-navy-50 h-48 flex flex-col items-center justify-center gap-3">
                  <MapPin size={32} className="text-navy-300" />
                  <div className="text-center">
                    <p className="text-navy-700 font-semibold text-sm">KH Educational Services</p>
                    <p className="text-gray-400 text-xs mt-1">MZ Road, Near Ben Circle, Vijayawada</p>
                  </div>
                  <a href="https://maps.google.com/?q=MZ+Road+Near+Ben+Circle+Vijayawada+Andhra+Pradesh"
                    target="_blank" rel="noopener noreferrer" className="btn-outline text-xs py-2 px-4">
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-navy-900 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 text-sm max-w-sm">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  <button onClick={() => { setForm({ name:'', mobile:'', email:'', subject:'', message:'' }); setSubmitted(false); }}
                    className="btn-outline mt-6 text-sm">Send Another Message</button>
                </div>
              ) : (
                <div className="card p-7 md:p-8">
                  <h3 className="font-display font-bold text-xl text-navy-900 mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                        <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number *</label>
                        <input value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="10-digit mobile" className={`input-field ${errors.mobile ? 'border-red-400' : ''}`} />
                        {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Optional" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <input value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="e.g. Enquiry about B.Tech admissions" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Message *</label>
                      <textarea rows={5} value={form.message} onChange={e => set('message', e.target.value)}
                        placeholder="Tell us how we can help you…"
                        className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`} />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
                      {loading ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
