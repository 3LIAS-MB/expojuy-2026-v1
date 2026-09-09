export interface SocialPlatform {
  id: "whatsapp" | "instagram" | "facebook" | "tiktok";
  name: string;
  handle: string;
  url: string;
  qrUrl: string;
  qrImage?: string;
  actionText: string;
  color: string;
  brandBg: string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+54 9 388 4233539",
    url: "https://wa.me/5493884233539?text=Hola!%20Quiero%20informaci%C3%B3n%20sobre%20ExpoJuy%202026",
    qrUrl: "https://wa.me/5493884233539?text=Hola!%20Quiero%20informaci%C3%B3n%20sobre%20ExpoJuy%202026",
    actionText: "Chatear",
    color: "#25D366",
    brandBg: "bg-[#25D366]"
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@expojuy",
    url: "https://www.instagram.com/expojuy/",
    qrUrl: "https://www.instagram.com/expojuy/",
    qrImage: "/images/qrs/expojuy_qr_ig.png",
    actionText: "Seguir",
    color: "#E1306C",
    brandBg: "bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB]"
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "expojuy",
    url: "https://www.facebook.com/expojuy?locale=es_LA",
    qrUrl: "https://www.facebook.com/expojuy?locale=es_LA",
    actionText: "Seguir",
    color: "#1877F2",
    brandBg: "bg-[#1877F2]"
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@expojuy_oficial",
    url: "https://www.tiktok.com/@expojuy_oficial",
    qrUrl: "https://www.tiktok.com/@expojuy_oficial",
    actionText: "Seguir",
    color: "#000000",
    brandBg: "bg-black"
  }
];
