'use client';

import { BuilderSection } from '@/lib/sections';
import { SectionPreview } from './SectionPreview';

type PreviewStageProps = {
  sections: BuilderSection[];
};

export function PreviewStage({ sections }: PreviewStageProps) {
  return (
    <div className="space-y-8">
      {sections.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-slate-900/40 text-center text-sm text-slate-400">
          <p>Your live preview will appear here.</p>
          <p className="mt-1 text-xs text-slate-500">Add sections to compose your page.</p>
        </div>
      ) : (
        sections.map((section) => <SectionPreview key={section.id} section={section} />)
      )}
    </div>
  );
}
