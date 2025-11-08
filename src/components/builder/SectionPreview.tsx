'use client';

import { BuilderSection, getTemplateById } from '@/lib/sections';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { classNames } from '@/lib/utils';

type PreviewProps = {
  section: BuilderSection;
};

export function SectionPreview({ section }: PreviewProps) {
  const template = getTemplateById(section.templateId);
  const content = section.content;

  const gradient = `bg-gradient-to-r ${template.accent}`;

  switch (template.id) {
    case 'hero':
      return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-12 text-center text-slate-50 shadow-2xl">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">
              <SparklesIcon className="h-4 w-4 text-sky-300" />
              {content.eyebrow as string}
            </span>
            <h1 className="font-semibold text-4xl md:text-5xl">{content.heading as string}</h1>
            <p className="text-lg text-slate-300">{content.subheading as string}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-2xl bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-900 transition duration-200 hover:bg-sky-300">
                {content.primaryCta as string}
              </button>
              <button className="rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-slate-50 transition duration-200 hover:border-white/60 hover:text-white">
                {content.secondaryCta as string}
              </button>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 translate-y-32 bg-gradient-to-t from-sky-500/10" />
        </section>
      );
    case 'feature-list': {
      const features = Array.isArray(content.features) ? (content.features as string[]) : [];
      return (
        <section className="rounded-3xl bg-slate-950/40 p-12 shadow-xl ring-1 ring-white/10 backdrop-blur">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-white">{content.heading as string}</h2>
            <p className="mt-3 text-base text-slate-300">{content.subheading as string}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, idx) => {
              const [title, detail] = feature.split('•').map((part) => part.trim());
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx }}
                  className="gradient-border relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/60 p-6"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-900">
                    <SparklesIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{title ?? feature}</h3>
                  <p className="mt-2 text-sm text-slate-300">{detail ?? 'Describe your value prop here.'}</p>
                </motion.div>
              );
            })}
          </div>
        </section>
      );
    }
    case 'cta':
      return (
        <section className={classNames('rounded-3xl p-12 text-center text-white shadow-xl', gradient)}>
          <h2 className="text-3xl font-semibold">{content.heading as string}</h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/80">{content.subheading as string}</p>
          <button className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]">
            {content.ctaLabel as string}
          </button>
        </section>
      );
    case 'pricing': {
      const plans = Array.isArray(content.plans) ? (content.plans as string[]) : [];
      return (
        <section className="rounded-3xl bg-slate-950/40 p-12 shadow-xl ring-1 ring-white/10 backdrop-blur">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-white">{content.heading as string}</h2>
            <p className="mt-3 text-base text-slate-300">{content.subheading as string}</p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {plans.map((plan, idx) => {
              const [title, price, detail] = plan.split('•').map((part) => part.trim());
              const highlight = idx === 1;
              return (
                <div
                  key={idx}
                  className={classNames(
                    'relative overflow-hidden rounded-3xl border border-white/10 p-8 transition',
                    highlight ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-2xl' : 'bg-slate-900/60 text-slate-100'
                  )}
                >
                  <h3 className="text-xl font-semibold">{title ?? plan}</h3>
                  <p className="mt-4 text-3xl font-bold">{price ?? ''}</p>
                  <p className="mt-3 text-sm text-slate-200/80">{detail ?? 'Add additional plan details.'}</p>
                  <button
                    className={classNames(
                      'mt-10 w-full rounded-2xl px-4 py-3 text-sm font-semibold transition',
                      highlight ? 'bg-white text-slate-900 hover:bg-slate-100' : 'bg-slate-100 text-slate-900 hover:bg-white'
                    )}
                  >
                    Select plan
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      );
    }
    case 'testimonials': {
      const quotes = Array.isArray(content.quotes) ? (content.quotes as string[]) : [];
      return (
        <section className="rounded-3xl bg-gradient-to-br from-orange-500 to-rose-500 p-12 text-white shadow-2xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold">{content.heading as string}</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {quotes.map((quote, idx) => {
              const [text, name, title] = quote.split('•').map((part) => part.trim());
              return (
                <blockquote key={idx} className="rounded-2xl border border-white/30 bg-white/10 p-6 backdrop-blur">
                  <p className="text-base">“{text ?? quote}”</p>
                  <footer className="mt-4 text-sm font-semibold">
                    {name ?? ''}
                    <span className="block text-xs font-normal text-white/80">{title ?? ''}</span>
                  </footer>
                </blockquote>
              );
            })}
          </div>
        </section>
      );
    }
    case 'faq': {
      const faqs = Array.isArray(content.faqs) ? (content.faqs as string[]) : [];
      return (
        <section className="rounded-3xl bg-slate-950/40 p-12 shadow-xl ring-1 ring-white/10 backdrop-blur">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-white">{content.heading as string}</h2>
          </div>
          <dl className="mt-10 space-y-4">
            {faqs.map((faq, idx) => {
              const [question, answer] = faq.split('•').map((part) => part.trim());
              return (
                <div key={idx} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <dt className="text-lg font-semibold text-white">{question ?? faq}</dt>
                  <dd className="mt-3 text-sm text-slate-300">{answer ?? ''}</dd>
                </div>
              );
            })}
          </dl>
        </section>
      );
    }
    case 'footer': {
      const links = Array.isArray(content.links) ? (content.links as string[]) : [];
      return (
        <footer className="rounded-3xl bg-slate-950 px-10 py-8 text-slate-300 shadow-inner ring-1 ring-white/10">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-base font-semibold text-white">{content.brand as string}</span>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {links.map((link, idx) => {
                const [label] = link.split('•').map((part) => part.trim());
                return (
                  <span key={idx} className="text-sky-300">
                    {label ?? link}
                  </span>
                );
              })}
            </div>
            <p className="text-xs text-slate-500">© {new Date().getFullYear()} {content.brand as string}. All rights reserved.</p>
          </div>
        </footer>
      );
    }
    default:
      return <div />;
  }
}
