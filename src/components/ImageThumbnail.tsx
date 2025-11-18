"use client";

interface ImageThumbnailProps {
  images: string[];
  onClick: (e: React.MouseEvent) => void;
}

export function ImageThumbnail({ images, onClick }: ImageThumbnailProps) {
  if (!images || images.length === 0) return null;

  return (
    <div
      className="relative w-full md:w-80 h-52 cursor-pointer group"
      onClick={onClick}
    >
      {/* Main image */}
      <div className="absolute inset-0 rounded-lg overflow-hidden border border-gray-300 group-hover:border-[rgb(var(--secondary-color))] transition-all duration-300 shadow-md">
        <img
          src={`/${images[0]}`}
          alt="Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Stacked paper effect for multiple images */}
      {images.length > 1 && (
        <>
          <div
            className="absolute inset-0 rounded-lg border border-gray-200 bg-gray-50 transform -z-10 shadow-sm"
            style={{ transform: "rotate(3deg) translate(7px, 0px)" }}
          ></div>
          <div
            className="absolute inset-0 rounded-lg border border-gray-200 bg-gray-100 transform -z-20 shadow-sm"
            style={{ transform: "rotate(6deg) translate(11px, 4px)" }}
          ></div>

          {/* Image count badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-3 py-1.5 rounded-full">
            {images.length} images
          </div>
        </>
      )}
    </div>
  );
}
