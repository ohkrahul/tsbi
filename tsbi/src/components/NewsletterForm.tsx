'use client';

import { useState } from 'react';

/** Footer newsletter signup — stores the email in the DB via /api/newsletter.
 *  `dark` switches the field styling for use over a dark background. */
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
      <div className={`flex overflow-hidden rounded-full border transition-colors focus-within:border-magenta ${dark ? 'border-white/25 bg-white/[0.06]' : 'border-black/15 bg-white'}`}>
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
          className={`min-w-0 flex-1 bg-transparent px-5 py-3 font-fb text-sm outline-none ${dark ? 'text-white placeholder:text-white/45' : 'text-ink placeholder:text-black/40'}`}
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          aria-label="Subscribe"
          className="flex shrink-0 items-center gap-2 bg-magenta px-5 py-3 font-fm text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#c4176e] disabled:opacity-60"
        >
          {state === 'loading' ? '…' : <>Subscribe <span aria-hidden>→</span></>}
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
