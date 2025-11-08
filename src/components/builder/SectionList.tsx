'use client';

import { BuilderSection, getTemplateById } from '@/lib/sections';
import { ArrowsUpDownIcon, ChevronUpIcon, ChevronDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import { classNames } from '@/lib/utils';

type SectionListProps = {
  sections: BuilderSection[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDelete: (id: string) => void;
};

export function SectionList({ sections, selectedId, onSelect, onMoveDown, onMoveUp, onDelete }: SectionListProps) {
  return (
    <div className="space-y-3">
      {sections.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-6 text-center text-sm text-slate-400">
          Pick a section to get started.
        </div>
      )}
      {sections.map((section, index) => {
        const template = getTemplateById(section.templateId);
        const isSelected = section.id === selectedId;
        return (
          <button
            key={section.id}
            onClick={() => onSelect(section.id)}
            className={classNames(
              'group flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition',
              isSelected ? 'border-primary-400 bg-slate-900 text-white shadow-inner' : 'border-white/10 bg-slate-900/60 text-slate-300 hover:border-white/30 hover:bg-slate-900'
            )}
          >
            <span className="flex items-center gap-3">
              <span className="rounded-xl border border-white/10 bg-slate-950 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-500">
                {template.name}
              </span>
              <span className="text-xs text-slate-400">
                #{index + 1}
              </span>
            </span>
            <span className="flex items-center gap-2 text-slate-400">
              <ArrowsUpDownIcon className="h-4 w-4" />
              <span className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                <ChevronUpIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveUp(section.id);
                  }}
                  className="h-4 w-4 cursor-pointer rounded-full border border-white/10 p-0.5 hover:border-white/40"
                />
                <ChevronDownIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveDown(section.id);
                  }}
                  className="h-4 w-4 cursor-pointer rounded-full border border-white/10 p-0.5 hover:border-white/40"
                />
                <TrashIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(section.id);
                  }}
                  className="h-4 w-4 cursor-pointer rounded-full border border-rose-500/30 p-0.5 text-rose-300 hover:border-rose-400 hover:text-rose-200"
                />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
