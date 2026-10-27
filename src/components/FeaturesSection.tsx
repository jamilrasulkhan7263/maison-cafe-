import React from 'react';
import { Flame, Wheat, Laptop, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  highlights: string[];
}

export const FeaturesSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      id: 'roasting',
      title: 'Artisanal Roasting',
      tagline: 'Micro-Batch Profiles',
      description:
        'Crafted on our cast-iron Giesen drum roaster in 5kg micro-batches. We calibrate rate-of-rise (RoR) precisely for each harvest to accentuate origin sweetness and floral acidity.',
      icon: <Flame className="w-6 h-6 text-[#8FB4AC]" />,
      highlights: [
        'Single Estate Chikmagalur & Araku lots',
        'Light & Medium Nordic roast profiles',
        'Weekly cupping scores of 86+ SCA points',
      ],
    },
    {
      id: 'bakery',
      title: 'Organic Bakery',
      tagline: '48h Ferment Viennoiserie',
      description:
        'Our bakers begin before dawn, hand-laminating wild sourdough pastry with 84% Normandy cultured butter for 27 airy honeycomb layers with an unmistakable buttery crunch.',
      icon: <Wheat className="w-6 h-6 text-[#8FB4AC]" />,
      highlights: [
        'Stoneground heirloom unbleached flours',
        'Normandy cultured butter 84% fat',
        'Warm batches fresh out of oven at 6:30 AM',
      ],
    },
    {
      id: 'work-haven',
      title: 'Cozy Work Haven',
      tagline: 'Mindful Focus Spaces',
      description:
        'A warm, sun-drenched sanctuary designed for creators, remote workers, and quiet conversations. Featuring acoustic warmth, dedicated power at every seat, and lush garden greenery.',
      icon: <Laptop className="w-6 h-6 text-[#8FB4AC]" />,
      highlights: [
        'Dedicated 500 Mbps fiber optic Wi-Fi',
        'Ergonomic oak tables & power sockets',
        'Pet-friendly open-air rain tree verandah',
      ],
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#8FB4AC] animate-pulse" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#263238]/70">
              The Maison Experience
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-[#263238] tracking-tight mb-4 text-balance">
            Curated Craft in Every Detail
          </h2>
          <p className="font-sans-body text-[#263238]/75 text-sm sm:text-base leading-relaxed">
            Three foundational pillars define our artisanal philosophy: honest small-batch roasting, timeless French pastry traditions, and spaces that inspire focus and serenity.
          </p>
        </div>

        {/* 3-Column Grid with asymmetrical organic border radiuses and soft ambient shadows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`bg-[#D7CCC8] p-8 sm:p-10 border border-white/85 shadow-[0_20px_50px_rgba(38,50,56,0.06)] hover:shadow-[0_30px_60px_rgba(38,50,56,0.12)] transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden ${
                index === 0
                  ? 'rounded-[2.5rem] md:rounded-tl-[3.5rem]'
                  : index === 2
                  ? 'rounded-[2.5rem] md:rounded-br-[3.5rem]'
                  : 'rounded-[2.5rem]'
              }`}
            >
              {/* Subtle top gloss accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#8FB4AC] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header with Mint Accent Icon and clean unboxed label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center shadow-xs border border-white group-hover:scale-105 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-[10px] font-tech uppercase tracking-[0.2em] font-bold text-[#263238]/60">
                    {feature.tagline}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline text-2xl font-bold text-[#263238] mb-3 group-hover:text-[#263238] transition-colors tracking-tight">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="font-sans-body text-xs sm:text-sm text-[#263238]/80 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Bullet Highlights */}
                <ul className="space-y-2.5 mb-6">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-[#263238]/90">
                      <div className="w-4 h-4 rounded-full bg-[#8FB4AC]/35 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#263238]" />
                      </div>
                      <span className="font-sans-body">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-4 border-t border-[#263238]/10 flex items-center justify-between text-xs font-semibold text-[#263238]">
                <span className="text-[#263238]/60 font-tech uppercase tracking-wider text-[11px]">
                  Signature Standard
                </span>
                <span className="font-headline font-bold text-xs uppercase tracking-wider text-[#263238] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="w-3.5 h-3.5 text-[#8FB4AC]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
