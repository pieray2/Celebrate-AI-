import { CelebrationEvent } from '../types/event';

export const SAMPLE_EVENTS: CelebrationEvent[] = [
  {
    id: 'sample-wedding-aarav-diya',
    title: "Aarav & Diya's Grand Heritage Wedding",
    eventType: 'wedding',
    eventDate: '2026-12-14',
    location: 'Udaipur, Rajasthan',
    guestCount: 180,
    totalBudget: 1500000, // ₹15,00,000 (15 Lakhs)
    theme: 'Royal Rajputana & Marigold Splendor',
    colors: 'Deep Marigold, Emerald Green, Champagne Gold & Ivory',
    style: 'royal',
    setting: 'hybrid',
    specialRequirements: 'Live Shehnai & Nagada welcome, Jain and Rajasthani Dal Baati Churma food counters, eco-friendly seed-paper favors, golf cart transit for elderly grandparents.',
    createdAt: '2026-10-20T10:00:00Z',
    updatedAt: '2026-10-24T18:30:00Z',
    aiPlan: {
      isAIGenerated: true,
      generatedAt: '2026-10-24T18:30:00Z',
      themeConcept: {
        title: 'Rajputana Heritage & Marigold Whispers',
        tagline: 'Timeless palace opulence meets heartfelt warmth beneath Udaipur skies',
        vibe: 'Regal, culturally resonant, warm, and illuminated by hundreds of brass lanterns and marigold garlands.',
        colorPalette: [
          { name: 'Royal Marigold', hex: '#f59e0b', usage: 'Floral canopies, varmala stage & entrance torans' },
          { name: 'Emerald Velvet', hex: '#047857', usage: 'Lounge cushions, royal backdrop draping & menu cards' },
          { name: 'Champagne Gold', hex: '#d97706', usage: 'Brass urli bowls, fairy lights & foil-stamped stationery' },
          { name: 'Warm Ivory', hex: '#fef3c7', usage: 'Table linens, airy mandap drapes & floral pathways' }
        ],
        decorHighlights: [
          'Floating brass urli bowls filled with fresh rose petals and scented floating wax diyas at the entryway',
          'Curved 14-foot heritage mandap wrapped in dense yellow and orange marigold ropes overlooking the lake',
          'Intricate mirror-work (Thikri art) photo wall with customized couple brass monogram',
          'Fairy-light canopy forming an enchanted starry night ceiling over dining lawn'
        ],
        attireGuide: 'Guests: Traditional festive regalia (Bandhgala, Sherwani, Silk Sarees or Lehengas in jewel tones). Couple: Classic Raw Silk Ivory and Deep Crimson with antique zardozi work.'
      },
      cateringAndMenu: {
        style: 'Royal Rajasthani Thali & Multi-Regional Live Street Food Bazaar',
        highlights: [
          'Live Dal Baati Churma live station with 5 ghee infusions',
          'Ker Sangri & Gatte ki Subzi served in clay pots with hot Bajra Rotla',
          'Chaat Galli: Udaipur style Dahi Kachori, Golgappa with 4 mint-tamarind waters',
          'Artisanal Dessert Bar: Malpua with Rabri, Ghevar towers with silver vark & Kesar Kulfi'
        ],
        signatureDrinks: [
          'Shahi Gulab Jal Sharbat with chia & mint',
          'Spiced Kesariya Thandai with crushed pistachios',
          'Smoked Kokum Margarita (Mocktail)'
        ],
        estimatedPerPlateCost: 2600,
        dietaryNotes: 'Full separate pure Jain counter, nut-free labels on all mithais, and fresh fruit skewers for fasting guests.'
      },
      entertainmentAndActivities: [
        {
          id: 'ent-1',
          name: 'Live Shehnai & Nagada Welcoming Troupe',
          description: 'Acoustic classical welcome with rose petal shower for entering baraatis and guests',
          duration: '1.5 Hours',
          estimatedCost: 35000
        },
        {
          id: 'ent-2',
          name: 'Rajasthani Kalbelia & Ghoomar Folk Dancers',
          description: 'Mesmerizing fire & brass pot balancing folk dance show before the Varmala',
          duration: '45 Minutes',
          estimatedCost: 45000
        },
        {
          id: 'ent-3',
          name: 'Live Acoustic Sufi & Bollywood Band',
          description: 'Soulful twilight melodies during cocktail and royal feast hours',
          duration: '2.5 Hours',
          estimatedCost: 85000
        }
      ],
      guestExperience: [
        'Personalized welcome hamper in guest rooms with handwritten note and herbal hangover/refreshment kit',
        'Live Lac Bangle artisan crafting customized bangles for female guests on the spot',
        'Instant Polaroid memory guestbook with metallic sketch markers for heartfelt wishes',
        'Shawl and pashmina warmer station for chilly desert night breeze'
      ],
      schedule: [
        { id: 'sch-1', time: '03:30 PM', activity: 'Guest Arrival & Floral Welcome Drink', notes: 'Rose petal shower at palace courtyard with chilled Kesariya Thandai', stage: 'afternoon' },
        { id: 'sch-2', time: '04:30 PM', activity: 'Grand Royal Baraat & Dhol Procession', notes: 'Groom entrance with brass band, flower umbrellas and safa tying station', stage: 'afternoon' },
        { id: 'sch-3', time: '05:45 PM', activity: 'Lakeside Varmala & Fireworks Display', notes: 'Exchange of floral garlands on the raised lakeside terrace at sunset', stage: 'evening' },
        { id: 'sch-4', time: '06:30 PM', activity: 'Pheras at the Marigold Mandap', notes: 'Sacred rituals with Vedic priest, live sitar-tabla background ambiance', stage: 'evening' },
        { id: 'sch-5', time: '08:00 PM', activity: 'Royal Feast & Sufi Band Performance', notes: 'Seated buffet dinner begins with live acoustic sufi melodies', stage: 'night' }
      ],
      costSavingTips: [
        'Source marigolds and jasmine directly from local Udaipur mandi rather than imported carnations to save up to 40% on floral decor.',
        'Choose a heritage venue that already has architectural arches and ambient lighting so you spend less on artificial structural rigging.',
        'Use elegant digital WhatsApp video invitations with seed-paper save-the-dates instead of heavy boxed stationery.'
      ],
      splurgeRecommendations: [
        'Top-tier candid photographer & drone team—these visual memories will outlive the flowers and food.',
        'Signature dessert presentation—a live flambé or rabri-jalebi counter leaves the strongest sensory memory on guests.'
      ]
    },
    budgetItems: [
      { id: 'b-1', category: 'Venue', name: 'Heritage Lakeside Palace Lawn & Courtyard', estimatedCost: 420000, actualCost: 400000, percentageOfBudget: 28, isPaid: true, notes: 'Includes 2 suites for bridal prep and lighting fixtures', isAIEstimate: true },
      { id: 'b-2', category: 'Catering', name: 'Royal Thali + Live Chaat Stations (180 pax @ ₹2600)', estimatedCost: 468000, actualCost: 470000, percentageOfBudget: 31, isPaid: false, notes: 'Includes welcome drinks, starters, 4 dessert stations and service staff', isAIEstimate: true },
      { id: 'b-3', category: 'Decor & Lighting', name: 'Marigold Mandap, Floral Arches & Fairy Canopy', estimatedCost: 220000, actualCost: 210000, percentageOfBudget: 15, isPaid: false, notes: 'Includes entrance torans, urli bowl styling and ambient warm floodlights', isAIEstimate: true },
      { id: 'b-4', category: 'Photography & Videography', name: 'Candid Photography, Cinematic Film & Drone', estimatedCost: 150000, actualCost: 150000, percentageOfBudget: 10, isPaid: true, notes: '2 candid photographers + 2 cinematographers + same-day teaser reel', isAIEstimate: true },
      { id: 'b-5', category: 'Entertainment & Music', name: 'Sufi Band, Shehnai Players & Folk Dancers', estimatedCost: 105000, percentageOfBudget: 7, isPaid: false, notes: 'Includes sound system, mixer and microphones', isAIEstimate: true },
      { id: 'b-6', category: 'Attire & Styling', name: 'Bridal & Groom Makeup Artist + Safa Tying Team', estimatedCost: 65000, percentageOfBudget: 4.3, isPaid: false, notes: 'Airbrush HD makeup for bride + mother, safa tying for 50 baraatis', isAIEstimate: true },
      { id: 'b-7', category: 'Gifts & Favors', name: 'Artisan Lac Bangles & Seed Paper Mithai Boxes', estimatedCost: 42000, percentageOfBudget: 2.8, isPaid: false, notes: '180 custom packaged boxes with organic sweets', isAIEstimate: true },
      { id: 'b-8', category: 'Miscellaneous & Buffer', name: 'Emergency Contingency & Transportation Shuttle', estimatedCost: 30000, percentageOfBudget: 2.0, isPaid: false, notes: 'Golf cart rentals and unexpected tips/generator backup', isAIEstimate: true }
    ],
    timelineTasks: [
      { id: 't-1', phase: '4-6 Months Prior', title: 'Book Udaipur Heritage Venue and secure wedding date', category: 'Venue', priority: 'high', dueDate: '2026-08-15', completed: true, notes: 'Contract signed with 20% advance token' },
      { id: 't-2', phase: '4-6 Months Prior', title: 'Finalize Candid Photographer & Cinematographer', category: 'Photo & Video', priority: 'high', dueDate: '2026-09-01', completed: true, notes: 'Portfolio verified and shot list agreed upon' },
      { id: 't-3', phase: '2-3 Months Prior', title: 'Menu food tasting with catering chef (Jain & Rajasthani)', category: 'Catering', priority: 'high', dueDate: '2026-10-15', completed: true, notes: 'Approved Dal Baati, Ker Sangri & Kesar Rabri Malpua' },
      { id: 't-4', phase: '1 Month Prior', title: 'Send digital WhatsApp invitations & track RSVPs', category: 'Invitations', priority: 'high', dueDate: '2026-11-14', completed: false, notes: 'Create guest accommodation room allocation sheet' },
      { id: 't-5', phase: '2 Weeks Prior', title: 'Conduct sound and lighting walkthrough at venue lawn', category: 'Decor', priority: 'medium', dueDate: '2026-12-01', completed: false, notes: 'Test acoustic limitations near lake shore' },
      { id: 't-6', phase: '1 Week Prior', title: 'Pack wedding favors and prepare vendor payment cash envelopes', category: 'Gifts', priority: 'medium', dueDate: '2026-12-07', completed: false, notes: 'Keep emergency tip denominations handy' },
      { id: 't-7', phase: 'Day Before & Event Day', title: 'Early morning mandap floral inspection & Varmala handover', category: 'Decor', priority: 'high', dueDate: '2026-12-14', completed: false, notes: 'Ensure fresh marigold fragrance and refrigerated varmalas' }
    ],
    vendorChecklist: [
      { id: 'v-1', category: 'Venue', vendorRole: 'Banquet & Lawn Operations Manager', name: 'Lake Palace Heritage Event Team', contact: '+91 98290 12345', estimatedPrice: 420000, status: 'Booked', questionsToAsk: ['Is power generator backup included?', 'What time must music volume be reduced to 45dB?'], notes: 'Advance paid; permits obtained for fireworks.', isAIEstimate: true },
      { id: 'v-2', category: 'Catering', vendorRole: 'Master Royal Rasoi Caterers', name: 'Royal Mewar Hospitality', contact: '+91 98292 98765', estimatedPrice: 468000, status: 'Shortlisted', questionsToAsk: ['Can you provide separate Jain cookware and live fryers?', 'Are mineral water bottles and welcome glasses included?'], notes: 'Tasting scheduled for next weekend.', isAIEstimate: true },
      { id: 'v-3', category: 'Photo & Video', vendorRole: 'Lead Candid Photographer & Drone Pilot', name: 'Shutter & Stories Studio', contact: '+91 97110 45678', estimatedPrice: 150000, status: 'Booked', questionsToAsk: ['Will you deliver raw footage and a 3-minute cinematic reel?', 'How many edited high-res photos in the final album?'], notes: 'Drone clearance permit applied for.', isAIEstimate: true },
      { id: 'v-4', category: 'Decor & Florist', vendorRole: 'Traditional Mandap & Floral Decorator', name: 'Pushp Floral Creations', contact: '+91 94140 33221', estimatedPrice: 220000, status: 'Contacted', questionsToAsk: ['Do you use fresh marigolds sourced on the event morning?', 'Can you set up waterproof canopies in case of dew?'], notes: 'Quotation received, negotiating floral density.', isAIEstimate: true },
      { id: 'v-5', category: 'Music & DJ', vendorRole: 'Live Acoustic Sufi Troupe & Folk Artists', name: 'Desert Strings Collective', contact: '+91 98281 77665', estimatedPrice: 105000, status: 'Shortlisted', questionsToAsk: ['What is the stage and sound monitor requirement?', 'Will you perform during both the pheras and dinner?'], notes: 'Recommended by venue manager.', isAIEstimate: true }
    ],
    invitations: [
      {
        id: 'inv-1',
        style: 'Royal / Traditional',
        title: 'Shree Ganeshay Namah - Royal Invitation',
        content: `|| श्री गणेशाय नमः ||

With the divine blessings of our ancestors and the warmth of family,
The Sharma & Verma families cordially invite you to celebrate the holy union of

AARAV  &  DIYA
(Grandson of Smt. & Shri Ramakant Sharma | Granddaughter of Smt. & Shri O.P. Verma)

As they embark on a lifetime of companionship, laughter, and sacred vows.

Date: Sunday, December 14, 2026
Venue: The Royal Mewar Heritage Lawns, Lake Pichola, Udaipur, Rajasthan
Baraat Welcome: 4:30 PM | Varmala: 5:45 PM | Vedic Pheras & Dinner: 6:30 PM onwards

Your gracious presence and heartfelt blessings will make this auspicious occasion truly unforgettable.

RSVP: +91 98290 12345 / +91 97110 45678
Blessings Only`,
        suggestedHashtags: ['#AaravWedsDiya', '#UdaipurRoyalWed', '#DiyaKiBaraat', '#TwoHeartsOneSoul']
      },
      {
        id: 'inv-2',
        style: 'WhatsApp Quick Invite',
        title: 'Breezy & Warm WhatsApp Broadcast',
        content: `✨ Save the Date! Aarav & Diya are getting married! 💍✨

Hey everyone! We would love nothing more than having you by our side as we tie the knot in the royal city of Udaipur! 🏰🌺

🗓 Date: 14th December 2026
📍 Venue: Royal Mewar Heritage Lawns, Udaipur
⏰ 4:30 PM onwards (Baraat, Sunset Varmala, and Delicious Rajasthani Feast!)

Please keep your calendar free and bring your best dancing shoes! 💃🕺
More travel and accommodation details on our link: celebrate.ai/aarav-diya

Love,
Aarav & Diya ❤️`,
        suggestedHashtags: ['#AaravFoundHisDiya', '#UdaipurCalling']
      }
    ]
  },
  {
    id: 'sample-birthday-rohan-30',
    title: "Rohan's 30th Cyberpunk Sunset Rooftop Birthday",
    eventType: 'birthday',
    eventDate: '2026-11-20',
    location: 'Indiranagar Rooftop, Bengaluru',
    guestCount: 45,
    totalBudget: 150000, // ₹1,50,000 (1.5 Lakhs)
    theme: 'Cyberpunk Neon Glow & Sunset Cocktails',
    colors: 'Neon Magenta, Cyber Cyan, Midnight Charcoal & Electric Gold',
    style: 'modern-minimal',
    setting: 'outdoor',
    specialRequirements: 'Custom cocktail bar with smoked gin infusions, neon photo-booth with personalized LED sign, arcade video game console corner, gourmet sliders and bao buns.',
    createdAt: '2026-10-22T14:00:00Z',
    updatedAt: '2026-10-24T12:00:00Z',
    aiPlan: {
      isAIGenerated: true,
      generatedAt: '2026-10-24T12:00:00Z',
      themeConcept: {
        title: 'Dirty Thirty: Neon Genesis Rooftop',
        tagline: 'High-octane synthwave beats, electric cocktails, and panoramic Bengaluru skyline vibes',
        vibe: 'Modern, vibrant, electric, energetic, and effortlessly cool with illuminated neon glasses and deep house tunes.',
        colorPalette: [
          { name: 'Neon Magenta', hex: '#ec4899', usage: 'Custom LED quote sign, glow sticks & cocktail rims' },
          { name: 'Cyber Cyan', hex: '#06b6d4', usage: 'Under-bar LED strip lighting & mood uplighting' },
          { name: 'Midnight Charcoal', hex: '#0f172a', usage: 'Matte black bar counter, lounge sofas & modern plates' },
          { name: 'Electric Gold', hex: '#eab308', usage: 'Champagne sparklers & gourmet slider picks' }
        ],
        decorHighlights: [
          'Custom acrylic neon sign reading "LEVEL 30 UNLOCKED" mounted against lush faux foliage',
          'UV blacklight cocktail lounge corner with glowing neon drinkware and coasters',
          'Mini retro arcade machine station with Street Fighter & Pac-Man tournaments',
          'Wireless silent-disco headphones for post-10 PM rooftop dance session'
        ],
        attireGuide: 'Smart Casual / Cyber Chic: Black, metallics, vibrant neon accents or sharp streetwear.'
      },
      cateringAndMenu: {
        style: 'Gourmet Small Plates & Live Craft Cocktail Mixology',
        highlights: [
          'Steamed Truffle Edamame & Teriyaki Chicken Bao Buns',
          'Smoked Pulled Jackfruit & Lamb Brioche Sliders with sweet potato crisps',
          'Woodfired Neapolitan Pizza slices with artisanal chili honey drizzle',
          'Nutella & Belgian Dark Chocolate Churro Bites with salted caramel dip'
        ],
        signatureDrinks: [
          'The 30th Horizon: Butterfly pea flower smoked gin & tonic with elderflower',
          'Electric Blue Lagoon: Lychee, blue curacao & spicy kaffir lime soda',
          'Cold Brew Bourbon Twist (Mocktail/Cocktail)'
        ],
        estimatedPerPlateCost: 1400,
        dietaryNotes: '50% vegetarian options clearly marked; dairy-free dipping sauces available.'
      },
      entertainmentAndActivities: [
        { id: 'ent-b1', name: 'Live DJ & Deep House / Synthwave Set', description: 'Curated 4-hour set transitioning from sunset chill lounge to upbeat club hits', duration: '4 Hours', estimatedCost: 25000 },
        { id: 'ent-b2', name: 'Roast & Toast: "Rohan\'s Greatest Hits" Video Reel', description: 'Surprise 7-minute compilation video from school and college friends projected on screen', duration: '15 Minutes', estimatedCost: 5000 },
        { id: 'ent-b3', name: 'Neon Beer Pong & Retro Gaming Tournament', description: 'Friendly high-energy party tournament with custom printed trophy for the champion', duration: '1 Hour', estimatedCost: 3500 }
      ],
      guestExperience: [
        'Custom UV neon sunglasses handed to every guest upon arrival',
        'Polaroid photo wall where guests snap a photo and write a piece of 30s advice',
        'Midnight cake cutting with 4 sparkling cold-pyro fountains (smokeless)'
      ],
      schedule: [
        { id: 'sb-1', time: '06:30 PM', activity: 'Sunset Welcome & Craft Cocktails', notes: 'Guests arrive to golden hour skyline views and signature gin drinks', stage: 'evening' },
        { id: 'sb-2', time: '07:45 PM', activity: 'Retro Arcade Tournament & Appetizer Rounds', notes: 'Bao buns and sliders passed around while arcade tournament kicks off', stage: 'evening' },
        { id: 'sb-3', time: '09:00 PM', activity: 'Surprise Toast, Video Reel & Cake Cutting', notes: 'Heartfelt speeches followed by custom chocolate-hazelnut tier cake', stage: 'night' },
        { id: 'sb-4', time: '09:30 PM', activity: 'DJ Dance Floor & Midnight Snacks', notes: 'Upbeat tracks, churro cones and woodfired pizza bites', stage: 'night' }
      ],
      costSavingTips: [
        'Negotiate a minimum spend beverage package with the rooftop venue rather than a separate rental fee.',
        'Rent neon lighting package and arcade machine as a bundle from local Bangalore party rental vendors.'
      ],
      splurgeRecommendations: [
        'Hire an expert mixologist with flair cocktail tricks—it keeps the bar area buzzing and entertaining all night.'
      ]
    },
    budgetItems: [
      { id: 'bb-1', category: 'Venue', name: 'Indiranagar Rooftop Private Lounge Area', estimatedCost: 35000, actualCost: 35000, percentageOfBudget: 23.3, isPaid: true, notes: 'Cover charge waived with minimum food/bar billing', isAIEstimate: true },
      { id: 'bb-2', category: 'Catering', name: 'Gourmet Baos, Sliders & Woodfired Pizzas (45 pax)', estimatedCost: 45000, actualCost: 44000, percentageOfBudget: 30, isPaid: false, notes: 'Includes 4 veg + 3 non-veg finger foods & dessert churros', isAIEstimate: true },
      { id: 'bb-3', category: 'Entertainment & Music', name: 'Live DJ + Sound Gear + Mixologist Bar Team', estimatedCost: 30000, actualCost: 28000, percentageOfBudget: 20, isPaid: false, notes: 'Includes laser lights and fog machine for the dance floor', isAIEstimate: true },
      { id: 'bb-4', category: 'Decor & Lighting', name: 'Custom Neon Sign ("Level 30") & UV Blacklights', estimatedCost: 18000, percentageOfBudget: 12, isPaid: true, notes: 'Neon sign is retained by Rohan as bedroom wall art!', isAIEstimate: true },
      { id: 'bb-5', category: 'Photography & Videography', name: 'Party Photographer + Polaroid Camera Station', estimatedCost: 12000, percentageOfBudget: 8, isPaid: false, notes: '3 hours coverage + 50 polaroid film cartridges', isAIEstimate: true },
      { id: 'bb-6', category: 'Miscellaneous & Buffer', name: 'Artisan Hazelnut Cake + Cold Pyro Sparklers', estimatedCost: 10000, percentageOfBudget: 6.7, isPaid: false, notes: 'Custom 2.5 kg designer cake and safety sparklers', isAIEstimate: true }
    ],
    timelineTasks: [
      { id: 'tb-1', phase: '1 Month Prior', title: 'Confirm Indiranagar rooftop reservation and music license clearance', category: 'Venue', priority: 'high', dueDate: '2026-10-25', completed: true, notes: 'Outdoor music permit granted until 11 PM' },
      { id: 'tb-2', phase: '2 Weeks Prior', title: 'Order custom LED neon sign and collect friend video clips', category: 'Decor', priority: 'high', dueDate: '2026-11-06', completed: false, notes: 'Manufacturing takes 5 working days' },
      { id: 'tb-3', phase: '1 Week Prior', title: 'Curate must-play playlist and brief the DJ on favorite anthems', category: 'Entertainment', priority: 'medium', dueDate: '2026-11-13', completed: false, notes: 'Include nostalgic 2010s college tracks' },
      { id: 'tb-4', phase: 'Day Before & Event Day', title: 'Deliver Polaroid camera and set up retro gaming console', category: 'Activities', priority: 'high', dueDate: '2026-11-20', completed: false, notes: 'Check HDMI display and wireless controllers' }
    ],
    vendorChecklist: [
      { id: 'vb-1', category: 'Venue', vendorRole: 'Rooftop Lounge Manager', name: 'SkyDeck Indiranagar', contact: '+91 99001 22334', estimatedPrice: 35000, status: 'Booked', questionsToAsk: ['Is there a dedicated rain canopy in case of drizzle?', 'Are power sockets available for DJ deck?'], notes: 'Confirmed private section on top terrace.', isAIEstimate: true },
      { id: 'vb-2', category: 'Music & DJ', vendorRole: 'Electronic & Retro DJ', name: 'DJ Nikhil Beats', contact: '+91 98860 77112', estimatedPrice: 25000, status: 'Booked', questionsToAsk: ['Will you bring your own controller and speakers?', 'Can we connect microphone for birthday toast?'], notes: 'Playlist shared.', isAIEstimate: true },
      { id: 'vb-3', category: 'Cake & Bakery', vendorRole: 'Artisanal Patisserie Chef', name: 'Lavonne Academy Alumni Bakers', contact: '+91 80412 88990', estimatedPrice: 5500, status: 'Shortlisted', questionsToAsk: ['Can you make a metallic black & neon drizzle finish?', 'Will it withstand 2 hours in ambient temperature?'], notes: 'Belgian Dark Chocolate with Hazelnut Crunch chosen.', isAIEstimate: true }
    ],
    invitations: [
      {
        id: 'invb-1',
        style: 'Playful & Quirky',
        title: 'Level 30 Unlocked - WhatsApp Invite',
        content: `🚨 ALERT: ROHAN IS TURNING 30! 🚨

They say your 20s are a trial run... well, the subscription officially renews on November 20th! 🕹️✨

Join us for sunset skyline views, dangerous cocktails, synthwave beats, and zero adulting allowed.

🗓 Friday, Nov 20, 2026
⏰ 6:30 PM till late
📍 SkyDeck Rooftop Lounge, 100ft Road, Indiranagar, Bengaluru
👗 Dress Code: Smart Casual / Neon Accents / Cyber Chic

RSVP by Nov 12 so we can prep enough bao buns & drinks! 🍸🍔
Ping Rohan or Maya: +91 99001 22334`,
        suggestedHashtags: ['#RohanAt30', '#DirtyThirtyBangalore', '#Level30Unlocked']
      }
    ]
  },
  {
    id: 'sample-community-diwali-mela',
    title: "Greenwood Palms Grand Diwali & Cultural Mela",
    eventType: 'community',
    eventDate: '2026-11-01',
    location: 'Greenwood Palms Amphitheatre, Mumbai',
    guestCount: 320,
    totalBudget: 350000, // ₹3,50,000 (3.5 Lakhs)
    theme: 'Festival of Lights: Heritage Diyas & Folk Rhythms',
    colors: 'Saffron Orange, Royal Indigo, Festive Gold & Vermillion Red',
    style: 'traditional-festive',
    setting: 'outdoor',
    specialRequirements: 'Eco-friendly terracotta diya lighting ceremony, safe laser/soundless fireworks simulation, flea market stalls for society entrepreneurs, live Garba/Dandiya circle.',
    createdAt: '2026-10-18T09:00:00Z',
    updatedAt: '2026-10-23T16:00:00Z',
    aiPlan: {
      isAIGenerated: true,
      generatedAt: '2026-10-23T16:00:00Z',
      themeConcept: {
        title: 'Anandutsav: Society Diwali Carnival',
        tagline: 'Illuminating community bonds with laughter, craft bazaars, and dandiya beats',
        vibe: 'Warm, joyful, family-friendly, culturally rich, and twinkling with over 1,000 clay lamps.',
        colorPalette: [
          { name: 'Saffron Sunset', hex: '#ea580c', usage: 'Stage backdrop drapes, entrance banners & marigold garlands' },
          { name: 'Royal Indigo', hex: '#3730a3', usage: 'Contrast canopies, cushion covers & night lighting' },
          { name: 'Festive Gold', hex: '#ca8a04', usage: 'Brass bells, fairy string cascades & rangoli sparkles' },
          { name: 'Vermillion Red', hex: '#dc2626', usage: 'Traditional kumkum welcome kits & safety signage' }
        ],
        decorHighlights: [
          'Mega 20-foot Floral & Diya Rangoli created collaboratively by society youth club',
          'Trellis entrance lit with 800 fairy lights and suspended brass temple bells',
          'Designated safe photo-booth with vintage rickshaw decorated in marigolds and mirror embroidery',
          'Eco-friendly laser & digital light projection mapping on clubhouse wall instead of smoke crackers'
        ],
        attireGuide: 'Ethnic Festive / Traditional Kurta, Ghagra Choli or festive Sarees.'
      },
      cateringAndMenu: {
        style: 'Live Street Food Street (Khao Galli) with Society Food Tokens',
        highlights: [
          'Mumbai Special Pav Bhaji & Tawa Pulao counters',
          'Live Delhi-style Aloo Tikki & Pani Puri counter (3 flavors)',
          'South Indian Ghee Podi Mini Idli & Medu Vada station',
          'Hot Jalebi with Rabri & Masala Chai kulhad stall'
        ],
        signatureDrinks: [
          'Kulhad Masala Chai with ginger and cardamom',
          'Fresh Sugarcane & Mint Cooler',
          'Badam Pista Milk'
        ],
        estimatedPerPlateCost: 650,
        dietaryNotes: 'Pure vegetarian catering; dedicated Jain pavilion for snacks and dinner.'
      },
      entertainmentAndActivities: [
        { id: 'ent-c1', name: 'Inter-Tower Rangoli & Diya Decoration Contest', description: 'Fun competition across all 6 society residential towers with jury and trophies', duration: '1.5 Hours', estimatedCost: 15000 },
        { id: 'ent-c2', name: 'Children\'s Ramayana Musical Skit & Talent Showcase', description: 'Performances by society kids ages 5 to 15 on main amphitheatre stage', duration: '1 Hour', estimatedCost: 12000 },
        { id: 'ent-c3', name: 'Dandiya Raas & Live Dhol Beats Circle', description: 'High-energy community dance under fairy lights with free wooden dandiya sticks', duration: '2 Hours', estimatedCost: 35000 }
      ],
      guestExperience: [
        'Each family receives a welcome box of 5 hand-painted terracotta diyas and organic sweet box',
        'Flea market zone where resident bakers, artists and kids sell festive crafts',
        'Dedicated senior citizen lounge with cushioned armchairs and hot chai service'
      ],
      schedule: [
        { id: 'sc-1', time: '04:30 PM', activity: 'Diwali Flea Market & Food Stalls Open', notes: 'Community stalls start serving chaat and festive craft sales', stage: 'afternoon' },
        { id: 'sc-2', time: '06:00 PM', activity: 'Grand Diya Lighting & Society Puja', notes: 'Simultaneous lighting of 1,000 diyas and society committee prayer', stage: 'evening' },
        { id: 'sc-3', time: '07:00 PM', activity: 'Kids Cultural Performances & Prize Distribution', notes: 'Skit, classical dance and announcement of rangoli winners', stage: 'evening' },
        { id: 'sc-4', time: '08:30 PM', activity: 'Mega Dandiya Night & Live Dholak', notes: 'Live music, garba circle, dinner counters open until 11:00 PM', stage: 'night' }
      ],
      costSavingTips: [
        'Sell 12 flea market stall spaces to resident home entrepreneurs to fund 25% of stage lighting costs.',
        'Use reusable LED string lights purchased for society inventory rather than one-time rentals.'
      ],
      splurgeRecommendations: [
        'Sound system and professional dhol players—live percussion guarantees 100% community participation in the dance circle.'
      ]
    },
    budgetItems: [
      { id: 'bc-1', category: 'Catering', name: 'Khao Galli Food Stalls & Kulhad Chai (320 pax)', estimatedCost: 160000, actualCost: 155000, percentageOfBudget: 45.7, isPaid: false, notes: 'Subsidized society token system with 4 food counters', isAIEstimate: true },
      { id: 'bc-2', category: 'Decor & Lighting', name: 'Amphitheatre Fairy Lights, Rangoli & Clay Diyas', estimatedCost: 65000, actualCost: 60000, percentageOfBudget: 18.5, isPaid: true, notes: 'Includes 1,200 terracotta diyas and oil wicks', isAIEstimate: true },
      { id: 'bc-3', category: 'Entertainment & Music', name: 'Sound System, Professional Dhol & Stage Rigging', estimatedCost: 45000, actualCost: 45000, percentageOfBudget: 12.8, isPaid: true, notes: 'Microphones for kids show and powerful subwoofer for dandiya', isAIEstimate: true },
      { id: 'bc-4', category: 'Miscellaneous & Buffer', name: 'Laser Light Show & Clean-up Sanitation Crew', estimatedCost: 35000, percentageOfBudget: 10, isPaid: false, notes: 'Eco-friendly alternative to crackers + waste segregation bins', isAIEstimate: true },
      { id: 'bc-5', category: 'Gifts & Favors', name: 'Resident Diya Kits & Kids Competition Trophies', estimatedCost: 25000, percentageOfBudget: 7.1, isPaid: false, notes: 'Hand-painted clay lamps for 120 resident flats', isAIEstimate: true },
      { id: 'bc-6', category: 'Invitations & Stationery', name: 'Society Notice Boards, Banners & Standees', estimatedCost: 20000, percentageOfBudget: 5.7, isPaid: true, notes: '5 main entrance flex banners and digital PDF flyer', isAIEstimate: true }
    ],
    timelineTasks: [
      { id: 'tc-1', phase: '1 Month Prior', title: 'Submit event proposal & noise clearance to Resident Welfare Association', category: 'Permissions', priority: 'high', dueDate: '2026-10-05', completed: true, notes: 'RWA approved budget subsidy of ₹1,00,000' },
      { id: 'tc-2', phase: '2 Weeks Prior', title: 'Open registrations for flea market stalls & kids performance entries', category: 'Activities', priority: 'high', dueDate: '2026-10-18', completed: true, notes: '14 stalls booked and 22 kids registered' },
      { id: 'tc-3', phase: '1 Week Prior', title: 'Procure 1,200 clay diyas, cotton wicks and mustard oil bottles', category: 'Decor', priority: 'medium', dueDate: '2026-10-25', completed: false, notes: 'Order placed with local Kumbhar clay artisan' },
      { id: 'tc-4', phase: 'Day Before & Event Day', title: 'Stage sound check, banner installation & Rangoli outline drawing', category: 'Decor', priority: 'high', dueDate: '2026-11-01', completed: false, notes: 'Youth club volunteers assemble at 10 AM' }
    ],
    vendorChecklist: [
      { id: 'vc-1', category: 'Catering', vendorRole: 'Community Street Food Caterer', name: 'Swad Street Caterers Mumbai', contact: '+91 98200 44556', estimatedPrice: 160000, status: 'Booked', questionsToAsk: ['Can you manage simultaneous queue for 300+ people without bottlenecks?', 'Are compostable plates and wooden cutlery provided?'], notes: 'Tokens will be checked at counter.', isAIEstimate: true },
      { id: 'vc-2', category: 'Music & DJ', vendorRole: 'Live Punjabi & Gujarati Dhol Troupe', name: 'Dhol Beats Maharashtra', contact: '+91 97690 11223', estimatedPrice: 35000, status: 'Booked', questionsToAsk: ['How many drummers will accompany the garba session?'], notes: '2 dhol players + 1 percussionist.', isAIEstimate: true },
      { id: 'vc-3', category: 'Decor & Florist', vendorRole: 'Event Electrician & Fairy Light Contractor', name: 'Laxmi Electricals & Mandap', contact: '+91 93220 88776', estimatedPrice: 40000, status: 'Booked', questionsToAsk: ['Are earthing and circuit breakers tested for outdoor trees?'], notes: 'Includes safety inspection certificate.', isAIEstimate: true }
    ],
    invitations: [
      {
        id: 'invc-1',
        style: 'Formal Save The Date',
        title: 'Grand Diwali Carnival Circular',
        content: `🪔 GREENWOOD PALMS RESIDENTS WELFARE ASSOCIATION 🪔
Cordially invites all residents, children, and esteemed elders to

✨ ANANDUTSAV: THE GRAND DIWALI & CULTURAL MELA 2026 ✨

Celebrate the triumph of light, happiness, and community togetherness!

📅 Date: Sunday, 1st November 2026
📍 Venue: Society Main Amphitheatre & Central Lawn
⏰ Schedule:
   • 4:30 PM: Festive Flea Market & Delicious Khao Galli Open
   • 6:00 PM: Maha Aarti & Collective 1,000 Diya Lighting
   • 7:00 PM: Children's Ramayana Cultural Skit & Rangoli Awards
   • 8:30 PM: Mega Dandiya Raas with Live Dhol Beats!

👗 Attire: Traditional Festive Wear
🎟 Food Tokens available at Clubhouse Desk from Oct 25.

Let us celebrate an eco-friendly, green, and joy-filled Diwali together!
Warm regards,
Event Organising Committee`,
        suggestedHashtags: ['#GreenwoodDiwali2026', '#EcoFriendlyDiwali', '#CommunityCelebration']
      }
    ]
  }
];
