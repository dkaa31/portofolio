import React, { useEffect, useState } from 'react';
import { X, Github, ExternalLink, Download, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export default function ProjectModal({ project, onClose }) {
  const { lang } = useLang();
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImg();
      if (e.key === 'ArrowLeft') prevImg();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [imgIndex]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const hasImages = project.images && project.images.length > 0;
  const nextImg = () => setImgIndex(i => (i + 1) % project.images.length);
  const prevImg = () => setImgIndex(i => (i - 1 + project.images.length) % project.images.length);

  const isDesign = project.category === 'Design';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <div
        className="relative bg-dark-800 border border-white/10 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl shadow-black/50 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between p-5 sm:p-6 bg-dark-800 border-b border-white/5">
          <div className="min-w-0 pr-3">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                isDesign
                  ? 'text-pink-400 bg-pink-400/10 border-pink-400/20'
                  : 'text-accent bg-accent/10 border-accent/20'
              }`}>
                {project.category}
              </span>
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl leading-snug">{project.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        {/* Image gallery */}
        <div className="relative bg-dark-900 border-b border-white/5" style={{ minHeight: '220px' }}>
          {hasImages ? (
            <>
              <img
                src={project.images[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                className="w-full object-contain max-h-72 sm:max-h-96"
              />
              {/* Navigation arrows */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? 'bg-accent w-4' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            /* Placeholder kalau belum ada screenshot */
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-700">
              <div className="w-16 h-16 rounded-2xl bg-dark-700 border border-white/5 flex items-center justify-center">
                <ImageOff size={28} className="text-slate-600" />
              </div>
              <p className="text-sm text-slate-600">
                {lang === 'id' ? 'Screenshot belum tersedia' : 'Screenshots not available yet'}
              </p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col gap-5">
          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>

          {/* Tech stack */}
          <div>
            <p className="text-xs text-slate-600 mb-2 uppercase tracking-widest">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="text-xs bg-accent/10 text-accent border border-accent/10 px-3 py-1 rounded-full font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                <Github size={15} />
                {lang === 'id' ? 'Lihat Kode' : 'View Code'}
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                <ExternalLink size={15} />
                {lang === 'id' ? 'Buka Website' : 'Live Demo'}
              </a>
            )}
            {project.downloadUrl && (
              <a
                href={project.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 hover:text-green-300 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              >
                <Download size={15} />
                {lang === 'id' ? 'Download' : 'Download'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
