
import React from "react";

type ViewerProps = {
  open: boolean;
  onClose: () => void;
  images: { filename: string; url: string }[];
  idx: number;
};
export const FullscreenViewer: React.FC<ViewerProps> = ({
  open, onClose, images, idx
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
      <div className="flex items-center h-full w-full justify-center">
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
      </div>
    </div>
  );
}
