import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggle, tr } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  const navLinks = [
    { label: tr.nav.about,        href: '#about' },
    { label: tr.nav.skills,       href: '#skills' },
    { label: tr.nav.projects,     href: '#projects' },
    { label: tr.nav.experience,   href: '#experience' },
    { label: tr.nav.certificates, href: '#certificates' },
    { label: tr.nav.contact,      href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['about','skills','projects','experience','certificates','contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-dark-900/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        <a href="#hero" className="text-white font-bold text-xl tracking-tight">
          <span className="gradient-text">A</span>
          <span className="text-white">ljudika</span>
          <span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-2">
          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                    active === link.href
                      ? 'text-white bg-accent/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {active === link.href && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-accent/10 border border-white/10 hover:border-accent/30 text-slate-400 hover:text-accent px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ml-2"
          >
            <span>{lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
            <span>{lang === 'id' ? 'ID' : 'EN'}</span>
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-dark-800/95 backdrop-blur-xl border-t border-white/5 px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-sm text-slate-400 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
