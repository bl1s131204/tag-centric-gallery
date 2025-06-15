
import React from "react";
import { Upload } from "lucide-react";
import { themes } from "@/theme/themes";
import { useTheme } from "@/theme/themeContext";

const FolderSelectionPage: React.FC = () => {
  const { theme } = useTheme();
  const themeColors = themes[theme].colors;

  // Handler for file/folder selection (not functional, just UI)
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-white relative py-14">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-7 md:gap-12 px-4">
        {/* Upload/Select folder card */}
        <div className="flex-1 max-w-[470px] w-full">
          <div className="p-8 pb-7 min-h-[420px] border-2 border-dashed border-[#D3DDE6] bg-[#F5F8FA] rounded-xl shadow-soft flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl font-bold text-[#26334A] text-left w-full mb-3">Upload file</h1>
            <span className="text-gray-500 text-base mb-3 -mt-4">Submit files for inquiry</span>
            <div
              className="w-full flex flex-col items-center justify-center gap-4 text-center"
              style={{ minHeight: 180 }}
            >
              <p className="text-xl font-bold text-[#26334A] mb-2">Drag and Drop files here</p>
              <span className="text-gray-400 font-normal mb-0.5">OR</span>
              <label
                htmlFor="file-upload"
                className="mx-auto"
              >
                <button
                  type="button"
                  className="flex flex-row items-center gap-2 px-8 py-3 rounded-md bg-[#fc6820] text-white font-semibold text-lg shadow hover:bg-[#fa5b17] transition"
                >
                  <Upload size={20} className="mr-1" />
                  Upload
                </button>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  tabIndex={-1}
                  onClick={handleInputClick}
                  // onChange={handleFilePick} // Not implemented
                />
              </label>
            </div>
            <div className="mt-6 w-full text-center">
              <div className="font-bold text-[17px] text-[#26334A] mb-1">Supported 3D files</div>
              <div className="text-base text-[#232A36] tracking-wide">DAE, OBJ, STL, 3DS, STEP</div>
            </div>
          </div>
        </div>
        {/* Illustration */}
        <div className="md:w-[430px] w-full flex justify-center items-center">
          <img
            src="/lovable-uploads/cec0db5d-a67a-4b12-bb21-a575aa376a17.png"
            alt="Upload Illustration"
            className="w-[88%] max-w-[470px] h-auto object-contain select-none pointer-events-none"
            draggable={false}
            style={{
              background: "transparent",
              userSelect: "none"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FolderSelectionPage;

