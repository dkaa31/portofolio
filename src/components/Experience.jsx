import React from 'react';
import { Briefcase, MapPin, Calendar, Clock, Tag } from 'lucide-react';
import { experience } from '../data/portfolio';
import { SectionTitle } from './About';
import { useFadeIn } from '../hooks/useFadeIn';

export default function Experience() {
  const ref = useFadeIn();

  return (
    <section id="experience" className="py-20 sm:py-28 bg-dark-800/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>
        <SectionTitle tag="04" label="Pengalaman" />

        <div className="mt-10 sm:mt-14 flex flex-col gap-5 sm:gap-6">
          {experience.map((item, i) => (
            <div key={i} className="glow-card bg-dark-700/60 border border-white/5 hover:border-accent/20 rounded-2xl p-5 sm:p-7 transition-all duration-300 hover:bg-dark-700">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                {/* Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  <Briefcase size={18} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <h3 className="text-white font-bold text-base sm:text-lg leading-snug">{item.company}</h3>
                      <p className="text-accent text-sm font-semibold mt-1">{item.position}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-xs px-3 py-1 rounded-full w-fit flex-shrink-0">
                      <Tag size={10} />
                      {item.type}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 mb-4">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Calendar size={11} />
                      {item.period}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                      <Clock size={11} />
                      {item.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                      <MapPin size={11} />
                      {item.location}
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((s) => (
                      <span key={s} className="text-xs bg-dark-600 text-slate-400 border border-white/5 px-3 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
