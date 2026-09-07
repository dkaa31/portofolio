import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import * as fallback from '../data/portfolio';

export function usePortfolioData() {
  const [data, setData] = useState({
    profile: fallback.profile,
    projects: fallback.projects,
    skills: fallback.skills,
    experience: fallback.experience,
    certificates: fallback.certificates,
  });
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      if (!supabase) throw new Error('Supabase not configured');

      const [profileRes, projectsRes, experienceRes, certsRes] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('projects').select('*').order('created_at'),
        supabase.from('experience').select('*').order('created_at'),
        supabase.from('certificates').select('*').order('created_at'),
      ]);

      setData({
        profile: profileRes.data ? mapProfile(profileRes.data) : fallback.profile,
        projects: projectsRes.data?.length ? projectsRes.data.map(mapProject) : fallback.projects,
        skills: fallback.skills, // skills tetap dari file (jarang berubah)
        experience: experienceRes.data?.length ? experienceRes.data.map(mapExperience) : fallback.experience,
        certificates: certsRes.data?.length ? certsRes.data.map(mapCertificate) : fallback.certificates,
      });
    } catch (e) {
      console.warn('Supabase fetch failed, using fallback data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  return { data, loading, refetch: fetchAll };
}

// ── Mappers ─────────────────────────────────────────────────────────────────

function mapProfile(d) {
  return {
    name: d.name,
    nickname: d.nickname,
    role: d.role,
    bio: d.bio_id,
    bio_en: d.bio_en,
    github: d.github,
    email: d.email,
    photo: d.photo,
    socials: {
      instagram: { url: d.instagram_url, username: d.instagram_username },
      tiktok:    { url: d.tiktok_url,    username: d.tiktok_username },
      whatsapp:  { url: d.whatsapp_url,  username: d.whatsapp_username },
      linkedin:  { url: d.linkedin_url,  username: d.linkedin_username },
    },
  };
}

function mapProject(d) {
  return {
    id: d.id,
    title: d.title,
    description: d.description,
    tech: d.tech || [],
    github: d.github,
    liveUrl: d.live_url,
    downloadUrl: d.download_url,
    images: d.images || [],
    category: d.category,
  };
}

function mapExperience(d) {
  return {
    id: d.id,
    company: d.company,
    position: d.position,
    period: d.period,
    duration: d.duration,
    location: d.location,
    description: d.description,
    skills: d.skills || [],
    type: d.type,
  };
}

function mapCertificate(d) {
  return {
    id: d.id,
    title: d.title,
    issuer: d.issuer,
    year: d.year,
    expiry: d.expiry,
    credentialId: d.credential_id,
    description: d.description,
    tags: d.tags || [],
    file: d.file,
    credentialUrl: d.credential_url,
  };
}
