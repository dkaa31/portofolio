import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Github, Mail, Instagram, Linkedin, Send, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { profile } from '../data/portfolio';
import { SectionTitle } from './About';
import { useFadeIn } from '../hooks/useFadeIn';

const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

function TikTokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

const socialLinks = [
  { key: 'github',    icon: <Github size={18} />,        label: 'GitHub',    url: profile.github,                  username: 'dkaa31',    color: 'hover:border-slate-400/40 hover:text-slate-300' },
  { key: 'instagram', icon: <Instagram size={18} />,     label: 'Instagram', ...profile.socials.instagram,          color: 'hover:border-pink-500/40 hover:text-pink-400' },
  { key: 'tiktok',    icon: <TikTokIcon size={18} />,    label: 'TikTok',    ...profile.socials.tiktok,             color: 'hover:border-cyan-400/40 hover:text-cyan-400' },
  { key: 'whatsapp',  icon: <MessageCircle size={18} />, label: 'WhatsApp',  ...profile.socials.whatsapp,           color: 'hover:border-green-500/40 hover:text-green-400' },
  { key: 'linkedin',  icon: <Linkedin size={18} />,      label: 'LinkedIn',  ...profile.socials.linkedin,           color: 'hover:border-blue-500/40 hover:text-blue-400' },
];

export default function Contact() {
  const ref = useFadeIn();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_email: profile.email,
      }, EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-5 sm:px-6" ref={ref}>
        <SectionTitle tag="06" label="Kontak & Media Sosial" />

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">

          {/* Form */}
          <div className="bg-gradient-to-br from-accent/10 to-accent-blue/5 border border-accent/20 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 sm:gap-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Kirim Pesan</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Pesan kamu akan langsung masuk ke email saya.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
              {/* Name & Email — stack on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500">Nama</label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Nama kamu" required
                    className="bg-dark-700/80 border border-white/10 focus:border-accent/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-slate-500">Email</label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="email@kamu.com" required
                    className="bg-dark-700/80 border border-white/10 focus:border-accent/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-slate-500">Pesan</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tulis pesanmu di sini..." required rows={4}
                  className="bg-dark-700/80 border border-white/10 focus:border-accent/50 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors resize-none"
                />
              </div>

              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-xs sm:text-sm bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-2.5">
                  <CheckCircle size={14} />
                  Pesan berhasil dikirim! Terima kasih.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-xs sm:text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                  <AlertCircle size={14} />
                  Gagal mengirim. Coba lagi atau hubungi via medsos.
                </div>
              )}

              <button
                type="submit" disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent/25 min-h-[48px]"
              >
                {status === 'loading'
                  ? <><Loader2 size={15} className="animate-spin" /> Mengirim...</>
                  : <><Send size={15} /> Kirim Pesan</>
                }
              </button>
            </form>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Media Sosial</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Atau temukan saya di platform berikut.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 bg-dark-700/60 border border-white/5 rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 transition-all duration-200 hover:bg-dark-700 hover:-translate-y-0.5 min-h-[56px] ${s.color}`}
                >
                  <span className="text-slate-500 group-hover:scale-110 transition-all duration-200 flex-shrink-0">{s.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-600">{s.label}</p>
                    <p className="text-xs text-slate-400 group-hover:text-current transition-colors truncate font-medium">{s.username}</p>
                  </div>
                </a>
              ))}

              {/* Email — full width */}
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-3 bg-dark-700/60 border border-white/5 rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 transition-all duration-200 hover:bg-dark-700 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent col-span-2 min-h-[56px]"
              >
                <span className="text-slate-500 group-hover:scale-110 transition-all duration-200 flex-shrink-0"><Mail size={18} /></span>
                <div className="min-w-0">
                  <p className="text-xs text-slate-600">Email</p>
                  <p className="text-xs text-slate-400 group-hover:text-current transition-colors truncate font-medium">{profile.email}</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
