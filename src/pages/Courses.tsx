import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, BookOpen, Clock, GraduationCap, Briefcase, ChevronDown, X } from 'lucide-react';
import { COURSES, COURSE_CATEGORIES } from '../data';

const LEVELS = ['All', 'UG', 'PG', 'Diploma', 'Doctoral'];

export default function Courses() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = COURSES.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    const matchLevel = level === 'All' || c.level === level;
    return matchSearch && matchCat && matchLevel;
  });

  const clear = () => { setSearch(''); setCategory('All'); setLevel('All'); };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-gold-300 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <BookOpen size={14} /> Course Catalogue
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">Explore Courses</h1>
          <p className="text-navy-200 text-lg max-w-xl mx-auto">Browse all available courses. Click Enquire Now to get personalised guidance.</p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="search" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search courses…" className="input-field pl-10 py-2.5 text-sm" />
            </div>
            <select value={category} onChange={e => setCategory(e.target.value)} className="input-field py-2.5 text-sm max-w-[200px]">
              {COURSE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={level} onChange={e => setLevel(e.target.value)} className="input-field py-2.5 text-sm max-w-[160px]">
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
            {(search || category !== 'All' || level !== 'All') && (
              <button onClick={clear} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
                <X size={14} /> Clear
              </button>
            )}
            <span className="text-sm text-gray-400 ml-auto">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-gray-500 mb-2">No courses found</h3>
            <p className="text-gray-400 mb-5">Try a different search term or category.</p>
            <button onClick={clear} className="btn-outline text-sm">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(c => (
              <div key={c.id} className="card flex flex-col overflow-hidden">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <span className="badge bg-navy-50 text-navy-700 text-xs">{c.category}</span>
                    <div className="flex gap-1.5">
                      <span className="badge bg-gold-50 text-gold-700 text-xs">{c.duration}</span>
                      <span className={`badge text-xs ${c.level === 'UG' ? 'bg-blue-50 text-blue-700' : c.level === 'PG' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'}`}>{c.level}</span>
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-navy-900 mb-2 text-base leading-tight">{c.name}</h3>
                  <p className="text-gray-500 text-sm mb-3 leading-relaxed">{c.description}</p>

                  {/* Eligibility */}
                  <div className="p-3 bg-gray-50 rounded-xl mb-3">
                    <div className="flex items-start gap-2 text-xs text-gray-600">
                      <GraduationCap size={13} className="text-navy-600 mt-0.5 flex-shrink-0" />
                      <div><span className="font-semibold">Eligibility: </span>{c.eligibility}</div>
                    </div>
                  </div>

                  {/* Careers – expandable */}
                  <button className="flex items-center gap-1.5 text-xs font-medium text-navy-700 hover:text-navy-900 transition-colors mb-2"
                    onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                    <Briefcase size={12} /> Career Opportunities
                    <ChevronDown size={12} className={`transition-transform ${expanded === c.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expanded === c.id && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {c.careers.map(career => (
                        <span key={career} className="badge bg-green-50 text-green-700 text-xs">{career}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="px-6 pb-5">
                  <Link to="/enquiry" className="btn-gold w-full justify-center text-sm py-2.5">
                    Enquire Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-navy-50 border-t border-navy-100 py-12">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h3 className="font-display font-bold text-2xl text-navy-900 mb-3">Can't find what you're looking for?</h3>
          <p className="text-gray-500 mb-6">Talk to our counsellor directly. We cover all courses and universities across India.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/enquiry" className="btn-primary">Start Free Enquiry <ArrowRight size={15} /></Link>
            <a href="tel:7093794711" className="btn-outline">Call 70937 94711</a>
          </div>
        </div>
      </div>
    </div>
  );
}
