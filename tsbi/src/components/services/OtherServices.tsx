import Link from 'next/link';

/* The services — used to show "other services" pills in each service-page CTA. */
const SERVICES = [
  { id: 'content-production',     label: 'Content Production' },
  { id: 'digital-transformation', label: 'Digital Transformation' },
  { id: 'influencer-management',  label: 'Influencer Management' },
  { id: 'social-media',           label: 'Social Media' },
];

/** Pill links to every service except `current`. Styled for dark/colored CTA backgrounds. */
export default function OtherServices({ current }: { current: string }) {
  const others = SERVICES.filter((s) => s.id !== current);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      {/* All styling lives in the class so :hover (white fill + magenta text) actually
          overrides — inline styles would beat the hover rule and hide the text. */}
      <style>{`
        .osvc-pill {
          display: inline-flex; align-items: center;
          font-family: var(--fm);
          font-size: 10px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
          color: #fff; text-decoration: none; white-space: nowrap;
          border: 1px solid rgba(255,255,255,0.45); border-radius: 100px;
          padding: 13px 22px;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
        }
        .osvc-pill:hover { background: #fff; color: #e0197d; border-color: #fff; }
      `}</style>
      {others.map((s) => (
        <Link key={s.id} href={`/services/${s.id}`} className="osvc-pill">
          {s.label}
        </Link>
      ))}
    </div>
  );
}
