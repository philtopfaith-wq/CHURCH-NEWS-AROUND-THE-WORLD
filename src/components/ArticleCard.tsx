import React from 'react';
import { Article } from '../types';
import { ArticleImage } from './ArticleImage';
import { formatRelativeTime } from '../utils/date';
import { ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  layout?: 'standard' | 'horizontal' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  layout = 'standard',
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSelectArticle(article);
  };

  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (layout === 'compact') {
    return (
      <article
        onClick={handleCardClick}
        className="group cursor-pointer py-3.5 border-b border-stone-200 hover:bg-red-50/40 px-2 rounded-sm transition-colors"
      >
        {/* Unboxed metadata with bright red category */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
          <span className="font-serif uppercase tracking-wider text-red-600 font-bold">
            {article.category}
          </span>
          <span aria-hidden="true" className="text-red-300">·</span>
          <span>{formatRelativeTime(article.publishedAt)}</span>
        </div>

        <h3 className="font-serif text-base font-semibold text-stone-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-stone-500 mt-2">
          <span className="font-medium text-stone-700">{article.sourceName}</span>
          <span>{article.readTimeMinutes || 3} min read</span>
        </div>
      </article>
    );
  }

  if (layout === 'horizontal') {
    return (
      <article
        onClick={handleCardClick}
        className="group cursor-pointer grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 bg-white border border-stone-200 hover:border-red-300 hover:shadow-md transition-all rounded-sm"
      >
        <div className="sm:col-span-4 overflow-hidden rounded-xs">
          <ArticleImage
            src={article.imageUrl}
            alt={article.title}
            category={article.category}
            aspectRatio="16/9"
            className="group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="sm:col-span-8 flex flex-col justify-between">
          <div>
            {/* Metadata with bright red category */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-1.5">
              <span className="font-serif uppercase tracking-wider text-red-600 font-bold">
                {article.category}
              </span>
              <span aria-hidden="true" className="text-red-300">·</span>
              <span className="text-stone-800 font-semibold">{article.sourceName}</span>
              <span aria-hidden="true">·</span>
              <span>{formatRelativeTime(article.publishedAt)}</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-red-700 transition-colors leading-snug balance-text mb-2">
              {article.title}
            </h3>

            <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed font-serif">
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 mt-3 pt-2 border-t border-stone-100">
            <span className="font-medium text-stone-700">{article.author || 'Ecclesia Staff & Wire'}</span>
            <div className="flex items-center gap-3">
              <span>{article.readTimeMinutes || 3} min read</span>
              <a
                href={article.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleExternalClick}
                className="text-stone-400 hover:text-red-600 transition-colors"
                title="Open original report on publisher website"
                aria-label="Open original report on publisher website"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard vertical card
  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col bg-white border border-stone-200 hover:border-red-300 hover:shadow-lg transition-all rounded-sm overflow-hidden"
    >
      <div className="overflow-hidden relative">
        <ArticleImage
          src={article.imageUrl}
          alt={article.title}
          category={article.category}
          aspectRatio="16/9"
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-red-600/90 text-white font-serif text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow-xs">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTimeMinutes || 3} min read</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-red-700 transition-colors leading-snug line-clamp-2 mb-2 balance-text">
            {article.title}
          </h3>

          <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed mb-4 font-serif">
            {article.summary}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100 mt-auto">
          <span className="font-semibold text-stone-800 truncate max-w-[160px]">
            {article.sourceName}
          </span>
          <a
            href={article.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleExternalClick}
            className="flex items-center gap-1 text-stone-400 hover:text-red-600 transition-colors font-medium"
            title="Read on original publisher website"
          >
            <span>Original</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </article>
  );
};
