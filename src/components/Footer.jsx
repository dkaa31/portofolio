import React from 'react';
import { profile } from '../data/portfolio';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div>
          <p className="text-white font-bold text-lg">
            <span className="gradient-text">A</span>ljudika<span className="text-accent">.</span>
          </p>
        </div>
        <p className="text-slate-700 text-xs flex items-center gap-1.5">
        </p>
        <p className="text-slate-700 text-xs">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
