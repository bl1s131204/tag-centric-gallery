
import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Download, Heart, Info } from "lucide-react";

type ViewerProps = {
  open: boolean;
  onClose: () => void;
  images: { filename: string; url: string }[];
  idx: number;
  onNext: () => void;
  onPrevious: () => void;
};

export const FullscreenViewer: React.FC<ViewerProps> = ({
  open, onClose, images, idx, onNext, onPrevious
}) => {
  const img = images[idx];
  const hasNext = idx < images.length - 1;
  const hasPrevious = idx > 0;

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (hasNext) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, hasNext, hasPrevious, onClose, onNext, onPrevious]);

  if (!open || !img) return null;

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-white">
              <h2 className="text-xl font-semibold">{img.filename}</h2>
              <p className="text-sm text-gray-400">
                {idx + 1} of {images.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Action buttons */}
            <button
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              onClick={() => {
                // Add favorite functionality
              }}
            >
              <Heart size={20} />
            </button>
            
            <button
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              onClick={() => {
                // Add download functionality
                const link = document.createElement('a');
                link.href = img.url;
                link.download = img.filename;
                link.click();
              }}
            >
              <Download size={20} />
            </button>

            <button
              className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              onClick={() => {
                // Add info functionality
              }}
            >
              <Info size={20} />
            </button>

            <button
              className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-white hover:bg-red-500/30 transition-all duration-200 backdrop-blur-sm"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {hasPrevious && (
        <button
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm hover:scale-110"
          onClick={onPrevious}
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {hasNext && (
        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm hover:scale-110"
          onClick={onNext}
        >
          <ChevronRight size={28} />
        </button>
      )}
      
      {/* Image */}
      <div className="flex items-center justify-center w-full h-full p-20">
        <img
          src={img.url}
          alt={img.filename}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          style={{
            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.5))"
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
          <div className="flex gap-1">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === idx ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
