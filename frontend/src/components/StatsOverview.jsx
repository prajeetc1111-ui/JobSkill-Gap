import React from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Target,
} from 'lucide-react';

export default function StatsOverview() {
  const { currentAnalysis, currentPlan, setActiveTab } = useApp();

  if (!currentAnalysis) {
    return (
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-2xl p-6 text-white shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Ready to assess your skill gap?
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Paste a Job Description. Discover Gaps. Build Your Roadmap.
          </h1>
          <p className="text-purple-100 text-sm leading-relaxed mb-4">
            Compare any job description against your current skill set. Our engine detects
            required proficiencies, identifies missing skills, and crafts an actionable,
            prioritized learning checklist.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('analyzer')}
              className="px-4 py-2 bg-white text-purple-800 font-semibold text-xs rounded-xl shadow-md hover:bg-purple-50 transition-colors"
            >
              Start Free Assessment →
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 bg-purple-600/50 hover:bg-purple-600/70 border border-purple-300/30 text-white font-medium text-xs rounded-xl transition-colors"
            >
              Configure Student Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { matchScore, readinessLevel, breakdown, title, company } = currentAnalysis;
  const matchingCount = breakdown?.matching?.length || 0;
  const weakCount = breakdown?.weak?.length || 0;
  const missingCount = breakdown?.missing?.length || 0;
  const totalRequired = matchingCount + weakCount + missingCount;

  const planProgress = currentPlan?.progressPercentage || 0;
  const remainingHours = currentPlan?.remainingHours || 0;

  // Color scheme based on score
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600 border-emerald-500 bg-emerald-50';
    if (score >= 60) return 'text-purple-600 border-purple-500 bg-purple-50';
    if (score >= 40) return 'text-amber-600 border-amber-500 bg-amber-50';
    return 'text-rose-600 border-rose-500 bg-rose-50';
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-soft mb-8">
      {/* Top Title Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
              {company}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluated against student profile • Readiness:{' '}
            <span className="font-semibold text-purple-700">{readinessLevel}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('gap-results')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
          >
            View Full Matrix
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-purple text-white shadow-sm hover:opacity-95 transition-opacity"
          >
            Open Learning Checklist
          </button>
        </div>
      </div>

      {/* Grid of 4 Key SaaS Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Match Score */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 relative overflow-hidden flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Match Score
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900">
                {matchScore}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-purple-600" />
              <span>Weighted Proficiency</span>
            </p>
          </div>
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 font-black text-lg ${getScoreColor(
              matchScore
            )}`}
          >
            {matchScore}%
          </div>
        </div>

        {/* Metric 2: Skills Breakdown */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Requirements Overview
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-900">{totalRequired}</span>
            <span className="text-xs text-slate-500">skills identified</span>
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3 h-3" /> {matchingCount} Matched
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
              <AlertTriangle className="w-3 h-3" /> {weakCount} Weak
            </span>
          </div>
        </div>

        {/* Metric 3: Critical Gaps */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Missing Skills
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-rose-600">{missingCount}</span>
            <span className="text-xs text-slate-500">unmatched skills</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <Target className="w-3 h-3 text-rose-500" />
            <span>Target for high-impact study</span>
          </div>
        </div>

        {/* Metric 4: Learning Progress */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Checklist Progress
            </p>
            <span className="text-xs font-bold text-purple-700">{planProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-purple h-full rounded-full transition-all duration-500"
              style={{ width: `${planProgress}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>~{remainingHours} hours left to complete</span>
          </p>
        </div>
      </div>
    </div>
  );
}

