import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – TSBI',
  description:
    'How The Small Big Idea Communications collects, uses, and protects the information you share with us.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-[880px] px-6 pb-28 pt-[clamp(120px,15vw,168px)] font-fb text-[#444]">
      <h1 className="mb-12 text-center font-fb text-3xl font-extrabold tracking-tight text-[#111] sm:text-4xl">
        Privacy Policy
      </h1>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">Our Commitment to Privacy:</h2>
        <p className="text-[15px] leading-7">
          Your privacy is important to us. To better protect your privacy, we provide this notice
          explaining our online information practices and the choices you can make about the way your
          information is collected and used. To make this notice easy to find, we make it available on
          our homepage and at every point where personally identifiable information may be requested.
        </p>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">The Information We Collect:</h2>
        <p className="text-[15px] leading-7">
          This policy applies to all information collected or submitted on the The Small Big Idea
          Communications website. On some pages, you can make requests and Contact us for business
          inquiries. The types of personal information collected at these pages are:
        </p>
        <ol className="mt-3 list-decimal space-y-1 pl-10 text-[15px] leading-7">
          <li>Name</li>
          <li>Company name</li>
          <li>Address</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Web address</li>
        </ol>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">The Way We Use Information:</h2>
        <p className="text-[15px] leading-7">
          We use the information you provide about yourself and your business to reply to your
          inquiries. We use return email addresses to answer the email we receive. Such addresses are
          not used for any other purpose and are not shared with outside parties. We use
          non-identifying and aggregate information to better design our website. For example, we track
          how frequently individual pages are visited as an indicator of interest levels in different
          service areas. We use aggregate data obtained through our Paid SEO &amp; SEM tools to research
          and compare search engines. Finally, we never use or share the personally identifiable
          information provided to us online in ways unrelated to the ones described above.
        </p>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">Our Commitment to Data Security:</h2>
        <p className="text-[15px] leading-7">
          To prevent unauthorized access, maintain data accuracy, and ensure the correct use of
          information, we have put in place appropriate physical, electronic, and managerial procedures
          to safeguard and secure the information we collect online.
        </p>
      </section>

      <section className="mb-9">
        <h2 className="mb-2 text-sm font-bold text-[#111]">How You Can Access or Correct Your Information:</h2>
        <p className="text-[15px] leading-7">
          You can request that we delete your information by emailing us.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-bold text-[#111]">How to Contact Us:</h2>
        <p className="text-[15px] leading-7">
          Should you have other questions or concerns about these privacy policies, email us at{' '}
          <a href="mailto:communication@tsbi.in" className="text-magenta underline-offset-2 hover:underline">
            communication@tsbi.in
          </a>
          .
        </p>
      </section>
    </main>
  );
}
