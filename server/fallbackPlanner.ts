import { AIPlan, BudgetItem, CelebrationEvent, InvitationDraft, TimelineTask, VendorItem } from '../src/types/event';

export function generateFallbackEventPlan(input: {
  eventType: string;
  title?: string;
  eventDate: string;
  location: string;
  guestCount: number;
  totalBudget: number;
  theme?: string;
  colors?: string;
  style?: string;
  setting?: string;
  specialRequirements?: string;
}): {
  aiPlan: AIPlan;
  budgetItems: BudgetItem[];
  timelineTasks: TimelineTask[];
  vendorChecklist: VendorItem[];
  invitations: InvitationDraft[];
} {
  const { eventType, eventDate, location, guestCount, totalBudget, specialRequirements } = input;
  const budget = Math.max(10000, totalBudget || 100000);
  const guests = Math.max(10, guestCount || 50);

  // Dynamic budget ratio allocation based on event type
  let venuePct = 0.25;
  let cateringPct = 0.35;
  let decorPct = 0.15;
  let photoPct = 0.08;
  let entertainmentPct = 0.08;
  let attireOrStylingPct = 0.04;
  let favorsPct = 0.03;
  let miscBufferPct = 0.02;

  if (eventType === 'birthday') {
    venuePct = 0.20;
    cateringPct = 0.38;
    decorPct = 0.16;
    entertainmentPct = 0.12;
    photoPct = 0.06;
    favorsPct = 0.04;
    attireOrStylingPct = 0.01;
    miscBufferPct = 0.03;
  } else if (eventType === 'community') {
    venuePct = 0.15;
    cateringPct = 0.40;
    decorPct = 0.15;
    entertainmentPct = 0.15;
    photoPct = 0.04;
    favorsPct = 0.05;
    attireOrStylingPct = 0.01;
    miscBufferPct = 0.05;
  }

  const perPlateEstimate = Math.round((budget * cateringPct) / guests);

  const themeTitle = input.theme || (
    eventType === 'wedding' ? 'Heritage Palace Splendor & Marigold Elegance' :
    eventType === 'birthday' ? 'Sunset Rooftop & Neon Starlight' :
    eventType === 'anniversary' ? 'Silver Pearl & Candlelight Romance' :
    eventType === 'graduation' ? 'Golden Horizon & Academic Triumph' :
    'Community Cultural Utsav & Folk Beats'
  );

  const colorStr = input.colors || 'Warm Marigold, Royal Emerald, Ivory & Champagne Gold';

  const budgetItems: BudgetItem[] = [
    {
      id: `b-venue-${Date.now()}`,
      category: 'Venue',
      name: `Prime ${input.setting === 'outdoor' ? 'Open Lawn / Terrace' : 'Banquet Hall / Resort'} in ${location}`,
      estimatedCost: Math.round(budget * venuePct),
      percentageOfBudget: Math.round(venuePct * 100),
      isPaid: false,
      notes: `Includes basic lighting and 6-hour hall access for ${guests} guests`,
      isAIEstimate: true
    },
    {
      id: `b-cater-${Date.now()}`,
      category: 'Catering',
      name: `Grand Feast & Welcome Drinks (${guests} guests @ ~₹${perPlateEstimate}/plate)`,
      estimatedCost: Math.round(budget * cateringPct),
      percentageOfBudget: Math.round(cateringPct * 100),
      isPaid: false,
      notes: 'Includes welcome coolers, 4 starters, 6 main courses and 3 artisanal desserts',
      isAIEstimate: true
    },
    {
      id: `b-decor-${Date.now()}`,
      category: 'Decor & Lighting',
      name: `Theme Styling, Floral Stage Backdrop & Ambient Lighting`,
      estimatedCost: Math.round(budget * decorPct),
      percentageOfBudget: Math.round(decorPct * 100),
      isPaid: false,
      notes: `Aligned with ${colorStr} palette`,
      isAIEstimate: true
    },
    {
      id: `b-photo-${Date.now()}`,
      category: 'Photography & Videography',
      name: 'Candid Photography & Event Cinematic Video Coverage',
      estimatedCost: Math.round(budget * photoPct),
      percentageOfBudget: Math.round(photoPct * 100),
      isPaid: false,
      notes: 'Full day coverage with high-res digital album & highlight reel',
      isAIEstimate: true
    },
    {
      id: `b-ent-${Date.now()}`,
      category: 'Entertainment & Music',
      name: 'Sound System, DJ / Live Acoustic Performers & Stage Rigging',
      estimatedCost: Math.round(budget * entertainmentPct),
      percentageOfBudget: Math.round(entertainmentPct * 100),
      isPaid: false,
      notes: 'Curated celebration playlist, microphones and party lighting',
      isAIEstimate: true
    },
    {
      id: `b-attire-${Date.now()}`,
      category: 'Attire & Styling',
      name: 'Makeup Artist / Grooming & Theme Styling Accessories',
      estimatedCost: Math.round(budget * attireOrStylingPct),
      percentageOfBudget: Math.round(attireOrStylingPct * 100),
      isPaid: false,
      notes: 'Professional touch-ups and theme accessories',
      isAIEstimate: true
    },
    {
      id: `b-favors-${Date.now()}`,
      category: 'Gifts & Favors',
      name: `Personalized Return Favors & Mementos for ${guests} Guests`,
      estimatedCost: Math.round(budget * favorsPct),
      percentageOfBudget: Math.round(favorsPct * 100),
      isPaid: false,
      notes: 'Eco-friendly keepsake boxes or sweet confections',
      isAIEstimate: true
    },
    {
      id: `b-misc-${Date.now()}`,
      category: 'Miscellaneous & Buffer',
      name: 'Contingency Fund, Generator Backup & Transit Logistics',
      estimatedCost: Math.round(budget * miscBufferPct),
      percentageOfBudget: Math.round(miscBufferPct * 100),
      isPaid: false,
      notes: 'Reserved for unexpected permits, extra guest plates or tips',
      isAIEstimate: true
    }
  ];

  // Helper date offset
  const baseDate = new Date(eventDate || Date.now() + 30 * 86400000);
  const formatDateOffset = (days: number) => {
    const d = new Date(baseDate.getTime() - days * 86400000);
    return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
  };

  const timelineTasks: TimelineTask[] = [
    {
      id: `t-1-${Date.now()}`,
      phase: '1-2 Months Prior',
      title: `Finalize venue contract & advance token in ${location}`,
      category: 'Venue',
      priority: 'high',
      dueDate: formatDateOffset(45),
      completed: true,
      notes: 'Confirm cancellation policies, sound cutoff times and power backup'
    },
    {
      id: `t-2-${Date.now()}`,
      phase: '1-2 Months Prior',
      title: `Confirm caterer tasting & lock per-plate menu (target ₹${perPlateEstimate}/plate)`,
      category: 'Catering',
      priority: 'high',
      dueDate: formatDateOffset(30),
      completed: false,
      notes: specialRequirements ? `Ensure special instructions: ${specialRequirements}` : 'Test signature welcome drinks and dessert counter'
    },
    {
      id: `t-3-${Date.now()}`,
      phase: '3 Weeks Prior',
      title: `Approve decor visual moodboard with florist and lighting contractor`,
      category: 'Decor',
      priority: 'medium',
      dueDate: formatDateOffset(21),
      completed: false,
      notes: `Ensure colors match: ${colorStr}`
    },
    {
      id: `t-4-${Date.now()}`,
      phase: '2 Weeks Prior',
      title: `Broadcast digital invitations via WhatsApp & email to ${guests} guests`,
      category: 'Invitations',
      priority: 'high',
      dueDate: formatDateOffset(14),
      completed: false,
      notes: 'Track confirmed attendance and dietary preferences'
    },
    {
      id: `t-5-${Date.now()}`,
      phase: '1 Week Prior',
      title: 'Finalize DJ playlist, speeches sequence and day-of schedule',
      category: 'Entertainment',
      priority: 'medium',
      dueDate: formatDateOffset(7),
      completed: false,
      notes: 'Verify microphone checks and special entry audio cue'
    },
    {
      id: `t-6-${Date.now()}`,
      phase: 'Day Before & Event Day',
      title: 'Morning venue walkthrough, floral inspection and vendor payment envelopes',
      category: 'Logistics',
      priority: 'high',
      dueDate: formatDateOffset(0),
      completed: false,
      notes: 'Designate a family member or event coordinator to guide incoming vendors'
    }
  ];

  const vendorChecklist: VendorItem[] = [
    {
      id: `v-1-${Date.now()}`,
      category: 'Venue',
      vendorRole: 'Venue Manager / Banquet Director',
      name: `${location} Event Estate`,
      contact: '+91 98000 11223',
      estimatedPrice: Math.round(budget * venuePct),
      status: 'Shortlisted',
      questionsToAsk: [
        'Are outside catering and decorators allowed without royalty surcharge?',
        'What is the sound limit and cutoff time for outdoor music?',
        'Is dedicated valet parking available for guests?'
      ],
      notes: 'Negotiate complimentary bridal/green rooms.',
      isAIEstimate: true
    },
    {
      id: `v-2-${Date.now()}`,
      category: 'Catering',
      vendorRole: 'Lead Executive Caterer & Banquet Chef',
      name: 'Royal Flavors Hospitality',
      contact: '+91 98111 22334',
      estimatedPrice: Math.round(budget * cateringPct),
      status: 'Contacted',
      questionsToAsk: [
        'How many service staff members will be assigned per 20 guests?',
        'Are chafing dishes, premium cutlery and glassware included?',
        'Can live cooking counters be arranged safely?'
      ],
      notes: 'Request live chaat or live pasta/wok counters.',
      isAIEstimate: true
    },
    {
      id: `v-3-${Date.now()}`,
      category: 'Decor & Florist',
      vendorRole: 'Theme Decor & Floral Lighting Designer',
      name: 'Aura Floral & Event Decors',
      contact: '+91 98222 33445',
      estimatedPrice: Math.round(budget * decorPct),
      status: 'Researching',
      questionsToAsk: [
        'Do you provide 3D stage rendering before installation?',
        'Are fresh florals used or artificial blends for ceiling trusses?',
        'Does the price include dismantle and post-event cleanup?'
      ],
      notes: `Focus on entrance walkway and selfie backdrop in ${colorStr}.`,
      isAIEstimate: true
    },
    {
      id: `v-4-${Date.now()}`,
      category: 'Photo & Video',
      vendorRole: 'Lead Candid Photographer & Cinematographer',
      name: 'Lumiere Celebration Films',
      contact: '+91 98333 44556',
      estimatedPrice: Math.round(budget * photoPct),
      status: 'Researching',
      questionsToAsk: [
        'Will drone aerial shots be included if permissions permit?',
        'What is the turnaround time for the teaser reel and full gallery?',
        'Do you bring backup camera bodies and lighting gear?'
      ],
      notes: 'Request portfolio of similar evening outdoor celebrations.',
      isAIEstimate: true
    },
    {
      id: `v-5-${Date.now()}`,
      category: 'Music & DJ',
      vendorRole: 'Celebration DJ & Sound Engineer',
      name: 'Rhythm Beats Audio',
      contact: '+91 98444 55667',
      estimatedPrice: Math.round(budget * entertainmentPct),
      status: 'Researching',
      questionsToAsk: [
        'What wattage sound system and subwoofers are provided for this guest size?',
        'Can you provide wireless cordless mics for speeches and toasts?',
        'Do you carry customized background tracks for family entries?'
      ],
      notes: 'Share blacklist of unwanted songs.',
      isAIEstimate: true
    }
  ];

  const invitations: InvitationDraft[] = [
    {
      id: `inv-1-${Date.now()}`,
      style: 'WhatsApp Quick Invite',
      title: 'Warm & Festive WhatsApp Message',
      content: `🎉 You're Warmly Invited! ✨

Please join us as we celebrate ${input.title || `${eventType.toUpperCase()} CELEBRATION`}!

🗓 Date: ${eventDate || 'Coming Soon'}
📍 Venue: ${location}
⏰ 6:00 PM onwards

Good food, joyful music, and unforgettable memories await! Your presence means the world to us.

Kindly RSVP by replying to this message.
Can't wait to celebrate together! 🥂🎈`,
      suggestedHashtags: [`#Celebrate${eventType}`, `#PartyIn${location.split(',')[0].replace(/\s+/g, '')}`]
    },
    {
      id: `inv-2-${Date.now()}`,
      style: 'Formal Save The Date',
      title: 'Elegant Card Text',
      content: `We request the pleasure of your company to celebrate

${input.title || `A Special ${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Evening`}

On ${eventDate || 'The Selected Date'}
At ${location}
Festivities commence at 6:30 in the evening

With best compliments from family and friends
RSVP Requested`,
      suggestedHashtags: [`#SaveTheDate`, `#CelebrationTime`]
    }
  ];

  const aiPlan: AIPlan = {
    isAIGenerated: true,
    generatedAt: new Date().toISOString(),
    themeConcept: {
      title: themeTitle,
      tagline: `An unforgettable celebration crafted with elegance, warmth, and joy`,
      vibe: `Sophisticated yet lively, customized for ${guests} guests in ${location} with curated ambiance.`,
      colorPalette: [
        { name: 'Primary Celebration Accent', hex: '#d97706', usage: 'Stage backdrop, centerpieces and key lighting' },
        { name: 'Rich Contrast', hex: '#0f766e', usage: 'Lounge drapes, cushions and graphic accents' },
        { name: 'Warm Illuminator', hex: '#fef08a', usage: 'Fairy lights, warm ambient wash & candle lanterns' },
        { name: 'Understated Neutral', hex: '#f8fafc', usage: 'Linens, seating covers and crisp tableware' }
      ],
      decorHighlights: [
        `Custom illuminated entrance arch with floral accents matching ${colorStr}`,
        `Intimate photo-booth corner featuring custom neon typography and themed props`,
        `Low-hanging warm fairy-light canopy creating a magical starlit glow`,
        `Ambient uplighting casting gentle highlights along architectural walls and greenery`
      ],
      attireGuide: `Dress Code: Festive Chic / Semi-Formal in tones of ${colorStr}.`
    },
    cateringAndMenu: {
      style: `Curated Gourmet Buffet & Live Food Station Experience`,
      highlights: [
        'Refreshing welcome mocktails and infused sparkling herb coolers',
        'Live appetizer counter with 4 artisanal finger bites (veg & non-veg options)',
        'Extensive main feast featuring regional favorites and slow-cooked delicacies',
        'Celebratory dessert pavilion with hot live sweets and chilled ice cream counter'
      ],
      signatureDrinks: [
        'Zesty Mint & Kokum Refresher',
        'Spiced Mango Passionfruit Spritz',
        'Artisanal Masala Chai / Filter Coffee Station'
      ],
      estimatedPerPlateCost: perPlateEstimate,
      dietaryNotes: specialRequirements || 'Clear vegetarian/non-vegetarian separation and nut allergen notices.'
    },
    entertainmentAndActivities: [
      {
        id: `act-1-${Date.now()}`,
        name: 'Curated Celebration Soundtrack & DJ Set',
        description: 'Smooth twilight ambient music transitioning into celebratory dance tracks',
        duration: '3.5 Hours',
        estimatedCost: Math.round(budget * 0.05)
      },
      {
        id: `act-2-${Date.now()}`,
        name: 'Interactive Memory Capsule & Photo Station',
        description: 'Instant prints where guests attach a photo and write a personal blessing or memory',
        duration: 'Throughout evening',
        estimatedCost: Math.round(budget * 0.02)
      },
      {
        id: `act-3-${Date.now()}`,
        name: 'Celebratory Toast & Surprise Audio-Visual Showcase',
        description: '5-minute curated video montage accompanied by sparkling celebratory lighting',
        duration: '20 Minutes',
        estimatedCost: Math.round(budget * 0.01)
      }
    ],
    guestExperience: [
      'Warm welcome drink and personalized welcome name card upon arrival',
      'Comfortable lounge seating layout that encourages friendly banter between all generations',
      'Thoughtful return gift bag packed with gourmet treats or artisanal keepsakes'
    ],
    schedule: [
      { id: `sch-1`, time: '05:30 PM', activity: 'Venue Access & Vendor Final Setup Checks', notes: 'Sound check, lighting balance, food station warmth inspection', stage: 'afternoon' },
      { id: `sch-2`, time: '06:30 PM', activity: 'Guest Reception & Signature Welcome Drinks', notes: 'Passing appetizers and photo station active', stage: 'evening' },
      { id: `sch-3`, time: '07:45 PM', activity: 'Main Ceremony / Welcome Toast / Speeches', notes: 'Key celebration moment and group photographs', stage: 'evening' },
      { id: `sch-4`, time: '08:30 PM', activity: 'Grand Feast & Dinner Service Opens', notes: 'Live stations running, soft background melodies', stage: 'night' },
      { id: `sch-5`, time: '09:45 PM', activity: 'Dance Floor & Sweet Desserts Finale', notes: 'Upbeat tracks, return favors distribution, heartfelt farewells', stage: 'night' }
    ],
    costSavingTips: [
      `Book local vendors based in ${location} to eliminate expensive outstation transit and accommodation surcharges.`,
      `Opt for in-season local florals rather than imported exotics to reduce floral budget by up to 35%.`,
      `Consolidate lighting and sound rentals under a single vendor package for bulk discount leverage.`
    ],
    splurgeRecommendations: [
      'Invest in experienced candid photography; it is the lasting tangible memory of the entire celebration.',
      'Prioritize exceptional dessert presentation—guests remember the final sweet note the longest.'
    ]
  };

  return {
    aiPlan,
    budgetItems,
    timelineTasks,
    vendorChecklist,
    invitations
  };
}
