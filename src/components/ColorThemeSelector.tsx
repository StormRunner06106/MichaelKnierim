"use client";

import { useState, useEffect, useRef } from "react";
import { Palette } from "lucide-react";

interface ColorTheme {
  name: string;
  color: string;
}

const colorThemes: ColorTheme[] = [
  { name: "Teal", color: "49, 132, 128" },
  { name: "Blue", color: "59, 130, 246" },
  { name: "Purple", color: "168, 85, 247" },
  { name: "Pink", color: "236, 72, 153" },
  { name: "Orange", color: "249, 115, 22" },
  { name: "Green", color: "34, 197, 94" },
  { name: "Red", color: "239, 68, 68" },
  { name: "Yellow", color: "234, 179, 8" },
];

export function ColorThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(colorThemes[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (theme: ColorTheme) => {
    setSelectedTheme(theme);
    setIsOpen(false);

    // Update CSS variable for secondary color
    document.documentElement.style.setProperty(
      "--secondary-color",
      theme.color
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <Palette size={18} className="text-gray-400" />
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: `rgb(${selectedTheme.color})` }}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50 py-2">
          {colorThemes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleThemeChange(theme)}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-gray-600"
                style={{ backgroundColor: `rgb(${theme.color})` }}
              />
              <span className="text-gray-300 text-sm">{theme.name}</span>
              {selectedTheme.name === theme.name && (
                <span className="ml-auto text-gray-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
