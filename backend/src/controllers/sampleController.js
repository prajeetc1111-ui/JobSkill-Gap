import { SAMPLE_JOBS, SAMPLE_STUDENT_PROFILES } from '../services/sampleData.js';
import { SKILL_TAXONOMY } from '../services/skillExtractor.js';
import { dbStatus } from '../config/db.js';

export function getSampleJobsHandler(req, res) {
  return res.json({
    success: true,
    count: SAMPLE_JOBS.length,
    jobs: SAMPLE_JOBS,
  });
}

export function getSampleProfilesHandler(req, res) {
  return res.json({
    success: true,
    count: SAMPLE_STUDENT_PROFILES.length,
    profiles: SAMPLE_STUDENT_PROFILES,
  });
}

export function getAllSkillsTaxonomyHandler(req, res) {
  const categories = {};
  SKILL_TAXONOMY.forEach((s) => {
    if (!categories[s.category]) {
      categories[s.category] = [];
    }
    categories[s.category].push(s.name);
  });

  return res.json({
    success: true,
    totalSkills: SKILL_TAXONOMY.length,
    categories,
    skills: SKILL_TAXONOMY.map((s) => ({ name: s.name, category: s.category })),
  });
}

export function getSystemStatusHandler(req, res) {
  return res.json({
    success: true,
    timestamp: new Date().toISOString(),
    status: 'operational',
    db: {
      connected: dbStatus.connected,
      mode: dbStatus.mode,
      uri: dbStatus.uri,
      error: dbStatus.error,
    },
  });
}

