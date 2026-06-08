/**
 * Premium Matchmaking Platform - Type Definitions
 * Comprehensive types for profile management, matching, and relationship tracking
 */

// Gender enumeration
export type Gender = 'Male' | 'Female';

// Matchmaking stage progression
export type MatchmakingStage =
  | 'Discovery'
  | 'Preferences Collected'
  | 'Match Review'
  | 'Meeting Scheduled'
  | 'Family Discussion'
  | 'Success Journey';

// Work arrangement types
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site';

// Family structure types
export type FamilyType = 'Nuclear' | 'Joint' | 'Extended';

// Binary choice with maybe option
export type YesNo = 'Yes' | 'No' | 'Maybe';

// Lifestyle behavior options
export type LifestyleOption =
  | 'Yes'
  | 'No'
  | 'Occasionally'
  | 'Trying to quit';

// Diet preferences
export type DietOption =
  | 'Vegetarian'
  | 'Non-vegetarian'
  | 'Eggetarian'
  | 'Vegan'
  | 'Jain';

// Complete user profile
export interface Profile {
  // Identity
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dob: string; // ISO 8601 date
  age: number;
  height: string; // e.g., "5'9"" or "175cm"
  country: string;
  city: string;
  religion: string;
  caste: string;
  languages: string[];
  photo: string; // URL or base64

  // Education
  school: string;
  college: string;
  degree: string;
  masters: string;
  certifications: string[];

  // Professional
  company: string;
  designation: string;
  industry: string;
  income: number; // Annual income in base currency
  workMode: WorkMode;

  // Family
  siblings: number;
  familyType: FamilyType;
  parentsProfession: string;
  familyValues: string;

  // Lifestyle & Habits
  smoking: LifestyleOption;
  drinking: LifestyleOption;
  fitness: string; // e.g., "Daily gym", "Yoga 3x/week"
  travel: string; // e.g., "Frequently", "Occasionally"
  diet: DietOption;
  pets: YesNo;

  // Preferences
  wantKids: YesNo;
  openToRelocate: YesNo;
  preferredAgeRange: [number, number];
  preferredCities: string[];
  preferredEducation: string[];
  preferredLifestyle: string[];

  // Matchmaking Status
  stage: MatchmakingStage;
  matchmaker: string; // ID of assigned matchmaker
  assignedDate: string; // ISO 8601 datetime
  notes: string;
  verified: boolean;
}

// Match compatibility result
export interface Match {
  id: string;
  profileA: string; // Profile ID
  profileB: string; // Profile ID
  compatibilityScore: number; // 0-100
  matchLevel: 'Excellent' | 'Strong' | 'Moderate';
  aiExplanation: string;
  strengths: string[];
  risks: string[];
  status: 'Pending' | 'Sent' | 'Accepted' | 'Declined' | 'Meeting Scheduled';
  sentDate?: string; // ISO 8601 datetime
}

// AI-generated insights for profiles
export interface AIInsight {
  id: string;
  profileId: string;
  text: string;
  category: 'preference' | 'behavior' | 'compatibility' | 'recommendation';
  confidence: number; // 0-100
  createdAt: string; // ISO 8601 datetime
}

// Meeting notes with AI enhancements
export interface MeetingNote {
  id: string;
  profileId: string;
  matchId?: string;
  text: string;
  aiSummary?: string;
  aiKeyPreferences?: string[];
  aiConcerns?: string[];
  aiActions?: string[];
  createdAt: string; // ISO 8601 datetime
  author: string; // Matchmaker ID
}

// User notification
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'match' | 'meeting' | 'insight' | 'system';
  read: boolean;
  createdAt: string; // ISO 8601 datetime
}

// Dashboard statistics
export interface DashboardStats {
  activeClients: number;
  activeClientsTrend: number; // percentage change
  newProfilesThisWeek: number;
  newProfilesTrend: number;
  matchesSentToday: number;
  matchesSentTrend: number;
  upcomingMeetings: number;
  upcomingMeetingsTrend: number;
  matchSuccessRate: number; // percentage 0-100
  matchSuccessTrend: number;
  aiInsightsGenerated: number;
  aiInsightsTrend: number;
}
