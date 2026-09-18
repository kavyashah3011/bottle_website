import { useState } from 'react';
import { Check, X, ShieldCheck, Sparkles, Droplet } from 'lucide-react';

export function MineralComparator() {
  const [selectedProfile, setSelectedProfile] = useState<'botvor' | 'standard' | 'municipal'>('botvor');

  const comparisonData = [
    {
      metric: 'Alkaline pH Balance',
      botvor: 'pH 7.85 (Naturally Alkaline)',
      standard: 'pH 6.50 – 6.80 (Acidic / Treated)',
      municipal: 'pH 7.00 – 7.20 (Chemically Neutralized)',
      description: 'Maintains optimal blood bicarbonate equilibrium without synthetic alkalization chemicals.'
    },
    {
      metric: 'Microplastic Contamination',
      botvor: '0.00 ppm (Certified Flint Glass)',
      standard: '~240,000 particles/L (PET Packaging)',
      municipal: 'Variable (Microfiber degradation)',
      description: '100% inert crystalline glass vessel eliminates phthalate and nano-polymer shedding.'
    },
    {
      metric: 'Total Dissolved Solids (TDS)',
      botvor: '42 mg/L (Light Crisp Palate)',
      standard: '180 – 350 mg/L (Heavy taste)',
      municipal: '300 – 600 mg/L (Chloride residues)',
      description: 'Ultra-low mineral residue enables seamless cellular uptake with no metallic aftertaste.'
    },
    {
      metric: 'Bioavailable Silica (SiO₂)',
      botvor: '14.2 mg/L (Alpine Basalt Sourced)',
      standard: '< 1.5 mg/L (Stripped via RO)',
      municipal: '0.0 mg/L (Undetected)',
      description: 'Essential for connective tissue resilience, arterial elasticity, and collagen synthesis.'
    },
    {
      metric: 'Geological Filtration Age',
      botvor: '18 Years (Deep Igneous Basalt)',
      standard: '0 Days (Rapid RO synthesis)',
      municipal: 'Surface reservoir / chlorination',
      description: 'Two decades of natural gravity filtration under subterranean alpine pressure.'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-8 rounded-2xl glass-panel border border-brand-aqua/25 p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-6">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono tracking-mega text-brand-aqua uppercase">
            Comparative Chemistry
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            Elemental Benchmark
          </h3>
        </div>

        <span className="text-xs font-mono text-white/50">
          INDEPENDENT THIRD-PARTY LAB VERIFICATION
        </span>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-white/10 text-xs font-mono tracking-wider">
              <th className="py-4 text-white/40 uppercase w-1/3">Metric / Standard</th>
              <th className="py-4 text-brand-amber font-bold uppercase w-1/4">
                BOTVOR Alpine
              </th>
              <th className="py-4 text-white/50 uppercase w-1/4">Generic Bottled</th>
              <th className="py-4 text-white/50 uppercase w-1/4">Municipal Supply</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-white/5">
            {comparisonData.map((row) => (
              <tr key={row.metric} className="hover:bg-white/5 transition-colors">
                <td className="py-4 pr-4">
                  <span className="font-bold text-white block">{row.metric}</span>
                  <span className="text-[11px] text-white/40 font-light block pt-0.5">{row.description}</span>
                </td>
                <td className="py-4 pr-4 font-mono font-bold text-white bg-brand-amber/5 px-3 rounded-lg border-x border-brand-amber/20">
                  <div className="flex items-center gap-1.5 text-brand-amber">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>{row.botvor}</span>
                  </div>
                </td>
                <td className="py-4 pr-4 text-white/60 font-mono">
                  {row.standard}
                </td>
                <td className="py-4 text-white/40 font-mono">
                  {row.municipal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
