import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { EventType, EventStyle, EventSetting } from '../types/event';
import { formatINR } from '../utils/formatters';
import { 
  X, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  Palette, 
  Sliders, 
  PartyPopper,
  Check,
  AlertCircle
} from 'lucide-react';

interface EventWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EVENT_TYPE_OPTIONS: { type: EventType; label: string; icon: string; defaultBudget: number; defaultGuests: number }[] = [
  { type: 'wedding', label: 'Wedding & Sangeet', icon: '💍', defaultBudget: 1500000, defaultGuests: 200 },
  { type: 'birthday', label: 'Birthday Bash', icon: '🎂', defaultBudget: 120000, defaultGuests: 40 },
  { type: 'anniversary', label: 'Anniversary', icon: '🥂', defaultBudget: 250000, defaultGuests: 60 },
  { type: 'community', label: 'Community Festival', icon: '🪔', defaultBudget: 350000, defaultGuests: 250 },
  { type: 'graduation', label: 'Graduation / Milestone', icon: '🎓', defaultBudget: 100000, defaultGuests: 50 },
];

const STYLE_OPTIONS: { value: EventStyle; label: string; desc: string }[] = [
  { value: 'royal', label: 'Royal Heritage', desc: 'Opulent palace grandeur with marigolds & brass' },
  { value: 'modern-minimal', label: 'Modern Chic', desc: 'Sleek, architectural lines with ambient glow' },
  { value: 'traditional-festive', label: 'Traditional Festive', desc: 'Vibrant cultural motifs, diyas & folk colors' },
  { value: 'glam-bollywood', label: 'Bollywood Glam', desc: 'Dramatic lighting, high-energy & sparkle' },
  { value: 'cozy-rustic', label: 'Cozy Rustic', desc: 'Fairy lights, wooden accents & intimate seating' },
  { value: 'vintage-boho', label: 'Vintage Boho', desc: 'Earthy macrame, pampas grass & pastel florals' },
];

const BUDGET_PRESETS = [
  { label: '₹50,000', value: 50000 },
  { label: '₹1.5 Lakh', value: 150000 },
  { label: '₹3 Lakhs', value: 300000 },
  { label: '₹8 Lakhs', value: 800000 },
  { label: '₹15 Lakhs', value: 1500000 },
  { label: '₹30 Lakhs', value: 3000000 },
];

export const EventWizardModal: React.FC<EventWizardModalProps> = ({ isOpen, onClose }) => {
  const { createEvent, isGeneratingPlan } = useEvents();

  const [step, setStep] = useState<1 | 2>(1);
  const [eventType, setEventType] = useState<EventType>('wedding');
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 2);
    return d.toISOString().split('T')[0];
  });
  const [location, setLocation] = useState('Bengaluru, Karnataka');
  const [guestCount, setGuestCount] = useState<number>(150);
  const [totalBudget, setTotalBudget] = useState<number>(1200000);
  const [style, setStyle] = useState<EventStyle>('royal');
  const [setting, setSetting] = useState<EventSetting>('hybrid');
  const [theme, setTheme] = useState('');
  const [colors, setColors] = useState('Deep Marigold, Emerald Green & Champagne Gold');
  const [specialRequirements, setSpecialRequirements] = useState('Jain food counter, live acoustic music, elderly seating lounge.');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const perGuestBudget = guestCount > 0 ? Math.round(totalBudget / guestCount) : 0;

  const handleEventTypeSelect = (type: EventType) => {
    setEventType(type);
    const preset = EVENT_TYPE_OPTIONS.find((o) => o.type === type);
    if (preset) {
      setTotalBudget(preset.defaultBudget);
      setGuestCount(preset.defaultGuests);
      const isDefaultTitle = !title || 
        title.includes('Celebration') || 
        title.includes('Wedding') || 
        title.includes('Birthday') || 
        title.includes('Anniversary') || 
        title.includes('Mela') || 
        title.includes('Gala');

      if (isDefaultTitle) {
        setTitle(
          type === 'wedding' ? "Ananya & Kabir's Royal Wedding" :
          type === 'birthday' ? "Mira's Sweet 16 Celebration" :
          type === 'anniversary' ? "25th Silver Jubilee Anniversary" :
          type === 'community' ? "Spring Holi & Cultural Mela" :
          "Class of 2026 Milestone Gala"
        );
      }
      if (type === 'birthday') {
        setStyle('modern-minimal');
        setColors('Neon Lilac, Cyber Blue & Champagne');
        setSpecialRequirements('Custom designer drip cake, mocktail mixologist, retro arcade game station.');
      } else if (type === 'community') {
        setStyle('traditional-festive');
        setColors('Saffron Orange, Peacock Blue & Festive Gold');
        setSpecialRequirements('Live dhol beats, safe eco-friendly lights, community food token stalls.');
      }
    }
  };

  const handleProceedToStep2 = () => {
    if (!location.trim()) {
      setValidationError('Please specify an event location or city.');
      return;
    }
    if (guestCount < 5) {
      setValidationError('Please enter at least 5 guests.');
      return;
    }
    if (totalBudget < 5000) {
      setValidationError('Budget must be at least ₹5,000.');
      return;
    }
    setValidationError(null);
    setStep(2);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    try {
      await createEvent({
        title: title.trim() || `${eventType.toUpperCase()} Celebration`,
        eventType,
        eventDate,
        location: location.trim(),
        guestCount: Number(guestCount),
        totalBudget: Number(totalBudget),
        theme: theme.trim(),
        colors: colors.trim(),
        style,
        setting,
        specialRequirements: specialRequirements.trim(),
      });
      onClose();
      setStep(1);
    } catch (err: any) {
      setValidationError('Failed to generate event plan. Please check details and try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-amber-100 max-w-2xl w-full overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-amber-500 via-amber-600 to-rose-600 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-200" />
              <h2 className="text-xl font-bold font-display tracking-tight text-white">
                Personalized Event Setup
              </h2>
            </div>
            <p className="text-xs text-amber-100 mt-1">
              Step {step} of 2 • GenAI-driven tailored plan, budget & vendor timeline
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isGeneratingPlan}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleGenerate} className="p-6">
          {step === 1 ? (
            <div className="space-y-5">
              
              {/* Event Type Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Select Event Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {EVENT_TYPE_OPTIONS.map((opt) => {
                    const isSelected = eventType === opt.type;
                    return (
                      <button
                        key={opt.type}
                        type="button"
                        onClick={() => handleEventTypeSelect(opt.type)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{opt.icon}</span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-slate-800 mt-2 block">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Event / Celebration Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Diya & Kabir's Royal Sangeet"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> Event Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" /> City / Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Udaipur, Indiranagar Bangalore, Goa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Guests & Total Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-600" /> Number of Guests
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="5000"
                    required
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Total Budget (₹)
                  </label>
                  <input
                    type="number"
                    min="5000"
                    step="5000"
                    required
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Quick Budget Presets & Per-Guest indicator */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  <span className="text-[11px] text-slate-400 font-semibold mr-1 self-center">Presets:</span>
                  {BUDGET_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setTotalBudget(p.value)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                        totalBudget === p.value
                          ? 'border-amber-500 bg-amber-50 text-amber-800 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Calculated Allocation:</span>
                  <span className="font-bold text-slate-900">
                    {formatINR(totalBudget)} total • <span className="text-amber-700">~{formatINR(perGuestBudget)} / guest</span>
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Next: Style & Preferences</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="space-y-5">
              
              {/* Setting Selection: Indoor / Outdoor / Hybrid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Event Setting
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['indoor', 'outdoor', 'hybrid'] as EventSetting[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSetting(st)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                        setting === st
                          ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-400/20'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {st === 'indoor' && '🏛️ Indoor Hall'}
                      {st === 'outdoor' && '🌿 Open Lawn / Terrace'}
                      {st === 'hybrid' && '✨ Indoor + Outdoor'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Celebration Aesthetic & Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {STYLE_OPTIONS.map((opt) => {
                    const isSelected = style === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setStyle(opt.value)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-900">{opt.label}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{opt.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Theme & Color Palette */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <PartyPopper className="w-3.5 h-3.5 text-amber-600" /> Theme Concept (Optional)
                  </label>
                  <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="e.g. Royal Marigold & Starlight, Neon Retro"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Leave blank to let AI curate the concept.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-600" /> Color Palette
                  </label>
                  <input
                    type="text"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    placeholder="e.g. Emerald, Marigold & Champagne Gold"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" /> Special Requirements & Dietary
                </label>
                <textarea
                  rows={2}
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="e.g. Jain food counter, elderly lounge, pet-friendly zone, specific music, drone permissions..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>

              {/* Navigation buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  disabled={isGeneratingPlan}
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  disabled={isGeneratingPlan}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isGeneratingPlan ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating with Gemini AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-200" />
                      <span>Generate Full Event Plan</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}
        </form>

      </div>
    </div>
  );
};
