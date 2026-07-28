import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mamikos - Cari, Bayar, & Sewa Kost Impianmu Secara Online",
  description:
    "Cari kos dan apartemen di seluruh Indonesia. Ribuan kos putra, putri, dan campur dengan harga transparan, foto asli, dan sewa langsung dari aplikasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${lato.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
