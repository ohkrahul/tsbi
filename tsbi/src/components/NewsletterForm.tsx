'use client';

import { useState } from 'react';

/** Footer newsletter signup — stores the email in the DB via /api/newsletter.
 *  `dark` styles the field for a dark background. */
export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setState('error');
      return;
    }
    setState('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      if (!res.ok) throw new Error('failed');
      setState('done');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p className="font-fb text-sm font-medium text-magenta" role="status">
        You&apos;re subscribed — welcome aboard.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className={`flex items-center gap-2 rounded-2xl border p-1.5 pl-4 transition-colors ${dark ? 'border-white/12 bg-white/[0.04] focus-within:border-magenta/60' : 'border-black/15 bg-white focus-within:border-magenta'}`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${dark ? 'text-white/40' : 'text-black/40'}`}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === 'error') setState('idle');
          }}
          placeholder="Enter your email"
          aria-label="Email address"
          className={`min-w-0 flex-1 bg-transparent py-2.5 font-fb text-sm outline-none ${dark ? 'text-white placeholder:text-white/40' : 'text-ink placeholder:text-black/40'}`}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          aria-label="Subscribe"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-linear-to-r from-[#e0197d] to-[#ff2d92] px-5 py-2.5 font-fm text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_6px_20px_-6px_rgba(224,25,125,0.8)] transition hover:brightness-110 disabled:opacity-60"
        >
          {state === 'loading' ? '…' : (
            <>
              Subscribe
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </>
          )}
        </button>
      </div>
      {state === 'error' && (
        <p className="mt-2 font-fb text-xs text-magenta" role="alert">
          Please enter a valid email and try again.
        </p>
      )}
    </form>
  );
}
