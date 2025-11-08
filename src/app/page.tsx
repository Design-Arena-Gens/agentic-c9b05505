'use client';

import { useMemo, useState } from 'react';
import { BuilderHeader } from '@/components/builder/BuilderHeader';
import { SectionPalette } from '@/components/builder/SectionPalette';
import { SectionList } from '@/components/builder/SectionList';
import { SectionEditor } from '@/components/builder/SectionEditor';
import { PreviewStage } from '@/components/builder/PreviewStage';
import { BuilderSection, SectionTemplate } from '@/lib/sections';
import { instantiateSection, duplicateSection } from '@/lib/builder';
import { moveItem } from '@/lib/utils';
import { ArrowUturnLeftIcon, ArrowUturnRightIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';

type HistoryState = {
  sections: BuilderSection[];
};

const INITIAL_SECTIONS: BuilderSection[] = [];

export default function Home() {
  const [sections, setSections] = useState<BuilderSection[]>(INITIAL_SECTIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryState[]>([{ sections: INITIAL_SECTIONS }]);
  const [future, setFuture] = useState<HistoryState[]>([]);

  const cloneSection = (section: BuilderSection): BuilderSection => ({
    ...section,
    content: Object.fromEntries(
      Object.entries(section.content).map(([key, value]) => [key, Array.isArray(value) ? [...value] : value])
    )
  });

  const snapshot = (items: BuilderSection[]): BuilderSection[] => items.map(cloneSection);

  const pushHistory = (nextSections: BuilderSection[]) => {
    setHistory((prev) => [...prev, { sections: snapshot(nextSections) }]);
    setFuture([]);
  };

  const handleAdd = (template: SectionTemplate) => {
    const next = [...sections, instantiateSection(template)];
    setSections(next);
    setSelectedId(next[next.length - 1].id);
    pushHistory(next);
  };

  const handleDuplicate = () => {
    if (!selectedId) return;
    const index = sections.findIndex((item) => item.id === selectedId);
    if (index === -1) return;
    const clone = duplicateSection(sections[index]);
    const next = [...sections];
    next.splice(index + 1, 0, clone);
    setSections(next);
    setSelectedId(clone.id);
    pushHistory(next);
  };

  const handleUpdate = (section: BuilderSection) => {
    const next = sections.map((item) => (item.id === section.id ? section : item));
    setSections(next);
  };

  const handleDelete = (id: string) => {
    const next = sections.filter((item) => item.id !== id);
    setSections(next);
    if (selectedId === id) {
      setSelectedId(next[next.length - 1]?.id ?? null);
    }
    pushHistory(next);
  };

  const handleMove = (id: string, direction: -1 | 1) => {
    const index = sections.findIndex((item) => item.id === id);
    if (index === -1) return;
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= sections.length) return;
    const next = moveItem(sections, index, nextIndex);
    setSections(next);
    pushHistory(next);
  };

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedId) ?? null,
    [sections, selectedId]
  );

  const canUndo = history.length > 1;
  const canRedo = future.length > 0;

  const handleUndo = () => {
    if (!canUndo) return;
    setHistory((prev) => {
      const snapshot = prev.slice(0, -1);
      const last = prev[prev.length - 1];
      setFuture((nextFuture) => [last, ...nextFuture]);
      const previous = snapshot[snapshot.length - 1];
      setSections(previous.sections.map(cloneSection));
      setSelectedId(previous.sections[previous.sections.length - 1]?.id ?? null);
      return snapshot;
    });
  };

  const handleRedo = () => {
    if (!canRedo) return;
    setFuture((prev) => {
      const [next, ...rest] = prev;
      if (!next) return prev;
      setHistory((historyPrev) => [...historyPrev, { sections: snapshot(next.sections) }]);
      setSections(next.sections.map(cloneSection));
      setSelectedId(next.sections[next.sections.length - 1]?.id ?? null);
      return rest;
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 pb-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 pt-10 md:px-12">
        <BuilderHeader sections={sections} />
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)_360px]">
          <aside className="flex flex-col gap-4">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-lg backdrop-blur">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">Sections</h2>
                <button
                  onClick={handleDuplicate}
                  title="Duplicate selected section"
                  className="rounded-xl border border-white/10 bg-slate-900/60 p-2 text-slate-300 transition hover:border-primary-400 hover:text-white"
                >
                  <SquaresPlusIcon className="h-4 w-4" />
                </button>
              </div>
              <SectionList
                sections={sections}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onMoveUp={(id) => handleMove(id, -1)}
                onMoveDown={(id) => handleMove(id, 1)}
                onDelete={handleDelete}
              />
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-lg backdrop-blur">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">
                Add new section
              </h2>
              <SectionPalette onAdd={handleAdd} />
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-lg backdrop-blur">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-300">History</h2>
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-primary-400 disabled:cursor-not-allowed disabled:border-white/5 disabled:text-slate-600"
                >
                  <ArrowUturnLeftIcon className="mb-0.5 mr-1 inline-block h-4 w-4" />
                  Undo
                </button>
                <button
                  onClick={handleRedo}
                  disabled={!canRedo}
                  className="flex-1 rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-primary-400 disabled:cursor-not-allowed disabled:border-white/5 disabled:text-slate-600"
                >
                  <ArrowUturnRightIcon className="mb-0.5 mr-1 inline-block h-4 w-4" />
                  Redo
                </button>
              </div>
            </div>
          </aside>
          <section className="flex flex-col gap-4">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl backdrop-blur">
              <PreviewStage sections={sections} />
            </div>
          </section>
          <aside className="flex flex-col gap-4">
            <SectionEditor section={selectedSection} onChange={handleUpdate} />
          </aside>
        </div>
      </div>
    </main>
  );
}
