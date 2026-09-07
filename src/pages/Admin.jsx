import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useData } from '../context/DataContext';
import {
  LogOut, Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp,
  Briefcase, FolderOpen, Award, User, Eye, EyeOff, Lock
} from 'lucide-react';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'dika2025porto';

// ── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-dark-800 border border-white/10 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Lock size={18} />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">Admin Panel</h1>
            <p className="text-slate-500 text-xs">Portofolio Aljudika</p>
          </div>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Password"
              className={`w-full bg-dark-700 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-colors pr-11 ${err ? 'border-red-500/50' : 'border-white/10 focus:border-accent/50'}`}
            />
            <button type="button" onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {err && <p className="text-red-400 text-xs text-center">Password salah</p>}
          <button type="submit"
            className="bg-accent hover:bg-accent-dark text-white py-3 rounded-xl text-sm font-semibold transition-all">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function Section({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-dark-800 border border-white/5 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3 text-white font-semibold">
          <span className="text-accent">{icon}</span>
          {title}
        </div>
        {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-slate-500">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "bg-dark-700 border border-white/10 focus:border-accent/50 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-colors w-full";
const textareaCls = inputCls + " resize-none";

// ── Projects CRUD ─────────────────────────────────────────────────────────────
function ProjectsSection({ data, refetch }) {
  const empty = { title: '', description: '', tech: '', github: '', live_url: '', download_url: '', images: '', category: 'Web Dev' };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({
      title: p.title || '',
      description: p.description || '',
      tech: (p.tech || []).join(', '),
      github: p.github || '',
      live_url: p.liveUrl || '',
      download_url: p.downloadUrl || '',
      images: (p.images || []).join(', '),
      category: p.category || 'Web Dev',
    });
  };

  const cancel = () => { setEditing(null); setForm(empty); };

  const save = async () => {
    setLoading(true);
    const payload = {
      title: form.title,
      description: form.description,
      tech: form.tech.split(',').map(s => s.trim()).filter(Boolean),
      github: form.github || null,
      live_url: form.live_url || null,
      download_url: form.download_url || null,
      images: form.images.split(',').map(s => s.trim()).filter(Boolean),
      category: form.category,
    };
    if (editing) {
      await supabase.from('projects').update(payload).eq('id', editing);
    } else {
      await supabase.from('projects').insert(payload);
    }
    cancel(); refetch(); setLoading(false);
  };

  const del = async (id) => {
    if (!confirm('Hapus project ini?')) return;
    await supabase.from('projects').delete().eq('id', id);
    refetch();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* List */}
      {data.projects.map(p => (
        <div key={p.id || p.title} className="flex items-center justify-between bg-dark-700/60 border border-white/5 rounded-xl px-4 py-3">
          <div>
            <p className="text-white text-sm font-medium">{p.title}</p>
            <p className="text-slate-500 text-xs">{p.category}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => startEdit(p)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-500 hover:text-accent transition-all">
              <Pencil size={13} />
            </button>
            {p.id && <button onClick={() => del(p.id)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-slate-500 hover:text-red-400 transition-all">
              <Trash2 size={13} />
            </button>}
          </div>
        </div>
      ))}

      {/* Form */}
      <div className="bg-dark-700/40 border border-accent/10 rounded-2xl p-5 flex flex-col gap-4 mt-2">
        <p className="text-accent text-sm font-semibold">{editing ? 'Edit Project' : 'Tambah Project Baru'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul"><input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Nama project" /></Field>
          <Field label="Kategori">
            <select className={inputCls} value={form.category} onChange={e => set('category', e.target.value)}>
              <option value="Web Dev">Web Dev</option>
              <option value="Design">Design</option>
            </select>
          </Field>
        </div>
        <Field label="Deskripsi"><textarea className={textareaCls} rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Deskripsi project" /></Field>
        <Field label="Tech Stack (pisah koma)"><input className={inputCls} value={form.tech} onChange={e => set('tech', e.target.value)} placeholder="Laravel, PHP, MySQL" /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="GitHub URL"><input className={inputCls} value={form.github} onChange={e => set('github', e.target.value)} placeholder="https://github.com/..." /></Field>
          <Field label="Live URL"><input className={inputCls} value={form.live_url} onChange={e => set('live_url', e.target.value)} placeholder="https://..." /></Field>
          <Field label="Download URL"><input className={inputCls} value={form.download_url} onChange={e => set('download_url', e.target.value)} placeholder="https://..." /></Field>
        </div>
        <Field label="URLs Gambar (pisah koma)"><input className={inputCls} value={form.images} onChange={e => set('images', e.target.value)} placeholder="/projects/ss1.png, /projects/ss2.png" /></Field>
        <div className="flex gap-3">
          <button onClick={save} disabled={loading || !form.title}
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
            <Save size={14} />{loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          {editing && <button onClick={cancel} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all"><X size={14} />Batal</button>}
        </div>
      </div>
    </div>
  );
}

// ── Experience CRUD ───────────────────────────────────────────────────────────
function ExperienceSection({ data, refetch }) {
  const empty = { company: '', position: '', period: '', duration: '', location: '', description: '', skills: '', type: 'Magang / PKL' };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (e) => {
    setEditing(e.id);
    setForm({ ...e, skills: (e.skills || []).join(', ') });
  };

  const cancel = () => { setEditing(null); setForm(empty); };

  const save = async () => {
    setLoading(true);
    const payload = { ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) };
    if (editing) await supabase.from('experience').update(payload).eq('id', editing);
    else await supabase.from('experience').insert(payload);
    cancel(); refetch(); setLoading(false);
  };

  const del = async (id) => {
    if (!confirm('Hapus pengalaman ini?')) return;
    await supabase.from('experience').delete().eq('id', id);
    refetch();
  };

  return (
    <div className="flex flex-col gap-4">
      {data.experience.map(e => (
        <div key={e.id || e.company} className="flex items-center justify-between bg-dark-700/60 border border-white/5 rounded-xl px-4 py-3">
          <div>
            <p className="text-white text-sm font-medium">{e.company}</p>
            <p className="text-slate-500 text-xs">{e.position} · {e.period}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => startEdit(e)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-500 hover:text-accent transition-all"><Pencil size={13} /></button>
            {e.id && <button onClick={() => del(e.id)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-slate-500 hover:text-red-400 transition-all"><Trash2 size={13} /></button>}
          </div>
        </div>
      ))}
      <div className="bg-dark-700/40 border border-accent/10 rounded-2xl p-5 flex flex-col gap-4 mt-2">
        <p className="text-accent text-sm font-semibold">{editing ? 'Edit Pengalaman' : 'Tambah Pengalaman'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Perusahaan"><input className={inputCls} value={form.company} onChange={e => set('company', e.target.value)} placeholder="Nama perusahaan" /></Field>
          <Field label="Posisi"><input className={inputCls} value={form.position} onChange={e => set('position', e.target.value)} placeholder="Posisi / Divisi" /></Field>
          <Field label="Periode"><input className={inputCls} value={form.period} onChange={e => set('period', e.target.value)} placeholder="Mar 2025 – Sep 2025" /></Field>
          <Field label="Durasi"><input className={inputCls} value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="7 Bulan" /></Field>
          <Field label="Lokasi"><input className={inputCls} value={form.location} onChange={e => set('location', e.target.value)} placeholder="Karawang, Jawa Barat" /></Field>
          <Field label="Tipe"><input className={inputCls} value={form.type} onChange={e => set('type', e.target.value)} placeholder="Magang / PKL" /></Field>
        </div>
        <Field label="Deskripsi"><textarea className={textareaCls} rows={3} value={form.description} onChange={e => set('description', e.target.value)} /></Field>
        <Field label="Skills (pisah koma)"><input className={inputCls} value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="Troubleshooting, Jaringan LAN" /></Field>
        <div className="flex gap-3">
          <button onClick={save} disabled={loading || !form.company}
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
            <Save size={14} />{loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          {editing && <button onClick={cancel} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all"><X size={14} />Batal</button>}
        </div>
      </div>
    </div>
  );
}

// ── Certificates CRUD ─────────────────────────────────────────────────────────
function CertificatesSection({ data, refetch }) {
  const empty = { title: '', issuer: '', year: '', expiry: '', credential_id: '', description: '', tags: '', file: '', credential_url: '' };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const startEdit = (c) => {
    setEditing(c.id);
    setForm({ ...c, credential_id: c.credentialId || '', tags: (c.tags || []).join(', '), credential_url: c.credentialUrl || '', file: c.file || '' });
  };

  const cancel = () => { setEditing(null); setForm(empty); };

  const save = async () => {
    setLoading(true);
    const payload = {
      title: form.title, issuer: form.issuer, year: form.year, expiry: form.expiry || null,
      credential_id: form.credential_id || null, description: form.description,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      file: form.file || null, credential_url: form.credential_url || null,
    };
    if (editing) await supabase.from('certificates').update(payload).eq('id', editing);
    else await supabase.from('certificates').insert(payload);
    cancel(); refetch(); setLoading(false);
  };

  const del = async (id) => {
    if (!confirm('Hapus sertifikat ini?')) return;
    await supabase.from('certificates').delete().eq('id', id);
    refetch();
  };

  return (
    <div className="flex flex-col gap-4">
      {data.certificates.map(c => (
        <div key={c.id || c.title} className="flex items-center justify-between bg-dark-700/60 border border-white/5 rounded-xl px-4 py-3">
          <div>
            <p className="text-white text-sm font-medium">{c.title}</p>
            <p className="text-slate-500 text-xs">{c.issuer} · {c.year}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => startEdit(c)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent/20 flex items-center justify-center text-slate-500 hover:text-accent transition-all"><Pencil size={13} /></button>
            {c.id && <button onClick={() => del(c.id)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-slate-500 hover:text-red-400 transition-all"><Trash2 size={13} /></button>}
          </div>
        </div>
      ))}
      <div className="bg-dark-700/40 border border-accent/10 rounded-2xl p-5 flex flex-col gap-4 mt-2">
        <p className="text-accent text-sm font-semibold">{editing ? 'Edit Sertifikat' : 'Tambah Sertifikat'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Judul"><input className={inputCls} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Nama sertifikat" /></Field>
          <Field label="Penerbit"><input className={inputCls} value={form.issuer} onChange={e => set('issuer', e.target.value)} placeholder="Dicoding Indonesia" /></Field>
          <Field label="Tahun Terbit"><input className={inputCls} value={form.year} onChange={e => set('year', e.target.value)} placeholder="Jan 2025" /></Field>
          <Field label="Berlaku Hingga"><input className={inputCls} value={form.expiry} onChange={e => set('expiry', e.target.value)} placeholder="Jan 2028" /></Field>
          <Field label="Credential ID"><input className={inputCls} value={form.credential_id} onChange={e => set('credential_id', e.target.value)} /></Field>
          <Field label="Credential URL"><input className={inputCls} value={form.credential_url} onChange={e => set('credential_url', e.target.value)} placeholder="https://..." /></Field>
          <Field label="Path File PDF"><input className={inputCls} value={form.file} onChange={e => set('file', e.target.value)} placeholder="/sertif/nama.pdf" /></Field>
          <Field label="Tags (pisah koma)"><input className={inputCls} value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="HTML, CSS, JavaScript" /></Field>
        </div>
        <Field label="Deskripsi"><textarea className={textareaCls} rows={2} value={form.description} onChange={e => set('description', e.target.value)} /></Field>
        <div className="flex gap-3">
          <button onClick={save} disabled={loading || !form.title}
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
            <Save size={14} />{loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          {editing && <button onClick={cancel} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-400 px-5 py-2.5 rounded-xl text-sm transition-all"><X size={14} />Batal</button>}
        </div>
      </div>
    </div>
  );
}

// ── Profile Section ───────────────────────────────────────────────────────────
function ProfileSection({ data, refetch }) {
  const p = data.profile;
  const [form, setForm] = useState({
    name: p.name || '', nickname: p.nickname || '', role: p.role || '',
    bio_id: p.bio || '', bio_en: p.bio_en || '', github: p.github || '',
    email: p.email || '', photo: p.photo || '',
    instagram_url: p.socials?.instagram?.url || '',
    instagram_username: p.socials?.instagram?.username || '',
    tiktok_url: p.socials?.tiktok?.url || '',
    tiktok_username: p.socials?.tiktok?.username || '',
    whatsapp_url: p.socials?.whatsapp?.url || '',
    whatsapp_username: p.socials?.whatsapp?.username || '',
    linkedin_url: p.socials?.linkedin?.url || '',
    linkedin_username: p.socials?.linkedin?.username || '',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setLoading(true);
    const { data: existing } = await supabase.from('profile').select('id').single();
    if (existing) {
      await supabase.from('profile').update(form).eq('id', existing.id);
    } else {
      await supabase.from('profile').insert(form);
    }
    refetch(); setLoading(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nama Lengkap"><input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} /></Field>
        <Field label="Nickname"><input className={inputCls} value={form.nickname} onChange={e => set('nickname', e.target.value)} /></Field>
        <Field label="Role / Prodi"><input className={inputCls} value={form.role} onChange={e => set('role', e.target.value)} /></Field>
        <Field label="Email"><input className={inputCls} value={form.email} onChange={e => set('email', e.target.value)} /></Field>
        <Field label="GitHub URL"><input className={inputCls} value={form.github} onChange={e => set('github', e.target.value)} /></Field>
        <Field label="Path Foto"><input className={inputCls} value={form.photo} onChange={e => set('photo', e.target.value)} placeholder="/foto.jpg" /></Field>
      </div>
      <Field label="Bio (Indonesia)"><textarea className={textareaCls} rows={2} value={form.bio_id} onChange={e => set('bio_id', e.target.value)} /></Field>
      <Field label="Bio (English)"><textarea className={textareaCls} rows={2} value={form.bio_en} onChange={e => set('bio_en', e.target.value)} /></Field>
      <p className="text-xs text-slate-600 uppercase tracking-widest pt-2">Media Sosial</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Instagram URL"><input className={inputCls} value={form.instagram_url} onChange={e => set('instagram_url', e.target.value)} /></Field>
        <Field label="Instagram Username"><input className={inputCls} value={form.instagram_username} onChange={e => set('instagram_username', e.target.value)} /></Field>
        <Field label="TikTok URL"><input className={inputCls} value={form.tiktok_url} onChange={e => set('tiktok_url', e.target.value)} /></Field>
        <Field label="TikTok Username"><input className={inputCls} value={form.tiktok_username} onChange={e => set('tiktok_username', e.target.value)} /></Field>
        <Field label="WhatsApp URL"><input className={inputCls} value={form.whatsapp_url} onChange={e => set('whatsapp_url', e.target.value)} /></Field>
        <Field label="WhatsApp Username"><input className={inputCls} value={form.whatsapp_username} onChange={e => set('whatsapp_username', e.target.value)} /></Field>
        <Field label="LinkedIn URL"><input className={inputCls} value={form.linkedin_url} onChange={e => set('linkedin_url', e.target.value)} /></Field>
        <Field label="LinkedIn Username"><input className={inputCls} value={form.linkedin_username} onChange={e => set('linkedin_username', e.target.value)} /></Field>
      </div>
      <button onClick={save} disabled={loading}
        className="flex items-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all w-fit">
        <Save size={14} />{saved ? 'Tersimpan ✓' : loading ? 'Menyimpan...' : 'Simpan Profil'}
      </button>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem('admin') === '1');
  const { data, refetch } = useData();

  const logout = () => { sessionStorage.removeItem('admin'); setLoggedIn(false); };
  const login = () => { sessionStorage.setItem('admin', '1'); setLoggedIn(true); };

  if (!loggedIn) return <LoginScreen onLogin={login} />;

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-dark-900/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-lg">Admin Panel</h1>
            <p className="text-slate-500 text-xs">Kelola konten portofolio</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-slate-500 hover:text-accent transition-colors">← Kembali ke porto</a>
            <button onClick={logout}
              className="flex items-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 px-4 py-2 rounded-xl text-xs transition-all">
              <LogOut size={13} /> Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-8 flex flex-col gap-4">
        <Section title="Profil" icon={<User size={16} />} defaultOpen>
          <ProfileSection data={data} refetch={refetch} />
        </Section>
        <Section title="Project" icon={<FolderOpen size={16} />}>
          <ProjectsSection data={data} refetch={refetch} />
        </Section>
        <Section title="Pengalaman" icon={<Briefcase size={16} />}>
          <ExperienceSection data={data} refetch={refetch} />
        </Section>
        <Section title="Sertifikat" icon={<Award size={16} />}>
          <CertificatesSection data={data} refetch={refetch} />
        </Section>
      </div>
    </div>
  );
}
