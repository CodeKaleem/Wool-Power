import { SITE_CONFIG } from "@/config/site";

function normalizeWhatsAppNumber(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

export function getWhatsAppContactLink(prefilledText?: string): string {
  const number = normalizeWhatsAppNumber(SITE_CONFIG.whatsappNumber);
  const baseUrl = `https://wa.me/${number}`;

  if (!prefilledText) {
    return baseUrl;
  }

  return `${baseUrl}?text=${encodeURIComponent(prefilledText)}`;
}
