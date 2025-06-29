
import React from 'react';
import { Search } from 'lucide-react';

type GlobalSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-80 lg:w-96">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search images..."
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent transition-all duration-200 backdrop-blur-sm"
        style={{
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
        }}
      />
    </div>
  );
};
