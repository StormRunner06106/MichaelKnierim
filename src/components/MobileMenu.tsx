"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

interface MobileMenuProps {
  navigation: Array<{ href: string; label: string }>;
}

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden p-2 transition-colors relative z-[70] ${
          isOpen
            ? "text-white hover:text-[rgb(var(--secondary-color))]"
            : "text-gray-600 hover:text-[rgb(var(--secondary-color))]"
        }`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[60] md:hidden transition-opacity duration-300 ${
              isAnimating ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backdropFilter: "blur(15px) saturate(180%)",
              WebkitBackdropFilter: "blur(15px) saturate(180%)",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }}
          />

          {/* Menu content */}
          <div
            className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[61] md:hidden transition-all duration-300 ${
              isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="flex flex-col items-center justify-center w-full h-full space-y-8 px-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleClose}
                  className={`text-2xl font-medium hover:text-[rgb(var(--secondary-color))] transition-all duration-300 ${
                    isAnimating
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    color: "white",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
