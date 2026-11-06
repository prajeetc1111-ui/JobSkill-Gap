import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../api/client.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation
  const [activeTab, setActiveTab] = useState('analyzer');

  // Core Data States
  const [studentProfile, setStudentProfile] = useState({
    studentName: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    targetRole: 'Full Stack Engineer',
    skills: [],
  });

  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [sampleJobs, setSampleJobs] = useState([]);
  const [sampleProfiles, setSampleProfiles] = useState([]);
  const [taxonomy, setTaxonomy] = useState({ categories: {}, skills: [] });

  // System State
  const [dbInfo, setDbInfo] = useState({ connected: false, mode: 'checking', uri: '' });
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast Notification Helper
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initial Data Fetch
  const refreshInitialData = useCallback(async () => {
    try {
      setLoading(true);

      // Check system & DB status
      try {
        const statusRes = await api.getSystemStatus();
        if (statusRes.db) setDbInfo(statusRes.db);
      } catch (e) {
        console.warn('Backend not ready yet for status:', e.message);
      }

      // Load Profile
      try {
        const profileRes = await api.getProfile();
        if (profileRes.profile) setStudentProfile(profileRes.profile);
      } catch (e) {
        console.warn('Profile fetch failed:', e.message);
      }

      // Load Sample Jobs & Profiles
      try {
        const [jobsRes, profilesRes, taxRes, analysesRes] = await Promise.all([
          api.getSampleJobs(),
          api.getSampleProfiles(),
          api.getTaxonomy(),
          api.getAnalyses(),
        ]);
        if (jobsRes.jobs) setSampleJobs(jobsRes.jobs);
        if (profilesRes.profiles) setSampleProfiles(profilesRes.profiles);
        if (taxRes) setTaxonomy(taxRes);
        if (analysesRes.analyses) {
          setSavedAnalyses(analysesRes.analyses);
          if (analysesRes.analyses.length > 0 && !currentAnalysis) {
            setCurrentAnalysis(analysesRes.analyses[0]);
            // Also load its plan
            try {
              const planRes = await api.getPlanByAnalysisId(analysesRes.analyses[0]._id);
              if (planRes.plan) setCurrentPlan(planRes.plan);
            } catch {}
          }
        }
      } catch (e) {
        console.warn('Sample or history load error:', e.message);
      }
    } finally {
      setLoading(false);
    }
  }, [currentAnalysis]);

  useEffect(() => {
    refreshInitialData();
  }, [refreshInitialData]);

  // Run Gap Analysis
  const runGapAnalysis = async ({
    jobDescription,
    title,
    company,
    extractedSkills,
  }) => {
    try {
      setAnalyzing(true);
      const res = await api.analyzeGap({
        jobDescription,
        title: title || 'Target Role Analysis',
        company: company || 'Target Company',
        studentName: studentProfile.studentName || 'Student',
        studentSkills: studentProfile.skills || [],
        extractedSkills,
        autoGeneratePlan: true,
      });

      if (res.analysis) {
        setCurrentAnalysis(res.analysis);
        setSavedAnalyses((prev) => [res.analysis, ...prev]);
      }
      if (res.plan) {
        setCurrentPlan(res.plan);
      }

      showToast(`Analysis completed! Match Score: ${res.analysis.matchScore}%`, 'success');
      setActiveTab('gap-results');
      return res;
    } catch (err) {
      showToast(err.message || 'Failed to analyze skill gap.', 'error');
      throw err;
    } finally {
      setAnalyzing(false);
    }
  };

  // Update Skill Checklist Status
  const updateChecklistStatus = async (skillName, newStatus, notes = null) => {
    if (!currentPlan) return;
    try {
      const res = await api.updatePlanItemStatus(
        currentPlan._id,
        skillName,
        newStatus,
        notes
      );
      if (res.plan) {
        setCurrentPlan(res.plan);
        if (newStatus === 'completed') {
          showToast(`Marked "${skillName}" as Completed! 🎯`, 'success');
        } else {
          showToast(`Updated "${skillName}" status to ${newStatus.replace('_', ' ')}`, 'info');
        }
      }
    } catch (err) {
      showToast(err.message || 'Failed to update item status.', 'error');
    }
  };

  // Update Priority of Skill Item
  const updateSkillPriority = async (skillName, newPriority) => {
    if (!currentPlan) return;
    try {
      const res = await api.updatePlanItemPriority(
        currentPlan._id,
        skillName,
        newPriority
      );
      if (res.plan) {
        setCurrentPlan(res.plan);
        showToast(`Priority for "${skillName}" updated to ${newPriority}`, 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update priority.', 'error');
    }
  };

  // Update Student Profile
  const saveStudentProfile = async (profileData) => {
    try {
      const res = await api.updateProfile(profileData);
      if (res.profile) {
        setStudentProfile(res.profile);
        showToast('Student profile saved successfully!', 'success');
      }
      return res;
    } catch (err) {
      showToast(err.message || 'Failed to save profile.', 'error');
      throw err;
    }
  };

  // Add / Edit Single Student Skill
  const addStudentSkill = async (skill) => {
    try {
      const res = await api.addProfileSkill(skill);
      if (res.profile) {
        setStudentProfile(res.profile);
        showToast(`Added ${skill.name} (${skill.level})`, 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to add skill.', 'error');
    }
  };

  // Remove Single Student Skill
  const removeStudentSkill = async (skillName) => {
    try {
      const res = await api.removeProfileSkill(skillName);
      if (res.profile) {
        setStudentProfile(res.profile);
        showToast(`Removed ${skillName}`, 'info');
      }
    } catch (err) {
      showToast(err.message || 'Failed to remove skill.', 'error');
    }
  };

  // Load a Persona into Profile
  const loadStudentPersona = async (persona) => {
    try {
      await saveStudentProfile({
        studentName: persona.studentName,
        email: persona.email,
        targetRole: persona.targetRole,
        skills: persona.skills,
      });
      showToast(`Loaded Persona: ${persona.name}`, 'success');
    } catch (err) {
      showToast('Could not load persona: ' + err.message, 'error');
    }
  };

  // Load an existing Analysis from History
  const loadAnalysis = async (analysisId) => {
    try {
      setLoading(true);
      const res = await api.getAnalysisById(analysisId);
      if (res.analysis) {
        setCurrentAnalysis(res.analysis);
      }
      if (res.plan) {
        setCurrentPlan(res.plan);
      } else {
        // Fetch or generate plan
        try {
          const planRes = await api.getPlanByAnalysisId(analysisId);
          if (planRes.plan) setCurrentPlan(planRes.plan);
        } catch {}
      }
      setActiveTab('gap-results');
      showToast(`Loaded analysis: ${res.analysis.title}`, 'success');
    } catch (err) {
      showToast('Failed to load analysis: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete an Analysis
  const deleteAnalysis = async (analysisId) => {
    try {
      await api.deleteAnalysis(analysisId);
      setSavedAnalyses((prev) => prev.filter((a) => a._id !== analysisId));
      if (currentAnalysis && currentAnalysis._id === analysisId) {
        setCurrentAnalysis(null);
        setCurrentPlan(null);
      }
      showToast('Analysis deleted', 'info');
    } catch (err) {
      showToast('Failed to delete analysis: ' + err.message, 'error');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        studentProfile,
        setStudentProfile,
        saveStudentProfile,
        addStudentSkill,
        removeStudentSkill,
        loadStudentPersona,
        currentAnalysis,
        setCurrentAnalysis,
        currentPlan,
        setCurrentPlan,
        savedAnalyses,
        sampleJobs,
        sampleProfiles,
        taxonomy,
        dbInfo,
        loading,
        analyzing,
        toasts,
        showToast,
        removeToast,
        runGapAnalysis,
        updateChecklistStatus,
        updateSkillPriority,
        loadAnalysis,
        deleteAnalysis,
        refreshInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

