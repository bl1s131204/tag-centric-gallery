import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export type SortCriteria = "name" | "size" | "dateAdded" | "dateModified" | "type";
export type SortDirection = "asc" | "desc";

interface SortControlsProps {
  sortBy: SortCriteria;
  sortDirection: SortDirection;
  onSortChange: (criteria: SortCriteria, direction: SortDirection) => void;
}

const sortOptions = [
  { value: "name", label: "File Name" },
  { value: "size", label: "File Size" },
  { value: "dateAdded", label: "Date Added" },
  { value: "dateModified", label: "Date Modified" },
  { value: "type", label: "File Type" }
];

export const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  sortDirection,
  onSortChange,
}) => {
  const toggleDirection = () => {
    onSortChange(sortBy, sortDirection === "asc" ? "desc" : "asc");
  };

  const handleSortChange = (value: string) => {
    onSortChange(value as SortCriteria, sortDirection);
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
      
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-40 sort-control">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleDirection}
        className="sort-control"
        title={`Sort ${sortDirection === "asc" ? "ascending" : "descending"}`}
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};