'use client';

import { BuilderSection, getTemplateById, SectionField } from '@/lib/sections';
import { useMemo } from 'react';

type SectionEditorProps = {
  section: BuilderSection | null;
  onChange: (section: BuilderSection) => void;
};

function FieldInput({
  field,
  value,
  onChange
}: {
  field: SectionField;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}) {
  if (field.type === 'text') {
    const rows = field.rows ?? (field.key === 'subheading' || field.key === 'heading' ? 3 : 2);
    return (
      <label className="flex flex-col gap-2 text-sm text-slate-300">
        <span className="font-medium text-white/80">{field.label}</span>
        <textarea
          rows={rows}
          placeholder={field.placeholder}
          value={(value as string) ?? ''}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white/90 shadow-inner transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
        />
      </label>
    );
  }

  const listValue = Array.isArray(value) ? value : [];
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-white/80">{field.label}</span>
      <div className="flex flex-col gap-3">
        {listValue.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-slate-900/40 p-3">
            <textarea
              rows={field.maxItems && field.maxItems > 3 ? 3 : 2}
              value={item}
              placeholder={field.itemPlaceholder}
              onChange={(event) => {
                const updated = [...listValue];
                updated[index] = event.target.value;
                onChange(updated);
              }}
              className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white/90 shadow-inner transition focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const updated = listValue.filter((_, idx) => idx !== index);
                  onChange(updated);
                }}
                className="rounded-xl border border-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-300 transition hover:border-rose-300 hover:text-rose-100"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          if (field.maxItems && listValue.length >= field.maxItems) return;
          onChange([...listValue, '']);
        }}
        className="mt-1 inline-flex items-center justify-center rounded-2xl border border-dashed border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-300 transition hover:border-primary-400 hover:text-white"
      >
        Add item
      </button>
    </div>
  );
}

export function SectionEditor({ section, onChange }: SectionEditorProps) {
  const template = useMemo(() => {
    if (!section) return null;
    return getTemplateById(section.templateId);
  }, [section]);

  if (!section || !template) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 bg-slate-900/30">
        <p className="text-sm text-slate-400">Select a section to customize its content.</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.3em] text-primary-300">Editing</p>
        <h2 className="text-xl font-semibold text-white">{template.name}</h2>
        <p className="text-xs text-slate-400">{template.description}</p>
      </header>
      <div className="flex flex-col gap-5 overflow-y-auto pr-1">
        {template.fields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            value={section.content[field.key] ?? (field.type === 'list' ? [] : '')}
            onChange={(value) =>
              onChange({
                ...section,
                content: {
                  ...section.content,
                  [field.key]: value
                }
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
