"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { WHATSAPP_NUMBER } from "@/lib/site";

const logoFont = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["600"],
  display: "swap",
});

const NAV_LINKS = [
  { label: "Kategoriler", href: "#urunler" },
  { label: "Hakkımızda", href: "#hakkimizda" },
  { label: "İletişim", href: "#iletisim" },
];

const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Merhaba, Doğan Spot'tan bilgi almak istiyorum.",
)}`;

/**
 * Doğan Spot monogramı: koyu kahve zemin üzerinde krem "D" harfi,
 * D'nin içinde aynı çizgi kalınlığına yakın "S" harfi.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Zemin */}
      <rect
        x="0.75"
        y="0.75"
        width="46.5"
        height="46.5"
        rx="11.25"
        fill="#2C1A1D"
        stroke="#8D6E63"
        strokeWidth="1.5"
      />
      {/* D */}
      <path
        d="M14 11.5h8.5c7.2 0 12.5 5.2 12.5 12.5s-5.3 12.5-12.5 12.5H14v-25Z"
        stroke="#F5EBE0"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* S */}
      <path
        d="M28.5 19.2c-1.1-1.7-2.9-2.6-5-2.6-2.9 0-4.7 1.5-4.7 3.5 0 5.2 10.4 2.6 10.4 8 0 2.2-2 3.8-5 3.8-2.4 0-4.4-.9-5.7-2.6"
        stroke="#F5EBE0"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Logo ikonu + "Doğan Spot" yazısı: iki kelime aynı font, ağırlık ve renkte. */
export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span
        className={`${logoFont.className} text-[1.3rem] font-semibold leading-none tracking-[-0.01em] text-[#F5EBE0]`}
      >
        Doğan Spot
      </span>
    </span>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-current"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Kaydırınca header'a gölge ekle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobil menü açıkken Escape ile kapat
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5EBE0]";

  return (
    <header
      className={`sticky top-0 z-40 bg-[#2C1A1D] text-[#F5EBE0] transition-shadow ${
        scrolled || open ? "shadow-[0_10px_24px_-14px_rgba(0,0,0,0.6)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 md:h-[72px]">
        <a
          href="#"
          aria-label="Doğan Spot ana sayfa"
          onClick={() => setOpen(false)}
          className={`rounded-lg ${focusRing}`}
        >
          <Logo />
        </a>

        {/* Masaüstü menü */}
        <nav
          aria-label="Ana menü"
          className="ml-auto mr-2 hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium text-[#F5EBE0]/80 transition-colors hover:bg-[#F5EBE0]/10 hover:text-[#F5EBE0] ${focusRing}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl bg-[#F5EBE0] px-4 py-2.5 text-sm font-semibold text-[#2C1A1D] transition-colors hover:bg-white ${focusRing}`}
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">WhatsApp ile Ulaşın</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {/* Mobil menü düğmesi */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobil-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#F5EBE0] hover:bg-[#F5EBE0]/10 md:hidden ${focusRing}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-current"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobil menü paneli */}
      {open && (
        <div
          id="mobil-menu"
          className="border-t border-[#F5EBE0]/10 bg-[#2C1A1D] md:hidden"
        >
          <nav
            aria-label="Mobil menü"
            className="mx-auto flex max-w-6xl flex-col px-4 py-3"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3.5 text-base font-medium text-[#F5EBE0] hover:bg-[#F5EBE0]/10 ${focusRing}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={`mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5EBE0] px-4 py-3.5 text-base font-semibold text-[#2C1A1D] hover:bg-white ${focusRing}`}
            >
              <WhatsAppIcon />
              WhatsApp ile Ulaşın
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
