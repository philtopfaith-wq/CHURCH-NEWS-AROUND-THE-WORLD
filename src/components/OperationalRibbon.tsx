import React from 'react';
import { RefreshCw, WifiOff, CheckCircle2, AlertCircle, Phone, Award } from 'lucide-react';
import { formatRelativeTime } from '../utils/date';

interface OperationalRibbonProps {
  lastUpdated: string | null;
  articleCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
  isOffline: boolean;
  isCached: boolean;
  failedCount: number;
  successCount: number;
  onOpenProviderModal: () => void;
}

export const OperationalRibbon: React.FC<OperationalRibbonProps> = ({
  lastUpdated,
  articleCount,
  isRefreshing,
  onRefresh,
  isOffline,
  isCached,
  failedCount,
  onOpenProviderModal,
}) => {
  const todayFormatted = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="bg-[#FFF5F5] border-b border-red-200/70 text-stone-700 text-xs py-2 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        
        {/* Left: Date & Edition Marker */}
        <div className="flex items-center gap-2 text-stone-600 tracking-wide">
          <span className="font-serif font-bold text-red-900">{todayFormatted}</span>
          <span className="text-red-300" aria-hidden="true">|</span>
          <span className="hidden sm:inline font-medium text-stone-700">Ecumenical &amp; Global Broadsheet</span>
          {isCached && (
            <>
              <span className="text-red-300" aria-hidden="true">|</span>
              <span className="text-red-700 italic font-medium">Cached Edition</span>
            </>
          )}
        </div>

        {/* Center / Right: Creator mention, Freshness, Provider Health, and Controlled Refresh */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Creator badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-stone-600 bg-white border border-red-200 px-2.5 py-0.5 rounded-full shadow-2xs">
            <Award className="w-3.5 h-3.5 text-red-600" />
            <span>Built by <strong className="text-red-700 font-semibold">Aboluwarin Temitope</strong></span>
            <a href="tel:08166102920" className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-bold ml-1">
              <Phone className="w-2.5 h-2.5" />
              <span>08166102920</span>
            </a>
          </div>

          {/* Offline warning */}
          {isOffline ? (
            <div className="flex items-center gap-1.5 text-red-900 bg-red-100 px-2.5 py-0.5 rounded font-medium">
              <WifiOff className="w-3.5 h-3.5" />
              <span>Offline Mode</span>
            </div>
          ) : failedCount > 0 ? (
            <button
              onClick={onOpenProviderModal}
              className="flex items-center gap-1 text-red-700 hover:text-red-900 font-medium underline underline-offset-2"
              title="Click to view details of failed providers"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>{failedCount} wire alert</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 text-stone-600 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-600" />
              <span>{articleCount} verified dispatches</span>
            </div>
          )}

          {/* Last updated timestamp */}
          {lastUpdated && (
            <span className="text-stone-500 hidden md:inline font-medium">
              Updated {formatRelativeTime(lastUpdated)}
            </span>
          )}

          {/* Refresh Button with bright red accent */}
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing || isOffline}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-sm text-white bg-red-600 hover:bg-red-700 font-medium transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed ${
              isRefreshing ? 'bg-red-700' : ''
            }`}
            aria-label="Refresh news feeds"
            title="Refresh latest news from all providers"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-white' : ''}`} />
            <span>{isRefreshing ? 'Aggregating...' : 'Refresh'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
