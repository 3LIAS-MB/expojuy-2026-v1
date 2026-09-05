"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, ChevronRight, Search } from "lucide-react";
import { NavItem } from "@/types/navigation";

interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export function MobileMenu({ items, isOpen, onClose, onOpenSearch }: MobileMenuProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [openSubItems, setOpenSubItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggleItem = (label: string) => {
    setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleSubItem = (label: string) => {
    setOpenSubItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div className="lg:hidden fixed inset-x-0 top-[73px] z-40 bg-white border-b border-gray-200 shadow-2xl max-h-[calc(100vh-73px)] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
      <div className="p-4 space-y-3">
        {items.map((item) => {
          const hasSub = item.subItems && item.subItems.length > 0;
          const isItemOpen = !!openItems[item.label];

          return (
            <div key={item.label} className="border-b border-gray-100 pb-2">
              <div className="flex items-center justify-between py-2">
                {hasSub ? (
                  <button
                    onClick={() => toggleItem(item.label)}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-800 text-base hover:text-emerald-600 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        isItemOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={onClose}
                    className="font-medium text-gray-800 text-base hover:text-emerald-600 transition-colors block w-full py-1"
                  >
                    {item.label}
                  </Link>
                )}
              </div>

              {/* Submenu Level 1 */}
              {hasSub && isItemOpen && (
                <div className="pl-4 mt-1 space-y-1.5 border-l-2 border-emerald-500/30 ml-2">
                  {item.subItems?.map((sub) => {
                    const hasChildren = sub.children && sub.children.length > 0;
                    const isSubOpen = !!openSubItems[sub.label];

                    return (
                      <div key={sub.label} className="py-1">
                        {hasChildren ? (
                          <div>
                            <button
                              onClick={() => toggleSubItem(sub.label)}
                              className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-emerald-600 py-1"
                            >
                              <span>{sub.label}</span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
                                  isSubOpen ? "rotate-180 text-emerald-600" : ""
                                }`}
                              />
                            </button>

                            {/* Submenu Level 2 */}
                            {isSubOpen && (
                              <div className="pl-3 mt-1 space-y-1 border-l border-gray-200">
                                {sub.children?.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    onClick={onClose}
                                    className="block text-xs font-normal text-gray-600 hover:text-emerald-600 py-1"
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            href={sub.href}
                            onClick={onClose}
                            className="block text-sm text-gray-700 hover:text-emerald-600 py-1"
                          >
                            {sub.label}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Action button & Search on Mobile */}
        <div className="pt-3 flex flex-col gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-100 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Buscar en el Sitio</span>
          </button>

          <Link
            href="/contact-us"
            onClick={onClose}
            className="group flex items-center overflow-hidden rounded-md shadow-md text-white font-bold text-sm uppercase tracking-wide transition-transform active:scale-95"
          >
            <div className="bg-purple-800 p-3 flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 px-4 py-3 flex-1 flex items-center justify-between">
              <span>CONSULTAR AHORA</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
