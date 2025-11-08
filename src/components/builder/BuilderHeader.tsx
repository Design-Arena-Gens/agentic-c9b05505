'use client';

import { useMemo, useState } from 'react';
import { BuilderSection } from '@/lib/sections';
import { renderDocument } from '@/lib/html';
import { CheckIcon, ClipboardIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

type HeaderProps = {
  sections: BuilderSection[];
};

export function BuilderHeader({ sections }: HeaderProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const html = useMemo(() => renderDocument(sections), [sections]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy', error);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lightning-builder.html';
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 600);
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-lg backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-blue-500 text-slate-950 shadow-lg">
          <span className="text-lg font-black">LB</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-white">Lightning Builder</h1>
          <p className="text-xs text-slate-400">Compose marketing sites with modular sections and export-ready markup.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-primary-400 hover:text-primary-200"
        >
          {copied ? <CheckIcon className="h-4 w-4 text-emerald-300" /> : <ClipboardIcon className="h-4 w-4" />}
          Copy HTML
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-500 to-sky-400 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-lg transition hover:scale-[1.01]"
        >
          <ArrowDownTrayIcon className={downloading ? 'h-4 w-4 animate-bounce' : 'h-4 w-4'} />
          Download
        </button>
      </div>
    </header>
  );
}
