
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { GlobalSearchInput } from "./GlobalSearchInput";
import { Menu, X, Sparkles } from "lucide-react";

type HeaderProps = {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
};

const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-white/10">
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)",
          backdropFilter: "blur(20px)"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto flex justify-between items-center h-[70px] px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-white font-playfair tracking-wider group-hover:bg-gradient-to-r group-hover:from-brand-pink group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            ImageNest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {searchTerm !== undefined && onSearchChange && (
            <GlobalSearchInput value={searchTerm} onChange={onSearchChange} />
          )}
          <ThemeDropdown />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden border-t border-white/10"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.95) 100%)",
            backdropFilter: "blur(20px)"
          }}
        >
          <div className="px-4 py-6 space-y-4">
            {searchTerm !== undefined && onSearchChange && (
              <GlobalSearchInput value={searchTerm} onChange={onSearchChange} />
            )}
            <div className="flex justify-center">
              <ThemeDropdown />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
