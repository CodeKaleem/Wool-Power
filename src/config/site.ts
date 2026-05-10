export const SITE_CONFIG = {
  name: "Wool Power",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description:
    "Premium handmade crochet collections for modern homes and fashion-forward brands.",
  adminEmail: process.env.ADMIN_EMAIL || "admin@woolpower.com",
  whatsappNumber: process.env.WHATSAPP_ADMIN_NUMBER || "923123456789",
} as const;

export const SEO_KEYWORDS = [
  "crochet",
  "handmade",
  "fashion",
  "wool",
  "premium clothing",
  "home decor",
  "artisan products",
] as const;
