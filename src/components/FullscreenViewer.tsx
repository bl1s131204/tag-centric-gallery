
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
      <div className="flex items-center h-full">
        <button className="mx-2 p-2 rounded-full bg-black/40 text-white text-2xl" onClick={onPrev}><ArrowLeft size={32} /></button>
        <img
          src={img.url}
          alt={img.filename}
          className="max-h-[90vh] max-w-[80vw] rounded-lg shadow-xl border-4 border-white/20"
          style={{ objectFit: "contain", background: "rgba(255,255,255,0.03)" }}
        />
        <button className="mx-2 p-2 rounded-full bg-black/40 text-white text-2xl" onClick={onNext}><ArrowRight size={32} /></button>
      </div>
      <div className="text-lg text-white mt-6">{img.filename}</div>
    </div>
  );
}
