import React, { useState } from 'react';
import { CelebrationEvent } from '../types/event';
import { useEvents } from '../context/EventContext';
import { 
  Sparkles, 
  X, 
  RefreshCw, 
  Lightbulb, 
  Sliders
} from 'lucide-react';

interface RegeneratePlanModalProps {
  event: CelebrationEvent;
  isOpen: boolean;
  onClose: () => void;
}

const PROMPT_SUGGESTIONS = [
  'Reduce decor budget and reallocate to gourmet live dessert counters',
  'Adapt for a monsoon / rainy weather backup plan with indoor transitions',
  'Optimize catering for 100% pure vegetarian Jain multi-cuisine menu',
  'Include high-energy interactive party games and a customized trivia contest',
  'Scale down expenses by 20% while retaining premium aesthetic photography',
];

export const RegeneratePlanModal: React.FC<RegeneratePlanModalProps> = ({ event, isOpen, onClose }) => {
  const { regeneratePlan, isGeneratingPlan } = useEvents();
  const [adjustmentPrompt, setAdjustmentPrompt] = useState('');

  if (!isOpen) return null;

  const handleRegenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    await regeneratePlan(event.id, adjustmentPrompt.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150 my-8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold font-display text-slate-900">
              Tweak Plan with Gemini AI
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Tell CelebrateAI what you would like to change or adjust. The AI will recalculate your theme concept, budget allocations, schedule, and vendor checklist while preserving your event date and location.
        </p>

        <form onSubmit={handleRegenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-600" /> Your Custom Adjustments or Desired Tweaks
            </label>
            <textarea
              rows={3}
              value={adjustmentPrompt}
              onChange={(e) => setAdjustmentPrompt(e.target.value)}
              placeholder="e.g. We want to reduce decor by ₹50,000 and invest more in a live acoustic sufi band. Also add Jain catering requirements..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Quick Ideas to Apply:
            </p>
            <div className="space-y-1.5">
              {PROMPT_SUGGESTIONS.map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAdjustmentPrompt(sug)}
                  className="w-full text-left text-xs p-2 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-900 text-slate-700 border border-slate-200/80 transition-colors cursor-pointer"
                >
                  "{sug}"
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isGeneratingPlan}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isGeneratingPlan}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isGeneratingPlan ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Regenerating Plan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Apply & Regenerate</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
