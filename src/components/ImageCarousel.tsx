"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function ImageCarousel({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [initialIndex, isOpen]);

  // Disable body scroll when carousel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white hover:text-[rgb(var(--secondary-color))] transition-colors z-10 cursor-pointer"
      >
        <X size={32} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 p-2 text-white hover:text-[rgb(var(--secondary-color))] transition-colors z-10 cursor-pointer"
        disabled={images.length <= 1}
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 p-2 text-white hover:text-[rgb(var(--secondary-color))] transition-colors z-10 cursor-pointer"
        disabled={images.length <= 1}
      >
        <ChevronRight size={48} />
      </button>

      <div
        className="w-full px-16 flex flex-col items-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={currentIndex}
          src={`/${images[currentIndex]}`}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-[85vw] max-h-[85vh] w-auto h-auto object-contain animate-in fade-in zoom-in-95 duration-200"
        />
        <div className="text-center text-white mt-4 text-lg">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
