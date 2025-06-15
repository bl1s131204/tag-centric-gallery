
import React from "react";
import { ThemeProvider } from "@/theme/themeContext";
import { ImageGallery } from "@/components/ImageGallery";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { Bell, UserCircle, Search } from "lucide-react";

const Index = () => {
  return (
    <ThemeProvider>
      <header className="fixed top-0 left-0 w-full z-[45] nav-blur shadow-lg border-b border-[#232838]">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-playfair text-2xl font-bold text-gold tracking-tight drop-shadow-xl select-none">LuxeGallery</span>
          </div>
          {/* Center: Search */}
          <form className="flex-1 max-w-[400px] mx-8 relative group">
            <input
              type="text"
              placeholder="Search high-res images"
              className="w-full pl-11 pr-5 py-2 rounded-full bg-[#23283a]/90 text-white placeholder:text-gray-400 border-none shadow soft-shadow outline-none transition focus:ring-2 focus:ring-gold"
              style={{ fontFamily: "Poppins, Inter, sans-serif" }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold opacity-80" size={20} />
          </form>
          {/* Right: Theme + Profile + Notifications */}
          <div className="flex gap-1 items-center">
            <ThemeDropdown />
            <div className="relative ml-5">
              <button className="flex items-center justify-center w-11 h-11 bg-[#20243a] rounded-full hover:bg-emerald/50 transition shadow border-2 border-[#292c3d] group">
                <Bell className="text-gold" size={22} />
                <span className="dot-badge" />
              </button>
            </div>
            <div className="relative ml-2">
              {/* Profile pic with dropdown placeholder */}
              <button className="flex items-center justify-center w-11 h-11 bg-[#20243a] rounded-full hover:bg-gold/80 transition shadow border-2 border-[#292c3d] overflow-hidden">
                <UserCircle className="text-white" size={28} />
              </button>
              {/* Future: profile dropdown and account options */}
            </div>
          </div>
        </div>
      </header>
      <main className="pt-[80px] bg-[#121212] min-h-screen">
        <ImageGallery />
        {/* Future: Sidebar, etc */}
      </main>
    </ThemeProvider>
  );
};
export default Index;
