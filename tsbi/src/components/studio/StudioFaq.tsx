'use client';

import { useState } from 'react';
import { STUDIO_FAQ } from './studioContent';

/**
 * The only interactive island on /studio — a lowercase-display FAQ accordion. Colors read
 * the `--sec-*` tokens set by the enclosing `.st-light` section, so it themes automatically.
 */
export default function StudioFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-[900px]">
      {STUDIO_FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-t border-[var(--sec-line)] last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
            >
              <span className="st-display text-[clamp(19px,3vw,32px)] leading-[1.15]" style={{ color: 'var(--sec-fg)' }}>
                {item.q}
              </span>
              <span
                aria-hidden
                className="shrink-0 text-3xl font-light leading-none text-magenta transition-transform duration-300"
                style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[680px] pb-6 text-[15px] font-light leading-[1.75]" style={{ color: 'var(--sec-muted)' }}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
