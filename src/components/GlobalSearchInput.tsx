
import React from 'react';
import { Search } from 'lucide-react';

type GlobalSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-64 lg:w-80">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search images..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-700 bg-gray-900 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-brand-pink focus:border-brand-pink outline-none transition-colors"
      />
    </div>
  );
};
