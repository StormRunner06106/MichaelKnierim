"use client";

interface ImageThumbnailProps {
  images: string[];
  onClick: (e: React.MouseEvent) => void;
}

export function ImageThumbnail({ images, onClick }: ImageThumbnailProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-80 h-52 cursor-pointer group" onClick={onClick}>
      {/* Main image */}
      <div className="absolute inset-0 rounded-lg overflow-hidden border border-gray-700 group-hover:border-[rgb(49,132,128)] transition-all duration-300 shadow-lg">
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
            className="absolute inset-0 rounded-lg border border-gray-700 bg-gray-800 transform -z-10"
            style={{ transform: "rotate(3deg) translate(7px, 0px)" }}
          ></div>
          <div
            className="absolute inset-0 rounded-lg border border-gray-700 bg-gray-900 transform -z-20"
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
