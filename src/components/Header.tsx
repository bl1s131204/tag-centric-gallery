
import React from "react";
import { Link } from "react-router-dom";
import { ThemeDropdown } from "@/components/ThemeDropdown";
import { GlobalSearchInput } from "./GlobalSearchInput";

type HeaderProps = {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
};

const Header = ({ searchTerm, onSearchChange }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/95 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-brand-pink font-playfair tracking-wider">
          ImageNest
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {searchTerm !== undefined && onSearchChange && (
            <div className="hidden md:block">
              <GlobalSearchInput value={searchTerm} onChange={onSearchChange} />
            </div>
          )}
          <ThemeDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
