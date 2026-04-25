import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DentaFlow",
  description: "Klinik Yönetim Sistemi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={geist.variable}>
      <body className="bg-[#0d0f18] text-slate-100 antialiased font-[var(--font-geist-sans)]">
        {children}
      </body>
    </html>
  );
}
