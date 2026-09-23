import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white border border-stone-200 p-4 rounded-xs animate-pulse space-y-3">
      {/* Image placeholder */}
      <div className="w-full aspect-[16/9] bg-stone-200 rounded-xs" />

      {/* Metadata kicker */}
      <div className="flex items-center gap-2">
        <div className="h-3 w-16 bg-stone-200 rounded" />
        <div className="h-3 w-3 bg-stone-200 rounded-full" />
        <div className="h-3 w-20 bg-stone-200 rounded" />
      </div>

      {/* Headline */}
      <div className="space-y-1.5 pt-1">
        <div className="h-4 w-full bg-stone-200 rounded" />
        <div className="h-4 w-4/5 bg-stone-200 rounded" />
      </div>

      {/* Summary lines */}
      <div className="space-y-1.5 pt-2">
        <div className="h-3 w-full bg-stone-100 rounded" />
        <div className="h-3 w-5/6 bg-stone-100 rounded" />
      </div>

      {/* Footer attribution */}
      <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
        <div className="h-3 w-24 bg-stone-200 rounded" />
        <div className="h-3 w-12 bg-stone-200 rounded" />
      </div>
    </div>
  );
};

export const SkeletonFeed: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
};
