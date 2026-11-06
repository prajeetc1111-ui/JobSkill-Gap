import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../api/client';
import {
  FileText,
  Sparkles,
  Building,
  Briefcase,
  Play,
  RotateCcw,
  Check,
  Plus,
  Trash2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function JobDescriptionInput() {
  const {
    sampleJobs,
    runGapAnalysis,
    analyzing,
    showToast,
  } = useApp();

  const [title, setTitle] = useState('Senior Full Stack Engineer');
  const [company, setCompany] = useState('Stripe / FinTech Cloud');
  const [description, setDescription] = useState('');
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [extracting, setExtracting] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('General');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  // Load first sample job on initial mount if empty
  useEffect(() => {
    if (sampleJobs.length > 0 && !description) {
      loadSampleJob(sampleJobs[0]);
    }
  }, [sampleJobs]);

  const loadSampleJob = (job) => {
    setTitle(job.title);
    setCompany(job.company);
    setDescription(job.description);
    // Auto-extract immediately for high-touch experience
    handleExtractSkills(job.description);
  };

  const handleExtractSkills = async (textToExtract = description) => {
    if (!textToExtract || textToExtract.trim().length === 0) {
      showToast('Please enter or select a job description first.', 'error');
      return;
    }

    try {
      setExtracting(true);
      const res = await api.extractSkills(textToExtract);
      if (res.skills) {
        setExtractedSkills(res.skills);
        showToast(`Extracted ${res.skills.length} skills from job description!`, 'info');
      }
    } catch (err) {
      showToast(err.message || 'Failed to extract skills.', 'error');
    } finally {
      setExtracting(false);
    }
  };

  const handleRemoveSkill = (skillName) => {
    setExtractedSkills((prev) => prev.filter((s) => s.name !== skillName));
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;

    const exists = extractedSkills.some(
      (s) => s.name.toLowerCase() === newSkillInput.trim().toLowerCase()
    );
    if (exists) {
      showToast(`"${newSkillInput.trim()}" is already in requirements.`, 'info');
      return;
    }

    setExtractedSkills((prev) => [
      ...prev,
      {
        name: newSkillInput.trim(),
        category: newSkillCategory,
        frequency: 1,
        requiredLevel: newSkillLevel,
        importance: 'High',
      },
    ]);
    setNewSkillInput('');
    showToast(`Added requirement: ${newSkillInput.trim()}`, 'success');
  };

  const handleAnalyze = async () => {
    if (!description.trim()) {
      showToast('Please provide a job description.', 'error');
      return;
    }

    await runGapAnalysis({
      jobDescription: description,
      title: title || 'Target Role Analysis',
      company: company || 'Target Company',
      extractedSkills: extractedSkills.length > 0 ? extractedSkills : undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* Sample Job Presets Strip */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Quick Test Presets (One-Click Sample Job Descriptions)
            </h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Click any role to populate and analyze
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {sampleJobs.map((job) => {
            const isSelected = title === job.title;
            return (
              <button
                key={job.id}
                onClick={() => loadSampleJob(job)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-purple-50/50 hover:bg-purple-100/70 text-purple-900 border-purple-200/80'
                }`}
              >
                {job.title}
                <span className="opacity-75 font-normal ml-1.5 text-[11px]">({job.company})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-bold text-slate-800">Job Description Analyzer</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setDescription('');
                setExtractedSkills([]);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Title & Company Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-purple-600" /> Target Job Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-purple-600" /> Company / Organization
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google, Stripe, TechStartup"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">
              Paste Complete Job Description or Requirements
            </label>
            <span className="text-[11px] text-slate-400">
              {description.length} characters • {description.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <textarea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste raw job description text here... (include requirements, responsibilities, tech stack, nice-to-haves)"
            className="w-full p-3.5 text-xs sm:text-sm font-mono text-slate-800 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all leading-relaxed"
          />
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => handleExtractSkills(description)}
            disabled={extracting || !description.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            {extracting ? 'Extracting Skills...' : 'Preview Extracted Skills'}
          </button>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !description.trim()}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-purple rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            {analyzing ? 'Analyzing Gap & Building Roadmap...' : 'Run Skill Gap Analysis →'}
          </button>
        </div>
      </div>

      {/* Extracted Skills Preview & Custom Requirements Adjuster */}
      {extractedSkills.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-800">
                  Detected Requirements ({extractedSkills.length} Skills)
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Ready for Comparison
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Review or fine-tune skills extracted by NLP taxonomy before running gap comparison
              </p>
            </div>
          </div>

          {/* Skill Tag Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {extractedSkills.map((skill) => (
              <div
                key={skill.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 font-medium group transition-all hover:border-purple-300"
              >
                <span className="font-semibold text-purple-900">{skill.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-200/70 text-purple-800">
                  {skill.requiredLevel}
                </span>
                {skill.frequency > 1 && (
                  <span className="text-[10px] px-1 rounded-full bg-purple-300/80 text-purple-900 font-bold">
                    {skill.frequency}x
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.name)}
                  className="text-purple-400 hover:text-rose-600 transition-colors ml-0.5"
                  title="Remove this requirement"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add custom requirement inline */}
          <form
            onSubmit={handleAddCustomSkill}
            className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100"
          >
            <span className="text-xs font-semibold text-slate-600">Add Missing Requirement:</span>
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="e.g. GraphQL, Tailwind, Redis"
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500 w-48"
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
            >
              <option value="Beginner">Beginner Level</option>
              <option value="Intermediate">Intermediate Level</option>
              <option value="Advanced">Advanced Level</option>
            </select>
            <select
              value={newSkillCategory}
              onChange={(e) => setNewSkillCategory(e.target.value)}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
            >
              <option value="General">General</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps & Cloud">DevOps & Cloud</option>
              <option value="Data & AI">Data & AI</option>
              <option value="Testing">Testing</option>
              <option value="Soft Skills">Soft Skills</option>
            </select>
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-semibold hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

