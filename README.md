# CelebrateAI - GenAI-Powered Event & Celebration Planning Assistant

CelebrateAI is a modern, mobile-responsive full-stack web application designed to help individuals, families, and community leaders plan and organize weddings, birthdays, anniversaries, graduations, and community cultural events with smart itemized budgets in Indian Rupees (₹), phased actionable timelines, categorized vendor checklists, and personalized AI-generated invitations.

Built for the **PromptWars Challenge 05** Mission Brief.

---

## 🌟 Key Features

### 1. Personalized Event Setup
- Configure event type: **Wedding, Birthday, Anniversary, Graduation, or Community Event**.
- Set event date, location, guest count, and total budget in **Indian Rupees (₹)**.
- Choose preferred aesthetic styles: *Royal Heritage, Modern Minimal, Traditional Festive, Bollywood Glam, Cozy Rustic, or Vintage Boho*.
- Specify indoor, outdoor lawn, or hybrid settings, along with dietary notes (e.g., pure Jain, Halal, vegan) and special requirements.
- Real-time dynamic per-guest cost calculation.

### 2. GenAI-Powered Planning Engine
- Powered server-side by **Google Gemini (`gemini-3.8-flash`)** via `@google/genai`.
- Generates tailored theme concepts, evocative taglines, visual color palettes with copyable hex values, attire guides, and decor highlights.
- Curates regional catering menus with estimated per-plate costs, signature mocktails, and dietary management.
- Designs a realistic hour-by-hour day-of event schedule (Morning, Afternoon, Evening, Night).
- Supplies AI cost-saving tips and strategic splurge recommendations.
- Adapts dynamically when users adjust budgets, guest counts, or specific preferences.

### 3. Smart Budget Planner (₹)
- Itemized allocations across 9 core categories:
  - *Venue*
  - *Catering*
  - *Decor & Lighting*
  - *Entertainment & Music*
  - *Photography & Videography*
  - *Invitations & Stationery*
  - *Attire & Styling*
  - *Gifts & Favors*
  - *Miscellaneous & Buffer Contingency*
- Visual budget utilization gauge and color-coded category breakdown pills.
- Real-time budget validation and prominent alerts whenever projected spending exceeds the user's budget.
- Clear disclaimers distinguishing AI benchmark estimates from final negotiated vendor quotes.
- Full capability to add, edit, and delete custom expense items, mark items as paid, and log actual contracted costs.

### 4. Phased Event Timeline & Milestones
- Actionable countdown roadmap calculated around the event date:
  - *4-6 Months Prior*
  - *2-3 Months Prior*
  - *1 Month Prior*
  - *2 Weeks Prior*
  - *1 Week Prior*
  - *Day Before & Event Day*
- Priority badges (High, Medium, Low), milestone category tags, and completion tracking.
- Filter tasks by All, Pending, Completed, or Priority level.
- Add and edit custom milestone tasks.

### 5. Categorized Vendor Evaluation Checklist
- Organized checklists covering venues, caterers, decorators, photographers, DJs/musicians, patisseries, and styling artists.
- Track vendor contact details, negotiated rates in ₹, and real-time booking statuses (*Researching, Contacted, Shortlisted, Booked, Declined*).
- Crucial AI-curated vetting questions to ask each vendor before committing advance payments.
- Does not fabricate verified listings or falsely claim that third-party bookings have been made.

### 6. Personalized Ideas & Invitation Generator
- Ready-to-use digital invitation drafts (WhatsApp broadcasts with festive emojis, Royal traditional notices with Sanskrit blessings, quirky friend invitations, and host speeches/toasts).
- One-click **Copy to Clipboard** and **Send via WhatsApp** (`api.whatsapp.com`).
- Interactive custom generator allowing users to specify desired tone (Warm, Royal, Humorous, Poetic) and host family names.

### 7. Event Management & Reliable Persistence
- Manage multiple celebrations simultaneously with a quick switcher in the top navbar.
- Persistent storage via browser `localStorage` with error handling for quota constraints.
- **Export & Import JSON**: easily backup plans or transfer them across browsers.
- Preloaded with realistic sample Indian celebrations (Udaipur Royal Wedding, 30th Rooftop Birthday, and Community Diwali Mela).

### 8. Interactive AI Event Concierge
- Built-in conversational advisor to answer logistical questions, advise on budget reallocation, generate party game ideas, and propose weather contingency plans.

---

## 🛠️ Architecture & Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React Icons.
- **Backend**: Node.js, Express, Vite middleware mode (`tsx server.ts`).
- **AI SDK**: `@google/genai` (Server-side execution using `gemini-3.8-flash`).
- **Security**: The Gemini API key is accessed exclusively server-side (`process.env.GEMINI_API_KEY`) and is never leaked to the client bundle.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Environment Variables
Configure your environment in `.env` (refer to `.env.example`):
```bash
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```
*Note: If no API key is provided, CelebrateAI automatically utilizes its smart local rule-based planning engine so the user experience remains uninterrupted.*

### Installation & Execution
```bash
# Install dependencies
npm install

# Run full-stack dev server (Express + Vite on port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🧪 Verified User Flow & QA Testing
1. **Creation**: Create a Birthday or Wedding event with a fixed budget (e.g. ₹1,50,000) and guest count (e.g. 45).
2. **AI Generation**: Verify that theme concepts, color palettes, catering items, day-of schedules, and itemized ₹ budgets are generated.
3. **Budget Validation**: Adjust items or total budget to verify that remaining balance and over-budget warnings update accurately.
4. **Timeline & Vendors**: Complete tasks and update vendor booking statuses (e.g. from *Researching* to *Booked*).
5. **Persistence**: Refresh the browser to confirm that changes persist in local storage.
6. **Invitations**: Test copying invitation text and launching the WhatsApp share flow.
