
import React from "react";
import { Plus, Upload, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FolderSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const files = Array.from(e.target.files);
    sessionStorage.setItem('selectedFiles', JSON.stringify(files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }))));
    
    navigate('/');
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.15),_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,69,126,0.1),_transparent_50%)] pointer-events-none" />
      
      <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6">
        {/* Upload Section */}
        <div className="flex-1 max-w-[520px] w-full">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-playfair">
              Upload Your Images
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Select a folder from your device to view and organize your image collection
            </p>
          </div>

          <div className="relative group">
            <div
              className="w-full min-h-[460px] rounded-2xl backdrop-blur-xl flex flex-col items-center justify-center gap-6 p-8 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                border: "2px dashed rgba(255,255,255,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
              }}
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-pink to-purple-600 flex items-center justify-center shadow-lg">
                  <FolderOpen size={32} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Plus size={16} className="text-white" />
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">
                  Drag & Drop Your Folder
                </h3>
                <p className="text-gray-300 text-lg">
                  or click to browse your files
                </p>
              </div>

              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-brand-pink to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <Upload size={20} />
                  Choose Folder
                </div>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  {...{ webkitdirectory: "true", directory: "true" } as any}
                  tabIndex={-1}
                  onClick={handleInputClick}
                  onChange={handleFilePick}
                  accept="image/*"
                />
              </label>

              <div className="mt-8 p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                <div className="text-center">
                  <div className="font-bold text-lg text-white mb-2">Supported Formats</div>
                  <div className="text-gray-300 tracking-wide">JPG • PNG • GIF • WEBP • BMP • SVG</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex-1 max-w-[480px] w-full flex justify-center items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/20 to-purple-600/20 rounded-3xl blur-3xl" />
            <img
              src="/lovable-uploads/3001983f-5ef2-4603-907e-d425d09e5600.png"
              alt="Upload Illustration"
              className="relative w-full h-auto object-contain select-none pointer-events-none rounded-2xl"
              draggable={false}
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))",
                maxWidth: "440px"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderSelectionPage;
