import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/caseStudies';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <section className="cs-hero">
        <div
          className="cs-hero-visual"
          style={{
            backgroundImage: `url(${study.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="cs-hero-bg" />

        <div className="cs-tags">
          <span className="cs-tag">{study.category}</span>
          <span className="cs-tag">{study.year}</span>
        </div>
        <h1 className="cs-title">{study.title}</h1>
        <p className="cs-client">{study.clientName}</p>
      </section>

      <section className="cs-info-row">
        <div className="cs-ic">
          <div className="cs-ic-label">Client</div>
          <div className="cs-ic-val">{study.clientName}</div>
        </div>
        <div className="cs-ic">
          <div className="cs-ic-label">Year</div>
          <div className="cs-ic-val">{study.year}</div>
        </div>
        <div className="cs-ic">
          <div className="cs-ic-label">Category</div>
          <div className="cs-ic-val">{study.category}</div>
        </div>
        <div className="cs-ic">
          <div className="cs-ic-label">Services</div>
          <div className="cs-ic-val">{study.services.join(', ')}</div>
        </div>
        <div className="cs-ic">
          <div className="cs-ic-label">Overview</div>
          <div className="cs-ic-val">{study.shortDescription}</div>
        </div>
      </section>

      <section className="cs-concept">
        <div className="cs-concept-text">
          <h2 className="cs-concept-h2">
            Brand Story <em>and Execution</em>
          </h2>
          <p className="cs-concept-body">{study.shortDescription}</p>
          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/case-studies" className="btn-border">
              ← Case Studies
            </Link>
            <Link href="/clients" className="btn-border" style={{ borderColor: 'var(--magenta)', color: 'var(--magenta)' }}>
              Our Clients →
            </Link>
          </div>
        </div>

        <div className="cs-concept-img">
          <Image
            src={study.image}
            alt={study.clientName}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      </section>
    </main>
  );
}
