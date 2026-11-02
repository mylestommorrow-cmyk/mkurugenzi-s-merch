import React from 'react';
import { ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-100/70 border-t border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
            Provenance & Material Invariants
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
            Engineered for Decade-Long Longevity.
          </h2>
          <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
            Fast fashion relies on lightweight 140 GSM poly-blends that deform after three washes. Atelier Nord works exclusively with heritage mills in Izmir, Biella, and Okayama to develop dense textiles designed to mature with wear.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-lg border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-md bg-neutral-900 text-white flex items-center justify-center">
              <span className="font-mono text-xs font-bold">340</span>
            </div>
            <h3 className="font-display text-base font-bold text-neutral-950">
              Heavyweight Aegean Jersey
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Knitted on slow circular looms from long-staple organic cotton. At 340 grams per square meter, our shirts maintain a crisp architectural drape without clinging to the body.
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Double-needle bound collar (No bacon neck)</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-lg border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-md bg-neutral-900 text-white flex items-center justify-center">
              <span className="font-mono text-xs font-bold">680</span>
            </div>
            <h3 className="font-display text-base font-bold text-neutral-950">
              Double-Faced Biella Wool
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Milled in Piedmont, Italy. Dense Melton virgin wool treated with a natural water-shedding finish. Provides windproof shelter down to -5°C while remaining breathable indoors.
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Full cupro lining & horn buckle detailing</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-lg border border-neutral-200/90 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-md bg-neutral-900 text-white flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display text-base font-bold text-neutral-950">
              Architectural Headwear Craft
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Our 6-panel caps utilize heavy buckram structured front panels and vegetable-tanned leather cinch straps. Our beanies are spun from 7-gauge Scottish cashmere on circular 3D beds.
            </p>
            <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900" />
              <span>Antiqued brass hardware & seamless crowns</span>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Testimonial / Customer Review Adjacency */}
        <div className="mt-12 bg-white rounded-lg border border-neutral-200 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <span className="font-semibold text-neutral-950">Marcus Lindqvist</span>
              <span aria-hidden="true">·</span>
              <span>Architect & Verified Collector</span>
              <span aria-hidden="true">·</span>
              <span>Stockholm, Sweden</span>
            </div>
            <p className="text-sm text-neutral-800 italic leading-relaxed">
              "The weight of the 340 GSM shirt completely changes how a tee sits under an overcoat. The trench collar retains its crisp fold even after daily commutes through autumn rain. Outstanding construction."
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-8 text-xs font-mono">
            <ShieldCheck className="w-5 h-5 text-neutral-900" />
            <div>
              <div className="font-bold text-neutral-950">Archival Grade Quality</div>
              <div className="text-neutral-500">4.9/5 Average across 1,280+ orders</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
