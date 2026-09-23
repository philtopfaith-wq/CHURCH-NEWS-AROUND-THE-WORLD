import React from 'react';
import { NEWS_CATEGORIES } from '../config/categories';
import { NewsFilterState, SortOrder } from '../types';
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: NewsFilterState;
  onFilterChange: (newFilters: Partial<NewsFilterState>) => void;
  onResetFilters: () => void;
  availableSources: string[];
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableSources,
  totalResults,
}) => {
  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.source !== 'all' ||
    filters.searchQuery.trim() !== '' ||
    filters.sortBy !== 'newest';

  return (
    <div className="bg-[#FAF8F5] border-b border-red-100/80 py-4 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Row 1: Search Input, Source Dropdown, and Sort Order */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box with Clear Button */}
          <div className="relative flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4 text-red-500" />
            </div>
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search church news, topics, theology, or places..."
              className="w-full pl-9 pr-8 py-2 bg-white border border-stone-300 rounded-sm text-sm text-stone-900 placeholder-stone-400 focus:border-red-600 focus:ring-1 focus:ring-red-600 focus:outline-none transition-colors shadow-2xs"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-red-600"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Source Filter, Sort Selector & Reset */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            
            {/* Source Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-300 hover:border-red-300 px-2.5 py-1.5 rounded-sm shadow-2xs transition-colors">
              <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
              <label htmlFor="source-select" className="sr-only">Filter by wire source</label>
              <select
                id="source-select"
                value={filters.source}
                onChange={(e) => onFilterChange({ source: e.target.value })}
                className="bg-transparent text-stone-800 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Wire Sources</option>
                {availableSources.map((src) => (
                  <option key={src} value={src}>
                    {src}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center bg-white border border-stone-300 hover:border-red-300 px-2.5 py-1.5 rounded-sm shadow-2xs transition-colors">
              <label htmlFor="sort-select" className="sr-only">Sort order</label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as SortOrder })}
                className="bg-transparent text-stone-800 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Headline (A-Z)</option>
              </select>
            </div>

            {/* Reset Button (visible only when active) */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-red-700 hover:text-red-900 bg-red-100 hover:bg-red-200/80 rounded-sm font-semibold transition-colors"
                title="Reset all search filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}

            {/* Result count */}
            <span className="text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 rounded font-mono text-[11px] font-bold tabular-nums ml-auto md:ml-2">
              {totalResults} {totalResults === 1 ? 'dispatch' : 'dispatches'}
            </span>

          </div>

        </div>

        {/* Row 2: Category Tabs (Single line with horizontal scrolling on small screens) */}
        <div className="overflow-x-auto no-scrollbar py-1">
          <div className="flex items-center gap-1.5 min-w-max">
            {/* 'All' button */}
            <button
              type="button"
              onClick={() => onFilterChange({ category: 'all' })}
              className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all whitespace-nowrap shrink-0 shadow-2xs ${
                filters.category === 'all'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-red-700 bg-white hover:bg-red-50 border border-stone-200'
              }`}
            >
              All Departments
            </button>

            {NEWS_CATEGORIES.map((cat) => {
              const isSelected = filters.category.toLowerCase() === cat.slug.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onFilterChange({ category: cat.slug })}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all whitespace-nowrap shrink-0 shadow-2xs ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xs'
                      : 'text-stone-700 hover:text-red-700 bg-white hover:bg-red-50 border border-stone-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
