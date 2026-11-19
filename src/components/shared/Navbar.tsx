import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { GraduationCap, Phone, Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',               to: '/' },
  { label: 'About Us',           to: '/about' },
  { label: 'Courses',            to: '/courses' },
  { label: 'Universities',       to: '/universities' },
  { label: 'Admission Guidance', to: '/admission-guidance' },
  { label: 'Contact Us',         to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const isHero = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled || !isHero
        ? 'bg-white shadow-md'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              scrolled || !isHero ? 'bg-navy-800' : 'bg-white/20 backdrop-blur-sm border border-white/30'
            }`}>
              <GraduationCap size={22} className={scrolled || !isHero ? 'text-gold-400' : 'text-white'} />
            </div>
            <div>
              <div className={`font-display font-bold text-lg leading-tight ${scrolled || !isHero ? 'text-navy-900' : 'text-white'}`}>
                KH Educational
              </div>
              <div className={`text-xs font-medium ${scrolled || !isHero ? 'text-gold-600' : 'text-gold-300'}`}>
                Services
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? (scrolled || !isHero ? 'bg-navy-50 text-navy-800' : 'bg-white/15 text-white')
                      : (scrolled || !isHero ? 'text-gray-600 hover:text-navy-800 hover:bg-gray-50' : 'text-white/80 hover:text-white hover:bg-white/10')
                  }`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA + phone */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:7093794711"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                scrolled || !isHero ? 'text-navy-800 hover:text-navy-600' : 'text-white/80 hover:text-white'
              }`}>
              <Phone size={15} /> 70937 94711
            </a>
            <Link to="/enquiry" className="btn-gold text-sm py-2.5 px-5">
              Free Counselling
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 rounded-lg" onClick={() => setOpen(!open)}
            aria-label="Toggle menu">
            {open
              ? <X size={22} className={scrolled || !isHero ? 'text-navy-800' : 'text-white'} />
              : <Menu size={22} className={scrolled || !isHero ? 'text-navy-800' : 'text-white'} />
            }
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map(l => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-navy-50 text-navy-800 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-navy-800'
                  }`
                }>
                {l.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-3">
              <a href="tel:7093794711" className="btn-outline text-sm py-2.5 justify-center">
                <Phone size={16} /> Call 70937 94711
              </a>
              <Link to="/enquiry" className="btn-gold text-sm py-2.5 justify-center">
                Free Counselling
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
