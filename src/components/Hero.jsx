import React, { useEffect, useState } from 'react';
import { Github, ArrowDown, Sparkles } from 'lucide-react';
import { profile, projects, certificates, experience } from '../data/portfolio';
import { useLang } from '../context/LanguageContext';

const rolesId = ['Web Developer', 'Siswa RPL', 'Problem Solver'];
const rolesEn = ['Web Developer', 'RPL Student', 'Problem Solver'];

export default function Hero() {
  const { lang, tr } = useLang();
  const roles = lang === 'id' ? rolesId : rolesEn;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDeleting(false);
    setRoleIndex(0);
  }, [lang]);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex, roles]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid">
      <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-accent/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 md:w-72 h-48 md:h-72 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-28 sm:py-32 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

          {/* Text */}
          <div className="flex-1 text-center md:text-left animate-slide-up w-full">
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-4 py-2 rounded-full mb-5">
              <Sparkles size={12} />
              {tr.hero.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              {tr.hero.greeting}<br />
              <span className="gradient-text">{profile.nickname}</span>
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-2 mb-5 h-8">
              <span className="text-slate-400 text-base sm:text-lg">{tr.hero.role}</span>
              <span className="text-accent text-base sm:text-lg font-semibold typing-cursor">{displayed}</span>
            </div>

            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
              {profile.bio}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                <Github size={16} />
                {tr.hero.cta_github}
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 border border-white/10 hover:border-accent/40 bg-white/5 hover:bg-accent/5 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              >
                {tr.hero.cta_contact}
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-6 sm:gap-8 mt-10 pt-8 border-t border-white/5">
              <Stat value={projects.length} label={tr.hero.stat_project} />
              <div className="w-px h-8 bg-white/10" />
              <Stat value={certificates.length} label={tr.hero.stat_cert} />
              <div className="w-px h-8 bg-white/10" />
              <Stat value={experience.length} label={tr.hero.stat_exp} />
            </div>
          </div>

          {/* Photo */}
          <div className="flex-shrink-0 animate-fade-in float-anim">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-accent-blue/20 blur-sm" />
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-3xl border border-white/10 overflow-hidden bg-dark-700">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-dark-700 to-dark-600">
                    <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-4xl font-bold gradient-text">
                      {profile.nickname.charAt(0)}
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-dark-700 border border-white/10 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-xl">
                <p className="text-xs text-slate-500">{tr.hero.class_label}</p>
                <p className="text-xs sm:text-sm font-bold text-white">XII RPL 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-accent transition-colors group">
        <span className="text-xs tracking-widest uppercase hidden sm:block">{tr.hero.scroll}</span>
        <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
      </a>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-xl sm:text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
