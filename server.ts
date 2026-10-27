import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { generateFallbackEventPlan } from './server/fallbackPlanner.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Robust JSON extraction helper for LLM responses
function safeParseJSON<T>(text: string | undefined | null, fallback: T): T {
  if (!text) return fallback;
  const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    try {
      const match = text.match(/\{[\s\S]*\}/) || text.match(/\[[\s\S]*\]/);
      if (match) {
        return JSON.parse(match[0]);
      }
    } catch {
      // ignore
    }
  }
  return fallback;
}

// Helper to get GoogleGenAI client
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Generate Event Plan Route
app.post('/api/plan/generate', async (req: Request, res: Response) => {
  try {
    const {
      eventType,
      title,
      eventDate,
      location,
      guestCount,
      totalBudget,
      theme,
      colors,
      style,
      setting,
      specialRequirements,
      adjustments,
    } = req.body;

    const budgetNum = Number(totalBudget) || 150000;
    const guestNum = Number(guestCount) || 50;

    const ai = getGeminiClient();

    if (!ai) {
      console.warn('GEMINI_API_KEY not found or default, using smart fallback generator.');
      const fallback = generateFallbackEventPlan({
        eventType: eventType || 'wedding',
        title,
        eventDate: eventDate || new Date().toISOString().split('T')[0],
        location: location || 'India',
        guestCount: guestNum,
        totalBudget: budgetNum,
        theme,
        colors,
        style,
        setting,
        specialRequirements,
      });
      return res.json({
        success: true,
        isAIGenerated: false,
        note: 'Generated using CelebrateAI Smart Planning Engine (Gemini API key not configured or offline).',
        plan: fallback,
      });
    }

    const prompt = `You are CelebrateAI, an elite event planner, luxury celebration designer, and budgeting expert specializing in weddings, birthdays, anniversaries, graduations, and community cultural events in India and globally.

Generate a comprehensive, realistic, and personalized celebration plan strictly in JSON format.

Event Details:
- Type: ${eventType}
- Title / Celebration Name: ${title || `${eventType} Celebration`}
- Date: ${eventDate}
- Location: ${location}
- Guest Count: ${guestNum} guests
- Total Budget: ₹${budgetNum.toLocaleString('en-IN')} (Indian Rupees)
- Theme: ${theme || 'Curate a stunning theme based on event type'}
- Color Palette: ${colors || 'Curate a complementary color palette'}
- Style: ${style || 'elegant'}
- Setting: ${setting || 'indoor'}
- Special Requirements & Diet: ${specialRequirements || 'None specified'}
${adjustments ? `- Specific user adjustments/tweaks: ${adjustments}` : ''}

CRITICAL BUDGETING & REALISM GUIDELINES:
1. All costs MUST be in Indian Rupees (₹).
2. The sum of itemized estimated costs should stay strictly within or closely balance the total budget of ₹${budgetNum}.
3. Calculate realistic per-plate catering costs appropriate for ₹${budgetNum} and ${guestNum} guests (e.g. Budget catering ₹400-800/plate, mid-tier ₹900-1800/plate, luxury ₹2000-4000+/plate).
4. Provide itemized budget items across: Venue, Catering, Decor & Lighting, Entertainment & Music, Photography & Videography, Invitations & Stationery, Attire & Styling, Gifts & Favors, Miscellaneous & Buffer.
5. Create an actionable timeline with phased milestones (4-6 Months Prior, 1-2 Months Prior, 2 Weeks Prior, 1 Week Prior, Day Before & Event Day) with realistic target due dates formatted as YYYY-MM-DD based around event date: "${eventDate}".
6. Provide categorized vendor checklist items with specific roles, estimated pricing in ₹, 2-3 vital negotiation/vetting questions to ask, and practical notes.
7. Provide creative ideas: 2 diverse invitation message texts (e.g. 1 WhatsApp broadcast with emojis, 1 formal/traditional card text), 3 specific entertainment ideas with duration & cost, and 5 day-of schedule milestones.
8. Clearly label prices as estimates.

Return ONLY a valid JSON object matching this exact structure:
{
  "themeConcept": {
    "title": "Creative theme title",
    "tagline": "Evocative one-line tagline",
    "vibe": "Detailed vibe description",
    "colorPalette": [
      { "name": "Color Name", "hex": "#hexcode", "usage": "Where it is used" }
    ],
    "decorHighlights": ["Highlight 1", "Highlight 2", "Highlight 3", "Highlight 4"],
    "attireGuide": "Guidance on guest and host attire"
  },
  "cateringAndMenu": {
    "style": "Menu service style",
    "highlights": ["Food item 1", "Food item 2", "Food item 3", "Food item 4"],
    "signatureDrinks": ["Drink 1", "Drink 2", "Drink 3"],
    "estimatedPerPlateCost": 1200,
    "dietaryNotes": "Dietary and allergy management plan"
  },
  "entertainmentAndActivities": [
    {
      "id": "ent-1",
      "name": "Activity Name",
      "description": "What happens",
      "duration": "1.5 Hours",
      "estimatedCost": 25000
    }
  ],
  "guestExperience": ["Touchpoint 1", "Touchpoint 2", "Touchpoint 3"],
  "schedule": [
    {
      "id": "sch-1",
      "time": "05:00 PM",
      "activity": "Activity Name",
      "notes": "Practical execution tips",
      "stage": "afternoon"
    }
  ],
  "costSavingTips": ["Tip 1", "Tip 2", "Tip 3"],
  "splurgeRecommendations": ["Splurge recommendation 1", "Splurge recommendation 2"],
  "budgetItems": [
    {
      "id": "b-1",
      "category": "Venue",
      "name": "Venue Name / Type",
      "estimatedCost": 50000,
      "percentageOfBudget": 25,
      "isPaid": false,
      "notes": "Cost coverage notes",
      "isAIEstimate": true
    }
  ],
  "timelineTasks": [
    {
      "id": "t-1",
      "phase": "1 Month Prior",
      "title": "Task title",
      "category": "Venue",
      "priority": "high",
      "dueDate": "2026-11-15",
      "completed": false,
      "notes": "Execution note"
    }
  ],
  "vendorChecklist": [
    {
      "id": "v-1",
      "category": "Venue",
      "vendorRole": "Venue Operations Manager",
      "name": "Suggested Vendor Type / Venue in Location",
      "contact": "+91 98000 00000",
      "estimatedPrice": 50000,
      "status": "Researching",
      "questionsToAsk": ["Question 1", "Question 2"],
      "notes": "Vetting note",
      "isAIEstimate": true
    }
  ],
  "invitations": [
    {
      "id": "inv-1",
      "style": "WhatsApp Quick Invite",
      "title": "Catchy Invite Title",
      "content": "Full formatted invitation text with emojis",
      "suggestedHashtags": ["#Tag1", "#Tag2"]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const rawText = response.text || '{}';
    const parsedData: any = safeParseJSON(rawText, null);
    if (!parsedData || !parsedData.themeConcept) {
      throw new Error('Unable to extract valid structured JSON from model response');
    }

    const aiPlan = {
      isAIGenerated: true,
      generatedAt: new Date().toISOString(),
      themeConcept: parsedData.themeConcept,
      cateringAndMenu: parsedData.cateringAndMenu,
      entertainmentAndActivities: parsedData.entertainmentAndActivities || [],
      guestExperience: parsedData.guestExperience || [],
      schedule: parsedData.schedule || [],
      costSavingTips: parsedData.costSavingTips || [],
      splurgeRecommendations: parsedData.splurgeRecommendations || [],
    };

    return res.json({
      success: true,
      isAIGenerated: true,
      plan: {
        aiPlan,
        budgetItems: parsedData.budgetItems || [],
        timelineTasks: parsedData.timelineTasks || [],
        vendorChecklist: parsedData.vendorChecklist || [],
        invitations: parsedData.invitations || [],
      },
    });
  } catch (error: any) {
    console.error('Gemini API Error in /api/plan/generate:', error);
    // Graceful fallback so user is never blocked
    const fallback = generateFallbackEventPlan({
      eventType: req.body.eventType || 'wedding',
      title: req.body.title,
      eventDate: req.body.eventDate || new Date().toISOString().split('T')[0],
      location: req.body.location || 'India',
      guestCount: Number(req.body.guestCount) || 50,
      totalBudget: Number(req.body.totalBudget) || 150000,
      theme: req.body.theme,
      colors: req.body.colors,
      style: req.body.style,
      setting: req.body.setting,
      specialRequirements: req.body.specialRequirements,
    });

    return res.json({
      success: true,
      isAIGenerated: false,
      errorNotice: 'AI model temporarily busy; generated via CelebrateAI backup engine.',
      plan: fallback,
    });
  }
});

// 2. Interactive AI Concierge Assistant Route
app.post('/api/plan/assistant-chat', async (req: Request, res: Response) => {
  try {
    const { event, question } = req.body;
    const ev = event || {};
    const title = ev.title || 'Celebration';
    const eventType = ev.eventType || 'event';
    const eventDate = ev.eventDate || 'Upcoming';
    const location = ev.location || 'Location';
    const guestCount = ev.guestCount || 50;
    const totalBudget = ev.totalBudget || 100000;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: `Here is a practical recommendation for your ${eventType}:\n\n` +
          `1. Budget Optimization: For a total budget of ₹${totalBudget.toLocaleString('en-IN')}, make sure catering and venue don't exceed 60% of total allocation.\n` +
          `2. Guest Experience: With ${guestCount} guests, prioritize swift welcome drinks and personal greetings.\n` +
          `3. Timeline: Reconfirm with all major vendors 72 hours before ${eventDate}.\n\n` +
          `(Note: Connect your GEMINI_API_KEY in Settings > Secrets for live interactive answers!)`,
        suggestedActions: [
          'Review Catering budget allocation',
          'Add rain/weather contingency task to timeline',
        ],
      });
    }

    const prompt = `You are CelebrateAI Concierge, an empathetic, highly resourceful, and culturally savvy event planner.
The user is asking a question about their planned event.

Event Context:
- Title: ${title}
- Type: ${eventType}
- Date: ${eventDate}
- Location: ${location}
- Guests: ${guestCount}
- Total Budget: ₹${totalBudget.toLocaleString('en-IN')}
- Theme: ${ev.theme || 'Elegant'}
- Colors: ${ev.colors || 'Festive'}
- Style: ${ev.style || 'Celebratory'}
- Setting: ${ev.setting || 'Indoor'}
- Special Notes: ${ev.specialRequirements || 'None'}

User Question: "${question || 'How should I optimize my event?'}"

Provide a warm, highly actionable, concise, and structured answer (under 300 words). Include practical bullet points, realistic Indian rupee (₹) pricing if cost is involved, and 2 quick follow-up suggested action chips.

Return JSON:
{
  "reply": "Your markdown formatted friendly answer",
  "suggestedActions": ["Action chip 1", "Action chip 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const parsed = safeParseJSON(response.text, {
      reply: 'Here are key recommendations tailored for your celebration.',
      suggestedActions: ['Check budget', 'Update timeline'],
    });

    return res.json({
      reply: parsed.reply || 'Here is our advice for your event...',
      suggestedActions: parsed.suggestedActions || ['Check budget', 'Update timeline'],
    });
  } catch (err: any) {
    console.error('Error in /api/plan/assistant-chat:', err);
    return res.json({
      reply: 'Here is a quick planning tip: Ensure key vendor contracts are confirmed 2 weeks in advance and maintain a 5% contingency reserve in your budget!',
      suggestedActions: ['Review budget', 'Check timeline'],
    });
  }
});

// 3. Custom Invitation & Toast Generator Route
app.post('/api/plan/custom-invite', async (req: Request, res: Response) => {
  const { event, inviteType, tone, specificNames } = req.body;
  const ev = event || {};
  const evTitle = ev.title || 'Special Celebration';
  const evType = ev.eventType || 'event';
  const evDate = ev.eventDate || 'Upcoming date';
  const evLocation = ev.location || 'Celebration Venue';
  const evTheme = ev.theme || 'Celebration';

  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        title: `${inviteType || 'Celebration'} Invitation`,
        content: `🎉 Save the Date for ${evTitle}! 🎉\n\n` +
          `Join us on ${evDate} at ${evLocation} for an unforgettable ${evType} celebration.\n\n` +
          `Time: 6:00 PM onwards\n` +
          `Theme: ${evTheme}\n\n` +
          `Kindly RSVP at your earliest convenience! ✨\n\n` +
          `Warmly,\n${specificNames || 'The Host & Family'}`,
        hashtags: [`#Celebrate${evType}`, `#SaveTheDate`],
      });
    }

    const prompt = `Generate a creative, beautifully written invitation or speech for this celebration:
- Event: ${evTitle} (${evType})
- Date: ${evDate}
- Venue: ${evLocation}
- Guest Count: ${ev.guestCount || 50}
- Theme: ${evTheme}
- Colors: ${ev.colors || 'Festive'}
- Requested Format: ${inviteType || 'WhatsApp invitation'} (e.g. WhatsApp Broadcast, Formal Printed Invitation, Quirky Friend Card, Event Day Toast/Speech)
- Tone: ${tone || 'Warm & Celebratory'}
- Specific Names / Hosts: ${specificNames || 'The Hosts & Family'}

Return JSON:
{
  "title": "Catchy Subject / Title",
  "content": "Full formatted invitation text or speech (include appropriate celebratory emojis if WhatsApp/casual, or elegant formal phrasing if traditional/formal)",
  "hashtags": ["#Tag1", "#Tag2", "#Tag3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = safeParseJSON(response.text, {
      title: `${inviteType || 'Celebration'} Invitation`,
      content: `🎉 You are cordially invited to ${evTitle} on ${evDate} at ${evLocation}! ✨`,
      hashtags: [`#Celebrate${evType}`, `#SaveTheDate`],
    });

    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in /api/plan/custom-invite:', err);
    return res.json({
      title: `${inviteType || 'Celebration'} Invitation`,
      content: `✨ Save the Date for ${evTitle}! ✨\n\n` +
        `We would love your presence as we celebrate this joyous milestone on ${evDate} at ${evLocation}.\n\n` +
        `Theme: ${evTheme}\n` +
        `Time: 6:00 PM onwards\n\n` +
        `RSVP: ${specificNames || 'The Host Family'}`,
      hashtags: [`#Celebrate${evType}`, `#SaveTheDate`],
    });
  }
});

// Setup Vite or Static Serving
async function startServer() {
  if (process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(__dirname, 'dist'))) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ CelebrateAI Server is running on port ${PORT}`);
  });
}

startServer();
