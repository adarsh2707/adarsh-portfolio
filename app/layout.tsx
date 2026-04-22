import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adarsh Sathyanarayanan | Data Engineer & Business Analyst",
  description:
    "Portfolio of Adarsh Sathyanarayanan — data engineer, business analyst, and supply chain analytics professional based in Boston, MA. MS in Business Analytics (GPA 4.0) at UMass Boston. 3.5 years delivering ETL pipelines, Power BI dashboards, and AI-driven analytics platforms for global clients.",
  keywords: [
    "data engineer",
    "business analyst",
    "supply chain analytics",
    "Power BI",
    "ETL pipelines",
    "Python",
    "FastAPI",
    "Boston",
    "UMass Boston",
    "Adarsh Sathyanarayanan",
  ],
  authors: [{ name: "Adarsh Sathyanarayanan" }],
  openGraph: {
    title: "Adarsh Sathyanarayanan | Data Engineer & Business Analyst",
    description:
      "3.5 years delivering end-to-end analytics across supply chain, logistics, and financial operations. MS in Business Analytics (GPA 4.0) at UMass Boston.",
    type: "website",
    url: "https://adarsh-portfolio-theta.vercel.app",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
