import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rentify",
  description:
    "Streamline your rental property management with our comprehensive platform. Track properties, manage tenants, and handle maintenance requests all in one place.",
  keywords:
    "rental management, property management, tenant management, rental software",
  openGraph: {
    title: "Rental Property Management | Easy Rental Solutions",
    description:
      "Streamline your rental property management with our comprehensive platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen `}
      >
        <Nav />
        <main className="flex-1 flex flex-col">
          <ClientWrapper>{children}</ClientWrapper>
        </main>
        <Footer />
        {/* <FloatingButton /> */}
      </body>
    </html>
  );
}
