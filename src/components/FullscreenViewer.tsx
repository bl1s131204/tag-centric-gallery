import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
type ViewerProps = {
  open: boolean;
  onClose: () => void;
  images: { filename: string; url: string }[];
  idx: number;
  onPrev: () => void;
  onNext: () => void;
};
export const FullscreenViewer: React.FC<ViewerProps> = ({
  open, onClose, images, idx, onPrev, onNext
}) => {
  if (!open) return null;
  const img = images[idx];
  if (!img) return null;
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/80 animate-fade-in">
      <button
        className="absolute top-4 right-6 text-white text-2xl px-4 py-2 bg-black/40 rounded-full"
        onClick={onClose}
        aria-label="Close"
      >×</button>
      {/* The navigation buttons remain floated around the image */}
      <div className="flex items-center h-full w-full justify-center">
        <button
          className="absolute left-6 top-1/2 transform -translate-y-1/2 mx-2 p-2 rounded-full bg-black/40 text-white text-2xl z-10"
          onClick={onPrev}
        >
          <ArrowLeft size={32} />
        </button>
        <img
          src={img.url}
          alt={img.filename}
          className="object-contain transition-all"
          style={{
            width: "100vw",
            height: "100vh",
            maxWidth: "100vw",
            maxHeight: "100vh",
            borderRadius: 0,
            boxShadow: "none",
            border: "none",
            background: "rgba(0,0,0,0.2)",
            display: "block"
          }}
          draggable={false}
        />
        <button
          className="absolute right-6 top-1/2 transform -translate-y-1/2 mx-2 p-2 rounded-full bg-black/40 text-white text-2xl z-10"
          onClick={onNext}
        >
          <ArrowRight size={32} />
        </button>
      </div>
      {/* Filename at the bottom */}
      <div className="text-lg text-white absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 px-5 py-2 rounded-lg shadow">
        {img.filename}
      </div>
    </div>
  );
}
