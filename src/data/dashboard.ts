/**
 * Premium Matchmaking Platform - Dashboard Data
 * Realistic data for platform analytics, insights, and monitoring
 */

import {
  DashboardStats,
  Notification,
  MeetingNote,
  AIInsight,
} from '../types';

/**
 * Current dashboard statistics with trend indicators
 */
export const dashboardStats: DashboardStats = {
  activeClients: 847,
  activeClientsTrend: 12, // 12% increase
  newProfilesThisWeek: 34,
  newProfilesTrend: 8,
  matchesSentToday: 23,
  matchesSentTrend: 15,
  upcomingMeetings: 18,
  upcomingMeetingsTrend: -5,
  matchSuccessRate: 68,
  matchSuccessTrend: 4,
  aiInsightsGenerated: 312,
  aiInsightsTrend: 22,
};

/**
 * Weekly match performance data for 8 weeks
 */
export const weeklyMatchData = [
  { week: 'Week 1', matches: 28, successful: 16 },
  { week: 'Week 2', matches: 31, successful: 19 },
  { week: 'Week 3', matches: 25, successful: 15 },
  { week: 'Week 4', matches: 35, successful: 24 },
  { week: 'Week 5', matches: 32, successful: 21 },
  { week: 'Week 6', matches: 38, successful: 26 },
  { week: 'Week 7', matches: 40, successful: 28 },
  { week: 'Week 8', matches: 42, successful: 29 },
];

/**
 * Profile distribution across matchmaking stages
 */
export const stageDistribution = [
  { name: 'Discovery', value: 156, color: '#22C55E' },
  { name: 'Preferences Collected', value: 234, color: '#EAB308' },
  { name: 'Match Review', value: 189, color: '#3B82F6' },
  { name: 'Meeting Scheduled', value: 142, color: '#8B5CF6' },
  { name: 'Family Discussion', value: 89, color: '#EC4899' },
  { name: 'Success Journey', value: 37, color: '#EF4444' },
];

/**
 * City-wise profile distribution
 */
export const cityDistribution = [
  { city: 'Mumbai', count: 45 },
  { city: 'Bangalore', count: 38 },
  { city: 'Delhi', count: 32 },
  { city: 'Hyderabad', count: 28 },
  { city: 'Pune', count: 24 },
  { city: 'Ahmedabad', count: 21 },
  { city: 'Kolkata', count: 18 },
  { city: 'Jaipur', count: 16 },
  { city: 'Chennai', count: 15 },
  { city: 'Chandigarh', count: 12 },
];

/**
 * Recent notifications
 */
export const notifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'New Match Found',
    message:
      'Priya (31, Consultant Physician) is a strong match for Arjun. Compatibility score: 87%',
    type: 'match',
    read: false,
    createdAt: '2026-06-06T14:32:00Z',
  },
  {
    id: 'notif-002',
    title: 'Meeting Scheduled',
    message:
      'Kriti & Rohan have scheduled their first meeting on June 15th at 6:00 PM at The Courtyard Café',
    type: 'meeting',
    read: false,
    createdAt: '2026-06-06T12:15:00Z',
  },
  {
    id: 'notif-003',
    title: 'AI Insight Generated',
    message:
      'New preference pattern identified: Career-focused women aged 26-32 prioritize work flexibility',
    type: 'insight',
    read: true,
    createdAt: '2026-06-05T16:48:00Z',
  },
  {
    id: 'notif-004',
    title: 'Profile Verified',
    message:
      'Neha Gupta\'s profile has been verified. She can now receive match recommendations.',
    type: 'system',
    read: true,
    createdAt: '2026-06-05T10:20:00Z',
  },
  {
    id: 'notif-005',
    title: 'Successful Connection',
    message:
      'Congratulations! Ananya & Siddharth have moved to Success Journey stage after family approval.',
    type: 'match',
    read: true,
    createdAt: '2026-06-04T18:35:00Z',
  },
];

/**
 * Meeting notes with AI-generated analysis
 */
export const meetingNotes: MeetingNote[] = [
  {
    id: 'note-001',
    profileId: 'p003',
    matchId: 'match-567',
    text: 'First meeting went very well. Both expressed interest in further meetings. Discussed family expectations and relocating for work. Chemistry seemed natural.',
    aiSummary:
      'Positive first meeting with strong alignment on family values and career aspirations. Both parties showed genuine interest in progressing the relationship.',
    aiKeyPreferences: [
      'Values family approval',
      'Career-oriented',
      'Open to relocation within India',
      'Interested in traditional elements with modern outlook',
    ],
    aiConcerns: [
      'Distance might be challenging initially',
      'Work schedules are demanding',
    ],
    aiActions: [
      'Schedule second meeting with family present',
      'Discuss relocation timeline',
      'Plan video call with respective mothers',
    ],
    createdAt: '2026-06-05T17:30:00Z',
    author: 'matchmaker-101',
  },
  {
    id: 'note-002',
    profileId: 'p001',
    text: 'Client interested in profiles with strong educational background. Preference for IT professionals. Very organized and knows exactly what she wants. Looking for stability and family orientation.',
    aiSummary:
      'High-potential client with clear criteria. Successful career trajectory indicates potential for quick matches with compatible professionals.',
    aiKeyPreferences: [
      'IIT/NIT alumni preferred',
      'Annual income 15+ lakhs',
      'Family-oriented values',
      'Willing to support spouse career',
    ],
    aiConcerns: [
      'Criteria might be restrictive',
      'Age preference is narrow (25-28)',
    ],
    aiActions: [
      'Curate premium IT professional profiles',
      'Expand age range to 25-30 for better matches',
      'Highlight family values in matches',
    ],
    createdAt: '2026-06-03T11:15:00Z',
    author: 'matchmaker-102',
  },
];

/**
 * AI-generated insights across all categories
 */
export const aiInsights: AIInsight[] = [
  {
    id: 'insight-001',
    profileId: 'p003',
    text: 'This client demonstrates strong commitment to family values while maintaining career ambitions. Ideal matches would be career-focused professionals who equally prioritize family involvement in relationship decisions.',
    category: 'preference',
    confidence: 94,
    createdAt: '2026-06-06T10:22:00Z',
  },
  {
    id: 'insight-002',
    profileId: 'p005',
    text: 'Behavioral pattern shows preference for detailed planning and structured communication. Previous interactions indicate client prefers clear timelines and formal introductions before casual meetings.',
    category: 'behavior',
    confidence: 87,
    createdAt: '2026-06-06T09:45:00Z',
  },
  {
    id: 'insight-003',
    profileId: 'p004',
    text: 'This profile shows 91% compatibility with professionals in technology and finance sectors. Education level and career trajectory align well with high-earning, ambitious partners.',
    category: 'compatibility',
    confidence: 91,
    createdAt: '2026-06-05T15:30:00Z',
  },
  {
    id: 'insight-004',
    profileId: 'p007',
    text: 'Recommendation: Consider matches with clients who value spiritual practices. This client has expressed interest in joint meditation and yoga activities, which is a strong bonding factor.',
    category: 'recommendation',
    confidence: 85,
    createdAt: '2026-06-05T14:12:00Z',
  },
  {
    id: 'insight-005',
    profileId: 'p002',
    text: 'Client demonstrates flexibility in lifestyle choices and adaptability to different social settings. This is a key strength for relationship resilience and family integration.',
    category: 'behavior',
    confidence: 79,
    createdAt: '2026-06-04T16:48:00Z',
  },
];

/**
 * Key factors influencing match success
 */
export const successPredictionFactors = [
  { factor: 'Values Alignment', score: 92 },
  { factor: 'Family Compatibility', score: 85 },
  { factor: 'Lifestyle Similarity', score: 78 },
  { factor: 'Communication Style', score: 88 },
  { factor: 'Long-Term Goals', score: 91 },
];
