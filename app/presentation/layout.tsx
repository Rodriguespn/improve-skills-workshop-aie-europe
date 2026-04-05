import type { Metadata } from "next";
import { DM_Sans, Sora, Geist_Mono } from "next/font/google";
import "./presentation.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Level Up Your Skills — Workshop Slides",
  description:
    "Writing and testing agent skills, hands-on — AI Engineer Europe 2026",
};

export default function PresentationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="pres min-h-full flex flex-col">{children}</body>
    </html>
  );
}
