import React from 'react';
import { ChurchCrossIcon } from './EditorialIcon';
import { RefreshCw, BookOpen, SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'category' | 'offline-empty' | 'general';
  searchQuery?: string;
  categoryName?: string;
  onReset?: () => void;
  onRefresh?: () => void;
  onSwitchToMock?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  searchQuery,
  categoryName,
  onReset,
  onRefresh,
  onSwitchToMock,
}) => {
  if (type === 'search') {
    return (
      <div className="text-center py-16 px-4 bg-white border border-stone-200 rounded-xs my-8 max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
          <SearchX className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-semibold text-stone-900">
            No dispatches matching &ldquo;{searchQuery}&rdquo;
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Try broadening your search terms, searching for broader church themes (e.g. &ldquo;synod&rdquo;, &ldquo;music&rdquo;, &ldquo;relief&rdquo;), or resetting filters.
          </p>
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Search & Filters</span>
          </button>
        )}
      </div>
    );
  }

  if (type === 'category') {
    return (
      <div className="text-center py-16 px-4 bg-white border border-stone-200 rounded-xs my-8 max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
          <ChurchCrossIcon className="w-6 h-6 text-stone-600" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-semibold text-stone-900">
            No dispatches currently in {categoryName || 'this department'}
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            New reports are syndicated regularly across global wires. You can view all church departments or refresh providers.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-xs transition-colors"
            >
              View All Departments
            </button>
          )}
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xs transition-colors"
            >
              Check Wire Feeds
            </button>
          )}
        </div>
      </div>
    );
  }

  if (type === 'offline-empty') {
    return (
      <div className="text-center py-16 px-4 bg-white border border-stone-200 rounded-xs my-8 max-w-xl mx-auto space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
          <RefreshCw className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-semibold text-stone-900">
            No Offline Cache Available
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            You are currently offline and no previously fetched articles were found in local browser storage. You can switch to the internal demonstration archive to read verified reports.
          </p>
        </div>
        {onSwitchToMock && (
          <button
            type="button"
            onClick={onSwitchToMock}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-xs transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Load Archival Dispatches</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="text-center py-16 px-4 bg-white border border-stone-200 rounded-xs my-8 max-w-xl mx-auto space-y-4">
      <div className="space-y-1">
        <h3 className="font-serif text-lg font-semibold text-stone-900">
          No Dispatches Available
        </h3>
        <p className="text-sm text-stone-500 max-w-md mx-auto">
          Please check your connection or switch to the Archival Wire for guaranteed dispatches.
        </p>
      </div>
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-xs transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
