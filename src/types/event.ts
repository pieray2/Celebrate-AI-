export type EventType = 'wedding' | 'birthday' | 'anniversary' | 'graduation' | 'community';

export type EventStyle = 
  | 'royal' 
  | 'modern-minimal' 
  | 'vintage-boho' 
  | 'glam-bollywood' 
  | 'cozy-rustic' 
  | 'traditional-festive' 
  | 'futuristic-chic';

export type EventSetting = 'indoor' | 'outdoor' | 'hybrid';

export type BudgetCategory = 
  | 'Venue' 
  | 'Catering' 
  | 'Decor & Lighting' 
  | 'Entertainment & Music' 
  | 'Photography & Videography' 
  | 'Invitations & Stationery' 
  | 'Attire & Styling' 
  | 'Gifts & Favors' 
  | 'Miscellaneous & Buffer';

export interface BudgetItem {
  id: string;
  category: BudgetCategory;
  name: string;
  estimatedCost: number; // in ₹
  actualCost?: number; // in ₹
  percentageOfBudget?: number;
  isPaid?: boolean;
  notes?: string;
  isAIEstimate: boolean;
}

export type TaskPriority = 'high' | 'medium' | 'low';

export interface TimelineTask {
  id: string;
  phase: string; // e.g. "3-6 Months Prior", "1 Month Prior", "1 Week Prior", "Event Day"
  title: string;
  category: string;
  priority: TaskPriority;
  dueDate: string; // YYYY-MM-DD
  completed: boolean;
  notes?: string;
}

export type VendorStatus = 'Researching' | 'Contacted' | 'Shortlisted' | 'Booked' | 'Declined';

export interface VendorItem {
  id: string;
  category: string;
  vendorRole: string;
  name?: string;
  contact?: string;
  estimatedPrice: number; // in ₹
  status: VendorStatus;
  questionsToAsk: string[];
  notes: string;
  isAIEstimate: boolean;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  usage: string;
}

export interface ActivityIdea {
  id: string;
  name: string;
  description: string;
  duration: string;
  estimatedCost: number; // in ₹
}

export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  notes: string;
  stage: 'morning' | 'afternoon' | 'evening' | 'night';
}

export interface InvitationDraft {
  id: string;
  style: string;
  title: string;
  content: string;
  suggestedHashtags?: string[];
}

export interface AIPlan {
  themeConcept: {
    title: string;
    tagline: string;
    vibe: string;
    colorPalette: ColorSwatch[];
    decorHighlights: string[];
    attireGuide: string;
  };
  cateringAndMenu: {
    style: string;
    highlights: string[];
    signatureDrinks: string[];
    estimatedPerPlateCost: number; // in ₹
    dietaryNotes: string;
  };
  entertainmentAndActivities: ActivityIdea[];
  guestExperience: string[];
  schedule: ScheduleItem[];
  costSavingTips: string[];
  splurgeRecommendations: string[];
  generatedAt: string;
  isAIGenerated: boolean;
}

export interface CelebrationEvent {
  id: string;
  title: string;
  eventType: EventType;
  eventDate: string; // YYYY-MM-DD
  location: string;
  guestCount: number;
  totalBudget: number; // in ₹
  theme: string;
  colors: string;
  style: EventStyle;
  setting: EventSetting;
  specialRequirements: string;
  createdAt: string;
  updatedAt: string;
  aiPlan: AIPlan;
  budgetItems: BudgetItem[];
  timelineTasks: TimelineTask[];
  vendorChecklist: VendorItem[];
  invitations: InvitationDraft[];
}
