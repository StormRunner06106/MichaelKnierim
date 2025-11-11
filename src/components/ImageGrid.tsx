"use client";

interface ImageGridProps {
  images: string[];
  onImageClick: (index: number) => void;
}

export function ImageGrid({ images, onImageClick }: ImageGridProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-video rounded-lg overflow-hidden border border-gray-700 hover:border-[rgb(49,132,128)] transition-all duration-300 cursor-pointer group"
          onClick={() => onImageClick(index)}
        >
          <img
            src={`/${image}`}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ))}
    </div>
  );
}
