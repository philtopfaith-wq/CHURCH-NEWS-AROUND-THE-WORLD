import React, { useState } from 'react';
import { Search, Radio, Menu, X, ArrowUpRight, Phone, Sparkles } from 'lucide-react';
import { navigateTo } from '../router';
import { ChurchCrossIcon } from './EditorialIcon';

interface HeaderProps {
  currentPath: string;
  onOpenProviderModal: () => void;
  onOpenSearch: () => void;
  activeFeedMode: 'all-live' | 'mock-only';
  isOffline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onOpenProviderModal,
  onOpenSearch,
  activeFeedMode,
  isOffline,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Front Page', path: '/' },
    { label: 'Latest Feed', path: '/latest' },
    { label: 'Departments', path: '/category/church-news' },
    { label: 'Search', path: '/search' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-red-100 shadow-xs transition-colors">
      
      {/* Top Bright Red Creator Attribution Banner */}
      <div className="bg-gradient-to-r from-red-800 via-red-600 to-rose-700 text-white text-xs py-1.5 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-white">
              <Sparkles className="w-2.5 h-2.5" />
            </span>
            <span className="font-serif">Created by <strong className="font-semibold text-white tracking-wider">Aboluwarin Temitope</strong></span>
            <span className="text-red-200 hidden sm:inline" aria-hidden="true">|</span>
            <span className="hidden sm:inline text-red-100">Global Faith &amp; Church News Chronicle</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:08166102920"
              className="inline-flex items-center gap-1.5 bg-white text-red-700 hover:bg-red-50 hover:text-red-800 font-semibold px-2.5 py-0.5 rounded-full transition-all text-[11px] shadow-xs"
              title="Call Creator Aboluwarin Temitope"
            >
              <Phone className="w-3 h-3 text-red-600" />
              <span>08166102920</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          
          {/* Zone 1: Brand Title with vibrant red cross crest */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-xs">
              <ChurchCrossIcon className="w-5 h-5 text-white" />
            </div>
            <a
              href="/"
              onClick={(e) => handleNavClick('/', e)}
              className="font-display text-xl sm:text-2xl font-bold tracking-tight text-stone-900 hover:text-red-700 transition-colors whitespace-nowrap"
              aria-label="Ecclesia News Home"
            >
              Ecclesia <span className="text-red-600 font-bold">News</span>
            </a>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(link.path.split('?')[0]);

              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(link.path, e)}
                  className={`transition-colors whitespace-nowrap py-1 relative ${
                    isActive
                      ? 'text-red-600 font-bold border-b-2 border-red-600'
                      : 'hover:text-red-600 hover:underline hover:underline-offset-4'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search shortcut button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
              aria-label="Search articles"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Provider & Wire Inspector Trigger */}
            <button
              type="button"
              onClick={onOpenProviderModal}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-50 hover:bg-red-50 hover:border-red-300 border border-stone-300 rounded-md transition-all whitespace-nowrap"
              aria-label="View news wire providers and status"
            >
              <Radio
                className={`w-3.5 h-3.5 ${
                  isOffline
                    ? 'text-amber-600 animate-pulse'
                    : activeFeedMode === 'mock-only'
                    ? 'text-stone-500'
                    : 'text-red-600 animate-pulse'
                }`}
              />
              <span className="hidden sm:inline">
                {isOffline
                  ? 'Offline Cache'
                  : activeFeedMode === 'mock-only'
                  ? 'Archival Wire'
                  : 'Live Feeds'}
              </span>
              <span className="sm:hidden">Wire</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-red-600 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-red-100 bg-[#FAF8F5] px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={(e) => handleNavClick(link.path, e)}
              className="block px-3 py-2 text-base font-medium text-stone-800 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-stone-200 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProviderModal();
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md"
            >
              <span>News Wire &amp; Feed Manager</span>
              <ArrowUpRight className="w-4 h-4 text-stone-500" />
            </button>

            <a
              href="tel:08166102920"
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Creator Aboluwarin Temitope (08166102920)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
