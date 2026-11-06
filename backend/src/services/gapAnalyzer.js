import { SKILL_TAXONOMY } from './skillExtractor.js';

const LEVEL_SCORES = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const IMPORTANCE_WEIGHTS = {
  Critical: 3.0,
  High: 2.0,
  Medium: 1.5,
  Low: 1.0,
};

/**
 * Find canonical skill name or match alias
 */
function findCanonicalName(skillName) {
  const lower = skillName.trim().toLowerCase();
  for (const s of SKILL_TAXONOMY) {
    if (s.name.toLowerCase() === lower || s.aliases.some((a) => a.toLowerCase() === lower)) {
      return s.name;
    }
  }
  return skillName.trim();
}

/**
 * Compare extracted job skills with student skills
 */
export function analyzeGap(extractedJobSkills, studentSkills) {
  const studentSkillMap = new Map();

  // Index student skills by canonical name and normalized key
  (studentSkills || []).forEach((item) => {
    const canonical = findCanonicalName(item.name);
    studentSkillMap.set(canonical.toLowerCase(), {
      originalName: item.name,
      level: item.level || 'Intermediate',
      category: item.category || 'General',
    });
  });

  const matching = [];
  const weak = [];
  const missing = [];

  let totalWeightedScore = 0;
  let maxPossibleScore = 0;

  const categoryTracker = {};

  (extractedJobSkills || []).forEach((jobSkill) => {
    const canonical = findCanonicalName(jobSkill.name);
    const weight = IMPORTANCE_WEIGHTS[jobSkill.importance] || 1.5;
    maxPossibleScore += weight * 100;

    const category = jobSkill.category || 'General';
    if (!categoryTracker[category]) {
      categoryTracker[category] = { totalRequired: 0, matched: 0, scoreEarned: 0, maxScore: 0 };
    }
    categoryTracker[category].totalRequired += 1;
    categoryTracker[category].maxScore += weight * 100;

    const studentSkill = studentSkillMap.get(canonical.toLowerCase());

    if (!studentSkill) {
      // Missing
      missing.push({
        name: canonical,
        category: jobSkill.category,
        requiredLevel: jobSkill.requiredLevel,
        importance: jobSkill.importance,
        frequency: jobSkill.frequency,
      });
      // 0 points
    } else {
      const studentScore = LEVEL_SCORES[studentSkill.level] || 2;
      const requiredScore = LEVEL_SCORES[jobSkill.requiredLevel] || 2;

      if (studentScore >= requiredScore) {
        // Full Match
        matching.push({
          name: canonical,
          category: jobSkill.category,
          studentLevel: studentSkill.level,
          requiredLevel: jobSkill.requiredLevel,
          importance: jobSkill.importance,
        });
        totalWeightedScore += weight * 100;
        categoryTracker[category].matched += 1;
        categoryTracker[category].scoreEarned += weight * 100;
      } else {
        // Weak / Proficiency Gap
        weak.push({
          name: canonical,
          category: jobSkill.category,
          studentLevel: studentSkill.level,
          requiredLevel: jobSkill.requiredLevel,
          gap: `${studentSkill.level} → ${jobSkill.requiredLevel}`,
          importance: jobSkill.importance,
        });
        // Partial credit (55%)
        totalWeightedScore += weight * 55;
        categoryTracker[category].matched += 0.55;
        categoryTracker[category].scoreEarned += weight * 55;
      }
    }
  });

  const rawPercentage = maxPossibleScore > 0 ? (totalWeightedScore / maxPossibleScore) * 100 : 0;
  const matchScore = Math.round(rawPercentage);

  // Determine readiness level
  let readinessLevel = 'Significant Skill Gap';
  if (matchScore >= 85) readinessLevel = 'Exceptional Match (Ready to Apply)';
  else if (matchScore >= 70) readinessLevel = 'Strong Candidate (Minor Upskilling)';
  else if (matchScore >= 50) readinessLevel = 'Moderate Match (Targeted Prep Needed)';
  else readinessLevel = 'Significant Skill Gap (Structured Learning Needed)';

  // Calculate percentage per category
  const categoryStats = {};
  for (const [cat, stats] of Object.entries(categoryTracker)) {
    categoryStats[cat] = {
      totalRequired: stats.totalRequired,
      matched: Math.round(stats.matched * 10) / 10,
      percentage: stats.maxScore > 0 ? Math.round((stats.scoreEarned / stats.maxScore) * 100) : 0,
    };
  }

  return {
    matchScore,
    readinessLevel,
    breakdown: {
      matching,
      weak,
      missing,
    },
    counts: {
      totalRequired: extractedJobSkills.length,
      matchingCount: matching.length,
      weakCount: weak.length,
      missingCount: missing.length,
      studentSkillCount: studentSkills.length,
    },
    categoryStats,
  };
}

