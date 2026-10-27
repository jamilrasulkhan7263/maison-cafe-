import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Navigation,
  Wifi,
  Sparkles,
  Car,
  Dog,
  ExternalLink,
} from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [storeStatus, setStoreStatus] = useState<{
    isOpen: boolean;
    statusText: string;
    subText: string;
    currentTimeStr: string;
  }>({
    isOpen: false,
    statusText: 'Checking...',
    subText: '',
    currentTimeStr: '',
  });

  // Calculate live store status based on local system time (7:30 AM to 10:30 PM)
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      const openMinutes = 7 * 60 + 30; // 07:30 AM (450 mins)
      const closeMinutes = 22 * 60 + 30; // 10:30 PM (1350 mins)

      const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

      const timeFormatter = new Intl.DateTimeFormat('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });

      const currentTimeStr = timeFormatter.format(now);

      if (isOpen) {
        setStoreStatus({
          isOpen: true,
          statusText: 'Open Now',
          subText: 'Closes at 10:30 PM tonight',
          currentTimeStr,
        });
      } else {
        const opensNext =
          currentMinutes < openMinutes
            ? 'Opens today at 7:30 AM'
            : 'Opens tomorrow at 7:30 AM';
        setStoreStatus({
          isOpen: false,
          statusText: 'Closed Now',
          subText: opensNext,
          currentTimeStr,
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="location" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8FB4AC]" />
            <span className="text-[11px] font-tech font-bold uppercase tracking-[0.2em] text-[#263238]/70">
              Sanctuary & Roastery
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263238] tracking-tight mb-4">
            Visit Our{' '}
            <span className="font-editorial italic font-normal text-[#263238]/85">
              Sanctuary
            </span>
          </h2>
          <p className="text-[#263238]/75 text-sm sm:text-base leading-relaxed font-normal">
            Nestled under lush rain trees in Indiranagar. Drop by for your morning single-origin pour-over or an evening espresso tonic.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Live Status Badge, Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#D7CCC8]/50 backdrop-blur-md rounded-[2.5rem] p-6 sm:p-8 border border-white/80 shadow-bespoke">
              {/* Dynamic Live Store Status Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-[#263238]/10 mb-6">
                <div>
                  <span className="text-[11px] font-tech text-[#263238]/60 uppercase tracking-widest block mb-1">
                    Store Status (Live)
                  </span>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        storeStatus.isOpen
                          ? 'bg-emerald-500/15 text-emerald-800 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-800 border border-amber-500/30'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          storeStatus.isOpen ? 'bg-emerald-600' : 'bg-amber-600'
                        }`}
                      />
                      {storeStatus.statusText}
                    </span>
                    <span className="text-xs text-[#263238]/70 font-medium">
                      {storeStatus.subText}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-tech text-[#263238]/50 uppercase tracking-wider block">
                    Local Time
                  </span>
                  <span className="text-xs font-tech font-bold text-[#263238]">
                    {storeStatus.currentTimeStr}
                  </span>
                </div>
              </div>

              {/* Address details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#8FB4AC]/20 text-[#263238] shrink-0 mt-0.5 border border-white">
                    <MapPin className="w-4 h-4 text-[#263238]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider font-tech mb-0.5">
                      Flagship Roastery
                    </h4>
                    <p className="text-sm text-[#263238]/80 leading-snug">
                      14, Roastery Lane, 12th Main Road, Indiranagar, Bengaluru, Karnataka 560038
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#8FB4AC]/20 text-[#263238] shrink-0 border border-white">
                    <Phone className="w-4 h-4 text-[#263238]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider font-tech mb-0.5">
                      Concierge
                    </h4>
                    <p className="text-sm text-[#263238]/80 font-tech">
                      +91 80 4123 9087 / +91 98450 11203
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#8FB4AC]/20 text-[#263238] shrink-0 border border-white">
                    <Mail className="w-4 h-4 text-[#263238]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider font-tech mb-0.5">
                      General Enquiries
                    </h4>
                    <p className="text-sm text-[#263238]/80 font-tech">
                      hello@maisonmoka.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="pt-4 border-t border-[#263238]/10">
                <h4 className="text-xs font-bold text-[#263238] uppercase tracking-wider font-tech mb-3 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#8FB4AC]" />
                  <span>Operating Schedule</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#263238]/5">
                    <span className="text-[#263238]/70">Monday - Friday</span>
                    <span className="font-semibold text-[#263238]">07:30 AM – 10:30 PM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#263238]/5">
                    <span className="text-[#263238]/70">Saturday - Sunday</span>
                    <span className="font-semibold text-[#263238]">07:00 AM – 11:00 PM</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#263238]/70">Cupping & Tasting Lab</span>
                    <span className="font-semibold text-[#8FB4AC]">Sat 10:00 AM – 12:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Café Amenities Pill bar */}
            <div className="glass-panel p-4 rounded-2xl flex items-center justify-around text-[#263238]/80 text-xs">
              <div className="flex items-center gap-1.5" title="Gigabit Wi-Fi">
                <Wifi className="w-3.5 h-3.5 text-[#8FB4AC]" />
                <span className="hidden sm:inline">Gigabit Wi-Fi</span>
                <span className="sm:hidden">Wi-Fi</span>
              </div>
              <div className="w-px h-4 bg-[#263238]/10" />
              <div className="flex items-center gap-1.5" title="Dog Friendly Verandah">
                <Dog className="w-3.5 h-3.5 text-[#8FB4AC]" />
                <span>Pet Patio</span>
              </div>
              <div className="w-px h-4 bg-[#263238]/10" />
              <div className="flex items-center gap-1.5" title="Valet Parking">
                <Car className="w-3.5 h-3.5 text-[#8FB4AC]" />
                <span>Valet</span>
              </div>
            </div>
          </div>

          {/* Right Column: Google Map Placeholder with Stylized Interactive Aesthetic */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-4 sm:p-5 border border-white/80 shadow-lg h-full flex flex-col justify-between overflow-hidden relative">
              {/* Top map bar */}
              <div className="flex items-center justify-between pb-3 px-2 border-b border-[#263238]/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#8FB4AC]" />
                  <span className="text-xs font-bold font-tech text-[#263238] uppercase tracking-wider">
                    Bengaluru Roastery Coordinates: 12.9716° N, 77.6412° E
                  </span>
                </div>
                <a
                  href="https://maps.google.com/?q=Indiranagar+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#263238] hover:text-[#8FB4AC] transition-colors"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Styled Vector Map Visualizer */}
              <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-[#D8DBDD] border border-white/60 flex items-center justify-center">
                {/* Vector map roads & greenery grid mockup */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                  {/* Grid Lines */}
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="mapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#263238" strokeWidth="0.8" opacity="0.15" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#mapGrid)" />
                    {/* Simulated main arterial avenues */}
                    <line x1="0" y1="35%" x2="100%" y2="45%" stroke="#ffffff" strokeWidth="10" />
                    <line x1="25%" y1="0" x2="35%" y2="100%" stroke="#ffffff" strokeWidth="8" />
                    <line x1="60%" y1="0" x2="70%" y2="100%" stroke="#ffffff" strokeWidth="12" />
                    <line x1="0" y1="75%" x2="100%" y2="65%" stroke="#ffffff" strokeWidth="6" />

                    {/* Green park zone */}
                    <rect x="42%" y="15%" width="22%" height="24%" rx="16" fill="#8FB4AC" opacity="0.3" />
                    <text x="45%" y="28%" fill="#263238" fontSize="10" opacity="0.6" fontWeight="bold">
                      INDIRANAGAR PARK
                    </text>
                  </svg>
                </div>

                {/* Central Roastery Marker with Pulse Ring */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#8FB4AC] text-[#263238] flex items-center justify-center shadow-lg border-2 border-white transform hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-[#263238]" />
                    </div>
                    <div className="absolute -inset-2 rounded-full border-2 border-[#8FB4AC]/60 animate-ping pointer-events-none" />
                  </div>

                  {/* Marker Tooltip Card */}
                  <div className="mt-3 glass-panel px-4 py-2.5 rounded-xl text-center shadow-lg border border-white max-w-[220px]">
                    <span className="font-serif-luxury font-bold text-xs text-[#263238] block">
                      Maison Moka Flagship
                    </span>
                    <span className="text-[10px] text-[#263238]/70 block font-tech mt-0.5">
                      12th Main, Indiranagar
                    </span>
                    <span className="text-[9px] font-bold text-[#8FB4AC] block mt-1 uppercase tracking-wider">
                      ★ 4.9 Rating (840+ Reviews)
                    </span>
                  </div>
                </div>

                {/* Get Directions overlay CTA */}
                <div className="absolute bottom-4 right-4 z-10">
                  <a
                    href="https://maps.google.com/?q=Indiranagar+Bangalore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#263238] hover:bg-[#34444c] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all duration-200"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#8FB4AC]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
