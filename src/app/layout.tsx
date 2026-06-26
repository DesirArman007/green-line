import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact/FloatingContact";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GreenLine | Drive Your Journey",
  description: "Rent the perfect car for every adventure with our wide range of well-maintained and reliable vehicles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
