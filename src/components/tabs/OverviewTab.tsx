import React, { useState } from 'react';
import { CelebrationEvent } from '../../types/event';
import { formatINR, formatDatePretty, getDaysRemaining } from '../../utils/formatters';
import { useEvents } from '../../context/EventContext';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  UtensilsCrossed, 
  Clock, 
  Music, 
  Palette, 
  Shirt, 
  Lightbulb, 
  Flame, 
  Copy, 
  Check, 
  Edit3, 
  RefreshCw,
  Wine,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface OverviewTabProps {
  event: CelebrationEvent;
  onEditDetails: () => void;
  onOpenRegenerate: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ 
  event, 
  onEditDetails, 
  onOpenRegenerate 
}) => {
  const { isGeneratingPlan } = useEvents();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const countdown = getDaysRemaining(event.eventDate);
  const plan = event.aiPlan;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(label);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getStageBadgeColor = (stage: string) => {
    switch (stage) {
      case 'morning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'afternoon':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'evening':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'night':
        return 'bg-slate-800 text-slate-100 border-slate-700';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Celebration Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-6 sm:p-8 shadow-xl border border-amber-900/30">
        
        {/* Decorative backdrop shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="capitalize px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {event.eventType}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-slate-200 border border-white/10 capitalize">
                {event.setting} • {event.style}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onEditDetails}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Details
              </button>
              <button
                onClick={onOpenRegenerate}
                disabled={isGeneratingPlan}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-xs font-semibold text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingPlan ? 'animate-spin' : ''}`} />
                <span>Tweak with AI</span>
              </button>
            </div>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
            {event.title}
          </h1>

          <p className="text-amber-200/90 text-sm sm:text-base font-medium max-w-3xl mb-6">
            "{plan?.themeConcept?.tagline || event.theme}"
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Date & Countdown</p>
                <p className="text-sm font-bold text-white">{formatDatePretty(event.eventDate)}</p>
                <p className="text-[11px] text-amber-300">{countdown.label}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Location</p>
                <p className="text-sm font-bold text-white truncate max-w-[130px] sm:max-w-none">{event.location}</p>
                <p className="text-[11px] text-slate-300 capitalize">{event.setting} celebration</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Guest Count</p>
                <p className="text-sm font-bold text-white">{event.guestCount} attendees</p>
                <p className="text-[11px] text-slate-300">
                  ~{event.guestCount > 0 ? formatINR(event.totalBudget / event.guestCount) : '₹0'} / person
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <IndianRupee className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Total Budget (₹)</p>
                <p className="text-sm font-bold text-emerald-400">{formatINR(event.totalBudget)}</p>
                <p className="text-[11px] text-slate-300">Planned itemized</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* AI Theme & Vibe Concept Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-amber-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Creative Theme & Visual Concept
              </h2>
              <p className="text-xs text-slate-500">Curated by Gemini AI based on your preferences</p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> GenAI Personalized
          </span>
        </div>

        <div className="bg-amber-50/60 rounded-2xl p-4 sm:p-5 border border-amber-100 mb-6">
          <h3 className="text-base font-bold text-slate-900 mb-1">
            {plan?.themeConcept?.title || event.theme}
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {plan?.themeConcept?.vibe || 'An enchanting, celebratory ambiance customized for this special day.'}
          </p>
        </div>

        {/* Color Palette Swatches */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Recommended Color Harmony
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {plan?.themeConcept?.colorPalette?.map((swatch, idx) => (
              <div 
                key={idx}
                className="group p-3 rounded-2xl border border-slate-200/80 hover:border-amber-300 bg-slate-50/60 transition-all cursor-pointer"
                onClick={() => copyToClipboard(swatch.hex, swatch.name)}
              >
                <div 
                  className="w-full h-12 rounded-xl mb-2.5 shadow-xs border border-black/5 flex items-center justify-end p-2 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: swatch.hex }}
                >
                  <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 transition-opacity">
                    {copiedHex === swatch.name ? <Check className="w-2.5 h-2.5 text-emerald-600" /> : <Copy className="w-2.5 h-2.5" />}
                    {swatch.hex}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800 truncate">{swatch.name}</p>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{swatch.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decor Highlights & Attire Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-600" /> Decor & Ambiance Highlights
            </h4>
            <ul className="space-y-2">
              {plan?.themeConcept?.decorHighlights?.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <Shirt className="w-3.5 h-3.5 text-amber-600" /> Attire & Styling Guide
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {plan?.themeConcept?.attireGuide || 'Festive chic attire matching the celebration color palette.'}
            </div>
            
            {event.specialRequirements && (
              <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
                <span className="font-bold">Special Notes: </span>
                <span>{event.specialRequirements}</span>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Catering & Food Experience */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-amber-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Catering & Culinary Experience
              </h2>
              <p className="text-xs text-slate-500">
                Curated menu recommendations & per-plate benchmark estimates
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 block">Est. Per Plate</span>
            <span className="text-sm font-bold text-slate-900">
              {formatINR(plan?.cateringAndMenu?.estimatedPerPlateCost)}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 mb-5">
          <p className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-1">
            Service Style
          </p>
          <p className="text-sm font-medium text-slate-800">
            {plan?.cateringAndMenu?.style || 'Gourmet Buffet & Live Counter Experience'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Menu Highlights & Live Counters
            </h4>
            <div className="space-y-1.5">
              {plan?.cateringAndMenu?.highlights?.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                  <span className="text-amber-600 font-bold">✨</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Wine className="w-3.5 h-3.5 text-rose-500" /> Signature Drinks & Coolers
            </h4>
            <div className="space-y-1.5">
              {plan?.cateringAndMenu?.signatureDrinks?.map((drink, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                  <span className="text-rose-500 font-bold">🍹</span>
                  <span>{drink}</span>
                </div>
              ))}
            </div>

            {plan?.cateringAndMenu?.dietaryNotes && (
              <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                <span className="font-bold flex items-center gap-1 mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Dietary Management
                </span>
                <span>{plan.cateringAndMenu.dietaryNotes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Day-of Event Practical Schedule */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-amber-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Practical Event-Day Schedule
              </h2>
              <p className="text-xs text-slate-500">
                Step-by-step timeline of milestones from vendor setup to farewell
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {plan?.schedule?.map((item, idx) => (
            <div 
              key={item.id || idx}
              className="p-4 rounded-2xl border border-slate-200/80 hover:border-amber-300 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start sm:items-center gap-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
                  {item.time}
                </span>
                <div>
                  <p className="font-bold text-sm text-slate-900">{item.activity}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.notes}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border self-start sm:self-center shrink-0 ${getStageBadgeColor(item.stage)}`}>
                {item.stage}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Entertainment & Guest Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Entertainment */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-amber-100">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Music className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Entertainment & Activities
            </h3>
          </div>

          <div className="space-y-3">
            {plan?.entertainmentAndActivities?.map((act, idx) => (
              <div key={act.id || idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-xs sm:text-sm text-slate-900">{act.name}</p>
                  <span className="text-xs font-semibold text-amber-700">
                    {formatINR(act.estimatedCost)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1.5">{act.description}</p>
                <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                  Duration: {act.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Guest Experience */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-amber-100">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Guest Experience Touchpoints
            </h3>
          </div>

          <div className="space-y-3">
            {plan?.guestExperience?.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Smart Tips & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Cost Saving Tips */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50/40 rounded-3xl p-6 border border-emerald-200/60 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-emerald-900 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            <span>AI Cost-Saving Strategies</span>
          </div>
          <ul className="space-y-2.5">
            {plan?.costSavingTips?.map((tip, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-emerald-950 flex items-start gap-2">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Splurge Recommendations */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-3xl p-6 border border-amber-200/60 shadow-xs">
          <div className="flex items-center gap-2 mb-3 text-amber-900 font-bold text-sm">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Where to Splurge (Highest ROI)</span>
          </div>
          <ul className="space-y-2.5">
            {plan?.splurgeRecommendations?.map((rec, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-amber-950 flex items-start gap-2">
                <span className="text-amber-600 font-bold mt-0.5">★</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
