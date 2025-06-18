
import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FolderSelectionPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const files = Array.from(e.target.files);
    // Store files in sessionStorage to pass to the gallery
    sessionStorage.setItem('selectedFiles', JSON.stringify(files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    }))));
    
    // Navigate to the main gallery page
    navigate('/');
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-transparent relative py-14">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-center gap-7 md:gap-24 px-4 md:px-0">
        {/* Upload/Select folder card */}
        <div className="flex-1 max-w-[470px] w-full flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold text-gray-100 mb-6 ml-2">Upload file</h1>
          <div
            className="w-full min-h-[420px] rounded-xl bg-slate-900/60 backdrop-blur-md flex flex-col items-center justify-center gap-4"
            style={{
              border: "2px dashed #CBD6E2", // #CBD6E2 is a subtle soft blue-grey
              boxSizing: "border-box",
              padding: "38px 16px"
            }}
          >
            <span className="text-gray-300 text-base mb-3">Submit files for inquiry</span>
            <p className="text-xl font-bold text-white mb-2">Drag and Drop files here</p>
            <span className="text-gray-300 font-normal mb-0.5">OR</span>
            <label
              htmlFor="file-upload"
              className="mx-auto"
            >
              <button
                type="button"
                className="flex flex-row items-center gap-2 px-8 py-3 rounded-md bg-[#fc6820] text-white font-semibold text-lg shadow hover:bg-[#fa5b17] transition"
                style={{
                  boxShadow: "0 2px 8px #fc68203c",
                  marginBottom: "18px"
                }}
              >
                <Plus size={20} className="mr-1" />
                Upload
              </button>
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
            <div className="mt-6 w-full text-center">
              <div className="font-bold text-[17px] text-white mb-1">Supported image files</div>
              <div className="text-base text-gray-200 tracking-wide">JPG, PNG, GIF, WEBP, BMP</div>
            </div>
          </div>
        </div>
        {/* Illustration */}
        <div className="md:w-[420px] w-full flex justify-center items-center">
          <img
            src="/lovable-uploads/3001983f-5ef2-4603-907e-d425d09e5600.png"
            alt="Upload Illustration"
            className="w-[90%] max-w-[440px] h-auto object-contain select-none pointer-events-none"
            draggable={false}
            style={{
              background: "transparent",
              userSelect: "none",
              marginTop: "44px"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FolderSelectionPage;
