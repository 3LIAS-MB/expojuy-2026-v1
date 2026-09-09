"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navigationConfig } from "@/config/navigation";
import { SearchModal } from "./SearchModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* EXPO JUJUY Main Header Container with increased height & prominent logo */}
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-all duration-200 ${
          isScrolled ? "shadow-md border-b border-black/10" : "border-b border-black/10"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between h-[95px] sm:h-[105px]">
          
          {/* 1. EXPO JUJUY OFFICIAL LOGO (Large & Prominent) */}
          <div className="flex-shrink-0 flex items-center py-2">
            <Link href="/" className="inline-block hover:opacity-95 transition-opacity">
              <Image
                src="/images/LOGO.png"
                alt="ExpoJuy - Conectando Países, Creando Oportunidades"
                width={260}
                height={80}
                priority
                className="h-[58px] sm:h-[68px] md:h-[74px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* 2. RIGHT SIDE GROUP: NAV MENU + SEARCH + ENQUIRE BUTTON */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-9">
            
            {/* Navigation Menu */}
            <nav className="flex items-center space-x-6 xl:space-x-8">
              {navigationConfig.map((item) => {
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const isOpen = activeDropdown === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative py-8"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => {
                      setActiveDropdown(null);
                      setActiveSubDropdown(null);
                    }}
                  >
                    <Link
                      href={item.href || "#"}
                      className="flex items-center text-[15px] font-bold text-black hover:text-[#5E009D] transition-colors"
                    >
                      <span>{item.label}</span>
                      {hasSubItems && (
                        <span className="ml-1.5 inline-flex items-center">
                          {/* Exact Chevron Down SVG from Singapore EXPO */}
                          <svg
                            aria-hidden="true"
                            className={`w-3 h-3 fill-black transition-transform duration-200 ${
                              isOpen ? "rotate-180 fill-[#5E009D]" : ""
                            }`}
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                          </svg>
                        </span>
                      )}
                    </Link>

                    {/* Level 1 Submenu with exact #5E009D top border */}
                    {hasSubItems && isOpen && (
                      <div className="absolute left-0 top-[100%] z-50 min-w-[210px] bg-white shadow-xl border-t-4 border-[#5E009D] rounded-b-sm py-2 px-0 animate-in fade-in duration-150">
                        <ul className="space-y-0.5">
                          {item.subItems?.map((sub) => {
                            const hasChildren = sub.children && sub.children.length > 0;
                            const isSubOpen = activeSubDropdown === sub.label;

                            return (
                              <li
                                key={sub.label}
                                className="relative group/sub px-4 py-2 border-b border-gray-100 last:border-none"
                                onMouseEnter={() => hasChildren && setActiveSubDropdown(sub.label)}
                                onMouseLeave={() => hasChildren && setActiveSubDropdown(null)}
                              >
                                {hasChildren ? (
                                  <div className="flex items-center justify-between text-[14px] font-normal text-gray-900 hover:text-[#5E009D] cursor-pointer transition-colors">
                                    <span>{sub.label}</span>
                                    <span className="text-[13px] font-bold text-gray-400">›</span>
                                  </div>
                                ) : (
                                  <Link
                                    href={sub.href}
                                    className="flex items-center justify-between text-[14px] font-normal text-gray-900 hover:text-[#5E009D] transition-colors"
                                  >
                                    <span>{sub.label}</span>
                                    <span className="text-[13px] font-bold text-gray-400 group-hover/sub:translate-x-1 transition-transform">›</span>
                                  </Link>
                                )}

                                {/* Level 2 Submenu */}
                                {hasChildren && isSubOpen && (
                                  <div className="absolute left-full top-0 ml-0.5 min-w-[200px] bg-white shadow-xl border-t-4 border-[#5E009D] rounded-b-sm py-2 px-0 animate-in fade-in duration-150">
                                    <ul className="space-y-0.5">
                                      {sub.children?.map((child) => (
                                        <li key={child.label} className="px-4 py-2 border-b border-gray-100 last:border-none">
                                          <Link
                                            href={child.href}
                                            className="flex items-center justify-between text-[14px] font-normal text-gray-900 hover:text-[#5E009D] transition-colors"
                                          >
                                            <span>{child.label}</span>
                                            <span className="text-[13px] font-bold text-gray-400">›</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Exact Search Icon SVG (#F8BF00) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none ml-2"
              aria-label="Search"
              title="Buscar"
            >
              <svg
                aria-hidden="true"
                className="w-[22px] h-[22px] fill-[#F8BF00]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
              </svg>
            </button>

            {/* Exact ENQUIRE NOW Button Image from Singapore EXPO */}
            <Link
              href="/contact-us"
              className="inline-block hover:opacity-95 transition-opacity"
            >
              <Image
                src="/images/Nav-Menu-State-Desktop.png"
                alt="ENQUIRE NOW"
                width={172}
                height={44}
                className="h-[42px] w-auto object-contain"
                priority
              />
            </Link>

          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 cursor-pointer"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 fill-[#F8BF00]"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
              </svg>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 text-black focus:outline-none"
              aria-label="Menu"
            >
              <svg
                aria-hidden="true"
                className="w-7 h-7 fill-black"
                viewBox="0 0 448 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[95px] bg-white border-b border-black/10 shadow-2xl z-50 p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            {navigationConfig.map((item) => (
              <div key={item.label} className="border-b border-gray-100 pb-3">
                <Link
                  href={item.href || "#"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-bold text-black hover:text-[#5E009D]"
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <div className="pl-3 mt-2 space-y-2 border-l-2 border-[#5E009D]">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-sm font-normal text-gray-700 hover:text-[#5E009D]"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/contact-us"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center"
              >
                <Image
                  src="/images/Nav-Menu-State-Desktop.png"
                  alt="ENQUIRE NOW"
                  width={180}
                  height={46}
                  className="h-[44px] w-auto mx-auto object-contain"
                />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
