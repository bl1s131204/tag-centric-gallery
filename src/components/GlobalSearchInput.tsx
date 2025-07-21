
import React from 'react';
import { Search } from 'lucide-react';

type GlobalSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="input-group w-full md:w-80 lg:w-96">
      <Search className="input-icon" size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search images, tags, or folders..."
        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 backdrop-blur-sm border border-medium text-neutral-50 placeholder-neutral-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all font-inter"
        style={{
          boxShadow: "0 2px 8px hsla(220, 63%, 6%, 0.1)"
        }}
      />
    </div>
  );
};
