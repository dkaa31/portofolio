import React, { useState } from 'react';
import { Github, ExternalLink, Folder, Palette } from 'lucide-react';
import { projects } from '../data/portfolio';
import { SectionTitle } from './About';
import { useFadeIn } from '../hooks/useFadeIn';

const categories = ['Semua', 'Web Dev', 'Design'];

export default function Projects() {
  const ref = useFadeIn();
  const [active, setActive] = useState('Semua');
  const [hovered, setHovered] = useState(null);

  const filtered = active === 'Semua' ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-dark-800/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <SectionTitle tag="03" label="Project" />
          <a
            href="https://github.com/dkaa31"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-accent transition-colors flex items-center gap-1.5 sm:mb-2"
          >
            <Github size={14} />
            Lihat semua di GitHub →
          </a>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mt-6 sm:mt-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs px-4 py-2 rounded-full border transition-all duration-200 min-h-[36px] ${
                active === cat
                  ? 'bg-accent text-white border-accent'
                  : 'bg-transparent text-slate-500 border-white/10 hover:border-accent/30 hover:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-6 sm:mt-8">
          {filtered.map((project, i) => {
            const isDesign = project.category === 'Design';
            return (
              <div
                key={project.title}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`glow-card group relative bg-dark-700/60 border rounded-2xl p-5 sm:p-6 flex flex-col gap-4 transition-all duration-300 cursor-default ${
                  hovered === i
                    ? 'border-accent/30 bg-dark-700 -translate-y-1 shadow-xl shadow-accent/5'
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    hovered === i ? 'bg-accent/20 text-accent' : 'bg-white/5 text-slate-500'
                  }`}>
                    {isDesign ? <Palette size={18} /> : <Folder size={18} />}
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`text-xs px-2.5 py-1 rounded-full border ${
                      isDesign
                        ? 'text-pink-400 bg-pink-400/10 border-pink-400/20'
                        : 'text-accent bg-accent/10 border-accent/20'
                    }`}>
                      {project.category}
                    </span>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-500 hover:text-accent transition-all"
                        onClick={e => e.stopPropagation()}
                      >
                        <Github size={15} />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-500 hover:text-accent transition-all"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className={`font-semibold text-sm sm:text-base mb-2 transition-colors duration-200 ${hovered === i ? 'text-white' : 'text-slate-200'}`}>
                    {project.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-accent/70 font-mono">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
