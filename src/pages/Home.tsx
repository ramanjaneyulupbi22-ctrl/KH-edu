import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, GraduationCap, BookOpen, Users, Award, MapPin, Phone,
  CheckCircle, Star, ChevronRight, MessageCircle, Search, TrendingUp,
  Lightbulb, FileText, Briefcase, HeartHandshake, Building2, Globe2
} from 'lucide-react';
import { COURSES } from '../data';

// ── Scroll animation hook ──
function useScrollAnim() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.animate-on-scroll');
    if (!els) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Data ──
const POPULAR_COURSES = COURSES.filter(c => c.popular).slice(0, 6);

const STATS = [
  { value: '500+', label: 'Students Guided', icon: GraduationCap },
  { value: '100+', label: 'Universities Listed', icon: Building2 },
  { value: '50+', label: 'Courses Available', icon: BookOpen },
  { value: '10+', label: 'Years of Expertise', icon: Award },
];

const WHYUS = [
  { icon: HeartHandshake, title: 'Personalised Guidance', desc: 'One-on-one counselling sessions tailored to each student\'s academic goals, budget, and career interests.' },
  { icon: Lightbulb, title: 'Expert Counsellors', desc: 'Experienced educational advisors who understand university admissions, eligibility, and career pathways.' },
  { icon: Globe2, title: 'Wide University Network', desc: 'Access to government, private, and deemed universities across Andhra Pradesh, Telangana, and all major states.' },
  { icon: FileText, title: 'Complete Admission Support', desc: 'From course selection to documentation, application, and final admission – we support every step.' },
  { icon: TrendingUp, title: 'Budget-Based Counselling', desc: 'We help students find the best universities within their financial capacity, including scholarship guidance.' },
  { icon: Users, title: 'Parent Involvement', desc: 'We actively involve parents in the counselling process to ensure well-informed, family-supported decisions.' },
];

const PROCESS = [
  { step: '01', title: 'Free Counselling Session', desc: 'Begin with a free one-on-one counselling session where we understand your academic background, interests, and goals.' },
  { step: '02', title: 'Course & Career Assessment', desc: 'We assess your eligibility, interests, and career aspirations to identify the most suitable courses.' },
  { step: '03', title: 'University Shortlisting', desc: 'Based on your preferences and budget, we shortlist universities that offer the best opportunities.' },
  { step: '04', title: 'Application & Documentation', desc: 'We guide you through the application process, documentation, and eligibility requirements.' },
  { step: '05', title: 'Admission Confirmation', desc: 'We support you until your admission is confirmed, ensuring a smooth and stress-free process.' },
];

const DESTINATIONS = [
  { state: 'Andhra Pradesh', icon: '🏛️', desc: 'Home state with many quality universities and affordable fees' },
  { state: 'Telangana', icon: '🌆', desc: 'Hyderabad – hub of education, technology, and medical colleges' },
  { state: 'Karnataka', icon: '🌿', desc: 'Bangalore – top engineering, management, and research universities' },
  { state: 'Tamil Nadu', icon: '⛩️', desc: 'VIT, Anna University and excellent technical institutions' },
  { state: 'Delhi', icon: '🏙️', desc: 'Central universities, DU, JNU, and premier institutions' },
  { state: 'Maharashtra', icon: '🌃', desc: 'Mumbai – law, management, medicine, and technology' },
];

const TESTIMONIALS = [
  { name: 'Priya S.', course: 'B.Tech CSE', text: 'KH Educational Services helped me find the perfect university within my budget. The counsellor was patient and very knowledgeable. I am now happily studying at a top deemed university in AP.', rating: 5 },
  { name: 'Ravi K.', course: 'MBBS', text: 'I was confused about MBBS admissions and NEET counselling. The team at KH Educational Services guided me step by step and I got admission to a good medical college.', rating: 5 },
  { name: 'Ananya R.', course: 'MBA Finance', text: 'Excellent service! They helped me compare multiple MBA colleges based on faculty, fees, and placements. Very transparent and honest guidance.', rating: 5 },
  { name: 'Mohammed I.', course: 'B.Tech Data Science', text: 'The team was very professional. They shortlisted 3 universities based on my JEE score and budget. Got into my first choice!', rating: 5 },
];

const FAQS = [
  { q: 'Is the counselling service at KH Educational Services free?', a: 'Yes, our initial counselling sessions are free. We help students understand their options, assess their eligibility, and explore universities without any upfront cost.' },
  { q: 'Which states and universities do you provide guidance for?', a: 'We provide guidance for universities across all major states in India including Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Delhi, Maharashtra, Kerala, and more.' },
  { q: 'Can you help with NEET, JEE, or other entrance exam counselling?', a: 'Yes, we help students understand the admission process for courses that require entrance exams like NEET, JEE, CLAT, CAT, MAT, and state-level CETs.' },
  { q: 'Do you help with education loans and scholarships?', a: 'Yes, we provide guidance on scholarship schemes, government financial aid, and education loan options to help students manage the cost of higher education.' },
  { q: 'What documents are typically required for admission?', a: 'Common documents include 10th and 12th mark sheets, transfer certificates, ID proof, photos, entrance exam scorecards, and any state-specific certificates. We guide you through the exact requirements.' },
  { q: 'How do I start the counselling process?', a: 'Simply fill in our Student Enquiry Form or call/WhatsApp us at 7093794711. Our counsellor will contact you to schedule a free session.' },
];

export default function Home() {
  const pageRef = useScrollAnim();

  return (
    <div ref={pageRef}>
      {/* ════════════════════ HERO ════════════════════ */}
      <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gold-400 filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-blue-400 filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-36 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-gold-300 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <MapPin size={14} /> Vijayawada, Andhra Pradesh
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5">
              Find the Right University.{' '}
              <span className="text-gold-400">Build the Right Future.</span>
            </h1>
            <p className="text-navy-100 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              KH Educational Services provides expert educational counselling and university admission guidance across India. We help students and parents make the best decision for their academic future.
            </p>
            <p className="text-gold-300 font-semibold text-base mb-8 italic">
              "Bridging Students and Universities. Building Brighter Futures."
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="btn-gold text-base px-7 py-3.5">
                Explore Courses <ArrowRight size={18} />
              </Link>
              <Link to="/enquiry" className="btn-outline-white text-base px-7 py-3.5">
                Get Free Counselling
              </Link>
              <a href="https://wa.me/917093794711?text=Hello%20KH%20Educational%20Services%2C%20I%20would%20like%20guidance%20regarding%20university%20admissions%20and%20courses."
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200">
                <MessageCircle size={18} /> WhatsApp Now
              </a>
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/15">
              <a href="tel:7093794711" className="flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors">
                <Phone size={15} className="text-gold-400" /> 70937 94711
              </a>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin size={15} className="text-gold-400" /> MZ Road, Near Ben Circle, Vijayawada
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs">
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
          </div>
          Scroll
        </div>
      </section>

      {/* ════════════════════ STATS ════════════════════ */}
      <section className="bg-white py-10 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {STATS.map((s, i) => (
              <div key={i} className="text-center animate-on-scroll" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-50 rounded-xl mb-3">
                  <s.icon size={22} className="text-navy-800" />
                </div>
                <div className="font-display font-bold text-3xl text-navy-900">{s.value}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ ABOUT INTRO ════════════════════ */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="animate-on-scroll">
              <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
                About KH Educational Services
              </div>
              <h2 className="section-title mb-5">
                Your Trusted Partner in Educational Counselling
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                KH Educational Services is a professional educational consultancy based in Vijayawada, Andhra Pradesh. Founded by <strong>Nagarjothi</strong>, we are dedicated to helping students and families navigate the complex landscape of higher education in India.
              </p>
              <p className="text-gray-600 leading-relaxed mb-7">
                We provide honest, transparent, and personalised guidance – matching students with universities and courses that align with their academic background, career goals, and financial capacity.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Transparent Counselling','Student-First Approach','Budget-Based Guidance','Admission Documentation Support'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/about" className="btn-primary">Learn More About Us <ArrowRight size={16} /></Link>
                <Link to="/enquiry" className="btn-outline">Get Free Counselling</Link>
              </div>
            </div>
            <div className="animate-on-scroll delay-2 relative">
              <div className="bg-gradient-to-br from-navy-50 to-blue-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-2xl shadow-sm">
                    <div className="w-14 h-14 bg-navy-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={26} className="text-gold-400" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-navy-900">Nagarjothi</div>
                      <div className="text-sm text-gray-500">Director, KH Educational Services</div>
                    </div>
                  </div>
                  <blockquote className="text-navy-800 font-medium text-lg leading-relaxed italic">
                    "Every student deserves access to the best educational opportunities. Our mission is to make quality educational guidance accessible, honest, and effective."
                  </blockquote>
                  <div className="mt-6 p-4 bg-gold-50 rounded-xl border border-gold-100">
                    <div className="flex items-center gap-2 text-gold-700 text-sm font-semibold mb-1">
                      <Phone size={14} /> Contact Us
                    </div>
                    <a href="tel:7093794711" className="text-navy-900 font-bold text-lg">70937 94711</a>
                    <div className="text-gray-500 text-xs mt-1">MZ Road, Near Ben Circle, Vijayawada</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ POPULAR COURSES ════════════════════ */}
      <section className="section-pad gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-navy-50 text-navy-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <BookOpen size={14} /> Popular Courses
            </div>
            <h2 className="section-title">Most Sought-After Courses</h2>
            <p className="section-subtitle mx-auto">Explore the courses that students in our region most frequently seek guidance for.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_COURSES.map((c, i) => (
              <div key={c.id} className={`card p-6 animate-on-scroll delay-${Math.min(i+1, 4)}`}>
                <div className="flex items-start justify-between mb-3">
                  <span className="badge bg-navy-50 text-navy-700">{c.category}</span>
                  <span className="badge bg-gold-50 text-gold-700">{c.duration}</span>
                </div>
                <h3 className="font-display font-bold text-navy-900 mb-2">{c.name}</h3>
                <p className="text-gray-500 text-sm mb-3 line-clamp-2">{c.description}</p>
                <div className="text-xs text-gray-500 mb-4">
                  <span className="font-medium text-gray-700">Eligibility:</span> {c.eligibility}
                </div>
                <Link to="/enquiry" className="btn-gold w-full justify-center text-sm py-2.5">
                  Enquire Now <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses" className="btn-primary">
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════ WHY US ════════════════════ */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Why Students Choose Us
            </div>
            <h2 className="section-title">Our Commitment to Your Success</h2>
            <p className="section-subtitle mx-auto">We believe every student deserves honest, personalised, and effective educational guidance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHYUS.map((w, i) => (
              <div key={i} className={`group p-6 rounded-2xl border border-gray-100 hover:border-navy-200 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-on-scroll delay-${Math.min(i+1, 4)}`}>
                <div className="w-12 h-12 bg-navy-50 group-hover:bg-navy-800 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <w.icon size={22} className="text-navy-800 group-hover:text-gold-400 transition-colors duration-300" />
                </div>
                <h3 className="font-display font-bold text-navy-900 mb-2">{w.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ COUNSELLING PROCESS ════════════════════ */}
      <section className="section-pad bg-navy-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gold-300 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              Our Process
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white">Our Counselling Process</h2>
            <p className="text-navy-300 text-lg mt-3 max-w-xl mx-auto">From your first enquiry to final admission – we guide you at every step.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0">
            {PROCESS.map((p, i) => (
              <div key={i} className={`relative flex flex-col items-center text-center px-4 animate-on-scroll delay-${Math.min(i+1, 4)}`}>
                {/* Connector line */}
                {i < PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold-500/60 to-gold-500/10" />
                )}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-gold-500 flex flex-col items-center justify-center mb-4 shadow-gold-glow">
                  <span className="font-display font-bold text-navy-950 text-xl">{p.step}</span>
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-2">{p.title}</h3>
                <p className="text-navy-400 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/enquiry" className="btn-gold text-base px-8 py-3.5">
              Start Your Journey <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════ STUDY DESTINATIONS ════════════════════ */}
      <section className="section-pad gradient-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Globe2 size={14} /> Study Destinations
            </div>
            <h2 className="section-title">Popular Study States</h2>
            <p className="section-subtitle mx-auto">We guide students to universities across all major educational hubs in India.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {DESTINATIONS.map((d, i) => (
              <Link to="/universities" key={i}
                className={`card p-5 text-center group animate-on-scroll delay-${Math.min(i+1,4)}`}>
                <div className="text-4xl mb-3">{d.icon}</div>
                <div className="font-display font-bold text-navy-900 text-sm group-hover:text-navy-700">{d.state}</div>
                <div className="text-gray-400 text-xs mt-1 leading-tight">{d.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
              <Star size={14} /> Student Testimonials
            </div>
            <h2 className="section-title">What Students Say</h2>
            <p className="section-subtitle mx-auto">
              Sample testimonials — replace with genuine student feedback.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className={`card p-6 animate-on-scroll delay-${Math.min(i+1,4)}`}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center font-bold text-navy-800 text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-navy-900 text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.course}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-3 italic">* Sample testimonial – replace with genuine student feedback</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ FAQ ════════════════════ */}
      <section className="section-pad gradient-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle mx-auto">Common questions students and parents ask us about our services.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm mb-4">Still have questions? Talk to our counsellors.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="tel:7093794711" className="btn-primary">
                <Phone size={16} /> Call 70937 94711
              </a>
              <Link to="/enquiry" className="btn-outline">Submit Enquiry</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ CONTACT CTA ════════════════════ */}
      <section className="section-pad bg-navy-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-navy-200 text-lg mb-8">
            Fill in our free student enquiry form and our counsellor will contact you within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enquiry" className="btn-gold text-base px-8 py-3.5">
              Apply Now – Free Counselling <ArrowRight size={18} />
            </Link>
            <a href="https://wa.me/917093794711?text=Hello%20KH%20Educational%20Services%2C%20I%20would%20like%20guidance%20regarding%20university%20admissions%20and%20courses."
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp text-base px-8 py-3.5">
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-navy-300 text-sm">
            <div className="flex items-center gap-1.5"><MapPin size={14} className="text-gold-400" /> MZ Road, Near Ben Circle, Vijayawada</div>
            <a href="tel:7093794711" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={14} className="text-gold-400" /> 70937 94711
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="card overflow-hidden">
      <button className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}>
        <span className="font-semibold text-navy-900 text-sm md:text-base">{q}</span>
        <ChevronRight size={18} className={`text-navy-600 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}
