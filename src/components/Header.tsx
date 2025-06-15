
import React from "react";
import { Link } from "react-router-dom";
import { ThemeDropdown } from "@/components/ThemeDropdown";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
    {children}
  </a>
);

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/95 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-[70px] px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-brand-pink font-playfair tracking-wider">
          ImageNest
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Services</NavLink>
            <NavLink href="#">Portfolio</NavLink>
            <NavLink href="#">Contact</NavLink>
          </nav>
          <ThemeDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
