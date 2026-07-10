import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import GlobalCursor from "@/components/GlobalCursor";
import NavAnimation from "@/components/NavAnimation";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  // Only used for italic accents (mostly below the fold) — don't preload it so
  // it doesn't compete with the LCP headline's font (Space Grotesk) on load.
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TSBI – The Small Big Idea",
  description:
    "Strategic creative agency building brands that outthink the competition. We craft identities, campaigns, and digital experiences with cinematic ambition.",
  keywords: ["creative agency", "branding", "design", "TSBI", "advertising"],
  openGraph: {
    title: "TSBI – The Small Big Idea",
    description: "Strategic creative agency with cinematic ambition.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <GlobalCursor />
        <NavAnimation />
        <ScrollReveal />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
