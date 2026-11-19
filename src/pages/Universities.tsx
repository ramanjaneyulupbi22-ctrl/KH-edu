import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Building2, MapPin, BookOpen, X, Info, AlertCircle } from 'lucide-react';
import { UNIVERSITIES, UNIVERSITY_STATES, UNIVERSITY_TYPES, UNIVERSITY_COURSES } from '../data';

export default function Universities() {
  const [search, setSearch] = useState('');
  const [state, setState] = useState('All');
  const [type, setType] = useState('All');
  const [course, setCourse] = useState('All');

  const filtered = UNIVERSITIES.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.city.toLowerCase().includes(search.toLowerCase());
    const matchState  = state === 'All' || u.state === state;
    const matchType   = type === 'All' || u.type === type;
    const matchCourse = course === 'All' || u.courses.some(c => c.toLowerCase().includes(course.toLowerCase()));
    return matchSearch && matchState && matchType && matchCourse;
  });

  const clear = () => { setSearch(''); setState('All'); setType('All'); setCourse('All'); };

  const typeColors: Record<string, string> = {
    Government: 'bg-green-50 text-green-700',
    Private:    'bg-blue-50 text-blue-700',
    Deemed:     'bg-purple-50 text-purple-700',
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-gold-300 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Building2 size={14} /> University Directory
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">Explore Universities</h1>
          <p className="text-navy-200 text-lg max-w-xl mx-auto">Browse universities across India. All data shown is sample / demo — verify details at official university websites.</p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-amber-700 text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          <strong>Demo Data Notice:</strong>&nbsp;Fee ranges, courses, and university details shown are sample data for demonstration. Always verify information at the official university website before making admission decisions.
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="search" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search university or city…" className="input-field pl-10 py-2.5 text-sm" />
            </div>
            <select value={state} onChange={e => setState(e.target.value)} className="input-field py-2.5 text-sm max-w-[180px]">
              {UNIVERSITY_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={type} onChange={e => setType(e.target.value)} className="input-field py-2.5 text-sm max-w-[160px]">
              {UNIVERSITY_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
            <select value={course} onChange={e => setCourse(e.target.value)} className="input-field py-2.5 text-sm max-w-[160px]">
              {UNIVERSITY_COURSES.map(c => <option key={c}>{c}</option>)}
            </select>
            {(search || state !== 'All' || type !== 'All' || course !== 'All') && (
              <button onClick={clear} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
                <X size={14} /> Clear
              </button>
            )}
            <span className="text-sm text-gray-400 ml-auto">{filtered.length} universities</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Building2 size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-gray-500 mb-2">No universities found</h3>
            <button onClick={clear} className="btn-outline text-sm mt-3">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(u => (
              <div key={u.id} className="card flex flex-col overflow-hidden">
                <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`badge text-xs ${typeColors[u.type] || 'bg-gray-100 text-gray-600'}`}>{u.type}</span>
                    {u.established && <span className="text-navy-300 text-xs">Est. {u.established}</span>}
                  </div>
                  <h3 className="font-display font-bold text-white text-base leading-snug mb-1">{u.name}</h3>
                  <div className="flex items-center gap-1.5 text-navy-300 text-xs">
                    <MapPin size={11} className="text-gold-400" /> {u.city}, {u.state}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{u.description}</p>

                  {/* Courses */}
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                      <BookOpen size={12} className="text-navy-600" /> Available Courses
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {u.courses.slice(0, 5).map(c => (
                        <span key={c} className="badge bg-gray-50 text-gray-600 text-xs">{c}</span>
                      ))}
                      {u.courses.length > 5 && <span className="badge bg-gray-50 text-gray-400 text-xs">+{u.courses.length - 5} more</span>}
                    </div>
                  </div>

                  {/* Fee range */}
                  <div className="p-3 bg-gold-50 rounded-xl border border-gold-100 mb-4">
                    <div className="text-xs font-semibold text-gold-800 mb-0.5">Approx. Fee Range (Demo Data)</div>
                    <div className="text-gold-900 font-bold text-sm">{u.feeRange}</div>
                    <div className="text-gold-600 text-xs mt-1">per year — verify at official website</div>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-amber-600 bg-amber-50 p-2.5 rounded-lg mb-4">
                    <Info size={12} className="flex-shrink-0 mt-0.5" /> {u.note}
                  </div>

                  <div className="mt-auto">
                    <Link to="/enquiry" className="btn-gold w-full justify-center text-sm py-2.5">
                      Admission Enquiry <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-navy-50 border-t border-navy-100 py-12">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h3 className="font-display font-bold text-2xl text-navy-900 mb-3">Not sure which university is right for you?</h3>
          <p className="text-gray-500 mb-6">Our counsellors will shortlist the best universities based on your marks, budget, and career goals.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/enquiry" className="btn-primary">Get Personalised Guidance <ArrowRight size={15} /></Link>
            <a href="tel:7093794711" className="btn-outline">Call 70937 94711</a>
          </div>
        </div>
      </div>
    </div>
  );
}
