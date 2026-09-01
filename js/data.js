/**
 * NORTH & KEY — Curated Property & Journal Catalog
 */

const PROPERTIES_DATA = [
  {
    id: 'casa-verde',
    title: 'Casa Verde',
    tagline: 'A sculptural coastal sanctuary above the Pacific surf',
    location: 'Malibu, California',
    city: 'Malibu',
    priceNumber: 1850000,
    priceFormatted: '$1,850,000',
    type: 'Modernist Villa',
    category: 'buy',
    beds: 4,
    baths: 4.5,
    area: '5,200 sq ft',
    lotSize: '1.4 Acres',
    yearBuilt: 2022,
    architect: 'Kengo Studio & Partners',
    coords: { x: 28, y: 44 },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Perched above the Pacific coastline, Casa Verde marries raw board-formed concrete with sweeping floor-to-ceiling Schuco glass, opening seamlessly to private olive terraces and an infinity-edge ocean vista. Natural materials dominate throughout: tactile travertine surfaces, fluted white oak cabinetry, and integrated architectural lighting that mirrors the shifting California sun.',
    amenities: [
      'Travertine infinity ocean-view pool',
      'Private ancient olive grove and stone paths',
      'Custom Boffi kitchen with brushed bronze fittings',
      'Temperature-controlled subterranean 600-bottle wine cellar',
      'Automated Schuco sliding glass wall systems',
      'Dedicated wellness pavilion with cedar dry sauna'
    ]
  },
  {
    id: 'the-glass-pavilion',
    title: 'The Glass Pavilion',
    tagline: 'Alpine minimalism immersed in aspen groves',
    location: 'Aspen, Colorado',
    city: 'Aspen',
    priceNumber: 14200000,
    priceFormatted: '$14,200,000',
    type: 'Architectural Compound',
    category: 'buy',
    beds: 5,
    baths: 6,
    area: '6,800 sq ft',
    lotSize: '3.2 Acres',
    yearBuilt: 2023,
    architect: 'Olsen & Kundig Atelier',
    coords: { x: 62, y: 35 },
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Conceived as a dialogue between heavy monolithic stone and featherlight glass, The Glass Pavilion offers uninterrupted views of the Elk Mountain Range. Japanese charred yakisugi wood balances thermal triple-pane glazing, retaining solar warmth while remaining invisible in the winter landscape.',
    amenities: [
      'Direct ski-in / ski-out private trail connection',
      'Radiant heated European limestone flooring throughout',
      'Open hearth suspended steel fireplace',
      'Dual primary suites with private landscaped courtyards',
      'Three-vehicle heated subterranean auto gallery'
    ]
  },
  {
    id: 'villa-solano',
    title: 'Villa Solano',
    tagline: 'Understated Mediterranean elegance in the foothills',
    location: 'Montecito, California',
    city: 'Montecito',
    priceNumber: 9650000,
    priceFormatted: '$9,650,000',
    type: 'Coastal Estate',
    category: 'buy',
    beds: 5,
    baths: 5.5,
    area: '6,100 sq ft',
    lotSize: '2.1 Acres',
    yearBuilt: 2021,
    architect: 'De La Torre Studio',
    coords: { x: 38, y: 55 },
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'A discreet modern estate inspired by the vernacular architecture of southern Europe, Villa Solano sits nestled among centuries-old coastal live oaks. Venetian plaster walls capture natural daylight, and outdoor pergolas covered in wisteria frame intimate mountain vistas.',
    amenities: [
      'Heated 60-foot lap pool lined in dark basalt stone',
      'Detached guest casita with private terrace and plunge pool',
      'Commercial-grade outdoor culinary kitchen & wood pizza oven',
      'Hand-crafted solid walnut millwork and custom cabinetry',
      'Organic citrus orchard and private cutting gardens'
    ]
  },
  {
    id: 'franklin-penthouse',
    title: 'The Franklin Penthouse',
    tagline: 'Historic architectural volume meet contemporary New York precision',
    location: 'Tribeca, New York',
    city: 'New York',
    priceNumber: 8900000,
    priceFormatted: '$8,900,000',
    type: 'Minimalist Loft',
    category: 'buy',
    beds: 3,
    baths: 3.5,
    area: '4,100 sq ft',
    lotSize: 'Penthouse',
    yearBuilt: 2020,
    architect: 'Annabelle Selldorf Architects',
    coords: { x: 78, y: 28 },
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Spanning the uppermost levels of an iconic 19th-century cast-iron landmark, this duplex sanctuary redefines urban living with 14-foot ceiling heights, original restored pine timber framing, and a private 1,200 sq ft rooftop garden with skyline perspectives.',
    amenities: [
      'Keyed private elevator opening directly into residence',
      'Custom Pietra di Cardozo stone kitchen island',
      '1,200 sq ft landscaped ipe wood rooftop terrace',
      'Smart Lutron Homeworks lighting & automated shading',
      '24-hour doorman and private secure storage cellar'
    ]
  },
  {
    id: 'kallio-house',
    title: 'Kallio House',
    tagline: 'Monolithic desert architecture framed by Joshua Tree granite',
    location: 'High Desert, California',
    city: 'Joshua Tree',
    priceNumber: 3450000,
    priceFormatted: '$3,450,000',
    type: 'Modernist Villa',
    category: 'buy',
    beds: 3,
    baths: 2.5,
    area: '3,200 sq ft',
    lotSize: '5.0 Acres',
    yearBuilt: 2024,
    architect: 'Studio Bark Design',
    coords: { x: 45, y: 68 },
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Constructed using site-excavated decomposed granite and compacted earth, Kallio House is an off-grid architectural marvel designed to regulate temperature passively while framing iconic desert boulder formations and protected stargazing reserves.',
    amenities: [
      'Central interior open-air pool courtyard',
      'Full off-grid Tesla solar storage & rainwater harvesting',
      'Floor-to-ceiling pivot steel doors and raw brass hardware',
      'Custom stargazing observation roof deck',
      'Native drought-tolerant desert botanical landscaping'
    ]
  },
  {
    id: 'belgravia-residence',
    title: 'The Belgravia Residence',
    tagline: 'Refined London heritage tailored for modern diplomacy',
    location: 'Belgravia, London',
    city: 'London',
    priceNumber: 16500000,
    priceFormatted: '$16,500,000',
    type: 'Historic Townhouse',
    category: 'buy',
    beds: 6,
    baths: 6.5,
    area: '7,400 sq ft',
    lotSize: 'Townhouse',
    yearBuilt: 2023,
    architect: 'Foster & Heritage UK',
    coords: { x: 82, y: 62 },
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'A Grade-II listed stucco terrace home restored to museum-quality standards. Classical Georgian cornices and soaring sash windows harmonize with an understated minimalist interior palette of honed Calacatta marble, bespoke bronze screens, and private garden salon.',
    amenities: [
      'Internal hydraulic passenger elevator serving all 5 floors',
      'Private subterranean wellness suite with 10m pool and steam',
      'Landscaped walled private mews garden',
      'Staff accommodation with secondary entrance',
      'Integrated Bang & Olufsen architectural acoustics'
    ]
  }
];

const ARTICLES_DATA = [
  {
    id: 'architecture-of-home',
    title: 'The Architecture of Home: Why Space Influences Emotion',
    category: 'Essays',
    date: 'August 24, 2026',
    readTime: '6 min read',
    author: 'Elena Vance, Architecture Editor',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'An investigation into how proportional volume, honest materials, and natural light patterns fundamentally shape human tranquility inside contemporary domestic spaces.'
  },
  {
    id: 'five-things-before-you-buy',
    title: 'Five Things to Know Before You Buy an Architectural Landmark',
    category: 'Market Insights',
    date: 'July 18, 2026',
    readTime: '8 min read',
    author: 'Julian Thorne, Principal Partner',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'Acquiring an architecturally significant estate is both a patron act and an investment strategy. Here is our advisory framework for stewardship and preservation.'
  },
  {
    id: 'neighborhoods-defining-tomorrow',
    title: 'The Neighborhoods Defining Tomorrow: Solitude and Connectedness',
    category: 'Living',
    date: 'June 05, 2026',
    readTime: '5 min read',
    author: 'Marcus Rey, Urbanism Research',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
    excerpt: 'From Montecito to the quietest corners of West Sussex, luxury buyers are shifting toward environments that offer privacy without sacrificing cultural proximity.'
  }
];
