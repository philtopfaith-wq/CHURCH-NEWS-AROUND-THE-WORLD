import React from 'react';
import { CONFIGURED_PROVIDERS, MOCK_PROVIDER_CONFIG } from '../config/providers';
import { ExternalLink, ShieldCheck, Cpu, Database, EyeOff, Radio, Phone, Award, Sparkles } from 'lucide-react';
import { ChurchCrossIcon } from './EditorialIcon';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 pb-8 border-b border-red-200">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-white shadow-md flex items-center justify-center mx-auto text-white mb-2">
          <ChurchCrossIcon className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          About Ecclesia <span className="text-red-600">News</span>
        </h1>
        <p className="font-serif text-stone-600 italic text-base sm:text-lg max-w-xl mx-auto">
          A modern, stateless browser chronicle dedicated to global church affairs, parish renewal, sacred arts, and Christian journalism.
        </p>
      </div>

      {/* Creator Spotlight Section */}
      <section className="bg-gradient-to-br from-red-800 via-red-700 to-rose-900 text-white rounded-sm p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ChurchCrossIcon className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-red-100">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Application Engineering &amp; Design</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Created by Aboluwarin Temitope
          </h2>

          <p className="text-red-100 text-sm sm:text-base leading-relaxed font-serif">
            Ecclesia News was engineered and designed by <strong>Aboluwarin Temitope</strong> as a high-performance, stateless digital chronicle. Dedicated to delivering trustworthy Christian journalism and church ministry dispatches through an elegant, respectful, and resilient reading experience.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="tel:08166102920"
              className="inline-flex items-center gap-2 bg-white text-red-800 hover:bg-red-50 hover:text-red-900 font-bold px-5 py-2.5 rounded-full text-sm shadow-md transition-transform hover:scale-105"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>Call: 08166102920</span>
            </a>
            <span className="text-xs text-red-200">
              Direct Contact · Inquiries &amp; System Inquiries
            </span>
          </div>
        </div>
      </section>

      {/* Core Architectural Tenets */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900 tracking-tight border-b border-red-200 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span>Architectural Transparency &amp; Philosophy</span>
        </h2>
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          Ecclesia News was engineered from the ground up as a pure, client-side, privacy-respecting browser application. We believe digital reading should be fast, quiet, uncluttered, and sovereign.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 bg-white border border-stone-200 hover:border-red-300 hover:shadow-sm rounded-sm transition-all space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-red-700 text-sm">
              <EyeOff className="w-4 h-4 text-red-600" />
              <span>Zero User Tracking &amp; No Accounts</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              No logins, no cookies, no profiling, and no advertising trackers. Your reading habits remain entirely inside your personal browser window.
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 hover:border-red-300 hover:shadow-sm rounded-sm transition-all space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-red-700 text-sm">
              <Database className="w-4 h-4 text-red-600" />
              <span>No Remote Database</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              We store zero server records. Temporary caching relies strictly on your browser&rsquo;s standard localStorage for offline reading and instant page loads.
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 hover:border-red-300 hover:shadow-sm rounded-sm transition-all space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-red-700 text-sm">
              <Cpu className="w-4 h-4 text-red-600" />
              <span>Client-Side Aggregation &amp; Deduplication</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              News normalization, deduplication, and cross-provider sorting happen right in your device using modern web standards.
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 hover:border-red-300 hover:shadow-sm rounded-sm transition-all space-y-2">
            <div className="flex items-center gap-2 font-serif font-bold text-red-700 text-sm">
              <Radio className="w-4 h-4 text-red-600" />
              <span>Provider Isolation &amp; Resilience</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-serif">
              If an individual church wire endpoint fails or enforces strict CORS barriers, the application isolates the error, keeps working seamlessly, and falls back to verified dispatches.
            </p>
          </div>

        </div>
      </section>

      {/* Syndication & Attribution Policy */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900 tracking-tight border-b border-red-200 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span>Original Source Policy &amp; Attribution</span>
        </h2>
        <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
          Ecclesia News functions strictly as an indexing chronicle. We do not reproduce full copyrighted articles or claim ownership of reporting produced by external faith newsrooms. Every story card includes prominent attribution and a direct hyperlink to the original publisher&rsquo;s website.
        </p>

        <div className="bg-white border border-stone-200 rounded-sm divide-y divide-stone-100 overflow-hidden shadow-2xs">
          {CONFIGURED_PROVIDERS.map((provider) => (
            <div key={provider.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm hover:bg-red-50/30 transition-colors">
              <div>
                <h3 className="font-serif font-bold text-stone-900">
                  {provider.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 max-w-xl">
                  {provider.description}
                </p>
              </div>
              <a
                href={provider.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 hover:text-red-900 underline underline-offset-2 shrink-0"
              >
                <span>Visit Publication</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
          
          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm bg-red-50/50">
            <div>
              <h3 className="font-serif font-bold text-stone-900">
                {MOCK_PROVIDER_CONFIG.name}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5 max-w-xl">
                {MOCK_PROVIDER_CONFIG.description}
              </p>
            </div>
            <span className="text-xs font-mono text-red-700 font-semibold shrink-0">
              Offline Demonstration Wire
            </span>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-stone-900 tracking-tight border-b border-red-200 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
          <span>Stateless Privacy Declaration</span>
        </h2>
        <div className="p-5 bg-red-50/60 border border-red-200 rounded-sm text-xs sm:text-sm text-stone-700 space-y-2 leading-relaxed">
          <p>
            <strong>Personal Data:</strong> We collect zero personal data, email addresses, IP logs, or device fingerprints.
          </p>
          <p>
            <strong>Local Storage:</strong> Your browser stores only non-sensitive caching keys (e.g. recently fetched headlines and your active wire preferences) to provide offline capability and conserve network bandwidth. You may clear this cache at any time via the Wire Inspector.
          </p>
          <p>
            <strong>Third-Party Outbound Links:</strong> When you click &ldquo;Original Source&rdquo; or visit an external newsroom, you enter that publisher’s domain subject to their independent terms and privacy practices.
          </p>
        </div>
      </section>

    </div>
  );
};
