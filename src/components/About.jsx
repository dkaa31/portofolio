import React from 'react';
import { MapPin, GraduationCap, Code2, Heart } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useFadeIn } from '../hooks/useFadeIn';
import { useLang } from '../context/LanguageContext';

export default function About() {
  const ref = useFadeIn();
  const { tr } = useLang();
  const a = tr.about;

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>
        <SectionTitle tag={a.tag} label={a.title} />

        <div className="grid md:grid-cols-5 gap-8 md:gap-12 mt-10 sm:mt-14">
          <div className="md:col-span-3 space-y-4">
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              {a.p1} <span className="text-white font-semibold">{profile.name}</span>{a.p1b}
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{a.p2}</p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">{a.p3}</p>
            <div className="pt-2">
              <a href="#contact" className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all duration-200">
                {a.cta}
              </a>
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
            <InfoCard icon={<GraduationCap size={16} />} label={a.edu_label}   value={a.edu_value} />
            <InfoCard icon={<MapPin size={16} />}         label={a.loc_label}   value={a.loc_value} />
            <InfoCard icon={<Code2 size={16} />}          label={a.focus_label} value={a.focus_value} />
            <InfoCard icon={<Heart size={16} />}          label={a.hobby_label} value={a.hobby_value} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="glow-card flex items-center gap-3 sm:gap-4 bg-dark-700/60 border border-white/5 rounded-2xl p-3.5 sm:p-4 hover:bg-dark-700 transition-all duration-300">
      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-600 mb-0.5">{label}</p>
        <p className="text-xs sm:text-sm text-white font-medium truncate">{value}</p>
      </div>
    </div>
  );
}

export function SectionTitle({ tag, label }) {
  return (
    <div className="flex items-end gap-4">
      <div>
        <span className="text-xs text-accent/60 font-mono tracking-widest">{tag} /</span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-1">{label}</h2>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent mb-2 hidden md:block" />
    </div>
  );
}
