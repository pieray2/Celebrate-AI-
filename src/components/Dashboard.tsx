import React, { useState } from 'react';
import { useEvents } from '../context/EventContext';
import { OverviewTab } from './tabs/OverviewTab';
import { BudgetTab } from './tabs/BudgetTab';
import { TimelineTab } from './tabs/TimelineTab';
import { VendorsTab } from './tabs/VendorsTab';
import { InvitationsTab } from './tabs/InvitationsTab';
import { ConciergeTab } from './tabs/ConciergeTab';
import { EditEventModal } from './EditEventModal';
import { RegeneratePlanModal } from './RegeneratePlanModal';
import { 
  Sparkles, 
  IndianRupee, 
  Calendar, 
  CheckSquare, 
  Mail, 
  MessageSquare, 
  Bot, 
  Users, 
  AlertCircle,
  X
} from 'lucide-react';

type TabType = 'overview' | 'budget' | 'timeline' | 'vendors' | 'invitations' | 'concierge';

export const Dashboard: React.FC = () => {
  const { currentEvent, storageError, notification, clearNotification } = useEvents();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);

  if (!currentEvent) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">No active celebration found. Click "Plan New Event" to start!</p>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { id: 'overview', label: 'AI Plan & Concept', icon: Sparkles },
    { 
      id: 'budget', 
      label: 'Smart Budget (₹)', 
      icon: IndianRupee, 
      badge: currentEvent.budgetItems.length 
    },
    { 
      id: 'timeline', 
      label: 'Timeline & Tasks', 
      icon: Calendar, 
      badge: `${currentEvent.timelineTasks.filter((t) => t.completed).length}/${currentEvent.timelineTasks.length}` 
    },
    { 
      id: 'vendors', 
      label: 'Vendor Checklist', 
      icon: CheckSquare, 
      badge: currentEvent.vendorChecklist.length 
    },
    { 
      id: 'invitations', 
      label: 'Invites & Speeches', 
      icon: Mail, 
      badge: currentEvent.invitations.length 
    },
    { 
      id: 'concierge', 
      label: 'AI Concierge', 
      icon: Bot 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Notifications / Toast Banner */}
      {notification && (
        <div 
          className={`p-3.5 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-medium shadow-sm animate-in fade-in slide-in-from-top-2 duration-150 ${
            notification.type === 'error'
              ? 'bg-rose-50 border border-rose-200 text-rose-800'
              : notification.type === 'info'
                ? 'bg-amber-50 border border-amber-200 text-amber-900'
                : 'bg-emerald-50 border border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">
              {notification.type === 'error' ? '⚠️' : notification.type === 'info' ? 'ℹ️' : '✨'}
            </span>
            <span>{notification.message}</span>
          </div>
          <button 
            onClick={clearNotification}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Storage limitation warning if encountered */}
      {storageError && (
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{storageError}</span>
          </div>
        </div>
      )}

      {/* Navigation Tab Bar */}
      <div className="border-b border-slate-200 bg-white/70 backdrop-blur-xs rounded-2xl p-1.5 shadow-2xs">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none py-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-100' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      <main className="min-h-[500px]">
        {activeTab === 'overview' && (
          <OverviewTab
            event={currentEvent}
            onEditDetails={() => setIsEditModalOpen(true)}
            onOpenRegenerate={() => setIsRegenerateModalOpen(true)}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetTab event={currentEvent} />
        )}

        {activeTab === 'timeline' && (
          <TimelineTab event={currentEvent} />
        )}

        {activeTab === 'vendors' && (
          <VendorsTab event={currentEvent} />
        )}

        {activeTab === 'invitations' && (
          <InvitationsTab event={currentEvent} />
        )}

        {activeTab === 'concierge' && (
          <ConciergeTab event={currentEvent} />
        )}
      </main>

      {/* Modals */}
      <EditEventModal
        event={currentEvent}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <RegeneratePlanModal
        event={currentEvent}
        isOpen={isRegenerateModalOpen}
        onClose={() => setIsRegenerateModalOpen(false)}
      />

    </div>
  );
};
