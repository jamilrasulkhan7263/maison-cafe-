import React, { useState } from 'react';
import {
  Compass,
  Flame,
  Wheat,
  Coffee,
  Leaf,
  HeartHandshake,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
  Droplets,
  Thermometer,
  Layers,
  CheckCircle2,
  Instagram,
  Linkedin,
  FileText,
  Recycle,
  Sprout,
  Sun,
  Globe,
  Clock,
} from 'lucide-react';

interface CraftStep {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  shortDesc: string;
  icon: React.ReactNode;
  specs: {
    label: string;
    value: string;
  }[];
  deepDive: string;
  equipment: string;
}

export const AboutStoryPage: React.FC<{
  onExploreMenu: () => void;
  onBookTable: () => void;
}> = ({ onExploreMenu, onBookTable }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const craftSteps: CraftStep[] = [
    {
      id: 1,
      number: '01',
      title: 'Ethical Sourcing',
      subtitle: 'Shade-Grown Estate Selection',
      shortDesc:
        'We partner directly with smallholder coffee families in the Western Ghats at altitudes above 1,350m.',
      icon: <Leaf className="w-5 h-5" />,
      specs: [
        { label: 'Harvest Elevation', value: '1,350m – 1,550m' },
        { label: 'Sugar Ripeness', value: '22° Brix Red Cherry' },
        { label: 'Farm Price Premium', value: '+40% Over Fair Trade' },
      ],
      deepDive:
        'Every bean originates under native shade canopies of silver oak, jackfruit, and wild fig trees. Hand-harvested red cherries are float-sorted in mountain spring water before 18 days of slow patio sun-drying on raised African beds.',
      equipment: 'Raised African Drying Beds & Brix Refractometers',
    },
    {
      id: 2,
      number: '02',
      title: 'Small-Batch Roasting',
      subtitle: 'Cast-Iron Giesen Craft',
      shortDesc:
        'Roasted in 5kg micro-batches to preserve delicate floral and stone-fruit volatile aromatic compounds.',
      icon: <Flame className="w-5 h-5" />,
      specs: [
        { label: 'Batch Volume', value: '5 kg Max Load' },
        { label: 'Roast Profile', value: 'Light-Medium Nordic' },
        { label: 'First Crack Window', value: '8m 45s @ 196°C' },
      ],
      deepDive:
        'Our roaster monitors rate-of-rise (RoR) thermal curves in real time using dual infrared bean-probe sensors. We never scorch the beans; each roast curve is designed to showcase the harvest’s innate sweetness and terroir.',
      equipment: 'Giesen W6A Cast-Iron Drum Roaster',
    },
    {
      id: 3,
      number: '03',
      title: 'Precision Grinding & Brewing',
      subtitle: 'Micron-Level Extraction',
      shortDesc:
        'Ground on 83mm DLC flat burrs and brewed using mineral-tuned water at strict 93.5°C thermal stability.',
      icon: <Thermometer className="w-5 h-5" />,
      specs: [
        { label: 'Burr Geometry', value: '83mm Flat Ceramic' },
        { label: 'Brew Temperature', value: '93.5°C (±0.2°C PID)' },
        { label: 'Extraction Ratio', value: '1:16.5 Ratio Target' },
      ],
      deepDive:
        'We tailor water mineral composition to 120 ppm TDS with balanced magnesium-to-calcium ions. Whether pulling double ristrettos on saturated group heads or slow pour-overs via origami drippers, extraction is measured with optical refractometers.',
      equipment: 'Synesso MVP Hydra & Mazzer ZM Grinders',
    },
    {
      id: 4,
      number: '04',
      title: 'Serving with Care',
      subtitle: 'Ceramic Stoneware Rituals',
      shortDesc:
        'Poured into handcrafted stoneware cups and served at the optimal 65°C sipping temperature with warm hospitality.',
      icon: <Coffee className="w-5 h-5" />,
      specs: [
        { label: 'Sipping Temp', value: '64°C – 66°C' },
        { label: 'Milk Microfoam', value: 'Silky 0.2mm Honeycomb' },
        { label: 'Vessel Material', value: 'Hand-Thrown Stoneware' },
      ],
      deepDive:
        'A great cup is a quiet ceremony. Our baristas pair each cup with origin cards noting farmer provenance, harvest altitude, and flavor evolution as the liquid cools from hot to warm.',
      equipment: 'Local Artisanal Ceramic Stoneware',
    },
  ];

  const currentCraft = craftSteps.find((s) => s.id === activeStep) || craftSteps[0];

  const teamMembers = [
    {
      name: 'Aarav Sen',
      role: 'Co-Founder & Head Roaster',
      badge: 'Licensed Q-Grader',
      bio: 'Third-generation coffee planter with 12 years behind the roasting drum. Certified SCA sensory judge obsessed with light-roast terroir clarity.',
      specialty: 'Micro-Lot Thermal Profiling',
      imageEmoji: '👨‍🌾',
      instagram: '@aarav.roasts',
      linkedin: 'aarav-sen-coffee',
    },
    {
      name: 'Maya Deshmukh',
      role: 'Master Pastry Chef',
      badge: 'Master Viennoiserie',
      bio: 'Trained at École Ducasse in Paris. Maya oversees our 48-hour sourdough fermentations and morning laminated pastry ovens with Normandy cultured butter.',
      specialty: '84% Butter Honeycomb Laminations',
      imageEmoji: '👩‍🍳',
      instagram: '@maya.bakes',
      linkedin: 'maya-deshmukh-chef',
    },
    {
      name: 'Karan Bopanna',
      role: 'Estate Agronomy Liaison',
      badge: 'Soil & Canopy Specialist',
      bio: 'Directly coordinates our estate partnerships in Chikmagalur and Coorg, ensuring organic soil enrichment and shade canopy biodiversity.',
      specialty: 'Regenerative Western Ghats Agroforestry',
      imageEmoji: '🌿',
      instagram: '@karan.agro',
      linkedin: 'karan-bopanna',
    },
    {
      name: 'Nila Varma',
      role: 'Lead Barista & Sensory Educator',
      badge: 'Sensory Guild Lead',
      bio: 'National Barista Championship finalist specializing in pour-over extraction physics and Saturday morning guest cupping workshops.',
      specialty: 'Slow Borosilicate Pour-Over Alchemy',
      imageEmoji: '☕',
      instagram: '@nila.brews',
      linkedin: 'nila-varma-barista',
    },
  ];

  return (
    <div className="min-h-screen bg-[#E2E3E5] text-[#263238] pb-24 animate-in fade-in duration-300">
      {/* 1. Header Hero Banner */}
      <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Zero-Pill Discipline Header Kicker */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8FB4AC] animate-pulse" />
              <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#263238]/70">
                Our Story · Page 3 · Agrarian Roots &amp; Craft
              </span>
            </div>

            <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black text-[#263238] tracking-tight mb-6 leading-[1.08] text-balance">
              Where Soil, Smoke &amp; Slow Hospitality Meet
            </h1>

            <p className="font-editorial italic text-base sm:text-xl text-[#263238]/85 leading-relaxed max-w-2xl mx-auto">
              Maison Moka was founded on a simple promise: honoring the agrarian integrity of shade-grown Indian coffee and bringing mindful French viennoiserie baking to our neighborhood.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Brand Journey & Philosophy Section (2-Column Layout) */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#D7CCC8]/70 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-white/85 shadow-[0_20px_50px_rgba(38,50,56,0.06)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Rich narrative heading & text */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/70">
                  <Sprout className="w-4 h-4 text-[#8FB4AC]" />
                  <span>Western Ghats Provenance</span>
                </div>

                <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-black text-[#263238] leading-tight tracking-tight text-balance">
                  Rooted in Tradition, Crafted with Precision
                </h2>

                <p className="font-sans-body text-sm sm:text-base text-[#263238]/85 leading-relaxed">
                  High along the misty slopes of Chikmagalur, coffee is not grown as an industrial monoculture. It thrives under a protective canopy of indigenous rain trees, surrounded by pepper vines, wild cardamom, and mandarin groves.
                </p>

                <p className="font-sans-body text-sm sm:text-base text-[#263238]/85 leading-relaxed">
                  We trade directly with estate families, paying a guaranteed minimum 40% premium over world market commodity rates. This enables our partner farmers to hand-pick only crimson-red cherries at peak sweetness (22° Brix) and invest in water-conserving eco-pulpers and living wages for harvest workers.
                </p>

                {/* Key Provenance Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#263238]/15">
                  <div className="bg-white/70 p-4 rounded-2xl border border-white text-center shadow-2xs">
                    <span className="font-headline text-xl sm:text-2xl font-black text-[#263238] block">
                      1,450m
                    </span>
                    <span className="text-[10px] font-tech text-[#263238]/70 uppercase tracking-wider">
                      Peak Elevation
                    </span>
                  </div>
                  <div className="bg-white/70 p-4 rounded-2xl border border-white text-center shadow-2xs">
                    <span className="font-headline text-xl sm:text-2xl font-black text-[#263238] block">
                      +40%
                    </span>
                    <span className="text-[10px] font-tech text-[#263238]/70 uppercase tracking-wider">
                      Farmer Premium
                    </span>
                  </div>
                  <div className="bg-white/70 p-4 rounded-2xl border border-white text-center shadow-2xs">
                    <span className="font-headline text-xl sm:text-2xl font-black text-[#263238] block">
                      100%
                    </span>
                    <span className="text-[10px] font-tech text-[#263238]/70 uppercase tracking-wider">
                      Shade Grown
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Stylized visual card container with atmospheric detail */}
              <div className="lg:col-span-5">
                <div className="bg-[#D7CCC8] rounded-3xl p-8 border border-white/90 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between pb-4 border-b border-[#263238]/15 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#8FB4AC] flex items-center justify-center text-[#263238]">
                        <Compass className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#263238]">
                        Single Estate Blueprint
                      </span>
                    </div>
                    <span className="text-[10px] font-tech font-bold bg-white/70 px-2.5 py-1 rounded-full text-[#263238]">
                      Batch Log #892
                    </span>
                  </div>

                  {/* Stylized Visual Diagram */}
                  <div className="bg-white/80 rounded-2xl p-6 border border-white space-y-4 mb-6 shadow-2xs">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#263238]/60 font-tech">Estate Region</span>
                      <span className="font-bold text-[#263238]">Chikmagalur & Wayanad</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#263238]/60 font-tech">Processing Method</span>
                      <span className="font-bold text-[#263238]">Slow Ferment Washed & Natural</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#263238]/60 font-tech">Hearth Bakery Yeast</span>
                      <span className="font-bold text-[#263238]">100% Wild Sourdough Mother</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#263238]/60 font-tech">Lamination Butter</span>
                      <span className="font-bold text-[#8FB4AC]">84% Normandy Cultured</span>
                    </div>
                  </div>

                  <blockquote className="font-serif-luxury text-base text-[#263238] italic leading-snug mb-4">
                    "We do not mask acidity with dark roasts. We gently roast to reveal the apricot, cardamom, and hazelnut notes gifted by the soil."
                  </blockquote>

                  <div className="flex items-center gap-2 text-xs font-tech text-[#263238]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8FB4AC]" />
                    <span>Maison Roasting Laboratory • Certified Specialty Lot</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive 4-Step Craft Process Visualizer */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#D7CCC8] mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#8FB4AC]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#263238] font-tech">
                The 4-Step Craft Process
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263238] mb-3">
              Precision from Cherry to Ceramic Cup
            </h2>
            <p className="text-[#263238]/75 text-sm sm:text-base leading-relaxed">
              Click each craft phase below to inspect roasting curves, micron grind calibration, and our slow pour methods.
            </p>
          </div>

          {/* Stepper Navigation: 4 Warm Oat (#D7CCC8) Cards with Mint (#8FB4AC) Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {craftSteps.map((step) => {
              const isActive = step.id === activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-6 rounded-3xl text-left transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                    isActive
                      ? 'bg-[#D7CCC8] border-[#8FB4AC] shadow-lg -translate-y-1'
                      : 'bg-[#D7CCC8]/60 hover:bg-[#D7CCC8] border-white/80 shadow-2xs'
                  }`}
                >
                  {/* Mint highlight indicator line for active steps */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 ${
                      isActive ? 'bg-[#8FB4AC] opacity-100' : 'bg-transparent opacity-0'
                    }`}
                  />

                  <div className="flex items-center justify-between mb-4">
                    <span className="font-tech text-xs font-bold uppercase tracking-widest text-[#263238]/50">
                      Step {step.number}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#8FB4AC] text-[#263238] shadow-2xs'
                          : 'bg-white/70 text-[#263238]/70'
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-lg font-bold text-[#263238] mb-1">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-tech text-[#8FB4AC] font-bold block mb-2">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-[#263238]/75 leading-relaxed line-clamp-2">
                    {step.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Inspector Panel */}
          <div className="bg-[#D7CCC8] rounded-3xl p-8 sm:p-10 border border-white/90 shadow-xl animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-tech uppercase tracking-wider text-[#263238]/60 font-bold">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8FB4AC] text-[#263238]">
                    Phase {currentCraft.number} Deep Dive
                  </span>
                  <span>{currentCraft.title}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#263238]">
                  {currentCraft.subtitle}
                </h3>

                <p className="text-sm text-[#263238]/85 leading-relaxed">
                  {currentCraft.deepDive}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-tech text-[#263238]/70">
                  <CheckCircle2 className="w-4 h-4 text-[#8FB4AC]" />
                  <span>Equipment: {currentCraft.equipment}</span>
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="lg:col-span-5 space-y-3">
                <div className="bg-white/80 rounded-2xl p-5 border border-white space-y-3">
                  <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#263238]/60 block pb-2 border-b border-[#263238]/10">
                    Scientific Parameters
                  </span>
                  {currentCraft.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center text-xs">
                      <span className="text-[#263238]/70">{spec.label}</span>
                      <span className="font-tech font-bold text-[#263238] bg-[#E2E3E5] px-2.5 py-1 rounded-lg">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Meet the Roasters & Master Bakers Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#D7CCC8] mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#8FB4AC]" />
              <span className="text-xs font-semibold tracking-wider uppercase text-[#263238] font-tech">
                The Artisans Behind the Cup
              </span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263238] mb-3">
              Meet the Roasters & Master Bakers
            </h2>
            <p className="text-[#263238]/75 text-sm sm:text-base leading-relaxed">
              Every bean roasted and every croissant laminated is guided by artisans dedicated to slow food values.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[#D7CCC8] rounded-3xl p-6 sm:p-7 border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group"
              >
                <div>
                  {/* Avatar / Portrait placeholder */}
                  <div className="w-16 h-16 rounded-2xl bg-white/90 flex items-center justify-center text-3xl mb-5 shadow-xs border border-white group-hover:scale-105 transition-transform duration-200">
                    {member.imageEmoji}
                  </div>

                  {/* Specialty Badge */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-tech font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#8FB4AC] text-[#263238] shadow-2xs mb-2">
                    <Award className="w-3 h-3 text-[#263238]" />
                    {member.badge}
                  </span>

                  {/* Name & Role */}
                  <h3 className="font-serif-luxury text-xl font-bold text-[#263238] mb-1">
                    {member.name}
                  </h3>
                  <span className="text-xs font-tech text-[#263238]/70 block mb-3 font-semibold">
                    {member.role}
                  </span>

                  {/* Bio */}
                  <p className="text-xs text-[#263238]/80 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                {/* Specialty focus note & social links */}
                <div className="pt-3 border-t border-[#263238]/10 mt-auto">
                  <span className="text-[10px] font-tech text-[#263238]/60 uppercase block mb-1">
                    Specialty Craft
                  </span>
                  <span className="text-xs font-bold text-[#263238] block mb-3">
                    {member.specialty}
                  </span>

                  <div className="flex items-center gap-2">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/70 hover:bg-white text-[#263238] transition-colors border border-white text-xs flex items-center gap-1 font-tech"
                      title={member.instagram}
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/70 hover:bg-white text-[#263238] transition-colors border border-white text-xs flex items-center gap-1 font-tech"
                      title={member.linkedin}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sustainability & Local Farming Banner (Full-Width Highlighted Banner) */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#D7CCC8] rounded-3xl p-8 sm:p-12 lg:p-14 border border-white/90 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-xs font-tech font-bold uppercase tracking-wider text-[#263238] mb-3">
                <Recycle className="w-3.5 h-3.5 text-[#8FB4AC]" />
                <span>Our Regenerative Pledge</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263238] mb-4">
                Sustaining the Soil that Sustains Our Craft
              </h2>
              <p className="text-sm sm:text-base text-[#263238]/80 leading-relaxed">
                We believe true artisanal luxury leaves the earth richer than it was found. From 100% home-compostable bean pouches to closed-loop bakery operations, sustainability is engineered into every daily decision.
              </p>
            </div>

            {/* 3 Sustainability Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Pillar 1 */}
              <div className="bg-white/85 rounded-2xl p-6 border border-white shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#8FB4AC]/25 flex items-center justify-center text-[#263238] mb-4">
                  <Sprout className="w-5 h-5" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-[#263238] mb-2">
                  Zero-Waste Spent Grounds
                </h4>
                <p className="text-xs text-[#263238]/75 leading-relaxed">
                  100% of our daily espresso cake pucks and chaff are collected and donated to local urban permaculture gardens as nitrogen-rich soil compost.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white/85 rounded-2xl p-6 border border-white shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#8FB4AC]/25 flex items-center justify-center text-[#263238] mb-4">
                  <Leaf className="w-5 h-5" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-[#263238] mb-2">
                  100% Compostable Packaging
                </h4>
                <p className="text-xs text-[#263238]/75 leading-relaxed">
                  Our retail bean pouches, takeaway cups, and pastry sleeves use unbleached sugarcane bagasse and plant-starch liners with zero petroleum plastics.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white/85 rounded-2xl p-6 border border-white shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#8FB4AC]/25 flex items-center justify-center text-[#263238] mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-serif-luxury text-lg font-bold text-[#263238] mb-2">
                  Multi-Year Farm Contracts
                </h4>
                <p className="text-xs text-[#263238]/75 leading-relaxed">
                  We commit to 3-to-5 year purchasing agreements with our estate growers, shielding family farms from global commodity market volatility.
                </p>
              </div>
            </div>

            {/* Bottom Callout Actions */}
            <div className="pt-6 border-t border-[#263238]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-tech text-[#263238]/70">
                Experience our single-origin coffees and 48h sourdough in person or via WhatsApp.
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={onExploreMenu}
                  className="px-6 py-3 rounded-xl bg-[#8FB4AC] hover:bg-[#7fa79f] text-[#263238] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer"
                >
                  Explore Menu (Page 2)
                </button>
                <button
                  onClick={onBookTable}
                  className="px-6 py-3 rounded-xl bg-[#263238] hover:bg-[#34444c] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  Book a Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
