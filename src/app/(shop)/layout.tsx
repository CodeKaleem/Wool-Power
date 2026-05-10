import type { Metadata } from "next";
import "../globals.css";
import LoadingPage from "@/components/LoadingPage";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";
import { SEO_KEYWORDS, SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: `${SITE_CONFIG.name} | Premium Handmade Crochet`,
  description: SITE_CONFIG.description,
  keywords: [...SEO_KEYWORDS],
  openGraph: {
    title: `${SITE_CONFIG.name} | Premium Handmade Crochet`,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/logo.svg",
        width: 800,
        height: 600,
        alt: "Wool Power brand logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Premium Handmade Crochet`,
    description: SITE_CONFIG.description,
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <LoadingPage />
          <Header />
          <BackButton />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
