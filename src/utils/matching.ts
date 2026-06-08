/**
 * Matchmaking Algorithm for Indian Matrimony Platform
 * Sophisticated matching engine with weighted scoring and AI-generated insights
 */

import { Profile, Match } from '../types';

// Weight distribution for compatibility scoring
const WEIGHTS = {
  age: 0.15,
  religion: 0.15,
  location: 0.1,
  education: 0.1,
  familyValues: 0.15,
  lifestyle: 0.1,
  children: 0.1,
  relocation: 0.05,
  language: 0.05,
  career: 0.05,
};

// Religion compatibility groups
const religionCompatibility: Record<string, string[]> = {
  Hindu: ['Hindu', 'Jain', 'Buddhist'],
  Jain: ['Hindu', 'Jain', 'Buddhist'],
  Buddhist: ['Hindu', 'Jain', 'Buddhist'],
  Muslim: ['Muslim'],
  Christian: ['Christian', 'Sikh'],
  Sikh: ['Christian', 'Sikh'],
};

// Family values compatibility
const familyValuesCompatibility: Record<string, string[]> = {
  Traditional: ['Traditional', 'Balanced'],
  Modern: ['Modern', 'Balanced'],
  Balanced: ['Traditional', 'Modern', 'Balanced'],
};

/**
 * Calculate age compatibility score
 * 100 if both in each other's preferred range, partial credit if close
 */
function scoreAge(profileA: Profile, profileB: Profile): number {
  const aInBRange =
    profileB.preferredAgeRange[0] <= profileA.age &&
    profileA.age <= profileB.preferredAgeRange[1];
  const bInARange =
    profileA.preferredAgeRange[0] <= profileB.age &&
    profileB.age <= profileA.preferredAgeRange[1];

  if (aInBRange && bInARange) {
    return 100;
  }

  // Partial credit if close (within 2 years of range boundary)
  let score = 0;
  if (aInBRange) score += 50;
  else if (
    Math.abs(profileA.age - profileB.preferredAgeRange[0]) <= 2 ||
    Math.abs(profileA.age - profileB.preferredAgeRange[1]) <= 2
  ) {
    score += 30;
  }

  if (bInARange) score += 50;
  else if (
    Math.abs(profileB.age - profileA.preferredAgeRange[0]) <= 2 ||
    Math.abs(profileB.age - profileA.preferredAgeRange[1]) <= 2
  ) {
    score += 30;
  }

  return Math.min(score, 100);
}

/**
 * Calculate religion compatibility score
 * Same = 100, compatible groups = 70, different = 30
 */
function scoreReligion(profileA: Profile, profileB: Profile): number {
  if (profileA.religion === profileB.religion) {
    return 100;
  }

  const aCompatible = religionCompatibility[profileA.religion] || [];
  if (aCompatible.includes(profileB.religion)) {
    return 70;
  }

  return 30;
}

/**
 * Calculate location compatibility score
 */
function scoreLocation(profileA: Profile, profileB: Profile): number {
  // Same city
  if (
    profileA.city.toLowerCase() === profileB.city.toLowerCase() &&
    profileA.country === profileB.country
  ) {
    return 100;
  }

  // In preferred cities
  const aPrefers = profileA.preferredCities.some(
    (city) => city.toLowerCase() === profileB.city.toLowerCase()
  );
  const bPrefers = profileB.preferredCities.some(
    (city) => city.toLowerCase() === profileA.city.toLowerCase()
  );

  if (aPrefers && bPrefers) {
    return 80;
  }
  if (aPrefers || bPrefers) {
    return 60;
  }

  // Same country is considered nearby
  if (profileA.country === profileB.country) {
    return 60;
  }

  return 30;
}

/**
 * Calculate education compatibility score
 */
function scoreEducation(profileA: Profile, profileB: Profile): number {
  const aEducation = [
    profileA.degree,
    profileA.masters,
    ...profileA.certifications,
  ]
    .filter(Boolean)
    .map((e) => e.toLowerCase());
  const bEducation = [
    profileB.degree,
    profileB.masters,
    ...profileB.certifications,
  ]
    .filter(Boolean)
    .map((e) => e.toLowerCase());

  const aPrefers = profileA.preferredEducation.map((e) => e.toLowerCase());
  const bPrefers = profileB.preferredEducation.map((e) => e.toLowerCase());

  // Check overlap
  const aOverlap = aEducation.some((edu) =>
    bPrefers.some((pref) => pref.includes(edu) || edu.includes(pref))
  );
  const bOverlap = bEducation.some((edu) =>
    aPrefers.some((pref) => pref.includes(edu) || edu.includes(pref))
  );

  if (aOverlap && bOverlap) {
    return 100;
  }
  if (aOverlap || bOverlap) {
    return 70;
  }

  // Similar education levels (both have degree or masters)
  const aHasAdvanced = !!profileA.masters;
  const bHasAdvanced = !!profileB.masters;
  if (aHasAdvanced === bHasAdvanced) {
    return 60;
  }

  return 40;
}

/**
 * Calculate family values compatibility score
 */
function scoreFamilyValues(profileA: Profile, profileB: Profile): number {
  const aValues = profileA.familyValues?.toLowerCase() || '';
  const bValues = profileB.familyValues?.toLowerCase() || '';

  if (aValues === bValues) {
    return 100;
  }

  // Check compatibility groups
  for (const [, compatible] of Object.entries(familyValuesCompatibility)) {
    if (
      compatible.map((v) => v.toLowerCase()).includes(aValues) &&
      compatible.map((v) => v.toLowerCase()).includes(bValues)
    ) {
      return 70;
    }
  }

  return 40;
}

/**
 * Calculate lifestyle compatibility score
 */
function scoreLifestyle(profileA: Profile, profileB: Profile): number {
  let score = 50; // Base score

  // Diet compatibility
  if (profileA.diet === profileB.diet) {
    score += 20;
  } else if (
    (profileA.diet === 'Vegetarian' && profileB.diet === 'Eggetarian') ||
    (profileB.diet === 'Vegetarian' && profileA.diet === 'Eggetarian')
  ) {
    score += 10;
  }

  // Smoking compatibility
  if (profileA.smoking === profileB.smoking) {
    score += 15;
  } else if (
    profileA.smoking === 'No' &&
    profileB.smoking === 'Trying to quit'
  ) {
    score += 5;
  } else if (
    profileB.smoking === 'No' &&
    profileA.smoking === 'Trying to quit'
  ) {
    score += 5;
  }

  // Drinking compatibility
  if (profileA.drinking === profileB.drinking) {
    score += 15;
  } else if (
    profileA.drinking === 'No' &&
    profileB.drinking === 'Trying to quit'
  ) {
    score += 5;
  } else if (
    profileB.drinking === 'No' &&
    profileA.drinking === 'Trying to quit'
  ) {
    score += 5;
  }

  return Math.min(score, 100);
}

/**
 * Calculate children preference compatibility
 */
function scoreChildren(profileA: Profile, profileB: Profile): number {
  if (profileA.wantKids === profileB.wantKids) {
    return 100;
  }
  if (profileA.wantKids === 'Maybe' || profileB.wantKids === 'Maybe') {
    return 70;
  }
  return 0; // Conflicting Yes and No
}

/**
 * Calculate relocation compatibility
 */
function scoreRelocation(profileA: Profile, profileB: Profile): number {
  if (
    profileA.city.toLowerCase() === profileB.city.toLowerCase() &&
    profileA.country === profileB.country
  ) {
    return 100;
  }
  if (profileA.openToRelocate === 'Yes' || profileB.openToRelocate === 'Yes') {
    return 100;
  }
  if (profileA.openToRelocate === 'Maybe' || profileB.openToRelocate === 'Maybe') {
    return 60;
  }
  return 0; // Both No and different cities
}

/**
 * Calculate language compatibility score
 */
function scoreLanguage(profileA: Profile, profileB: Profile): number {
  const aLangs = (profileA.languages || []).map((l) => l.toLowerCase());
  const bLangs = (profileB.languages || []).map((l) => l.toLowerCase());

  const sharedCount = aLangs.filter((lang) => bLangs.includes(lang)).length;
  if (sharedCount > 0) {
    return Math.min(80 + sharedCount * 5, 100);
  }

  // English is often a bridge
  if (aLangs.includes('english') || bLangs.includes('english')) {
    return 60;
  }

  return 30;
}

/**
 * Calculate career compatibility score
 */
function scoreCareer(profileA: Profile, profileB: Profile): number {
  const aIndustry = profileA.industry?.toLowerCase() || '';
  const bIndustry = profileB.industry?.toLowerCase() || '';

  // Same industry
  if (aIndustry && bIndustry && aIndustry === bIndustry) {
    return 90;
  }

  // Complementary industries
  const complementary: Record<string, string[]> = {
    'information technology': ['finance', 'consulting', 'business'],
    finance: ['it', 'consulting', 'business'],
    consulting: ['it', 'finance', 'business'],
    medicine: ['healthcare', 'business', 'education'],
    education: ['media', 'technology', 'business'],
    business: ['it', 'finance', 'consulting', 'education'],
  };

  const aComplement = complementary[aIndustry] || [];
  if (aComplement.some((comp) => bIndustry.includes(comp))) {
    return 75;
  }

  // Different industries but both employed
  if (aIndustry && bIndustry) {
    return 60;
  }

  // At least one is employed
  if (profileA.company || profileB.company) {
    return 50;
  }

  return 40;
}

/**
 * Calculate overall compatibility score (0-100)
 */
export function calculateCompatibilityScore(
  profileA: Profile,
  profileB: Profile
): number {
  if (!profileA || !profileB) return 0;

  const scores = {
    age: scoreAge(profileA, profileB),
    religion: scoreReligion(profileA, profileB),
    location: scoreLocation(profileA, profileB),
    education: scoreEducation(profileA, profileB),
    familyValues: scoreFamilyValues(profileA, profileB),
    lifestyle: scoreLifestyle(profileA, profileB),
    children: scoreChildren(profileA, profileB),
    relocation: scoreRelocation(profileA, profileB),
    language: scoreLanguage(profileA, profileB),
    career: scoreCareer(profileA, profileB),
  };

  let totalScore = 0;
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    totalScore += scores[key as keyof typeof scores] * weight;
  }

  // Deduct points for dealbreakers
  if (scores.children === 0) totalScore -= 25;
  if (scores.relocation === 0) totalScore -= 25;
  if (scores.religion <= 30) totalScore -= 10;
  if (scores.location <= 30) totalScore -= 10;

  return Math.max(0, Math.round(totalScore));
}

/**
 * Get human-readable match level based on score
 */
export function getMatchLevel(
  score: number
): 'Excellent' | 'Strong' | 'Moderate' {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Strong';
  return 'Moderate';
}

/**
 * Generate AI explanation for the match
 */
export function generateAIExplanation(
  profileA: Profile,
  profileB: Profile,
  score: number
): string {
  const matchLevel = getMatchLevel(score);

  // Check key matching factors
  const ageMatch = scoreAge(profileA, profileB) >= 80;
  const religionMatch = scoreReligion(profileA, profileB) >= 70;
  const locationMatch = scoreLocation(profileA, profileB) >= 80;
  const educationMatch = scoreEducation(profileA, profileB) >= 70;
  const lifestyleMatch = scoreLifestyle(profileA, profileB) >= 70;
  const childrenMatch = scoreChildren(profileA, profileB) >= 70;

  const nameA = `${profileA.firstName} ${profileA.lastName}`;
  const nameB = `${profileB.firstName} ${profileB.lastName}`;
  const designationA = profileA.designation || 'professional';
  const designationB = profileB.designation || 'professional';
  const cityA = profileA.city;
  const cityB = profileB.city;

  let explanation = '';

  if (matchLevel === 'Excellent') {
    const factors = [];
    if (ageMatch) factors.push(`age compatibility`);
    if (religionMatch) factors.push(`shared values`);
    if (locationMatch) factors.push(`location preference`);
    if (educationMatch) factors.push(`educational background`);
    if (lifestyleMatch) factors.push(`lifestyle alignment`);

    explanation = `${nameA}, a ${designationA} from ${cityA}, and ${nameB}, a ${designationB} from ${cityB}, represent an exceptional match. This pairing scores ${score}/100 due to strong alignment in ${factors.join(', ')}. Both bring complementary qualities to the relationship with well-aligned family values and life aspirations.`;
  } else if (matchLevel === 'Strong') {
    const factors = [];
    if (ageMatch) factors.push(`compatible ages`);
    if (religionMatch) factors.push(`shared faith`);
    if (educationMatch) factors.push(`similar education levels`);
    if (childrenMatch) factors.push(`aligned family goals`);

    explanation = `${nameA} (${designationA}, ${cityA}) and ${nameB} (${designationB}, ${cityB}) form a promising match with a compatibility score of ${score}/100. The partnership shows strong potential through ${factors.join(', ')} and mutual respect for each other's professional aspirations.`;
  } else {
    const strengthArea =
      educationMatch || locationMatch ? 'strong professional compatibility' : 'shared interests';

    explanation = `${nameA}, based in ${cityA}, and ${nameB}, from ${cityB}, present a moderate compatibility match at ${score}/100. While there are some areas requiring discussion, the pairing has potential through ${strengthArea} and openness to understanding each other's perspectives.`;
  }

  return explanation;
}

/**
 * Generate list of match strengths
 */
export function generateStrengths(
  profileA: Profile,
  profileB: Profile
): string[] {
  const strengths: string[] = [];

  // Age strength
  if (scoreAge(profileA, profileB) >= 80) {
    strengths.push('Perfect age compatibility');
  } else if (scoreAge(profileA, profileB) >= 60) {
    strengths.push('Compatible age range');
  }

  // Religion/values
  if (scoreReligion(profileA, profileB) >= 100) {
    strengths.push('Same religious background');
  } else if (scoreReligion(profileA, profileB) >= 70) {
    strengths.push('Compatible religious values');
  }

  // Location
  if (scoreLocation(profileA, profileB) >= 100) {
    strengths.push(`Both based in ${profileA.city}`);
  } else if (scoreLocation(profileA, profileB) >= 80) {
    strengths.push('Preferred location alignment');
  }

  // Education
  if (scoreEducation(profileA, profileB) >= 80) {
    strengths.push('Similar educational qualifications');
  } else if (scoreEducation(profileA, profileB) >= 70) {
    strengths.push('Complementary educational backgrounds');
  }

  // Lifestyle
  if (scoreLifestyle(profileA, profileB) >= 80) {
    strengths.push('Aligned lifestyle habits');
  } else if (scoreLifestyle(profileA, profileB) >= 70) {
    strengths.push('Compatible lifestyle preferences');
  }

  // Children
  if (scoreChildren(profileA, profileB) >= 80) {
    strengths.push('Aligned family planning goals');
  }

  // Career
  if (scoreCareer(profileA, profileB) >= 75) {
    strengths.push(
      `Both successful in ${profileA.industry || 'professional'} fields`
    );
  }

  // Language
  const sharedLanguages = (profileA.languages || []).filter((lang) =>
    (profileB.languages || []).includes(lang)
  );
  if (sharedLanguages.length > 0) {
    strengths.push(`Share common language(s): ${sharedLanguages.join(', ')}`);
  }

  return strengths.slice(0, 5); // Return top 5 strengths
}

/**
 * Generate list of potential risks/concerns
 */
export function generateRisks(profileA: Profile, profileB: Profile): string[] {
  const risks: string[] = [];

  // Age mismatch
  if (scoreAge(profileA, profileB) < 40) {
    const ageDiff = Math.abs(profileA.age - profileB.age);
    risks.push(`Significant age difference of ${ageDiff} years`);
  }

  // Religion/values
  if (scoreReligion(profileA, profileB) <= 30) {
    risks.push('Different religious backgrounds may require adjustment');
  }

  // Location
  if (scoreLocation(profileA, profileB) < 60) {
    risks.push(
      `Long distance between ${profileA.city} and ${profileB.city}`
    );
  }

  // Family values
  if (scoreFamilyValues(profileA, profileB) < 50) {
    risks.push('Differing family value systems');
  }

  // Lifestyle
  if (scoreLifestyle(profileA, profileB) < 50) {
    risks.push('Lifestyle habit differences may need discussion');
  }

  // Children
  if (scoreChildren(profileA, profileB) < 50) {
    risks.push('Different perspectives on having children');
  }

  // Career alignment
  if (scoreCareer(profileA, profileB) < 40) {
    risks.push('Career paths and industry differences');
  }

  // Relocation
  if (
    scoreRelocation(profileA, profileB) < 50 &&
    scoreLocation(profileA, profileB) < 80
  ) {
    risks.push('Limited flexibility on relocation');
  }

  return risks.slice(0, 3); // Return top 3 risks
}

/**
 * Generate personalized introduction message
 */
export function generateIntroduction(
  profileA: Profile,
  profileB: Profile
): string {
  const nameA = profileA.firstName;
  const nameB = profileB.firstName;
  const designationB = profileB.designation || 'professional';
  const cityB = profileB.city;
  const schoolB = profileB.college || profileB.school;

  const intro = `Hi ${nameA}, we'd like to introduce you to ${nameB}, a ${designationB} from ${cityB}. ${nameB} is ${profileB.age} years old, ${schoolB ? `graduated from ${schoolB}, ` : ''}and shares many of your values and interests. We think you both would have a great conversation!`;

  return intro;
}

/**
 * Get badge styling for a matchmaking stage
 */
export function getStageBadge(stage: string): {
  bg: string;
  text: string;
  dot: string;
} {
  const badges: Record<
    string,
    { bg: string; text: string; dot: string }
  > = {
    Discovery: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      dot: 'bg-green-500',
    },
    'Preferences Collected': {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      dot: 'bg-yellow-500',
    },
    'Match Review': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      dot: 'bg-blue-500',
    },
    'Meeting Scheduled': {
      bg: 'bg-purple-50',
      text: 'text-purple-700',
      dot: 'bg-purple-500',
    },
    'Family Discussion': {
      bg: 'bg-pink-50',
      text: 'text-pink-700',
      dot: 'bg-pink-500',
    },
    'Success Journey': {
      bg: 'bg-red-50',
      text: 'text-red-700',
      dot: 'bg-red-500',
    },
  };

  return (
    badges[stage] || {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      dot: 'bg-gray-500',
    }
  );
}

/**
 * Find matches for a profile from a pool of profiles
 * Only generates Male-Female pairs, sorted by compatibility score
 */
export function findMatchesForProfile(
  profile: Profile,
  allProfiles: Profile[],
  limit: number = 10
): Match[] {
  if (!profile || !allProfiles || allProfiles.length === 0) {
    return [];
  }

  // Filter profiles: opposite gender, not same person, verified
  const candidates = allProfiles.filter(
    (p) =>
      p.gender !== profile.gender &&
      p.id !== profile.id &&
      p.verified &&
      profile.verified
  );

  // Calculate compatibility scores and create match objects
  const matches = candidates
    .map((candidate) => {
      const score = calculateCompatibilityScore(profile, candidate);
      return {
        score,
        profileA: profile,
        profileB: candidate,
      };
    })
    .filter((m) => m.score > 0) // Filter out zero scores
    .sort((a, b) => b.score - a.score) // Sort descending by score
    .slice(0, limit) // Limit results
    .map((m, index) => {
      const matchId = `match_${profile.id}_${m.profileB.id}_${Date.now()}_${index}`;
      const explanation = generateAIExplanation(
        m.profileA,
        m.profileB,
        m.score
      );
      const strengths = generateStrengths(m.profileA, m.profileB);
      const risks = generateRisks(m.profileA, m.profileB);

      const match: Match = {
        id: matchId,
        profileA: profile.id,
        profileB: m.profileB.id,
        compatibilityScore: m.score,
        matchLevel: getMatchLevel(m.score),
        aiExplanation: explanation,
        strengths,
        risks,
        status: 'Pending',
      };

      return match;
    });

  return matches;
}
