import { SceneMoment, Hotspot } from '../types';

export const BRAND = {
  name: 'BOTVOR',
  monogram: 'VM',
  subBrand: 'VITAL ELIXIR',
  tagline: 'FOR EVERY MOMENT THAT MOVES YOU',
  heroEyebrow: 'ORIGIN // MOTION',
  heroHeadline: 'SCULPTED BY NATURE. DEFINED BY MOVEMENT.',
  heroDescription: 'Engineered at the intersection of alpine purity and human velocity. Encased in an architectural flint vessel built to accompany your highest ambitions.',
  ctaPrimary: 'EXPLORE THE VESSEL',
  ctaSecondary: 'WATCH FILM',
};

export const CHAPTERS: SceneMoment[] = [
  {
    id: 'chapter-01',
    number: '01',
    title: 'THE DESCENT',
    subtitle: 'GRAVITY IN REVERSE',
    tag: 'ORIGIN // MOMENTUM',
    description: 'A sculptural crystal silhouette suspended between the canyon of high-rise towers. Light refracts through crystalline purity as momentum begins before the first step.',
    timestamp: '00:00 – 00:06',
    image: '/images/businessman_catch.jpg',
    stats: [
      { label: 'AQUIFER ELEVATION', value: '2,840 M' },
      { label: 'BOTTLE DROP TEST', value: 'ZERO STRESS' },
    ]
  },
  {
    id: 'chapter-02',
    number: '02',
    title: 'THE DRIVE',
    subtitle: 'DECISIVE CALM',
    tag: 'AMBITION // CLARITY',
    description: 'In the high-stakes pulse of the boardroom and the metropolis, true authority requires mental and physical precision. Caught mid-air with effortless poise.',
    timestamp: '00:06 – 00:11',
    image: '/images/water_splash_exec.jpg',
    stats: [
      { label: 'CELLULAR ABSORPTION', value: '< 90 SEC' },
      { label: 'NATURAL ALKALINITY', value: 'pH 7.85' },
    ]
  },
  {
    id: 'chapter-03',
    number: '03',
    title: 'UNBROKEN MOMENTUM',
    subtitle: 'PEAK VELOCITY',
    tag: 'ATHLETICS // ENDURANCE',
    description: 'On the Olympic running circuit and coastal alpine passes, hydration is telemetry. Water droplets explode in slow-motion, cooling the skin and refueling the stride.',
    timestamp: '00:11 – 00:22',
    image: '/images/sprinter_drink.jpg',
    stats: [
      { label: 'ELECTROLYTE MATRIX', value: 'OPTIMAL CA/MG' },
      { label: 'SODIUM PURITY', value: '0.00% ADDED' },
    ]
  },
  {
    id: 'chapter-04',
    number: '04',
    title: 'THE ELEVATION',
    subtitle: 'PEAK POISE',
    tag: 'LIFESTYLE // SERENITY',
    description: 'Against the panoramic horizon of the penthouse terrace, the golden hour casts an ethereal warm glow. Hydration as a daily ritual of distinction.',
    timestamp: '00:22 – 00:29',
    image: '/images/rooftop_woman.jpg',
    stats: [
      { label: 'OPTICAL CLARITY', value: '99.98%' },
      { label: 'RECYCLABLE VESSEL', value: '100% INFINITE' },
    ]
  }
];

export const BOTTLE_HOTSPOTS: Hotspot[] = [
  {
    id: 'cap',
    title: 'AERO-GRADE SEAL',
    subtitle: 'Matte Graphite Aluminum Cap',
    description: 'Crafted from aircraft-grade aluminum alloy with tactile knurled threading and a medical-grade silicone inner seal that locks in dissolved minerals and effervescence without microplastics.',
    position: [0, 1.85, 0],
    cameraPosition: [0, 2.0, 3.2]
  },
  {
    id: 'neck',
    title: 'PRECISION FLOW SPOUT',
    subtitle: 'Ergonomic Drinking Rim',
    description: 'Engineered with a calibrated radius designed for smooth laminar fluid discharge, whether sipping in a high-level briefing or hydrating mid-sprint.',
    position: [0, 1.35, 0.4],
    cameraPosition: [0, 1.4, 2.8]
  },
  {
    id: 'body',
    title: 'SCULPTURAL WAIST',
    subtitle: 'Ergonomic Flint Glass Taper',
    description: 'Gently pinched hourglass silhouette created from lead-free flint crystal. Balances natural tactile hand grip with optical light refraction.',
    position: [0, 0.1, 0.6],
    cameraPosition: [0, 0.2, 3.5]
  },
  {
    id: 'base',
    title: 'WEIGHTED PEDESTAL',
    subtitle: 'Low Center of Gravity',
    description: 'An ultra-thick architectural crystal base providing solid physical heft on slate or marble surfaces, engineered to prevent tipping and produce a satisfying tactile resonance.',
    position: [0, -1.5, 0.5],
    cameraPosition: [0, -1.2, 3.0]
  }
];
