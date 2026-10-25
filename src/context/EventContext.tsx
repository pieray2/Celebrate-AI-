import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CelebrationEvent,
  BudgetItem,
  TimelineTask,
  VendorItem,
  InvitationDraft,
  EventType,
} from '../types/event';
import { SAMPLE_EVENTS } from '../data/sampleEvents';

const STORAGE_KEY = 'celebrate_ai_events_v2';
const ACTIVE_EVENT_KEY = 'celebrate_ai_active_event_id';

interface CreateEventParams {
  title: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  guestCount: number;
  totalBudget: number;
  theme: string;
  colors: string;
  style: any;
  setting: any;
  specialRequirements: string;
}

interface EventContextType {
  events: CelebrationEvent[];
  currentEvent: CelebrationEvent | null;
  currentEventId: string | null;
  isLoading: boolean;
  isGeneratingPlan: boolean;
  storageError: string | null;
  notification: { type: 'success' | 'error' | 'info'; message: string } | null;
  selectEvent: (id: string) => void;
  createEvent: (params: CreateEventParams) => Promise<CelebrationEvent>;
  updateEventDetails: (id: string, updates: Partial<CelebrationEvent>) => void;
  deleteEvent: (id: string) => void;
  regeneratePlan: (id: string, customAdjustments?: string) => Promise<void>;
  updateBudgetItem: (eventId: string, item: BudgetItem) => void;
  addBudgetItem: (eventId: string, item: Omit<BudgetItem, 'id'>) => void;
  deleteBudgetItem: (eventId: string, itemId: string) => void;
  toggleTaskComplete: (eventId: string, taskId: string) => void;
  addTask: (eventId: string, task: Omit<TimelineTask, 'id'>) => void;
  updateTask: (eventId: string, task: TimelineTask) => void;
  deleteTask: (eventId: string, taskId: string) => void;
  updateVendor: (eventId: string, vendor: VendorItem) => void;
  addVendor: (eventId: string, vendor: Omit<VendorItem, 'id'>) => void;
  deleteVendor: (eventId: string, vendorId: string) => void;
  addInvitation: (eventId: string, invite: Omit<InvitationDraft, 'id'>) => void;
  updateInvitation: (eventId: string, invite: InvitationDraft) => void;
  deleteInvitation: (eventId: string, inviteId: string) => void;
  resetToSampleData: () => void;
  exportEventsJSON: () => void;
  importEventsJSON: (jsonStr: string) => boolean;
  clearNotification: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CelebrationEvent[]>([]);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4500);
  };

  const clearNotification = () => setNotification(null);

  // Initialize from storage or samples
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
          const lastActiveId = localStorage.getItem(ACTIVE_EVENT_KEY);
          if (lastActiveId && parsed.some((e) => e.id === lastActiveId)) {
            setCurrentEventId(lastActiveId);
          } else {
            setCurrentEventId(parsed[0].id);
          }
          setIsLoading(false);
          return;
        }
      }
      // Default to sample events
      setEvents(SAMPLE_EVENTS);
      setCurrentEventId(SAMPLE_EVENTS[0].id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_EVENTS));
      localStorage.setItem(ACTIVE_EVENT_KEY, SAMPLE_EVENTS[0].id);
    } catch (err: any) {
      console.error('Storage access error:', err);
      setStorageError('Browser local storage is limited or restricted. Changes will stay in memory for this session.');
      setEvents(SAMPLE_EVENTS);
      setCurrentEventId(SAMPLE_EVENTS[0].id);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes to localStorage whenever events change
  const saveEvents = (newEvents: CelebrationEvent[]) => {
    setEvents(newEvents);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
      setStorageError(null);
    } catch (err: any) {
      console.error('Failed to save events to local storage:', err);
      setStorageError('Storage quota exceeded. Some offline updates might not persist after restart.');
    }
  };

  const selectEvent = (id: string) => {
    setCurrentEventId(id);
    try {
      localStorage.setItem(ACTIVE_EVENT_KEY, id);
    } catch (err) {
      console.error('Failed to save active event id:', err);
    }
  };

  const currentEvent = events.find((e) => e.id === currentEventId) || events[0] || null;

  // Create new event with GenAI
  const createEvent = async (params: CreateEventParams): Promise<CelebrationEvent> => {
    setIsGeneratingPlan(true);
    showToast('AI is crafting your tailored celebration plan & budget...', 'info');

    try {
      const res = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      const data = await res.json();
      const generatedPlan = data.plan;

      const newEvent: CelebrationEvent = {
        id: `event-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        title: params.title || `${params.eventType.toUpperCase()} Celebration`,
        eventType: params.eventType,
        eventDate: params.eventDate,
        location: params.location,
        guestCount: params.guestCount,
        totalBudget: params.totalBudget,
        theme: params.theme || generatedPlan.aiPlan.themeConcept.title,
        colors: params.colors,
        style: params.style,
        setting: params.setting,
        specialRequirements: params.specialRequirements,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        aiPlan: generatedPlan.aiPlan,
        budgetItems: generatedPlan.budgetItems,
        timelineTasks: generatedPlan.timelineTasks,
        vendorChecklist: generatedPlan.vendorChecklist,
        invitations: generatedPlan.invitations,
      };

      const updatedList = [newEvent, ...events];
      saveEvents(updatedList);
      selectEvent(newEvent.id);
      showToast('🎉 Your event plan has been generated and saved!', 'success');
      return newEvent;
    } catch (err: any) {
      console.error('Error generating event:', err);
      showToast('Failed to connect to planner server. Please try again.', 'error');
      throw err;
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  // Regenerate plan with adjustments
  const regeneratePlan = async (id: string, customAdjustments?: string) => {
    const target = events.find((e) => e.id === id);
    if (!target) return;

    setIsGeneratingPlan(true);
    showToast('Recalculating plan & adjusting smart budget recommendations...', 'info');

    try {
      const res = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: target.eventType,
          title: target.title,
          eventDate: target.eventDate,
          location: target.location,
          guestCount: target.guestCount,
          totalBudget: target.totalBudget,
          theme: target.theme,
          colors: target.colors,
          style: target.style,
          setting: target.setting,
          specialRequirements: target.specialRequirements,
          adjustments: customAdjustments,
        }),
      });

      const data = await res.json();
      const plan = data.plan;

      const updated: CelebrationEvent = {
        ...target,
        updatedAt: new Date().toISOString(),
        aiPlan: plan.aiPlan,
        budgetItems: plan.budgetItems,
        timelineTasks: plan.timelineTasks,
        vendorChecklist: plan.vendorChecklist,
        invitations: plan.invitations.length > 0 ? plan.invitations : target.invitations,
      };

      const updatedList = events.map((e) => (e.id === id ? updated : e));
      saveEvents(updatedList);
      showToast('✨ Event recommendations and budget have been refreshed!', 'success');
    } catch (err) {
      console.error('Failed to regenerate plan:', err);
      showToast('Could not refresh plan. Using existing saved plan.', 'error');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const updateEventDetails = (id: string, updates: Partial<CelebrationEvent>) => {
    const updatedList = events.map((e) => {
      if (e.id === id) {
        return {
          ...e,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Event details updated successfully!', 'success');
  };

  const deleteEvent = (id: string) => {
    if (events.length <= 1) {
      showToast('You must have at least one active celebration event in your planner.', 'info');
      return;
    }
    const filtered = events.filter((e) => e.id !== id);
    saveEvents(filtered);
    if (currentEventId === id) {
      selectEvent(filtered[0].id);
    }
    showToast('Event plan deleted.', 'info');
  };

  // Budget Item Actions
  const updateBudgetItem = (eventId: string, item: BudgetItem) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          budgetItems: e.budgetItems.map((bi) => (bi.id === item.id ? item : bi)),
        };
      }
      return e;
    });
    saveEvents(updatedList);
  };

  const addBudgetItem = (eventId: string, item: Omit<BudgetItem, 'id'>) => {
    const newItem: BudgetItem = {
      ...item,
      id: `b-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    };
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          budgetItems: [...e.budgetItems, newItem],
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('New budget item added!', 'success');
  };

  const deleteBudgetItem = (eventId: string, itemId: string) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          budgetItems: e.budgetItems.filter((bi) => bi.id !== itemId),
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Budget item removed.', 'info');
  };

  // Timeline Task Actions
  const toggleTaskComplete = (eventId: string, taskId: string) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          timelineTasks: e.timelineTasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
        };
      }
      return e;
    });
    saveEvents(updatedList);
  };

  const addTask = (eventId: string, task: Omit<TimelineTask, 'id'>) => {
    const newTask: TimelineTask = {
      ...task,
      id: `t-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    };
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          timelineTasks: [...e.timelineTasks, newTask],
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Task added to event timeline!', 'success');
  };

  const updateTask = (eventId: string, task: TimelineTask) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          timelineTasks: e.timelineTasks.map((t) => (t.id === task.id ? task : t)),
        };
      }
      return e;
    });
    saveEvents(updatedList);
  };

  const deleteTask = (eventId: string, taskId: string) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          timelineTasks: e.timelineTasks.filter((t) => t.id !== taskId),
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Timeline task removed.', 'info');
  };

  // Vendor Checklist Actions
  const updateVendor = (eventId: string, vendor: VendorItem) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          vendorChecklist: e.vendorChecklist.map((v) => (v.id === vendor.id ? vendor : v)),
        };
      }
      return e;
    });
    saveEvents(updatedList);
  };

  const addVendor = (eventId: string, vendor: Omit<VendorItem, 'id'>) => {
    const newVendor: VendorItem = {
      ...vendor,
      id: `v-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    };
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          vendorChecklist: [...e.vendorChecklist, newVendor],
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Vendor added to checklist!', 'success');
  };

  const deleteVendor = (eventId: string, vendorId: string) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          vendorChecklist: e.vendorChecklist.filter((v) => v.id !== vendorId),
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Vendor removed from checklist.', 'info');
  };

  // Invitations Actions
  const addInvitation = (eventId: string, invite: Omit<InvitationDraft, 'id'>) => {
    const newInvite: InvitationDraft = {
      ...invite,
      id: `inv-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
    };
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          invitations: [...e.invitations, newInvite],
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Invitation draft saved!', 'success');
  };

  const updateInvitation = (eventId: string, invite: InvitationDraft) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          invitations: e.invitations.map((i) => (i.id === invite.id ? invite : i)),
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Invitation updated!', 'success');
  };

  const deleteInvitation = (eventId: string, inviteId: string) => {
    const updatedList = events.map((e) => {
      if (e.id === eventId) {
        return {
          ...e,
          updatedAt: new Date().toISOString(),
          invitations: e.invitations.filter((i) => i.id !== inviteId),
        };
      }
      return e;
    });
    saveEvents(updatedList);
    showToast('Invitation draft removed.', 'info');
  };

  // Reset to Samples
  const resetToSampleData = () => {
    saveEvents(SAMPLE_EVENTS);
    selectEvent(SAMPLE_EVENTS[0].id);
    showToast('Reset to original realistic sample celebrations!', 'info');
  };

  // Export & Import
  const exportEventsJSON = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `celebrate-ai-plans-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Celebration plans exported successfully as JSON file!', 'success');
  };

  const importEventsJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id && parsed[0].eventType) {
        saveEvents(parsed);
        selectEvent(parsed[0].id);
        showToast(`Successfully imported ${parsed.length} celebration plans!`, 'success');
        return true;
      }
      throw new Error('Invalid JSON format for celebration events.');
    } catch (err: any) {
      console.error('Import error:', err);
      showToast('Failed to import JSON file. Please check file structure.', 'error');
      return false;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        currentEvent,
        currentEventId,
        isLoading,
        isGeneratingPlan,
        storageError,
        notification,
        selectEvent,
        createEvent,
        updateEventDetails,
        deleteEvent,
        regeneratePlan,
        updateBudgetItem,
        addBudgetItem,
        deleteBudgetItem,
        toggleTaskComplete,
        addTask,
        updateTask,
        deleteTask,
        updateVendor,
        addVendor,
        deleteVendor,
        addInvitation,
        updateInvitation,
        deleteInvitation,
        resetToSampleData,
        exportEventsJSON,
        importEventsJSON,
        clearNotification,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
