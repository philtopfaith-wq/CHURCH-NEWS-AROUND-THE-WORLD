import React from 'react';
import { ProviderStatusInfo, ActiveFeedMode } from '../types';
import { CONFIGURED_PROVIDERS, MOCK_PROVIDER_CONFIG, APP_CONFIG } from '../config/providers';
import { formatRelativeTime } from '../utils/date';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Trash2, Globe, Radio } from 'lucide-react';

interface ProviderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerStatuses: ProviderStatusInfo[];
  activeFeedMode: ActiveFeedMode;
  onChangeMode: (mode: ActiveFeedMode) => void;
  onForceRefresh: () => void;
  onClearCache: () => void;
  isRefreshing: boolean;
}

export const ProviderStatusModal: React.FC<ProviderStatusModalProps> = ({
  isOpen,
  onClose,
  providerStatuses,
  activeFeedMode,
  onChangeMode,
  onForceRefresh,
  onClearCache,
  isRefreshing,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="provider-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FBF9F5] border border-stone-300 shadow-xl rounded-xs overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-stone-100 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-stone-800" />
            <h2 id="provider-modal-title" className="font-serif text-lg font-bold text-stone-900">
              News Wire & Provider Health
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-xs hover:bg-stone-200 transition-colors"
            aria-label="Close provider status"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 text-sm text-stone-700 max-h-[80vh] overflow-y-auto">
          
          {/* Feed Mode Switcher */}
          <div className="bg-white p-4 border border-stone-200 rounded-xs space-y-3">
            <h3 className="font-serif text-sm font-semibold text-stone-900">
              Active Ingestion Mode
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onChangeMode('all-live')}
                className={`flex flex-col text-left p-3 rounded-xs border transition-all ${
                  activeFeedMode === 'all-live'
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-medium text-stone-900 text-xs">
                  <Globe className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Live External Wire Providers</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                  Aggregates live RSS and syndication streams from Vatican News, RNS, Baptist Press, CNA, and Church of England.
                </p>
              </button>

              <button
                type="button"
                onClick={() => onChangeMode('mock-only')}
                className={`flex flex-col text-left p-3 rounded-xs border transition-all ${
                  activeFeedMode === 'mock-only'
                    ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-medium text-stone-900 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  <span>Archival & Demonstration Wire</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                  Guaranteed zero-latency offline dispatches spanning all 12 church ministry departments.
                </p>
              </button>
            </div>
          </div>

          {/* Provider Isolation Status Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-semibold text-stone-900">
                Configured Wire Adapters
              </h3>
              <span className="text-xs text-stone-500">
                Independent timeout & fallback
              </span>
            </div>

            <div className="border border-stone-200 rounded-xs bg-white divide-y divide-stone-100">
              {activeFeedMode === 'mock-only' ? (
                <div className="p-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-stone-900">{MOCK_PROVIDER_CONFIG.name}</span>
                    <span className="block text-[11px] text-stone-500">{MOCK_PROVIDER_CONFIG.description}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active (12 items)</span>
                  </div>
                </div>
              ) : (
                CONFIGURED_PROVIDERS.map((provider) => {
                  const status = providerStatuses.find((s) => s.id === provider.id || s.name === provider.name);
                  const isSuccess = status?.success;
                  const count = status?.articleCount || 0;

                  return (
                    <div key={provider.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-stone-900">{provider.name}</span>
                          <span className="text-[11px] text-stone-400 font-mono">({provider.type.toUpperCase()})</span>
                        </div>
                        <span className="block text-[11px] text-stone-500 mt-0.5 max-w-md">
                          {provider.description}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {status ? (
                          isSuccess ? (
                            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{count} articles</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono text-[11px]" title={status.error}>
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>CORS / Isolated</span>
                            </span>
                          )
                        ) : (
                          <span className="text-stone-400 text-[11px]">Pending check</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Browser Architecture Disclosure */}
          <div className="p-4 bg-[#F4EFEA] border border-stone-200 rounded-xs text-xs text-stone-600 space-y-1.5">
            <h4 className="font-serif font-semibold text-stone-900">
              Stateless Browser Architecture Note
            </h4>
            <p className="leading-relaxed">
              In compliance with pure client-side web standards, all RSS aggregation occurs directly in your browser. If an individual newsroom endpoint enforces strict Same-Origin (CORS) limits or is temporarily unreachable, the Ecclesia News service isolates that provider, preserves successfully received dispatches, and falls back gracefully without breaking your session.
            </p>
          </div>

          {/* Cache & Refresh Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClearCache}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-xs border border-stone-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Local Storage Cache</span>
            </button>

            <button
              type="button"
              onClick={onForceRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-xs transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Aggregating...' : 'Force Live Re-Fetch'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
