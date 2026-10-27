import React from 'react';
import { Award, Leaf, HeartHandshake, Coffee } from 'lucide-react';

export const OurStorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#D7CCC8]/45 backdrop-blur-md rounded-[2.8rem] p-8 sm:p-12 lg:p-16 border border-white/80 shadow-bespoke">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FB4AC]" />
                <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/70">
                  Our Origins & Agrarian Ethos
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263238] tracking-tight leading-[1.12]">
                Rooted in the Soil of Chikmagalur,{' '}
                <span className="font-editorial italic font-normal text-[#263238]/85">
                  Roasted for Modern Minds
                </span>
              </h2>

              <p className="text-[#263238]/80 text-sm sm:text-base leading-relaxed">
                Founded in 2021 by two competitive baristas and a third-generation coffee planter, Maison Moka was born out of a desire for intentionality. We believe coffee is not a generic commodity to be gulped in haste, but an agrarian harvest shaped by rainfall, soil minerals, and careful processing.
              </p>

              <p className="text-[#263238]/80 text-sm sm:text-base leading-relaxed">
                By purchasing directly from estate partners at 40% above fair-trade prices, we foster sustainable biodiversity in the Western Ghats while bringing unprecedented terroir clarity to your ceramic cup.
              </p>

              {/* Unboxed Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#263238]/12">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf className="w-4 h-4 text-[#8FB4AC]" />
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider font-tech">Shade Grown</h4>
                  </div>
                  <p className="text-xs text-[#263238]/70 font-editorial italic">Zero monoculture, native canopy</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <HeartHandshake className="w-4 h-4 text-[#8FB4AC]" />
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider font-tech">Direct Trade</h4>
                  </div>
                  <p className="text-xs text-[#263238]/70 font-editorial italic">40% above fair-trade parity</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-[#8FB4AC]" />
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider font-tech">SCA 86+ Pts</h4>
                  </div>
                  <p className="text-xs text-[#263238]/70 font-editorial italic">Certified Q-Grader cupped</p>
                </div>
              </div>
            </div>

            {/* Bespoke Editorial Quote Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#D7CCC8] rounded-[2.5rem] rounded-tr-[4.5rem] p-8 sm:p-10 border border-white/90 shadow-bespoke hover:shadow-bespoke-hover transition-all duration-500 relative">
                <Coffee className="w-8 h-8 text-[#8FB4AC] mb-6" />
                <blockquote className="font-editorial italic text-xl sm:text-2xl text-[#263238] font-normal leading-relaxed mb-6">
                  “Great coffee does not yell; it lingers like warm morning light across an oak tabletop.”
                </blockquote>
                <div className="pt-4 border-t border-[#263238]/15 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#263238]">Aarav & Maya Sen</h4>
                    <p className="text-xs text-[#263238]/65 font-tech">Co-Founders & Head Roasters</p>
                  </div>
                  <span className="font-tech text-xs font-bold px-3 py-1 rounded-full bg-white/70 text-[#263238] border border-white/80">
                    Est. 2021
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
