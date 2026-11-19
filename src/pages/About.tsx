import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Target, Eye, Heart, Shield, Users, CheckCircle, Phone, MessageCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-gold-300 text-sm font-semibold px-4 py-2 rounded-full mb-5">
            About Us
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Who We Are
          </h1>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">
            KH Educational Services – Committed to guiding students towards the right university, course, and career path.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="section-title mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                KH Educational Services was established in Vijayawada, Andhra Pradesh, with a clear purpose: to provide honest, transparent, and personalised educational counselling to students and families navigating higher education in India.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our founder, <strong className="text-navy-800">Nagarjothi</strong>, recognised that many students struggle to identify the right university or course — often making choices based on incomplete information, social pressure, or lack of access to qualified guidance.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                At KH Educational Services, we bridge that gap. We help students understand their options, assess their strengths, and make informed, confident decisions about their educational future.
              </p>
              <div className="p-5 bg-navy-50 rounded-2xl border border-navy-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={26} className="text-gold-400" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-navy-900">Nagarjothi</div>
                    <div className="text-sm text-gray-500">Director, KH Educational Services</div>
                    <a href="tel:7093794711" className="text-navy-700 font-semibold text-sm mt-1 hover:text-navy-900 transition-colors flex items-center gap-1">
                      <Phone size={13} /> 70937 94711
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Target, title: 'Our Mission', desc: 'To empower students with the knowledge, guidance, and support needed to make informed decisions about their higher education.', color: 'bg-blue-50 text-blue-700' },
                { icon: Eye, title: 'Our Vision', desc: 'To become the most trusted educational consultancy in Andhra Pradesh, known for transparency, integrity, and student success.', color: 'bg-gold-50 text-gold-700' },
                { icon: Heart, title: 'Our Values', desc: 'Student-first. Transparent. Honest. Personalised. We prioritise the student\'s best interest above all else.', color: 'bg-green-50 text-green-700' },
                { icon: Shield, title: 'Our Promise', desc: 'No false promises. No pressure tactics. Only honest, evidence-based guidance towards suitable educational institutions.', color: 'bg-purple-50 text-purple-700' },
              ].map(item => (
                <div key={item.title} className="card p-6">
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                    <item.icon size={20} />
                  </div>
                  <h3 className="font-display font-bold text-navy-900 mb-2 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-20 gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="section-title">What Makes Us Different</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'No Fake Statistics', desc: 'We do not display fabricated placement rates, rankings, or partner lists. All information we share is honest and verifiable.' },
              { title: 'Personalised Approach', desc: 'No two students are the same. We spend time understanding each student\'s background, goals, and financial situation before making recommendations.' },
              { title: 'Parent Involvement', desc: 'We actively involve parents in the counselling process, ensuring the entire family is comfortable and confident in the educational decision.' },
              { title: 'Budget Transparency', desc: 'We clearly explain fee structures, hidden costs, hostel charges, and other expenses so there are no financial surprises.' },
              { title: 'No Pressure Sales', desc: 'We never pressure students into choosing any particular institution. Our goal is to find the best fit, not the most commission.' },
              { title: 'Follow-up Support', desc: 'Our relationship does not end at admission. We continue to support students through the documentation and enrolment process.' },
            ].map(item => (
              <div key={item.title} className="card p-6">
                <CheckCircle size={20} className="text-green-500 mb-3" />
                <h3 className="font-display font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-800 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display font-bold text-3xl text-white mb-4">Ready to Talk to Our Team?</h2>
          <p className="text-navy-200 mb-7">Get free educational counselling and start planning your future today.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enquiry" className="btn-gold">Get Free Counselling <ArrowRight size={16} /></Link>
            <a href="tel:7093794711" className="btn-outline-white"><Phone size={16} /> Call 70937 94711</a>
          </div>
        </div>
      </section>
    </div>
  );
}
