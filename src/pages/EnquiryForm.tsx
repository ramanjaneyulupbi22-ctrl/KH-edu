import React, { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft, Loader2, User, GraduationCap, BookOpen, IndianRupee, MessageSquare, Copy } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { BUDGET_OPTIONS, INDIAN_STATES, COURSES } from '../data';
import { Enquiry } from '../types';

// ── Types ──────────────────────────────────────
type StepData = Omit<Enquiry, 'id' | 'submittedAt' | 'status' | 'counsellorNotes'>;

const BLANK: StepData = {
  studentName:'', parentName:'', mobile:'', whatsapp:'', email:'', city:'', state:'', dob:'',
  qualification:'', currentClass:'', board:'', yearOfPassing:'', percentage:'', entranceExam:'', stream:'',
  preferredCourse:'', courseLevel:'', specialisation:'', preferredUniversity:'', preferredCollege:'',
  preferredStates:[], preferredCities:[], universityType:'',
  budget:'', paymentMethod:'', hostelRequired:'', scholarshipRequired:'',
  admissionYear:'', urgency:'', additionalInfo:'', privacyConsent: false,
};

const STEPS = [
  { label: 'Student Details',     icon: User },
  { label: 'Academic Details',    icon: GraduationCap },
  { label: 'Preferences',         icon: BookOpen },
  { label: 'Budget',              icon: IndianRupee },
  { label: 'Additional Info',     icon: MessageSquare },
];

const QUALIFICATIONS = ['10th (SSC)', '12th (Intermediate)', 'Diploma', 'Graduation', 'Post Graduation', 'Other'];
const STREAMS = ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts / Humanities', 'Vocational', 'Other'];
const COURSE_LEVELS = ['Diploma', 'Undergraduate (UG)', 'Postgraduate (PG)', 'Doctoral (PhD)'];
const UNIVERSITY_TYPES_FORM = ['Government', 'Private', 'Deemed University', 'Any'];
const PAYMENT_METHODS = ['Annual payment', 'Semester payment', 'Education loan', 'Scholarship', 'Need counselling'];
const HOSTEL_OPTIONS = ['Yes', 'No', 'Not decided'];
const URGENCY_OPTIONS = ['Immediately', 'Within 1 month', 'Within 3 months', 'Planning for next academic year'];
const ADMISSION_YEARS = ['2024', '2025', '2026', 'Not sure'];
const COURSE_NAMES = COURSES.map(c => c.name);

// ── Validation ─────────────────────────────────
function validateStep(step: number, data: StepData): Record<string, string> {
  const e: Record<string, string> = {};
  if (step === 0) {
    if (!data.studentName.trim()) e.studentName = 'Student name is required';
    if (!data.parentName.trim())  e.parentName  = 'Parent name is required';
    if (!data.mobile.trim())      e.mobile      = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(data.mobile.replace(/\s/g, ''))) e.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address';
    if (!data.city.trim())  e.city  = 'City is required';
    if (!data.state.trim()) e.state = 'State is required';
  }
  if (step === 1) {
    if (!data.qualification) e.qualification = 'Highest qualification is required';
    if (!data.yearOfPassing.trim()) e.yearOfPassing = 'Year of passing is required';
    if (!data.percentage.trim())    e.percentage    = 'Percentage / CGPA is required';
    if (!data.stream) e.stream = 'Academic stream is required';
  }
  if (step === 2) {
    if (!data.preferredCourse.trim()) e.preferredCourse = 'Preferred course is required';
    if (!data.courseLevel)            e.courseLevel     = 'Course level is required';
    if (!data.universityType)         e.universityType  = 'University type preference is required';
    if (!data.preferredStates.length) e.preferredStates = 'Select at least one preferred state';
  }
  if (step === 3) {
    if (!data.budget)         e.budget         = 'Please select your budget range';
    if (!data.paymentMethod)  e.paymentMethod  = 'Please select payment preference';
    if (!data.hostelRequired) e.hostelRequired = 'Please indicate hostel requirement';
    if (!data.scholarshipRequired) e.scholarshipRequired = 'Please answer scholarship query';
  }
  if (step === 4) {
    if (!data.admissionYear) e.admissionYear = 'Please select admission year';
    if (!data.urgency)       e.urgency       = 'Please select your urgency';
    if (!data.privacyConsent) e.privacyConsent = 'You must agree to the privacy policy to submit';
  }
  return e;
}

// ── Main Component ─────────────────────────────
export default function EnquiryForm() {
  const { addEnquiry } = useAdmin();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<StepData>(BLANK);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const set = (k: string, v: any) => {
    setData(d => ({ ...d, [k]: v }));
    setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const toggleState = (s: string) => {
    setData(d => ({
      ...d,
      preferredStates: d.preferredStates.includes(s)
        ? d.preferredStates.filter(x => x !== s)
        : [...d.preferredStates, s],
    }));
    setErrors(e => { const n = { ...e }; delete n['preferredStates']; return n; });
  };

  const next = () => {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length) { setErrors(errs); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setErrors({});
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prev = () => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const submit = async () => {
    const errs = validateStep(4, data);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const id = addEnquiry(data);
    setLoading(false);
    setSubmittedId(id);
  };

  const copy = () => {
    if (submittedId) { navigator.clipboard.writeText(submittedId).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); }
  };

  // ── Success Screen ──
  if (submittedId) {
    return (
      <div className="pt-20 min-h-screen gradient-section flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="card p-10">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="font-display font-bold text-2xl text-navy-900 mb-3">Enquiry Submitted!</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Thank you for contacting KH Educational Services! Your enquiry has been submitted successfully. Our counselling team will contact you shortly to guide you towards the right course and university.
            </p>
            <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-6">
              <p className="text-xs text-gold-600 font-medium mb-1">Your Enquiry ID</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-display font-bold text-2xl text-gold-800">{submittedId}</span>
                <button onClick={copy} className="p-1.5 hover:bg-gold-100 rounded-lg transition-colors" title="Copy ID">
                  <Copy size={14} className="text-gold-600" />
                </button>
              </div>
              {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
              <p className="text-xs text-gold-500 mt-2">Please save this ID for reference.</p>
            </div>
            <div className="flex flex-col gap-3">
              <a href="tel:7093794711" className="btn-primary justify-center">Call Us: 70937 94711</a>
              <a href="https://wa.me/917093794711" target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center">WhatsApp Us</a>
              <button onClick={() => { setData(BLANK); setStep(0); setSubmittedId(null); }} className="btn-outline text-sm justify-center">Submit Another Enquiry</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen gradient-section py-14 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Free Student Enquiry
          </div>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-navy-900 mb-3">
            Find Your Best University
          </h1>
          <p className="text-gray-500">Fill in this form and our counsellor will guide you to the right course and university.</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 gap-1">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold text-sm transition-all duration-300 ${
                  i < step ? 'step-done' : i === step ? 'step-active' : 'step-pending'
                }`}>
                  {i < step ? <CheckCircle size={18} /> : <s.icon size={16} />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i <= step ? 'text-navy-800' : 'text-gray-400'}`}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 transition-all duration-500 ${i < step ? 'bg-gold-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form card */}
        <div className="card p-7 md:p-10">
          <h2 className="font-display font-bold text-xl text-navy-900 mb-6">
            Step {step + 1}: {STEPS[step].label}
          </h2>

          {/* ── STEP 1: Student Details ── */}
          {step === 0 && (
            <div className="space-y-5">
              <Field label="Student Full Name *" error={errors.studentName}>
                <input value={data.studentName} onChange={e => set('studentName', e.target.value)} placeholder="Student's full name" className={`input-field ${errors.studentName ? 'border-red-400' : ''}`} />
              </Field>
              <Field label="Parent / Guardian Name *" error={errors.parentName}>
                <input value={data.parentName} onChange={e => set('parentName', e.target.value)} placeholder="Parent or guardian name" className={`input-field ${errors.parentName ? 'border-red-400' : ''}`} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Student Mobile Number *" error={errors.mobile}>
                  <input value={data.mobile} onChange={e => set('mobile', e.target.value)} placeholder="10-digit mobile" className={`input-field ${errors.mobile ? 'border-red-400' : ''}`} />
                </Field>
                <Field label="WhatsApp Number" error={errors.whatsapp}>
                  <input value={data.whatsapp} onChange={e => set('whatsapp', e.target.value)} placeholder="Same as mobile or different" className="input-field" />
                </Field>
              </div>
              <Field label="Email Address" error={errors.email}>
                <input type="email" value={data.email} onChange={e => set('email', e.target.value)} placeholder="Optional" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="City *" error={errors.city}>
                  <input value={data.city} onChange={e => set('city', e.target.value)} placeholder="Your city" className={`input-field ${errors.city ? 'border-red-400' : ''}`} />
                </Field>
                <Field label="State *" error={errors.state}>
                  <select value={data.state} onChange={e => set('state', e.target.value)} className={`input-field ${errors.state ? 'border-red-400' : ''}`}>
                    <option value="">Select state</option>
                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Date of Birth (Optional)" error="">
                <input type="date" value={data.dob} onChange={e => set('dob', e.target.value)} className="input-field" />
              </Field>
            </div>
          )}

          {/* ── STEP 2: Academic Details ── */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Highest Qualification *" error={errors.qualification}>
                  <select value={data.qualification} onChange={e => set('qualification', e.target.value)} className={`input-field ${errors.qualification ? 'border-red-400' : ''}`}>
                    <option value="">Select qualification</option>
                    {QUALIFICATIONS.map(q => <option key={q}>{q}</option>)}
                  </select>
                </Field>
                <Field label="Current Class / Degree" error="">
                  <input value={data.currentClass} onChange={e => set('currentClass', e.target.value)} placeholder="e.g. 12th / B.Sc" className="input-field" />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Board / University" error="">
                  <input value={data.board} onChange={e => set('board', e.target.value)} placeholder="e.g. CBSE / AP Board / AU" className="input-field" />
                </Field>
                <Field label="Year of Passing *" error={errors.yearOfPassing}>
                  <input value={data.yearOfPassing} onChange={e => set('yearOfPassing', e.target.value)} placeholder="e.g. 2024" className={`input-field ${errors.yearOfPassing ? 'border-red-400' : ''}`} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Percentage / CGPA *" error={errors.percentage}>
                  <input value={data.percentage} onChange={e => set('percentage', e.target.value)} placeholder="e.g. 85% or 8.5 CGPA" className={`input-field ${errors.percentage ? 'border-red-400' : ''}`} />
                </Field>
                <Field label="Entrance Exam Details (Optional)" error="">
                  <input value={data.entranceExam} onChange={e => set('entranceExam', e.target.value)} placeholder="e.g. NEET: 580 / JEE: 92 percentile" className="input-field" />
                </Field>
              </div>
              <Field label="Academic Stream *" error={errors.stream}>
                <select value={data.stream} onChange={e => set('stream', e.target.value)} className={`input-field ${errors.stream ? 'border-red-400' : ''}`}>
                  <option value="">Select your stream</option>
                  {STREAMS.map(s => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
          )}

          {/* ── STEP 3: Preferences ── */}
          {step === 2 && (
            <div className="space-y-5">
              <Field label="Preferred Course *" error={errors.preferredCourse}>
                <input list="course-list" value={data.preferredCourse} onChange={e => set('preferredCourse', e.target.value)} placeholder="Type or select a course" className={`input-field ${errors.preferredCourse ? 'border-red-400' : ''}`} />
                <datalist id="course-list">
                  {COURSE_NAMES.map(c => <option key={c} value={c} />)}
                </datalist>
              </Field>
              <Field label="Course Level *" error={errors.courseLevel}>
                <div className="flex flex-wrap gap-2">
                  {COURSE_LEVELS.map(l => (
                    <button type="button" key={l} onClick={() => set('courseLevel', l)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${data.courseLevel === l ? 'border-navy-800 bg-navy-800 text-white' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                      {l}
                    </button>
                  ))}
                </div>
                {errors.courseLevel && <p className="text-red-500 text-xs mt-1">{errors.courseLevel}</p>}
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Preferred Specialisation" error="">
                  <input value={data.specialisation} onChange={e => set('specialisation', e.target.value)} placeholder="e.g. AI & ML, Finance…" className="input-field" />
                </Field>
                <Field label="Preferred University (Optional)" error="">
                  <input value={data.preferredUniversity} onChange={e => set('preferredUniversity', e.target.value)} placeholder="Any specific university in mind?" className="input-field" />
                </Field>
              </div>
              <Field label="Preferred Study States * (select all that apply)" error={errors.preferredStates}>
                <div className="flex flex-wrap gap-2 mt-1">
                  {INDIAN_STATES.slice(0, 15).map(s => (
                    <button type="button" key={s} onClick={() => toggleState(s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border-2 transition-all ${data.preferredStates.includes(s) ? 'border-navy-800 bg-navy-800 text-white' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
                {errors.preferredStates && <p className="text-red-500 text-xs mt-1">{errors.preferredStates}</p>}
              </Field>
              <Field label="University Type Preference *" error={errors.universityType}>
                <div className="flex flex-wrap gap-2">
                  {UNIVERSITY_TYPES_FORM.map(t => (
                    <button type="button" key={t} onClick={() => set('universityType', t)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${data.universityType === t ? 'border-navy-800 bg-navy-800 text-white' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                      {t}
                    </button>
                  ))}
                </div>
                {errors.universityType && <p className="text-red-500 text-xs mt-1">{errors.universityType}</p>}
              </Field>
            </div>
          )}

          {/* ── STEP 4: Budget ── */}
          {step === 3 && (
            <div className="space-y-5">
              <Field label="Estimated Education Budget (per year) *" error={errors.budget}>
                <div className="space-y-2.5">
                  {BUDGET_OPTIONS.map(b => (
                    <label key={b} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${data.budget === b ? 'border-navy-800 bg-navy-50' : 'border-gray-200 hover:border-navy-200'}`}>
                      <input type="radio" name="budget" value={b} checked={data.budget === b} onChange={() => set('budget', b)} className="accent-navy-800" />
                      <span className="text-sm font-medium text-navy-900">{b}</span>
                    </label>
                  ))}
                </div>
                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
              </Field>
              <Field label="Preferred Payment Method *" error={errors.paymentMethod}>
                <select value={data.paymentMethod} onChange={e => set('paymentMethod', e.target.value)} className={`input-field ${errors.paymentMethod ? 'border-red-400' : ''}`}>
                  <option value="">Select payment method</option>
                  {PAYMENT_METHODS.map(p => <option key={p}>{p}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Hostel Required? *" error={errors.hostelRequired}>
                  <div className="flex gap-2">
                    {HOSTEL_OPTIONS.map(h => (
                      <button type="button" key={h} onClick={() => set('hostelRequired', h)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${data.hostelRequired === h ? 'border-navy-800 bg-navy-800 text-white' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                        {h}
                      </button>
                    ))}
                  </div>
                  {errors.hostelRequired && <p className="text-red-500 text-xs mt-1">{errors.hostelRequired}</p>}
                </Field>
                <Field label="Scholarship Assistance Required? *" error={errors.scholarshipRequired}>
                  <div className="flex gap-2">
                    {['Yes', 'No'].map(s => (
                      <button type="button" key={s} onClick={() => set('scholarshipRequired', s)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${data.scholarshipRequired === s ? 'border-navy-800 bg-navy-800 text-white' : 'border-gray-200 text-gray-600 hover:border-navy-300'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.scholarshipRequired && <p className="text-red-500 text-xs mt-1">{errors.scholarshipRequired}</p>}
                </Field>
              </div>
            </div>
          )}

          {/* ── STEP 5: Additional ── */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Preferred Admission Year *" error={errors.admissionYear}>
                  <select value={data.admissionYear} onChange={e => set('admissionYear', e.target.value)} className={`input-field ${errors.admissionYear ? 'border-red-400' : ''}`}>
                    <option value="">Select year</option>
                    {ADMISSION_YEARS.map(y => <option key={y}>{y}</option>)}
                  </select>
                </Field>
                <Field label="Admission Urgency *" error={errors.urgency}>
                  <select value={data.urgency} onChange={e => set('urgency', e.target.value)} className={`input-field ${errors.urgency ? 'border-red-400' : ''}`}>
                    <option value="">Select urgency</option>
                    {URGENCY_OPTIONS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Any Additional Requirements or Questions" error="">
                <textarea rows={4} value={data.additionalInfo} onChange={e => set('additionalInfo', e.target.value)}
                  placeholder="Tell us anything else we should know – specific requirements, questions, concerns…"
                  className="input-field resize-none" />
              </Field>

              {/* Privacy consent */}
              <div className={`p-4 rounded-xl border-2 ${errors.privacyConsent ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={data.privacyConsent} onChange={e => set('privacyConsent', e.target.checked)}
                    className="mt-1 accent-navy-800 w-4 h-4" />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    I agree to share my information with <strong>KH Educational Services</strong> for educational counselling and admission assistance. I understand that the consultancy may contact me by phone, SMS, or WhatsApp regarding my enquiry.
                  </span>
                </label>
                {errors.privacyConsent && <p className="text-red-500 text-xs mt-2">{errors.privacyConsent}</p>}
              </div>

              {/* Summary */}
              <div className="p-5 bg-navy-50 rounded-2xl border border-navy-100">
                <h4 className="font-semibold text-navy-900 text-sm mb-3">Your Enquiry Summary</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  {[
                    { l: 'Name', v: data.studentName },
                    { l: 'Mobile', v: data.mobile },
                    { l: 'Course', v: data.preferredCourse },
                    { l: 'Level', v: data.courseLevel },
                    { l: 'Budget', v: data.budget },
                    { l: 'Urgency', v: data.urgency },
                  ].map(r => (
                    <div key={r.l} className="flex gap-1">
                      <span className="text-gray-500 font-medium">{r.l}:</span>
                      <span className="text-navy-900 font-semibold truncate">{r.v || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className={`flex ${step === 0 ? 'justify-end' : 'justify-between'} mt-8 pt-6 border-t border-gray-100 gap-4`}>
            {step > 0 && (
              <button onClick={prev} className="btn-outline flex items-center gap-2">
                <ChevronLeft size={16} /> Previous
              </button>
            )}
            {step < 4 ? (
              <button onClick={next} className="btn-primary flex items-center gap-2 ml-auto">
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button onClick={submit} disabled={loading} className="btn-gold flex items-center gap-2 ml-auto text-base px-8 py-3">
                {loading ? <><Loader2 size={18} className="animate-spin" /> Submitting…</> : <>Submit Enquiry <ChevronRight size={16} /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
