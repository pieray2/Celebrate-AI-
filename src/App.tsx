import React, { useState } from 'react';
import { EventProvider, useEvents } from './context/EventContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { EventWizardModal } from './components/EventWizardModal';
import { Sparkles, Heart, ShieldCheck, IndianRupee } from 'lucide-react';

const MainApp: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const { currentEvent } = useEvents();

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col text-slate-800 selection:bg-amber-100 selection:text-amber-900">
      
      {/* Top Navbar */}
      <Navbar onOpenWizard={() => setIsWizardOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1">
        <Dashboard />
      </div>

      {/* Event Wizard Modal */}
      <EventWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-amber-100/80 bg-white/60 backdrop-blur-xs py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-800 text-sm">
              Celebrate<span className="text-amber-600">AI</span>
            </span>
            <span>•</span>
            <span>Official GenAI Event & Celebration Planning Assistant</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <IndianRupee className="w-3 h-3 text-slate-400" /> Smart INR Budgeting
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-slate-400" /> Private & Client-Controlled
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <EventProvider>
      <MainApp />
    </EventProvider>
  );
}
