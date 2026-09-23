import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { ArticleImage } from './ArticleImage';
import { formatFullDateTime, formatRelativeTime } from '../utils/date';
import { X, ExternalLink, Share2, Check, ArrowLeft, Phone, Heart } from 'lucide-react';
import { ArticleCard } from './ArticleCard';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  allArticles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  allArticles,
  onSelectArticle,
}) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [article]);

  if (!article) return null;

  const handleShare = async () => {
    const shareUrl = window.location.origin + `/article/${article.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find 3 related stories from the same category
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 lg:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-red-200/80 shadow-2xl rounded-sm overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent Red Top Hairline */}
        <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500" />
        
        {/* Modal Top Control Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md border-b border-stone-200">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-red-700 py-1 px-2.5 rounded-sm hover:bg-red-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-red-600" />
            <span>Back to Chronicle</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Share / Copy Link */}
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-red-700 px-3 py-1.5 rounded-sm border border-stone-300 hover:border-red-300 hover:bg-red-50 transition-colors"
              title="Share or copy article dispatch link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-red-600" />
                  <span className="text-red-700 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Direct Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-red-700 hover:bg-red-50 rounded-sm transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reading Body */}
        <div className="p-5 sm:p-8 md:p-12 space-y-6">
          
          {/* Unboxed Header Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-serif uppercase tracking-widest text-stone-500">
            <span className="text-red-600 font-bold">{article.category}</span>
            <span aria-hidden="true" className="text-red-300">·</span>
            <span className="font-semibold text-stone-800">{article.sourceName}</span>
            <span aria-hidden="true">·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>

          {/* Headline */}
          <h1
            id="article-modal-title"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-snug balance-text"
          >
            {article.title}
          </h1>

          {/* Bylines & Timestamps */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-stone-500 pb-6 border-b border-stone-200">
            <div>
              <span className="font-serif font-bold text-stone-900">
                {article.author || 'Ecclesia Staff & Wire Reports'}
              </span>
              <span className="mx-2 text-red-300" aria-hidden="true">·</span>
              <span>{formatFullDateTime(article.publishedAt)}</span>
            </div>
            <span className="font-medium text-stone-600">{article.readTimeMinutes || 3} min read</span>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="space-y-2">
              <div className="overflow-hidden rounded-sm border border-stone-200 shadow-sm">
                <ArticleImage
                  src={article.imageUrl}
                  alt={article.title}
                  category={article.category}
                  aspectRatio="16/9"
                />
              </div>
              <p className="font-serif text-xs text-stone-500 italic text-right">
                Editorial Wire Photo · Courtesy of <span className="font-medium text-stone-800">{article.sourceName}</span>
              </p>
            </div>
          )}

          {/* Article Editorial Content */}
          <div className="prose prose-stone max-w-none space-y-4 text-base sm:text-lg leading-relaxed text-stone-800">
            {article.contentHtml ? (
              <div
                className="space-y-4 editorial-dropcap font-serif"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />
            ) : (
              <div className="space-y-4">
                <p className="editorial-dropcap text-lg sm:text-xl font-serif text-stone-900 leading-relaxed">
                  {article.summary}
                </p>
                <div className="p-4 bg-red-50/70 border border-red-200 text-stone-800 rounded-sm text-sm">
                  <p className="font-bold text-red-900 mb-1">
                    Publisher Syndication Notice
                  </p>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    This story is syndicated directly from <strong>{article.sourceName}</strong> under news aggregator indexing guidelines. Full original reporting, complete transcripts, multimedia, and commentary reside on the primary publisher’s publication.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Primary External Attribution Button */}
          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-red-100 rounded-sm shadow-xs">
            <div>
              <span className="text-xs uppercase tracking-wider font-serif text-red-600 font-bold">
                Primary Publisher
              </span>
              <h4 className="font-serif text-base font-bold text-stone-900">
                {article.sourceName}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Support original Christian journalism by visiting the official release.
              </p>
            </div>

            <a
              href={article.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-xs sm:text-sm font-bold rounded-sm transition-all shadow-sm hover:shadow-md hover:shadow-red-500/20 shrink-0"
            >
              <span>Read on {article.sourceName}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Dedication Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-red-50 border border-red-200 rounded-sm text-xs text-stone-700">
            <div className="flex items-center gap-1.5 font-medium">
              <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>Ecclesia News · Created by <strong className="font-bold text-red-900">Aboluwarin Temitope</strong></span>
            </div>
            <a href="tel:08166102920" className="inline-flex items-center gap-1 font-bold text-red-700 hover:text-red-900 bg-white px-2 py-0.5 rounded shadow-2xs">
              <Phone className="w-3 h-3 text-red-600" />
              <span>08166102920</span>
            </a>
          </div>

          {/* Related Stories */}
          {relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-stone-300">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span>Related Dispatches in {article.category}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <ArticleCard
                    key={rel.id}
                    article={rel}
                    onSelectArticle={(a) => {
                      onSelectArticle(a);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    layout="compact"
                  />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
