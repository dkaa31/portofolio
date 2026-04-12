import React, { useState } from 'react';
import { Award, Calendar, Hash, ShieldCheck, Eye } from 'lucide-react';
import { certificates } from '../data/portfolio';
import { SectionTitle } from './About';
import { useFadeIn } from '../hooks/useFadeIn';
import CertModal from './CertModal';

export default function Certificates() {
  const ref = useFadeIn();
  const [selected, setSelected] = useState(null);

  return (
    <section id="certificates" className="py-20 sm:py-28 relative">
      <div className="absolute right-0 top-1/3 w-48 sm:w-72 h-48 sm:h-72 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>
        <SectionTitle tag="05" label="Sertifikat" />

        <div className="mt-10 sm:mt-14 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent hidden md:block" />

          <div className="flex flex-col gap-4 sm:gap-6">
            {certificates.map((cert, i) => (
              <div key={i} className="md:pl-14 relative group">
                <div className="absolute left-0 top-6 w-8 h-8 rounded-full bg-dark-700 border-2 border-accent/30 group-hover:border-accent flex items-center justify-center transition-all duration-300 hidden md:flex">
                  <div className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
                </div>

                <div className="glow-card bg-dark-700/60 border border-white/5 hover:border-accent/20 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:bg-dark-700">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                      <Award size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h3 className="text-white font-bold text-sm sm:text-base leading-snug">{cert.title}</h3>
                          <p className="text-accent text-xs sm:text-sm mt-0.5 font-medium">{cert.issuer}</p>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full w-fit flex-shrink-0">
                          <ShieldCheck size={11} />
                          Terverifikasi
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-3 mb-3 sm:mb-4">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                          <Calendar size={11} />
                          Diterbitkan {cert.year}
                        </div>
                        {cert.expiry && (
                          <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                            <Calendar size={11} />
                            Berlaku hingga {cert.expiry}
                          </div>
                        )}
                        {cert.credentialId && (
                          <div className="flex items-center gap-1.5 text-slate-600 text-xs font-mono">
                            <Hash size={11} />
                            <span className="truncate max-w-[120px] sm:max-w-none">{cert.credentialId}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{cert.description}</p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {cert.tags && (
                          <div className="flex flex-wrap gap-2">
                            {cert.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-accent/10 text-accent/80 border border-accent/10 px-2.5 py-1 rounded-full font-mono">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <button
                          onClick={() => setSelected(cert)}
                          className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500 hover:text-accent border border-white/5 hover:border-accent/30 bg-white/5 hover:bg-accent/5 px-4 py-2.5 sm:py-2 rounded-xl transition-all duration-200 w-full sm:w-auto min-h-[40px] sm:min-h-0"
                        >
                          <Eye size={13} />
                          {cert.file ? 'Lihat Sertifikat' : 'Detail'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
