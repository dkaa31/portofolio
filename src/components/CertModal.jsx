import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Download, FileText, Loader2, Info } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

async function downloadFile(url, filename) {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(url, '_blank');
  }
}

export default function CertModal({ cert, onClose }) {
  const { tr } = useLang();
  const m = tr.modal;
  const [loading, setLoading] = useState(true);
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const isPdf = cert.file && cert.file.endsWith('.pdf');

  const getPreviewUrl = (filePath) => {
    const fullUrl = `${window.location.origin}${filePath}`;
    return `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <div className="relative bg-dark-800 border border-white/10 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-3xl shadow-2xl shadow-black/50 overflow-hidden animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-4 sm:p-6 border-b border-white/5">
          <div className="min-w-0 pr-3">
            <h3 className="text-white font-bold text-base sm:text-lg leading-snug">{cert.title}</h3>
            <p className="text-accent text-xs sm:text-sm mt-1">{cert.issuer}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all flex-shrink-0">
            <X size={16} />
          </button>
        </div>

        <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 rounded-2xl overflow-hidden border border-white/5 bg-dark-900 relative" style={{ height: '55vw', maxHeight: '460px', minHeight: '220px' }}>
          {cert.file ? (
            <>
              {isLocalhost && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-dark-700/95 border border-white/10 text-slate-400 text-xs px-3 sm:px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
                  <Info size={12} className="text-accent flex-shrink-0" />
                  {m.preview_info}
                </div>
              )}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-900 z-10">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 size={24} className="text-accent animate-spin" />
                    <p className="text-xs text-slate-500">{m.loading}</p>
                  </div>
                </div>
              )}
              {isPdf ? (
                <iframe src={getPreviewUrl(cert.file)} title={cert.title} className="w-full h-full border-0" onLoad={() => setLoading(false)} onError={() => setLoading(false)} />
              ) : (
                <img src={cert.file} alt={cert.title} className="w-full h-full object-contain" onLoad={() => setLoading(false)} />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-700 border border-white/5 flex items-center justify-center">
                <FileText size={28} className="text-slate-600" />
              </div>
              <div className="text-center px-4">
                <p className="text-sm text-slate-500 font-medium">{m.no_file}</p>
                <p className="text-xs text-slate-700 mt-1">{m.no_file_sub}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 p-4 sm:p-6">
          <div className="text-xs text-slate-600 truncate">
            {cert.credentialId && <span>ID: <span className="font-mono text-slate-500">{cert.credentialId}</span></span>}
          </div>
          <div className="flex gap-2 sm:gap-3 flex-shrink-0">
            {cert.file && (
              <button onClick={() => downloadFile(cert.file, cert.file.split('/').pop())}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all">
                <Download size={13} />
                {m.download}
              </button>
            )}
            {cert.credentialUrl && (
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all hover:shadow-lg hover:shadow-accent/20">
                <ExternalLink size={13} />
                {m.verify}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
