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
    <header className="fixed top-0 left-0 w-full z-50 nav-blur border-b border-subtle">
      <div className="relative max-w-8xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group focus-ring rounded-lg">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center group-hover:scale-110 transition-all shadow-medium">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-neutral-50 font-inter tracking-tight group-hover:text-primary-300 transition-colors">
              ImageNest
            </span>
            <span className="text-xs text-neutral-400 font-medium">Professional Gallery</span>
          </div>
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
          className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-medium flex items-center justify-center text-neutral-300 hover:bg-white/10 hover:text-white transition-all focus-ring"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-subtle backdrop-professional bg-neutral-900/95 animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {searchTerm !== undefined && onSearchChange && (
              <div className="animate-fade-in-up">
                <GlobalSearchInput value={searchTerm} onChange={onSearchChange} />
              </div>
            )}
            <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <ThemeDropdown />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;