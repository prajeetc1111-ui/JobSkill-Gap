const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, err);
    throw err;
  }
}

export const api = {
  // Analysis
  extractSkills: (jobDescription) =>
    request('/analysis/extract', {
      method: 'POST',
      body: JSON.stringify({ jobDescription }),
    }),

  analyzeGap: (payload) =>
    request('/analysis/gap', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  getAnalyses: () => request('/analysis'),

  getAnalysisById: (id) => request(`/analysis/${id}`),

  deleteAnalysis: (id) =>
    request(`/analysis/${id}`, {
      method: 'DELETE',
    }),

  // Student Profile
  getProfile: () => request('/profile'),

  updateProfile: (profileData) =>
    request('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  addProfileSkill: (skill) =>
    request('/profile/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    }),

  removeProfileSkill: (skillName) =>
    request(`/profile/skills/${encodeURIComponent(skillName)}`, {
      method: 'DELETE',
    }),

  // Learning Plans
  getPlans: () => request('/plans'),

  getPlanById: (id) => request(`/plans/${id}`),

  getPlanByAnalysisId: (analysisId) => request(`/plans/analysis/${analysisId}`),

  generatePlan: (analysisId) =>
    request(`/plans/generate/${analysisId}`, {
      method: 'POST',
    }),

  updatePlanItemStatus: (planId, skillName, status, notes = null) =>
    request(`/plans/${planId}/skills/${encodeURIComponent(skillName)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    }),

  updatePlanItemPriority: (planId, skillName, priority) =>
    request(`/plans/${planId}/skills/${encodeURIComponent(skillName)}/priority`, {
      method: 'PATCH',
      body: JSON.stringify({ priority }),
    }),

  deletePlan: (id) =>
    request(`/plans/${id}`, {
      method: 'DELETE',
    }),

  // Samples & System
  getSampleJobs: () => request('/samples/jobs'),

  getSampleProfiles: () => request('/samples/profiles'),

  getTaxonomy: () => request('/samples/taxonomy'),

  getSystemStatus: () => request('/samples/status'),
};

