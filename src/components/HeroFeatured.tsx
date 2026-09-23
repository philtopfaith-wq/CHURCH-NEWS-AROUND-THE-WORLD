import React from 'react';
import { Article } from '../types';
import { ArticleImage } from './ArticleImage';
import { formatRelativeTime } from '../utils/date';
import { ExternalLink, BookOpen, Flame } from 'lucide-react';

interface HeroFeaturedProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  article,
  onSelectArticle,
}) => {
  return (
    <section className="bg-white border-b border-red-100 py-8 lg:py-12 transition-colors relative overflow-hidden">
      {/* Subtle top red radiant accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Top: Primary Headline, Deck & Metadata */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Lead Kicker with bright red badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-serif uppercase tracking-widest text-stone-500 mb-3">
              <span className="inline-flex items-center gap-1 text-red-600 font-bold bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px]">
                <Flame className="w-3 h-3 text-red-600 fill-red-600" />
                <span>Lead Dispatch</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-stone-700">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{formatRelativeTime(article.publishedAt)}</span>
            </div>

            {/* Dominant Editorial Headline */}
            <h1
              onClick={() => onSelectArticle(article)}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight hover:text-red-700 cursor-pointer transition-colors balance-text mb-4"
            >
              {article.title}
            </h1>

            {/* Editorial Deck / Summary */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mb-6 font-serif">
              {article.summary}
            </p>

            {/* Bylines & Action Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 text-xs sm:text-sm text-stone-500">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-900">
                  {article.author || 'Ecclesia Staff & Wire Reports'}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-stone-700">{article.sourceName}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTimeMinutes || 4} min read</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-sm transition-all shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Report</span>
                </button>

                <a
                  href={article.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-700 hover:text-red-700 bg-stone-50 hover:bg-red-50 rounded-sm border border-stone-300 hover:border-red-200 transition-colors"
                  title="Open full external publication"
                >
                  <span>Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right / Bottom: Lead Visual Container */}
          <div
            onClick={() => onSelectArticle(article)}
            className="lg:col-span-5 cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-sm shadow-md group-hover:shadow-xl group-hover:border-red-300 border border-stone-200 transition-all">
              <ArticleImage
                src={article.imageUrl}
                alt={article.title}
                category={article.category}
                aspectRatio="4/3"
                className="group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="font-serif text-xs text-stone-500 italic mt-2 text-right">
              Wire imagery · <span className="text-red-800 font-medium">{article.sourceName}</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
