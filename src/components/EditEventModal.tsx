import React, { useState } from 'react';
import { CelebrationEvent, EventType, EventStyle, EventSetting } from '../types/event';
import { useEvents } from '../context/EventContext';
import { formatINR } from '../utils/formatters';
import { 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  Palette, 
  Sliders, 
  Edit3,
  Trash2
} from 'lucide-react';

interface EditEventModalProps {
  event: CelebrationEvent;
  isOpen: boolean;
  onClose: () => void;
}

const STYLE_OPTIONS: { value: EventStyle; label: string }[] = [
  { value: 'royal', label: 'Royal Heritage' },
  { value: 'modern-minimal', label: 'Modern Minimal / Chic' },
  { value: 'traditional-festive', label: 'Traditional Festive' },
  { value: 'glam-bollywood', label: 'Bollywood Glam' },
  { value: 'cozy-rustic', label: 'Cozy Rustic' },
  { value: 'vintage-boho', label: 'Vintage Boho' },
  { value: 'futuristic-chic', label: 'Futuristic / Neon' },
];

export const EditEventModal: React.FC<EditEventModalProps> = ({ event, isOpen, onClose }) => {
  const { updateEventDetails, deleteEvent, regeneratePlan, isGeneratingPlan } = useEvents();

  const [title, setTitle] = useState(event.title);
  const [eventDate, setEventDate] = useState(event.eventDate);
  const [location, setLocation] = useState(event.location);
  const [guestCount, setGuestCount] = useState<number>(event.guestCount);
  const [totalBudget, setTotalBudget] = useState<number>(event.totalBudget);
  const [theme, setTheme] = useState(event.theme);
  const [colors, setColors] = useState(event.colors);
  const [style, setStyle] = useState<EventStyle>(event.style);
  const [setting, setSetting] = useState<EventSetting>(event.setting);
  const [specialRequirements, setSpecialRequirements] = useState(event.specialRequirements || '');
  const [shouldRegenerate, setShouldRegenerate] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateEventDetails(event.id, {
      title: title.trim(),
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

    if (shouldRegenerate) {
      await regeneratePlan(event.id, `Budget updated to ₹${totalBudget}, guests: ${guestCount}, setting: ${setting}`);
    }

    onClose();
  };

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in zoom-in-95 duration-150 my-8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold font-display text-slate-900">
              Edit Celebration Details
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Event Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Date
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" /> Location
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-600" /> Guests
              </label>
              <input
                type="number"
                min="5"
                required
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Total Budget (₹)
              </label>
              <input
                type="number"
                min="5000"
                step="5000"
                required
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Setting
              </label>
              <select
                value={setting}
                onChange={(e) => setSetting(e.target.value as EventSetting)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
              >
                <option value="indoor">Indoor Hall</option>
                <option value="outdoor">Outdoor Lawn/Terrace</option>
                <option value="hybrid">Hybrid (Indoor + Outdoor)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Aesthetic Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as EventStyle)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white"
              >
                {STYLE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Colors & Palette
            </label>
            <input
              type="text"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Special Requirements
            </label>
            <textarea
              rows={2}
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Regenerate Option Checkbox */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center gap-2">
            <input
              type="checkbox"
              id="recalcCheck"
              checked={shouldRegenerate}
              onChange={(e) => setShouldRegenerate(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded"
            />
            <label htmlFor="recalcCheck" className="text-xs font-semibold text-amber-900 cursor-pointer">
              Also recalculate itemized budget and AI timeline for new budget & guest count
            </label>
          </div>

          {/* Controls */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            {isConfirmingDelete ? (
              <div className="flex items-center gap-2 p-1.5 bg-rose-50 border border-rose-200 rounded-xl">
                <span className="text-xs text-rose-800 font-bold px-1">Delete plan?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Confirm Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-2 py-1 rounded-lg text-slate-600 hover:bg-slate-200 text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(true)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Event
              </button>
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isGeneratingPlan}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPlan ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
