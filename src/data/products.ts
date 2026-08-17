import { Product, PromoCode, CurrencyConfig, ShippingOption } from '../types/store';

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, flag: '🇺🇸', name: 'United States (USD)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, flag: '🇪🇺', name: 'European Union (EUR)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, flag: '🇬🇧', name: 'United Kingdom (GBP)' },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36, flag: '🇨🇦', name: 'Canada (CAD)' },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.5, flag: '🇯🇵', name: 'Japan (JPY)' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.52, flag: '🇦🇺', name: 'Australia (AUD)' },
};

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'GOOGLE10',
    discountType: 'percentage',
    value: 10,
    description: '10% off your entire order',
  },
  {
    code: 'RETRO1998',
    discountType: 'fixed',
    value: 15,
    description: '$15 off orders over $75',
    minSpend: 75,
  },
  {
    code: 'FREESHIP',
    discountType: 'free_shipping',
    value: 0,
    description: 'Free Standard Ground Shipping',
  },
  {
    code: 'WELCOME20',
    discountType: 'percentage',
    value: 20,
    description: '20% off for Google Insiders',
    minSpend: 50,
  }
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Ground Shipping',
    description: '3 - 5 business days with carbon-neutral packaging',
    price: 5.99,
    estimatedDays: '3-5 Business Days',
  },
  {
    id: 'priority',
    name: 'FedEx Priority 2-Day',
    description: 'Guaranteed delivery in 2 business days',
    price: 14.99,
    estimatedDays: '2 Business Days',
  },
  {
    id: 'overnight',
    name: 'FedEx Priority Overnight',
    description: 'Next business day by 10:30 AM',
    price: 24.99,
    estimatedDays: 'Next Day Delivery',
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'nano-banana-sweatshirt',
    title: 'Nano Banana Sweatshirt',
    slug: 'nano-banana-sweatshirt',
    price: 82.00,
    category: 'Apparel',
    subcategory: 'Sweatshirts & Hoodies',
    brand: 'Google',
    itemType: 'Sweatshirts & Hoodies',
    sku: 'GGL-APP-NB-082',
    shortDescription: 'High-density organic cotton fleece sweatshirt with embroidered Nano Banana artwork and ribbed knit cuffs.',
    description: 'Crafted from heavyweight 9.4 oz organic combed cotton, the Nano Banana Sweatshirt delivers everyday cozy warmth with a playful Google tech twist. Features a custom high-density embroidered Nano Banana graphic across the front chest, brushed fleece interior, and reinforced twin-needle stitching at stress points.',
    details: [
      'Made of 9.4 oz, 80% ringspun combed cotton, 20% recycled polyester fleece',
      'Pre-washed and pre-shrunk for minimal size variation',
      'Embroidered chest patch with satin stitch borders',
      'Heavy 2x2 rib knit collar, cuffs, and bottom waistband',
      'Custom woven Google Merchandise Store nape label',
      'Ethically crafted in certified Fair Trade facilities'
    ],
    materials: '80% Organic Ringspun Cotton, 20% Recycled Polyester Fleece (9.4 oz / 320 GSM).',
    careInstructions: 'Machine wash cold with like colors. Turn garment inside out before washing. Tumble dry low or line dry in shade. Do not iron directly on embroidered artwork.',
    sustainabilityNote: 'GOTS certified organic cotton blended with post-consumer recycled plastic bottles. Dyed using closed-loop zero-waste water purification.',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Heather Oatmeal', hex: '#E5E0D8' },
      { name: 'Google Navy', hex: '#1A237E' },
      { name: 'Washed Charcoal', hex: '#37474F' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    stockBySize: [
      { size: 'XS', available: 8 },
      { size: 'S', available: 14 },
      { size: 'M', available: 22 },
      { size: 'L', available: 19 },
      { size: 'XL', available: 11 },
      { size: '2XL', available: 5 }
    ],
    rating: 4.9,
    reviewCount: 48,
    isNew: true,
    isBestSeller: true,
    isEcoFriendly: true,
    inStock: true,
    badge: 'Popular',
    featuredCollection: 'Apparel Essentials',
    reviews: [
      {
        id: 'rev-1',
        author: 'Marcus K.',
        location: 'San Francisco, CA',
        rating: 5,
        date: 'July 28, 2026',
        title: 'Incredible heavyweight quality & fun details',
        comment: 'The fleece inside is ridiculously soft and the embroidery is top-notch quality. Fits true to size with a relaxed modern drape. Highly recommend!',
        verified: true,
        sizePurchased: 'L',
        fitFeedback: 'True to size'
      },
      {
        id: 'rev-2',
        author: 'Elena R.',
        location: 'New York, NY',
        rating: 5,
        date: 'August 2, 2026',
        title: 'My favorite Google hoodie yet',
        comment: 'Washes like a dream, zero shrinkage when air dried. Got tons of compliments around the office.',
        verified: true,
        sizePurchased: 'M',
        fitFeedback: 'True to size'
      },
      {
        id: 'rev-3',
        author: 'Devon T.',
        location: 'Seattle, WA',
        rating: 4,
        date: 'August 10, 2026',
        title: 'Super comfortable, slightly roomy',
        comment: 'Great color and very warm. If you prefer a snug athletic fit, maybe size down, otherwise perfect.',
        verified: true,
        sizePurchased: 'XL',
        fitFeedback: 'Runs large'
      }
    ]
  },
  {
    id: 'google-1998-vintage-colorblock-windbreaker',
    title: 'Google 1998 Vintage Colorblock Windbreaker',
    slug: 'google-1998-vintage-colorblock-windbreaker',
    price: 98.00,
    compareAtPrice: 120.00,
    category: 'Apparel',
    subcategory: 'Jackets & Outerwear',
    brand: 'Google 1998',
    itemType: 'Jackets & Outerwear',
    sku: 'GGL-98-WB-098',
    shortDescription: 'Retro 90s heritage colorblocked shell jacket with packable hood and vintage Google primary spectrum stripes.',
    description: 'Celebrate Google’s origins with the official 1998 Heritage Windbreaker. Constructed from 100% recycled crinkle nylon with water-repellent DWR coating, vintage colorblocked panels in Google Blue, Red, Yellow, and Green, a stowable hood inside the stand collar, and an oversized archival 1998 Google logo back print.',
    details: [
      '100% Recycled Crinkle Ripstop Nylon with DWR water-resistant finish',
      'Vintage archival 1998 Google serif logo embroidery on chest and screenprint on back',
      'Packable hood with bungee barrel adjusters',
      'Deep dual zippered hand pockets and internal phone security pocket',
      'Elasticated storm cuffs and adjustable hem shock cord',
      'Vented breathable mesh rear yoke'
    ],
    materials: 'Shell: 100% Recycled Ripstop Nylon. Lining: 100% Recycled Polyester Mesh.',
    careInstructions: 'Machine wash cold on delicate. Fasten all zippers before laundering. Hang dry only. Do not bleach or dry clean.',
    sustainabilityNote: 'Crafted from 100% certified post-consumer ocean bound plastic fabric.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: '1998 Heritage Multi', hex: '#4285F4' },
      { name: 'Midnight Retro Black', hex: '#202124' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockBySize: [
      { size: 'S', available: 9 },
      { size: 'M', available: 18 },
      { size: 'L', available: 15 },
      { size: 'XL', available: 7 },
      { size: '2XL', available: 3 }
    ],
    rating: 4.8,
    reviewCount: 64,
    isRetro1998: true,
    isBestSeller: true,
    inStock: true,
    badge: '1998 Heritage',
    featuredCollection: 'Google 1998 Collection'
  },
  {
    id: 'google-sunny-sips-insulated-tumbler',
    title: 'Google Sunny Sips Insulated Tumbler 24oz',
    slug: 'google-sunny-sips-insulated-tumbler',
    price: 32.00,
    category: 'Drinkware',
    subcategory: 'Bottles & Tumblers',
    brand: 'Google',
    itemType: 'Bottles & Tumblers',
    sku: 'GGL-DRK-SS-032',
    shortDescription: 'Double-wall vacuum insulated stainless steel tumbler with spill-proof straw lid and powder-coated matte finish.',
    description: 'Keep your iced matcha cold for 24 hours or your morning brew hot for 8 hours with the Sunny Sips 24oz Tumbler. Features 18/8 food-grade stainless steel construction, a splash-resistant slider lid with reusable silicone tipped straw, and a cupholder-friendly tapered base.',
    details: [
      '24 oz (710 ml) capacity fits standard car cup holders',
      'Double-wall copper vacuum insulation prevents sweat',
      'BPA-free tritan lid with 2-in-1 sip & straw opening',
      'Laser-engraved subtle Google logo with matte powder coat',
      'Includes silicone bumper boot to protect desk surfaces'
    ],
    materials: '18/8 Pro-Grade Stainless Steel, BPA-Free Eastman Tritan Lid.',
    careInstructions: 'Top-rack dishwasher safe. For longest color vibrancy, hand washing is recommended.',
    sustainabilityNote: 'Eliminates over 300 single-use plastic cups per year. 100% recyclable steel.',
    images: [
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sunny Lemon Yellow', hex: '#FBBC05' },
      { name: 'Google Lake Blue', hex: '#4285F4' },
      { name: 'Mint Green', hex: '#34A853' },
      { name: 'Matte Coral', hex: '#EA4335' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 45 }
    ],
    rating: 4.9,
    reviewCount: 92,
    isBestSeller: true,
    inStock: true,
    badge: 'Sunny Sips'
  },
  {
    id: 'mix-match-patch-enamel-pin-set',
    title: 'Mix, Match, Patch - Google Enamel Pin Set (5-Pack)',
    slug: 'mix-match-patch-enamel-pin-set',
    price: 22.00,
    category: 'Accessories',
    subcategory: 'Pins & Patches',
    brand: 'Google',
    itemType: 'Pins & Patches',
    sku: 'GGL-ACC-PIN-022',
    shortDescription: 'Collector 5-piece hard enamel pin collection featuring the Google G, Chrome Dino, Android Bot, and retro icons.',
    description: 'Add a burst of tech personality to your jacket, tote bag, or lanyard. Each pin is stamped from solid brass, hand-filled with vibrant jewel-tone hard enamel colors, and polished to a mirror shine with secure rubber clutch backings.',
    details: [
      '5 distinct pins: Classic Google "G", Chrome T-Rex Dino, Android Bot, Search Bar, and 1998 Vintage Badge',
      'High polish gold and black nickel plating',
      'Double posted backing with heavy-duty rubber clutches to prevent spinning',
      'Comes presented on a custom collector backing card made from recycled kraft paper'
    ],
    materials: 'Solid brass alloy with hard cloisonné enamel.',
    careInstructions: 'Wipe clean with a dry microfiber cloth.',
    sustainabilityNote: 'FSC-certified recycled paper packaging with soy-based inks.',
    images: [
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Multi-Color Collector Set', hex: '#4285F4' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 78 }
    ],
    rating: 4.9,
    reviewCount: 57,
    isNew: true,
    inStock: true,
    badge: 'Mix & Match'
  },
  {
    id: 'blank-pages-bold-ideas-journal',
    title: 'Blank Pages, Bold Ideas - Google Hardbound Journal',
    slug: 'blank-pages-bold-ideas-journal',
    price: 19.50,
    category: 'Stationery',
    subcategory: 'Journals & Pens',
    brand: 'Google',
    itemType: 'Journals & Pens',
    sku: 'GGL-STN-JRN-019',
    shortDescription: 'Premium hardcover dot-grid notebook with smooth 120gsm fountain pen-friendly paper and elastic band.',
    description: 'Designed for engineers, designers, and creative thinkers. Contains 192 numbered pages of 120gsm bleed-resistant dot grid ivory paper, a lay-flat stitch binding, dual satin ribbon bookmarks, and an expandable rear inner pocket for loose notes.',
    details: [
      '192 numbered dot grid pages (5mm spacing)',
      '120 GSM acid-free, FSC-certified ivory paper (fountain pen friendly)',
      '180° Smyth-sewn lay-flat binding for effortless drafting',
      'Vegan leather soft-touch debossed cover with Google icon',
      'Expandable back inner gusset pocket and elastic closure band'
    ],
    materials: 'FSC Certified Recycled Paper, PU Vegan Leather Hardcover.',
    careInstructions: 'Keep in a dry environment.',
    sustainabilityNote: '100% tree-free paper certified by the Forest Stewardship Council.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Google Slate Blue', hex: '#1A73E8' },
      { name: 'Minimal Oatmeal', hex: '#F1F3F4' },
      { name: 'Matte Obsidian', hex: '#202124' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 52 }
    ],
    rating: 4.8,
    reviewCount: 39,
    inStock: true,
    badge: 'Bold Ideas'
  },
  {
    id: 'top-it-off-google-vintage-corduroy-cap',
    title: 'Top It Off - Google Vintage Corduroy Cap',
    slug: 'top-it-off-google-vintage-corduroy-cap',
    price: 28.00,
    category: 'Accessories',
    subcategory: 'Hats & Headwear',
    brand: 'Google 1998',
    itemType: 'Hats & Headwear',
    sku: 'GGL-ACC-CAP-028',
    shortDescription: 'Unstructured 6-panel wide-wale corduroy dad cap with vintage Google arch embroidery.',
    description: 'Elevate your daily rotation with this premium textured corduroy cap. Built with unstructured front panels for a relaxed retro silhouette, brass metal clasp closure at the back, and embroidered tonal Google lettering.',
    details: [
      '100% premium 8-wale cotton corduroy',
      'Unstructured low-profile 6-panel silhouette',
      'Self-fabric strap with antique brass sliding buckle',
      'Pre-curved bill with matching corduroy underbill',
      'Interior moisture-wicking cotton twill sweatband'
    ],
    materials: '100% Cotton 8-Wale Corduroy.',
    careInstructions: 'Spot clean with damp cloth only. Do not submerge or machine wash.',
    sustainabilityNote: 'Sustainably farmed natural cotton fibers.',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Forest Green', hex: '#137333' },
      { name: 'Vintage Navy', hex: '#174EA6' },
      { name: 'Warm Terracotta', hex: '#C5221F' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 34 }
    ],
    rating: 4.9,
    reviewCount: 41,
    isBestSeller: true,
    isRetro1998: true,
    inStock: true,
    badge: 'Top It Off'
  },
  {
    id: 'jump-it-out-cloud-athletic-tee',
    title: 'Jump it out! - Google Cloud Athletic Running Tee',
    slug: 'jump-it-out-cloud-athletic-tee',
    price: 36.00,
    category: 'Apparel',
    subcategory: 'T-Shirts',
    brand: 'Google Cloud',
    itemType: 'T-Shirts',
    sku: 'GGL-APP-RUN-036',
    shortDescription: 'Ultralight performance training tee with 4-way stretch, micro-perforations, and reflective accents.',
    description: 'Engineered for high-output training, marathon runs, and everyday active comfort. Made with Google Cloud AeroDry moisture-management mesh that accelerates sweat evaporation, anti-odor silver ions, and 360-degree reflective logos for dawn and night runs.',
    details: [
      'Ultralight AeroDry 130 GSM performance knit',
      'Ergonomic raglan sleeves to prevent shoulder seam chafing',
      'Underarm laser-perforated ventilation zones',
      'Reflective Google Cloud heat-transfer logo on chest and back neck',
      'UPF 50+ sun protection'
    ],
    materials: '88% Recycled Polyester, 12% Spandex AeroDry Mesh.',
    careInstructions: 'Machine wash cold with mild detergent. Do not use fabric softeners. Tumble dry low.',
    sustainabilityNote: 'Made from 8 recycled water bottles per shirt.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Google Cloud Blue', hex: '#4285F4' },
      { name: 'Stealth Black', hex: '#202124' },
      { name: 'Optic White', hex: '#F8F9FA' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    stockBySize: [
      { size: 'S', available: 12 },
      { size: 'M', available: 20 },
      { size: 'L', available: 16 },
      { size: 'XL', available: 9 },
      { size: '2XL', available: 4 }
    ],
    rating: 4.7,
    reviewCount: 33,
    inStock: true,
    badge: 'Jump it out!'
  },
  {
    id: 'snuggle-mode-android-plush-bot',
    title: 'Snuggle Mode On - Google Android Plush Bot (12-inch)',
    slug: 'snuggle-mode-android-plush-bot',
    price: 26.00,
    category: 'Accessories',
    subcategory: 'Plush & Toys',
    brand: 'Android',
    itemType: 'Plush & Toys',
    sku: 'GGL-TOY-AND-026',
    shortDescription: 'Ultra-soft huggable collector plush Android green mascot with poseable antennas and weighted base.',
    description: 'The beloved Android Bugdroid bot, now in an ultra-cuddly 12-inch premium plush format! Made with velvety minky fabric and filled with hypoallergenic recycled cloud fill, with a beanbag base so Bugdroid sits upright on your desk or bookshelf.',
    details: [
      'Official Android licensed collector plush (12" / 30cm height)',
      'Poseable flexible antennas and rotating jointed arms',
      'Weighted beanbag pellet base allows independent sitting',
      'Embroidered glossy Android eyes',
      'Child-safe certified non-toxic construction (Ages 0+)'
    ],
    materials: 'Super-soft velour minky outer, 100% recycled polyester cloud stuffing.',
    careInstructions: 'Surface wash with damp cloth and gentle soap. Air dry.',
    sustainabilityNote: 'Filled with 100% recycled PET fiber pellets.',
    images: [
      'https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Android Green', hex: '#3DDC84' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 60 }
    ],
    rating: 5.0,
    reviewCount: 118,
    isBestSeller: true,
    isKids: true,
    inStock: true,
    badge: 'Snuggle Mode'
  },
  {
    id: 'youtube-kids-creator-youth-hoodie',
    title: 'YouTube Kids Creator Youth Pullover Hoodie',
    slug: 'youtube-kids-creator-youth-hoodie',
    price: 48.00,
    category: 'Apparel',
    subcategory: 'Sweatshirts & Hoodies',
    brand: 'YouTube',
    itemType: 'Sweatshirts & Hoodies',
    sku: 'GGL-YT-YTH-048',
    shortDescription: 'Super-comfy youth hoodie featuring vibrant red YouTube play button patch and fleece lined kangaroo pocket.',
    description: 'Inspire the next generation of storytellers and curious creators. Sized specifically for kids and teens, featuring an extra soft brushed cotton interior, tagless comfort neck label, and durable double-stitched seams.',
    details: [
      '70% Combed Cotton, 30% Recycled Poly Fleece',
      'Kangaroo hand warmer front pouch',
      'Tagless neck label for irritation-free wear',
      'Bold embroidered YouTube Play Button chest crest'
    ],
    materials: 'Cotton/Poly blend heavyweight kids fleece.',
    careInstructions: 'Machine wash warm, tumble dry normal.',
    sustainabilityNote: 'Certified OEKO-TEX Standard 100 child safe.',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'YouTube Red', hex: '#FF0000' },
      { name: 'Heather Grey', hex: '#BDC1C6' },
      { name: 'Jet Black', hex: '#202124' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stockBySize: [
      { size: 'XS', available: 10 },
      { size: 'S', available: 15 },
      { size: 'M', available: 18 },
      { size: 'L', available: 12 },
      { size: 'XL', available: 6 }
    ],
    rating: 4.9,
    reviewCount: 37,
    isKids: true,
    inStock: true,
    badge: 'YouTube Kids'
  },
  {
    id: 'the-lucky-socks-google-colorway-pack',
    title: 'The Lucky Socks - Google Colorway Crew Socks (3-Pack)',
    slug: 'the-lucky-socks-google-colorway-pack',
    price: 24.00,
    category: 'Accessories',
    subcategory: 'Socks',
    brand: 'Google',
    itemType: 'Socks',
    sku: 'GGL-ACC-SCK-024',
    shortDescription: 'Cushioned combed cotton ribbed crew socks in Google signature primary colorways.',
    description: 'Step into good luck and maximum comfort. Featuring 200-needle knit construction with targeted arch compression, Terry-loop cushion padding on the heel and forefoot, seamless hand-linked toe seams, and woven Google stripes.',
    details: [
      'Pack includes 3 pairs: 1x White with 1998 Stripes, 1x Heather Grey with G Logo, 1x Black Dino Pixel',
      'Targeted arch compression band keeps sock locked in place',
      'Seamless toe closure prevents blister friction',
      'Reinforced high-wear heel and toe zones'
    ],
    materials: '75% Combed Cotton, 20% Polyester, 5% Elastane.',
    careInstructions: 'Machine wash warm inside out. Tumble dry medium.',
    sustainabilityNote: 'Crafted with recycled elastane and organic cotton.',
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Tri-Pack Multi', hex: '#4285F4' }
    ],
    sizes: ['S', 'M', 'L'],
    stockBySize: [
      { size: 'S', available: 25 },
      { size: 'M', available: 45 },
      { size: 'L', available: 38 }
    ],
    rating: 4.9,
    reviewCount: 88,
    isBestSeller: true,
    inStock: true,
    badge: 'The Lucky Socks'
  },
  {
    id: 'google-1998-retro-canvas-backpack',
    title: 'Google 1998 Retro Heritage Canvas Backpack',
    slug: 'google-1998-retro-canvas-backpack',
    price: 68.00,
    compareAtPrice: 85.00,
    category: 'Bags & Backpacks',
    subcategory: 'Backpacks & Totes',
    brand: 'Google 1998',
    itemType: 'Backpacks & Totes',
    sku: 'GGL-BAG-98-068',
    shortDescription: 'Heavyweight waxed cotton canvas daypack with padded 16" laptop sleeve and vintage Google badges.',
    description: 'Built for daily campus commutes and cross-country adventures. Crafted from water-resistant 16oz waxed cotton canvas with genuine leather zipper pulls, padded air-mesh shoulder straps, dedicated fleece-lined 16" MacBook compartment, and dual expandable water bottle side pockets.',
    details: [
      '22L capacity fits daily work and travel gear',
      'Padded floating laptop sleeve accommodates up to 16" laptops',
      '16oz heavy-duty waxed duck canvas with water-repellent coating',
      'YKK weather-guarded heavy metal zippers',
      'Hidden luggage trolley pass-through sleeve on back panel'
    ],
    materials: '16oz Waxed Cotton Canvas, Full-Grain Leather Details, Recycled Poly Lining.',
    careInstructions: 'Wipe with damp sponge and cold water. Re-wax canvas as needed.',
    sustainabilityNote: 'Natural paraffin wax finish free of harmful fluorochemicals (PFC-free).',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Heritage Olive & Navy', hex: '#2D3748' },
      { name: 'Vintage Khaki Tan', hex: '#D2B48C' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 28 }
    ],
    rating: 4.8,
    reviewCount: 52,
    isRetro1998: true,
    isBestSeller: true,
    inStock: true,
    badge: '1998 Retro'
  },
  {
    id: 'chrome-offline-dino-plush-toy',
    title: 'Chrome Offline Dinosaur Pixel Stuffed Plush',
    slug: 'chrome-offline-dino-plush-toy',
    price: 22.00,
    category: 'Accessories',
    subcategory: 'Plush & Toys',
    brand: 'Chrome',
    itemType: 'Plush & Toys',
    sku: 'GGL-TOY-DINO-022',
    shortDescription: 'The legendary offline Chrome no-internet T-Rex runner brought to life in cuddly 3D plush format.',
    description: 'No internet? No problem! The world’s favorite pixelated prehistoric runner is ready to keep you company during offline moments, hackathons, and coffee breaks. Features pixel-accurate stepped silhouette and ultra-soft velour.',
    details: [
      'Authentic 10" (25cm) pixel-contoured plush sculpture',
      'Embroidered pixel eye and tooth detailing',
      'Super-soft short pile microfiber fabric',
      'Includes collectible "Press Space to Jump" hangtag'
    ],
    materials: '100% Hypoallergenic Microfiber Velour.',
    careInstructions: 'Spot clean with mild soapy water. Air dry.',
    sustainabilityNote: 'Filled with 100% recycled ocean bound polyester.',
    images: [
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pixel Grey', hex: '#5F6368' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 65 }
    ],
    rating: 5.0,
    reviewCount: 142,
    isBestSeller: true,
    isKids: true,
    inStock: true,
    badge: 'Iconic Dino'
  },
  {
    id: 'google-ceramic-sunrise-coffee-mug',
    title: 'Google Ceramic Sunrise Coffee Mug 14oz',
    slug: 'google-ceramic-sunrise-coffee-mug',
    price: 18.00,
    category: 'Drinkware',
    subcategory: 'Mugs',
    brand: 'Google',
    itemType: 'Mugs',
    sku: 'GGL-DRK-MUG-018',
    shortDescription: 'Stoneware matte ceramic coffee mug with Google color interior glaze and comfort loop handle.',
    description: 'Start your morning coding session right. Made with heavy artisan stoneware that retains warmth longer, featuring a silky matte exterior and a glossy Google Blue interior glaze that pops.',
    details: [
      '14 oz (414 ml) generous capacity for coffee, tea, and hot cider',
      'Thick stoneware walls maintain hot liquid temperature',
      'Comfort-grip ergonomic handle fits up to 3 fingers',
      'Microwave and dishwasher safe'
    ],
    materials: 'High-fire lead-free glazed stoneware ceramic.',
    careInstructions: 'Dishwasher safe. Avoid extreme sudden thermal shock.',
    sustainabilityNote: 'Crafted with non-toxic natural clay minerals.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte White / Google Blue', hex: '#4285F4' },
      { name: 'Matte Charcoal / Google Yellow', hex: '#FBBC05' },
      { name: 'Matte White / Google Red', hex: '#EA4335' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 42 }
    ],
    rating: 4.8,
    reviewCount: 76,
    inStock: true,
    badge: 'Morning Essential'
  },
  {
    id: 'google-recycled-ocean-commuter-tote',
    title: 'Google Eco Recycled Commuter Tote Bag',
    slug: 'google-recycled-ocean-commuter-tote',
    price: 24.00,
    category: 'Bags & Backpacks',
    subcategory: 'Backpacks & Totes',
    brand: 'Google',
    itemType: 'Backpacks & Totes',
    sku: 'GGL-BAG-TOT-024',
    shortDescription: 'Heavy-duty 14oz recycled cotton canvas grocery and laptop tote with reinforced shoulder straps and interior zip pocket.',
    description: 'Your everyday do-it-all carryall. Constructed from heavy 14oz recycled cotton canvas with sturdy 12" drop handles, zippered internal valuables pocket for keys and phone, and a snap button top closure.',
    details: [
      'Roomy 18L main compartment with structured flat bottom gusset',
      'Interior zippered pocket (fits smartphones and wallets)',
      'Reinforced cross-stitched webbing handles with 12" drop',
      'Screenprinted minimal Google logotype with water-based inks'
    ],
    materials: '100% Recycled Heavy Cotton Canvas (14oz).',
    careInstructions: 'Machine wash cold inside out, hang to dry.',
    sustainabilityNote: 'Saves 1,200 liters of water compared to conventional virgin cotton manufacturing.',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Oatmeal Canvas', hex: '#EAE6DF' },
      { name: 'Midnight Charcoal', hex: '#202124' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 55 }
    ],
    rating: 4.8,
    reviewCount: 44,
    isEcoFriendly: true,
    inStock: true,
    badge: 'Eco-Friendly'
  },
  {
    id: 'google-pixel-magnetic-leather-wallet-stand',
    title: 'Google Pixel Magnetic Vegan Leather Wallet Stand',
    slug: 'google-pixel-magnetic-leather-wallet-stand',
    price: 34.00,
    category: 'Accessories',
    subcategory: 'Tech Accessories',
    brand: 'Pixel',
    itemType: 'Tech Accessories',
    sku: 'GGL-ACC-WL-034',
    shortDescription: 'Foldable magnetic card holder and adjustable phone stand made with premium plant-based vegan leather.',
    description: 'Snaps magnetically to the back of your Google Pixel or MagSafe compatible phone case. Holds up to 3 cards with RFID shielding protection, and effortlessly unfolds into an adjustable portrait or landscape viewing stand for video calls and YouTube streaming.',
    details: [
      'Strong N52 neodymium magnetic array locks firmly onto devices',
      'Holds 1 to 3 credit cards with built-in spring tension retention',
      'Integrated RFID-blocking inner lining to protect cards from unauthorized scans',
      'Adjustable angle kickstand for portrait and landscape modes',
      'Ultra-slim 0.28" profile'
    ],
    materials: 'Plant-Based Bio-Polyurethane Vegan Leather, Manganese Steel Hinge.',
    careInstructions: 'Wipe with a soft dry or damp cloth.',
    sustainabilityNote: 'Made from renewable sugarcane bio-polyols.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Hazel Grey', hex: '#69706C' },
      { name: 'Obsidian Black', hex: '#202124' },
      { name: 'Porcelain White', hex: '#F8F9FA' },
      { name: 'Rose Gold', hex: '#E0B5B2' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 36 }
    ],
    rating: 4.7,
    reviewCount: 29,
    isNew: true,
    inStock: true,
    badge: 'Pixel Series'
  },
  {
    id: 'google-bamboo-stylus-ballpoint-pen-set',
    title: 'Google Bamboo Stylus Ballpoint Pen Set (3-Pack)',
    slug: 'google-bamboo-stylus-ballpoint-pen-set',
    price: 14.00,
    category: 'Stationery',
    subcategory: 'Journals & Pens',
    brand: 'Google',
    itemType: 'Journals & Pens',
    sku: 'GGL-STN-PEN-014',
    shortDescription: 'Smooth gel ink rollerball pens featuring sustainable bamboo barrels and soft-touch capacitive touchscreen stylus tips.',
    description: 'Switch effortlessly from taking notebook notes to interacting with touchscreens and Pixel tablets. Contains black 0.5mm quick-dry waterproof gel ink with refillable cartridges.',
    details: [
      'Set of 3 pens with precision laser-engraved Google logo',
      'Natural rapid-growth bamboo wood barrels',
      'Smooth capacitive rubber stylus tip compatible with all touchscreens',
      'Refillable 0.5mm black archival gel ink cartridge'
    ],
    materials: 'Sustainable Moso Bamboo, Recycled Aluminum Hardware.',
    careInstructions: 'Store with cap closed in dry pencil case.',
    sustainabilityNote: 'Biodegradable bamboo body harvest from sustainable forests.',
    images: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Natural Bamboo Trio', hex: '#C19A6B' }
    ],
    sizes: ['One Size'],
    stockBySize: [
      { size: 'One Size', available: 80 }
    ],
    rating: 4.8,
    reviewCount: 31,
    isEcoFriendly: true,
    inStock: true,
    badge: 'Eco Stationery'
  }
];
