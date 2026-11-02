import { Product, LookbookItem } from '../types';

export const PRODUCTS: Product[] = [
  // --- SHIRTS ---
  {
    id: 'shirt-heavyweight-box',
    name: 'Atelier Heavyweight 340 GSM Tee',
    category: 'shirts',
    price: 78,
    description: 'Constructed from custom-developed 340 GSM combed Aegean cotton. Features a relaxed boxy cut, ribbed double-needle collar, and drop shoulders that hold structure after endless wear.',
    material: '100% Organic Aegean Combed Cotton',
    weightGsm: 340,
    origin: 'Izmir, Turkey',
    fit: 'Boxy, relaxed drop shoulder',
    image: '/src/assets/images/product_heavyweight_shirt_1793636045391.jpg',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Charcoal Black', hex: '#262626' },
      { name: 'Raw Bone', hex: '#EAE6DF' },
      { name: 'Washed Olive', hex: '#585C4F' }
    ],
    tag: 'Signature Core',
    inStock: true,
    stockCount: 42,
    details: [
      'Pre-shrunk 340 GSM combed organic jersey',
      'Reinforced double-needle binding on 3cm collar',
      'Blind-stitched cuffs and hem for seamless fall',
      'Naturally breathable, heavyweight drape'
    ]
  },
  {
    id: 'shirt-poplin-overshirt',
    name: 'Structured Utility Overshirt',
    category: 'shirts',
    price: 145,
    description: 'A hybrid midlayer shirt woven from crisp 240 GSM Japanese paper-touch cotton twill. Features hidden placket corozo buttons and deep architectural chest pocketing.',
    material: '100% Japanese High-Density Cotton Twill',
    weightGsm: 240,
    origin: 'Okayama, Japan',
    fit: 'Straight architectural drape',
    image: '/src/assets/images/product_heavyweight_shirt_1793636045391.jpg',
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Dark Pitch', hex: '#1C1C1E' },
      { name: 'Chalk Slate', hex: '#707E8B' }
    ],
    tag: 'Limited Run',
    inStock: true,
    stockCount: 19,
    details: [
      'Hand-carved natural brown corozo nut buttons',
      'Internal reinforcement gussets along side seams',
      'Can be worn buttoned as a shirt or open as an overshirt',
      'Garment washed for a soft tactile matte finish'
    ]
  },
  {
    id: 'shirt-mockneck-knit',
    name: 'Interlock Mockneck Studio Shirt',
    category: 'shirts',
    price: 92,
    description: 'A sculpted modern mockneck engineered with 280 GSM double-knit interlock jersey. Offers thermal stability and a clean neck silhouette that nests smoothly beneath overcoats.',
    material: '95% Supima Cotton, 5% Elastane',
    weightGsm: 280,
    origin: 'Porto, Portugal',
    fit: 'Tailored regular silhouette',
    image: '/src/assets/images/product_heavyweight_shirt_1793636045391.jpg',
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Espresso', hex: '#332924' },
      { name: 'Off-White', hex: '#F4F2EE' }
    ],
    tag: 'Archival',
    inStock: true,
    stockCount: 26,
    details: [
      'Ergonomic seamless mock collar height 3.5cm',
      'Anti-pilling mercerized Supima yarn',
      'Ribbed cuffs with subtle elastane recovery',
      'Ideal foundational layer for heavy outerwear'
    ]
  },

  // --- COATS ---
  {
    id: 'coat-double-breasted-trench',
    name: 'Sculpted Wool Double-Breasted Trench',
    category: 'coats',
    price: 385,
    description: 'An architectural reinterpretation of the classic trench coat. Tailored in heavy 620 GSM Melton wool with wide peak lapels, horn buckle belt, and deep storm-shield construction.',
    material: '80% Virgin Wool, 20% Recycled Polyamide',
    weightGsm: 620,
    origin: 'Biella, Italy',
    fit: 'Relaxed tailored overcoat',
    image: '/src/assets/images/product_trench_coat_1793636045556.jpg',
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive Taupe', hex: '#636553' },
      { name: 'Cast Charcoal', hex: '#2C2D30' }
    ],
    tag: 'Signature Outerwear',
    inStock: true,
    stockCount: 14,
    details: [
      'Full cupro lining with internal chest passport pockets',
      'Detachable waist belt with solid matte-brass buckle',
      'Deep back storm flap and center walking vent',
      'Water-repellent wool finish tested for harsh conditions'
    ]
  },
  {
    id: 'coat-raglan-melange',
    name: 'Raglan Minimalist Overcoat',
    category: 'coats',
    price: 420,
    description: 'Cut with continuous raglan shoulders for an uninterrupted drape over tailored suiting or chunky knitwear. Fabricated from 680 GSM Italian double-faced virgin wool.',
    material: '100% Double-Faced Virgin Wool',
    weightGsm: 680,
    origin: 'Tuscany, Italy',
    fit: 'Fluid relaxed drape',
    image: '/src/assets/images/product_trench_coat_1793636045556.jpg',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel Melange', hex: '#9C7A53' },
      { name: 'Nocturne Black', hex: '#141416' }
    ],
    tag: 'Limited Edition',
    inStock: true,
    stockCount: 8,
    details: [
      'Hand-finished blind hems on lapels and sleeves',
      'Concealed magnetic neck tab for windy weather',
      'Slanted welt hand-warmer pockets lined in brushed cotton',
      'Thermal retention rated down to -5°C (23°F)'
    ]
  },
  {
    id: 'coat-gabardine-car-coat',
    name: 'Bonded Gabardine Technical Car Coat',
    category: 'coats',
    price: 340,
    description: 'Designed for fluid urban mobility. Features a clean single-breasted fly front, storm collar with latch, and breathable water-resistant Italian micro-gabardine membrane.',
    material: 'Bonded Cotton Gabardine with Hydro-Shield',
    weightGsm: 390,
    origin: 'Como, Italy',
    fit: 'Clean tailored straight',
    image: '/src/assets/images/product_trench_coat_1793636045556.jpg',
    availableSizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Midnight', hex: '#1C2434' },
      { name: 'Desert Sand', hex: '#C2B8A3' }
    ],
    tag: 'All-Weather',
    inStock: true,
    stockCount: 22,
    details: [
      '10,000mm hydrostatic head waterproof rating',
      'Two-way YKK matte Excella zipper under button storm placket',
      'Ergonomic internal shoulder harness for hands-free carrying indoors',
      'Underarm laser-perforated ventilation grommets'
    ]
  },

  // --- HATS ---
  {
    id: 'hat-structured-wool-cap',
    name: 'Atelier 6-Panel Felt Wool Cap',
    category: 'hats',
    price: 58,
    description: 'Engineered with a low-profile crown and structured curved brim. Crafted from dense 450 GSM felted merino wool with an oiled calfskin adjustable backstrap and antiqued brass clasp.',
    material: '100% Felted Merino Wool & Vegetable-Tanned Leather',
    weightGsm: 450,
    origin: 'Porto, Portugal',
    fit: 'Low profile 6-panel with adjustable strap',
    image: '/src/assets/images/product_wool_cap_hat_1793636046053.jpg',
    availableSizes: ['One Size (54-61 cm)'],
    colors: [
      { name: 'Rich Espresso', hex: '#413028' },
      { name: 'Navy Melange', hex: '#26344E' },
      { name: 'Heather Charcoal', hex: '#3B3B3D' }
    ],
    tag: 'Best Seller',
    inStock: true,
    stockCount: 55,
    details: [
      'Internal sweatband in breathable moisture-wicking organic cotton',
      'Hand-stitched tonal Atelier compass emblem on rear arch',
      'Antiqued solid brass strap cinch buckle',
      'Structured buckram front panels maintain clean crown curvature'
    ]
  },
  {
    id: 'hat-cashmere-ribbed-beanie',
    name: '7-Gauge Cashmere Rib Knit Beanie',
    category: 'hats',
    price: 64,
    description: 'Spun from 7-gauge Scottish cashmere blended with extrafine merino for resilient stretch and sublime softness. Features a folding brim that can be worn cuffed or slouchy.',
    material: '70% Extrafine Merino, 30% Grade-A Cashmere',
    weightGsm: 180,
    origin: 'Hawick, Scotland',
    fit: 'Snug skull cap to relaxed slouch',
    image: '/src/assets/images/product_wool_cap_hat_1793636046053.jpg',
    availableSizes: ['One Size Fits All'],
    colors: [
      { name: 'Oatmeal Heather', hex: '#DFD8CC' },
      { name: 'Deep Sea Blue', hex: '#1C3144' },
      { name: 'Charcoal Smoke', hex: '#2A2B2E' }
    ],
    tag: 'Cold Weather Essential',
    inStock: true,
    stockCount: 38,
    details: [
      'Seamless 3D tubular circular knitting eliminates irritation points',
      'Thermal micro-climate retention without scalp overheating',
      'Double-turn folded cuff measuring 7cm',
      'Hand wash cold, dry flat in shade'
    ]
  },
  {
    id: 'hat-twill-bucket-hat',
    name: 'Architectural Twill Bucket Hat',
    category: 'hats',
    price: 52,
    description: 'A modern brutalist bucket hat constructed from heavy 380 GSM combed cotton duck canvas. Features top-stitched reinforcing brim rows and subtle side ventilation eyelets.',
    material: '100% Heavy Combed Cotton Canvas',
    weightGsm: 380,
    origin: 'Kojima, Japan',
    fit: 'Structured downward-sloping brim',
    image: '/src/assets/images/lookbook_lifestyle_streetwear_1793636046106.jpg',
    availableSizes: ['S/M (56-58cm)', 'L/XL (59-61cm)'],
    colors: [
      { name: 'Washed Black', hex: '#202022' },
      { name: 'Raw Sand', hex: '#D6CDBF' }
    ],
    tag: 'Lookbook Edition',
    inStock: true,
    stockCount: 29,
    details: [
      'Multi-row reinforcing stitch prevents brim droop',
      'Dual matte black metal ventilation eyelets',
      'Packable structure that recovers shape easily after travel',
      'Garment dyed for unique lived-in color nuances'
    ]
  }
];

export const LOOKBOOK_LOOKS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Look 01: Monolithic Contrast',
    subtitle: 'The Brutalist Uniform',
    image: '/src/assets/images/lookbook_lifestyle_streetwear_1793636046106.jpg',
    featuredProductIds: ['coat-double-breasted-trench', 'shirt-heavyweight-box', 'hat-twill-bucket-hat'],
    stylingNote: 'Pair the heavyweight boxy tee with the architectural double-breasted trench and structured twill bucket hat for clean verticality and balanced massing.'
  },
  {
    id: 'look-2',
    title: 'Look 02: Gallery Editorial',
    subtitle: 'Tonal Wool & Tailored Proportions',
    image: '/src/assets/images/hero_merchandise_lookbook_1793636044671.jpg',
    featuredProductIds: ['coat-raglan-melange', 'shirt-mockneck-knit', 'hat-structured-wool-cap'],
    stylingNote: 'Layering warm camel and olive tones over crisp interlock knits, anchored with our low-profile felt wool cap.'
  }
];

export const CURRENCIES: Record<string, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  JPY: { symbol: '¥', rate: 154.0, label: 'JPY (¥)' }
};
