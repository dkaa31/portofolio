import React, { useState } from 'react';
import { Github, ExternalLink, Download, Folder, Palette, Image } from 'lucide-react';
import { projects } from '../data/portfolio';
import { SectionTitle } from './About';
import { useFadeIn } from '../hooks/useFadeIn';
import { useLang } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const ref = useFadeIn();
  const { tr, lang } = useLang();
  const { data } = useData();
  const projects = data.projects;
  const p = tr.projects;

  const categories = [p.filter_all, 'Web Dev', 'Design'];
  const [active, setActive] = useState(p.filter_all);
  const [selected, setSelected] = useState(null);

  React.useEffect(() => { setActive(p.filter_all); }, [p.filter_all]);

  const filtered = active === p.filter_all ? projects : projects.filter(proj => proj.category === active);

  return (
    <section id="projects" className="py-20 sm:py-28 bg-dark-800/30">
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <SectionTitle tag={p.tag} label={p.title} />
          <a
            href="https://github.com/dkaa31"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 hover:text-accent transition-colors flex items-center gap-1.5 sm:mb-2"
          >
            <Github size={14} />
            {p.github_all}
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
          {filtered.map((project) => {
            const isDesign = project.category === 'Design';
            const hasImages = project.images && project.images.length > 0;

            return (
              <div
                key={project.title}
                className="glow-card group bg-dark-700/60 border border-white/5 hover:border-accent/30 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5"
              >
                {/* Image preview / placeholder */}
                <button
                  onClick={() => setSelected(project)}
                  className="relative w-full overflow-hidden bg-dark-900 flex items-center justify-center"
                  style={{ height: '160px' }}
                >
                  {hasImages ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-700">
                      {isDesign ? <Palette size={28} /> : <Folder size={28} />}
                      <span className="text-xs">
                        {lang === 'id' ? 'Klik untuk detail' : 'Click for details'}
                      </span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-white">
                      <Image size={12} />
                      {lang === 'id' ? 'Lihat Detail' : 'View Details'}
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                      isDesign
                        ? 'text-pink-400 bg-pink-400/20 border-pink-400/20'
                        : 'text-accent bg-accent/20 border-accent/20'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </button>

                {/* Card body */}
                <div className="flex flex-col gap-3 p-5 flex-1">
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5">{project.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{project.description}</p>
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map(t => (
                      <span key={t} className="text-xs text-accent/70 font-mono">{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-xs text-slate-600">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  {/* Action row */}
                  <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-500 hover:text-accent transition-all"
                        title="GitHub"
                      >
                        <Github size={14} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-500 hover:text-accent transition-all"
                        title={lang === 'id' ? 'Buka Website' : 'Live Demo'}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="w-8 h-8 rounded-lg bg-green-500/10 hover:bg-green-500/20 flex items-center justify-center text-green-500/60 hover:text-green-400 transition-all"
                        title="Download"
                      >
                        <Download size={14} />
                      </a>
                    )}
                    {/* Detail button */}
                    <button
                      onClick={() => setSelected(project)}
                      className="ml-auto text-xs text-slate-600 hover:text-accent transition-colors"
                    >
                      {lang === 'id' ? 'Selengkapnya →' : 'Details →'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
