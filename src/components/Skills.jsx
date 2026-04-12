import React from 'react';
import { skills } from '../data/portfolio';
import { SectionTitle } from './About';
import { useFadeIn } from '../hooks/useFadeIn';

const skillMeta = {
  'HTML':         { emoji: '🌐', color: 'from-orange-500/20 to-orange-500/5',  border: 'border-orange-500/20',  text: 'text-orange-400' },
  'CSS':          { emoji: '🎨', color: 'from-blue-500/20 to-blue-500/5',      border: 'border-blue-500/20',    text: 'text-blue-400' },
  'JavaScript':   { emoji: '⚡', color: 'from-yellow-500/20 to-yellow-500/5',  border: 'border-yellow-500/20',  text: 'text-yellow-400' },
  'PHP':          { emoji: '🐘', color: 'from-violet-500/20 to-violet-500/5',  border: 'border-violet-500/20',  text: 'text-violet-400' },
  'MySQL':        { emoji: '🗄️', color: 'from-cyan-500/20 to-cyan-500/5',     border: 'border-cyan-500/20',    text: 'text-cyan-400' },
  'Bootstrap':    { emoji: '🅱️', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/20',  text: 'text-purple-400' },
  'Laravel':      { emoji: '🔴', color: 'from-red-500/20 to-red-500/5',       border: 'border-red-500/20',     text: 'text-red-400' },
  'Tailwind CSS': { emoji: '💨', color: 'from-teal-500/20 to-teal-500/5',     border: 'border-teal-500/20',    text: 'text-teal-400' },
  'Alpine.js':    { emoji: '🏔️', color: 'from-sky-500/20 to-sky-500/5',      border: 'border-sky-500/20',     text: 'text-sky-400' },
  'Git & GitHub': { emoji: '🔧', color: 'from-rose-500/20 to-rose-500/5',     border: 'border-rose-500/20',    text: 'text-rose-400' },
  'Arduino':      { emoji: '🤖', color: 'from-green-500/20 to-green-500/5',   border: 'border-green-500/20',   text: 'text-green-400' },
  'IoT':          { emoji: '📡', color: 'from-indigo-500/20 to-indigo-500/5', border: 'border-indigo-500/20',  text: 'text-indigo-400' },
};

const defaultMeta = { emoji: '💡', color: 'from-accent/20 to-accent/5', border: 'border-accent/20', text: 'text-accent' };

export default function Skills() {
  const ref = useFadeIn();

  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>
        <SectionTitle tag="02" label="Skill" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-10 sm:mt-14">
          {skills.map((skill) => {
            const meta = skillMeta[skill.name] || defaultMeta;
            return (
              <div
                key={skill.name}
                className={`glow-card group bg-gradient-to-br ${meta.color} border ${meta.border} rounded-2xl p-4 sm:p-5 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{meta.emoji}</span>
                  <span className={`text-xs font-bold ${meta.text}`}>{skill.level}%</span>
                </div>
                <p className="text-white font-semibold text-xs sm:text-sm mb-2 sm:mb-3">{skill.name}</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full skill-bar rounded-full" style={{ width: `${skill.level}%` }} />
                </div>
                <p className="text-xs text-slate-600 mt-1.5 sm:mt-2">
                  {skill.level >= 75 ? 'Mahir' : skill.level >= 55 ? 'Menengah' : 'Dasar'}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
