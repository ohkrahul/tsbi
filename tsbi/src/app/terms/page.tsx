import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use – TSBI',
  description:
    'The terms that govern your use of The Small Big Idea Communications website.',
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-[880px] px-6 pb-28 pt-[clamp(120px,15vw,168px)] font-fb text-[#444]">
      <h1 className="mb-12 text-center font-fb text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">
        Terms of Use
      </h1>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">Acceptance of Terms:</h2>
        <p className="text-[15px] leading-7">
          By accessing or using the The Small Big Idea Communications website, you agree to be bound by
          these Terms of Use. If you do not agree with any part of these terms, please discontinue use of
          the website.
        </p>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">Use of the Website:</h2>
        <p className="text-[15px] leading-7">
          You agree to use this website only for lawful purposes and in a way that does not infringe the
          rights of, restrict, or inhibit anyone else&apos;s use of the website. The content provided here
          is for general information about our services and may be updated or changed at any time without
          notice.
        </p>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">Intellectual Property:</h2>
        <p className="text-[15px] leading-7">
          All content on this website — including text, graphics, logos, images, and creative work — is
          the property of The Small Big Idea Communications or its clients and partners, and is protected
          by applicable intellectual-property laws. It may not be reproduced or reused without prior
          written permission.
        </p>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">Limitation of Liability:</h2>
        <p className="text-[15px] leading-7">
          The website and its content are provided on an &quot;as is&quot; basis. While we make every
          effort to keep information accurate and up to date, we make no warranties of any kind and are
          not liable for any loss arising from the use of, or reliance on, this website.
        </p>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">Changes to These Terms:</h2>
        <p className="text-[15px] leading-7">
          We may revise these Terms of Use from time to time. Continued use of the website after any
          change constitutes your acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-bold text-[#111]">How to Contact Us:</h2>
        <p className="text-[15px] leading-7">
          Should you have any questions about these terms, email us at{' '}
          <a href="mailto:communication@tsbi.in" className="text-magenta underline-offset-2 hover:underline">
            communication@tsbi.in
          </a>
          .
        </p>
      </section>
    </main>
  );
}
