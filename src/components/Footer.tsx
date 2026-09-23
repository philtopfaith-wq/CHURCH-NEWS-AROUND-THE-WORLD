import React from 'react';
import { NEWS_CATEGORIES } from '../config/categories';
import { navigateTo } from '../router';
import { ChurchCrossIcon } from './EditorialIcon';
import { Phone, Award, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenProviderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProviderModal }) => {
  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(path);
  };

  return (
    <footer className="bg-[#181414] text-stone-300 border-t-2 border-red-600 transition-colors">
      
      {/* Creator Dedication Strip */}
      <div className="bg-gradient-to-r from-red-900 via-red-700 to-rose-800 text-white py-4 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-white/20 text-white">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-serif">
              Crafted with precision &amp; dedication: <strong className="font-bold text-white tracking-wide">Created by Aboluwarin Temitope</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-red-200 hidden md:inline text-xs font-serif">Inquiries &amp; Technical Collaboration:</span>
            <a
              href="tel:08166102920"
              className="inline-flex items-center gap-1.5 bg-white text-red-700 hover:bg-red-50 hover:text-red-800 font-bold px-4 py-1.5 rounded-full transition-all text-xs shadow-md"
            >
              <Phone className="w-3.5 h-3.5 text-red-600" />
              <span>Tel: 08166102920</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        
        {/* Top Tier: Wordmark, Mission & Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-stone-800 pb-10">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-xs">
                <ChurchCrossIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-white tracking-tight">
                Ecclesia <span className="text-red-500 font-bold">News</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Global Church &amp; Faith Chronicle. Independent, client-side news curation spanning ecumenical reporting, parish revitalization, missions, liturgical arts, and faith journalism.
            </p>

            {/* Creator Spotlight Box */}
            <div className="p-3.5 bg-stone-900/90 border border-red-900/60 rounded-sm text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-red-400 font-semibold uppercase tracking-wider text-[10px]">
                <Award className="w-3.5 h-3.5 text-red-500" />
                <span>Lead Architect &amp; Designer</span>
              </div>
              <p className="text-stone-200 font-serif font-bold text-sm">
                Aboluwarin Temitope
              </p>
              <p className="text-stone-400 text-[11px]">
                Direct Contact Phone: <a href="tel:08166102920" className="text-red-400 hover:text-white underline font-semibold">08166102920</a>
              </p>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenProviderModal}
                className="text-xs text-red-400 hover:text-white underline underline-offset-2 transition-colors font-medium"
              >
                Inspect Wire Providers &amp; Feeds &rarr;
              </button>
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            
            {/* Quick Links */}
            <div className="space-y-2.5">
              <h4 className="font-serif font-bold text-stone-100 uppercase tracking-wider text-[11px] text-red-400">
                Chronicle
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" onClick={(e) => handleNav('/', e)} className="hover:text-red-400 transition-colors">
                    Front Page
                  </a>
                </li>
                <li>
                  <a href="/latest" onClick={(e) => handleNav('/latest', e)} className="hover:text-red-400 transition-colors">
                    Latest Dispatches
                  </a>
                </li>
                <li>
                  <a href="/search" onClick={(e) => handleNav('/search', e)} className="hover:text-red-400 transition-colors">
                    Search Archive
                  </a>
                </li>
                <li>
                  <a href="/about" onClick={(e) => handleNav('/about', e)} className="hover:text-red-400 transition-colors">
                    About &amp; Ethics
                  </a>
                </li>
              </ul>
            </div>

            {/* Departments Group 1 */}
            <div className="space-y-2.5">
              <h4 className="font-serif font-bold text-stone-100 uppercase tracking-wider text-[11px] text-red-400">
                Departments
              </h4>
              <ul className="space-y-2">
                {NEWS_CATEGORIES.slice(0, 5).map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`/category/${cat.slug}`}
                      onClick={(e) => handleNav(`/category/${cat.slug}`, e)}
                      className="hover:text-red-400 transition-colors"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Departments Group 2 */}
            <div className="space-y-2.5">
              <h4 className="font-serif font-bold text-stone-100 uppercase tracking-wider text-[11px] text-red-400">
                Ministry &amp; Life
              </h4>
              <ul className="space-y-2">
                {NEWS_CATEGORIES.slice(5, 10).map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`/category/${cat.slug}`}
                      onClick={(e) => handleNav(`/category/${cat.slug}`, e)}
                      className="hover:text-red-400 transition-colors"
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Tier: Disclaimer, Copyright & Original Source Notice */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-stone-500">
          <div className="space-y-1">
            <p>
              &copy; {new Date().getFullYear()} Ecclesia News Chronicle. All syndicated headlines and trademarks remain the property of their respective publishers.
            </p>
            <p className="text-[11px] text-stone-400 flex items-center gap-1">
              <span>Created with care by <strong className="text-stone-300 font-semibold">Aboluwarin Temitope</strong> (Tel: <a href="tel:08166102920" className="text-red-400 hover:underline">08166102920</a>)</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <a href="/about" onClick={(e) => handleNav('/about', e)} className="hover:text-red-400 transition-colors">
              Attribution Policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="/about" onClick={(e) => handleNav('/about', e)} className="hover:text-red-400 transition-colors">
              Privacy Declaration
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-red-400 transition-colors"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
