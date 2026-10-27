import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { formatINR, getDaysRemaining } from '../utils/formatters';
import { 
  Sparkles, 
  Calendar, 
  Plus, 
  Download, 
  Upload, 
  RotateCcw, 
  ChevronDown, 
  PartyPopper,
  MapPin,
  Users
} from 'lucide-react';

interface NavbarProps {
  onOpenWizard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWizard }) => {
  const { 
    events, 
    currentEvent, 
    selectEvent, 
    resetToSampleData, 
    exportEventsJSON, 
    importEventsJSON 
  } = useEvents();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const countdown = currentEvent ? getDaysRemaining(currentEvent.eventDate) : null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          importEventsJSON(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5 text-amber-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-slate-900">
                  Celebrate<span className="text-amber-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  GenAI Planner
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Weddings • Birthdays • Anniversaries • Community Events
              </p>
            </div>
          </div>

          {/* Event Switcher Dropdown */}
          {currentEvent && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-amber-50/40 transition-all text-left"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <div className="max-w-[130px] sm:max-w-[200px] md:max-w-[260px] truncate">
                  <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                    {currentEvent.title}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                    <span>{formatINR(currentEvent.totalBudget, true)}</span>
                    <span>•</span>
                    <span>{currentEvent.guestCount} guests</span>
                    {countdown && (
                      <>
                        <span>•</span>
                        <span className="text-amber-700 font-medium">{countdown.label}</span>
                      </>
                    )}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {/* Event Picker Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Saved Celebrations ({events.length})
                      </span>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onOpenWizard();
                        }}
                        className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> New Event
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                      {events.map((evt) => {
                        const isSelected = evt.id === currentEvent.id;
                        return (
                          <button
                            key={evt.id}
                            onClick={() => {
                              selectEvent(evt.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 transition-colors flex items-start justify-between gap-3 ${
                              isSelected ? 'bg-amber-50/70' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="capitalize text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                                  {evt.eventType}
                                </span>
                                {isSelected && (
                                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded-md">
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="font-semibold text-sm text-slate-900 truncate mt-1">
                                {evt.title}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-slate-400" />
                                  <span className="truncate max-w-[100px]">{evt.location}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3 text-slate-400" />
                                  <span>{evt.guestCount}</span>
                                </span>
                                <span className="font-medium text-amber-700">
                                  {formatINR(evt.totalBudget, true)}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          resetToSampleData();
                        }}
                        className="text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded-md"
                        title="Reload curated sample events"
                      >
                        <RotateCcw className="w-3 h-3" /> Samples
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={exportEventsJSON}
                          className="text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded-md"
                          title="Export all events as JSON"
                        >
                          <Download className="w-3 h-3" /> Export
                        </button>
                        <label className="text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded-md cursor-pointer">
                          <Upload className="w-3 h-3" /> Import
                          <input
                            type="file"
                            accept=".json"
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenWizard}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <PartyPopper className="w-4 h-4" />
              <span className="hidden xs:inline">Plan New Event</span>
              <span className="xs:hidden">New</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
