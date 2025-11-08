'use client';

import { sectionTemplates, SectionTemplate } from '@/lib/sections';
import { PlusIcon } from '@heroicons/react/24/outline';

type PaletteProps = {
  onAdd: (template: SectionTemplate) => void;
};

export function SectionPalette({ onAdd }: PaletteProps) {
  return (
    <div className="flex flex-col gap-4">
      {sectionTemplates.map((template) => (
        <button
          key={template.id}
          onClick={() => onAdd(template)}
          className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-left transition hover:border-white/30 hover:bg-slate-900"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-700 text-slate-300 group-hover:from-primary-500 group-hover:to-sky-400 group-hover:text-slate-900">
            <PlusIcon className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">{template.name}</p>
            <p className="text-xs text-slate-400">{template.description}</p>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500">
            {template.id}
          </span>
        </button>
      ))}
    </div>
  );
}
