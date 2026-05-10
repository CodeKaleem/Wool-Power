import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Admin Portal | Wool Power",
  description: "Secure administrative portal.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="antialiased bg-gray-50">
      {children}
    </main>
  );
}
