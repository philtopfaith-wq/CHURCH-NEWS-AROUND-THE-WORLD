import React from 'react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';
import { Sparkles } from 'lucide-react';

interface SecondaryFeaturesProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SecondaryFeatures: React.FC<SecondaryFeaturesProps> = ({
  articles,
  onSelectArticle,
}) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-10 bg-[#FAF8F5] border-b border-red-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-red-200 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-sm bg-red-100 text-red-600">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Curated Dispatches
            </h2>
          </div>
          <span className="text-xs font-serif uppercase tracking-widest text-red-600 font-bold">
            Selected Editions
          </span>
        </div>

        {/* 3-Column Structured Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelectArticle={onSelectArticle}
              layout="standard"
            />
          ))}
        </div>

      </div>
    </section>
  );
};
