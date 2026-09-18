import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'botvor-500-still',
    name: 'BOTVOR CLASSIC',
    volume: '500 ML',
    edition: 'Daily Endurance Vessel',
    tagline: 'Sculpted for the cadence of modern velocity.',
    description: 'Ultra-clarity flint glass vessel housing pristine alpine mineral spring water. Naturally filtered through volcanic basalt strata, yielding an alkaline balance of pH 7.85 and low total dissolved solids for effortless cellular hydration.',
    source: 'Val d’Aosta Alpine Aquifer (Alt. 2,840m)',
    ph: 7.85,
    tds: 42,
    price: '$8.50',
    specs: {
      material: '100% Flint Crystal Glass (Inert & Microplastic-Free)',
      cap: 'Machined Matte Graphite Aluminum with Hermetic Gasket',
      height: '248 mm',
      diameter: '68 mm',
      weightEmpty: '380 g',
    },
    attributes: [
      'Alkaline Balance pH 7.85',
      'Ultra-Low TDS (42 mg/L)',
      '100% Infinitely Recyclable',
      'Ergonomic Precision Taper'
    ],
    image: '/images/vessel/botvor_angle_0.png'
  },
  {
    id: 'botvor-750-sparkling',
    name: 'BOTVOR GRAND CUVÉE',
    volume: '750 ML',
    edition: 'Effervescent Reserve',
    tagline: 'Delicate pin-point carbonation for gastronomic elevation.',
    description: 'Bottled exclusively at the source with naturally emerging micro-bubbles. Delicate mineral effervescence engineered to cleanse the palate and accompany fine cuisine or executive gatherings.',
    source: 'Val d’Aosta Alpine Aquifer (Alt. 2,840m)',
    ph: 7.40,
    tds: 58,
    price: '$14.00',
    specs: {
      material: 'Heavyweight Pedestal Crystal Flint Glass',
      cap: 'Knurled Champagne-Grade Seal',
      height: '286 mm',
      diameter: '74 mm',
      weightEmpty: '540 g',
    },
    attributes: [
      'Micro-Effervescent Bubble Structure',
      'Optimal Calcium-Magnesium Ratio',
      'Architectural Heavy Base',
      'Fine Dining Certified'
    ],
    image: '/images/vessel/botvor_angle_2.png'
  },
  {
    id: 'botvor-1000-carafe',
    name: 'EXECUTIVE MONOLITH',
    volume: '1000 ML',
    edition: 'Boardroom & Residence Carafe',
    tagline: 'Architectural permanence for spaces of high decision.',
    description: 'A commanding 1-litre flint glass decanter designed for conference pavilions and private salons. Hand-finished fire-polished rim for dripless pour mechanics.',
    source: 'Val d’Aosta Alpine Aquifer (Alt. 2,840m)',
    ph: 7.85,
    tds: 42,
    price: '$22.00',
    specs: {
      material: 'Hand-Finished Architectural Flint Glass',
      cap: 'Brushed Slate Ground Stopper',
      height: '315 mm',
      diameter: '82 mm',
      weightEmpty: '760 g',
    },
    attributes: [
      '1.0 Litre High-Volume Capacity',
      'Dripless Precision Pour Lip',
      'Weighted Studio Pedestal',
      'Aero-Seal Ground Glass Stopper'
    ],
    image: '/images/vessel/botvor_angle_4.png'
  },
  {
    id: 'botvor-reserve-obsidian',
    name: 'OBSIDIAN RESERVE',
    volume: '750 ML',
    edition: 'Limited Allocation • 500 Vessels/Yr',
    tagline: 'A rare vintage extracted from the deepest basalt chambers.',
    description: 'Aged in subterranean granite fissures under 40 bar pressure for 35 years. Presented in a smoked smoked-flint ultraviolet-protective vessel with hand-numbered 24-karat gold inlay numbering.',
    source: 'Deep Chamber Alpine Fissure (Alt. 2,840m / Depth 420m)',
    ph: 8.10,
    tds: 34,
    price: '$38.00',
    specs: {
      material: 'Smoked Obsidian Flint Glass (UV-Shielded)',
      cap: 'Anodized Black Titanium with Gold Crest Inlay',
      height: '290 mm',
      diameter: '75 mm',
      weightEmpty: '590 g',
    },
    attributes: [
      '35-Year Deep Chamber Vintage',
      'Rare Alkaline Structure (pH 8.10)',
      'Individually Numbered 1-500',
      'Certificate of Authenticity'
    ],
    image: '/images/vessel/botvor_angle_6.png'
  }
];
