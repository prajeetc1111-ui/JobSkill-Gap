import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  BarChart2,
  ArrowRight,
  Filter,
  Sparkles,
  Layers,
  Award,
} from 'lucide-react';

export default function SkillGapResults() {
  const { currentAnalysis, setActiveTab } = useApp();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'matching' | 'weak' | 'missing'

  if (!currentAnalysis) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 shadow-soft">
        <BarChart2 className="w-12 h-12 text-purple-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No Active Analysis Available</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Paste a job description or select one of the pre-loaded roles to run a gap assessment.
        </p>
        <button
          onClick={() => setActiveTab('analyzer')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-purple text-white text-xs font-semibold rounded-xl shadow-md hover:opacity-95 transition-opacity"
        >
          <Sparkles className="w-4 h-4" /> Go to Job Skill Mapper
        </button>
      </div>
    );
  }

  const {
    title,
    company,
    matchScore,
    readinessLevel,
    breakdown = {},
    categoryStats = {},
  } = currentAnalysis;

  const matching = breakdown.matching || [];
  const weak = breakdown.weak || [];
  const missing = breakdown.missing || [];
  const total = matching.length + weak.length + missing.length;

  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500' };
    if (score >= 60) return { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-500' };
    if (score >= 40) return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-500' };
    return { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-500' };
  };

  const scoreStyle = getScoreColor(matchScore);

  return (
    <div className="space-y-6">
      {/* Top Banner: Big Gauge & Summary */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-purple-100 shadow-soft relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Score Gauge */}
          <div className="flex items-center gap-6">
            <div
              className={`w-28 h-28 rounded-full border-4 flex flex-col items-center justify-center shadow-inner ${scoreStyle.border} ${scoreStyle.bg}`}
            >
              <span className={`text-3xl font-black tracking-tight ${scoreStyle.text}`}>
                {matchScore}%
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                Match
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-800">
                  {company}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">Evaluation Complete</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                {title}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${scoreStyle.bg} ${scoreStyle.text}`}
                >
                  <Award className="w-3.5 h-3.5" />
                  {readinessLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Next Step CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('priority-plan')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-purple rounded-xl shadow-md hover:shadow-lg hover:opacity-95 transition-all"
            >
              <span>View Prioritized Learning Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress ratio strip */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
              Matching Skills
            </span>
            <div className="flex items-baseline gap-1 mt-1 justify-center sm:justify-start">
              <span className="text-2xl font-bold text-emerald-700">{matching.length}</span>
              <span className="text-xs text-emerald-600">/ {total}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100">
            <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
              Proficiency Upgrade
            </span>
            <div className="flex items-baseline gap-1 mt-1 justify-center sm:justify-start">
              <span className="text-2xl font-bold text-amber-700">{weak.length}</span>
              <span className="text-xs text-amber-600">weak skills</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
            <span className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider block">
              Skill Gaps (Missing)
            </span>
            <div className="flex items-baseline gap-1 mt-1 justify-center sm:justify-start">
              <span className="text-2xl font-bold text-rose-700">{missing.length}</span>
              <span className="text-xs text-rose-600">unmatched</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown Bars */}
      {categoryStats && Object.keys(categoryStats).length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" /> Competency Breakdown by Category
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(categoryStats).map(([cat, stats]) => (
              <div key={cat} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-800">{cat}</span>
                  <span className="font-bold text-purple-700">{stats.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
                  <span>{stats.matched} matched</span>
                  <span>{stats.totalRequired} required</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3-Column Interactive Breakdown Grid */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-800">Skill Comparison Matrix</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review where your skillset excels and where focused learning will produce the highest impact.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'all'
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({total})
            </button>
            <button
              onClick={() => setActiveFilter('matching')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'matching'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matching ({matching.length})
            </button>
            <button
              onClick={() => setActiveFilter('weak')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'weak'
                  ? 'bg-white text-amber-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Weak ({weak.length})
            </button>
            <button
              onClick={() => setActiveFilter('missing')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeFilter === 'missing'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Missing ({missing.length})
            </button>
          </div>
        </div>

        {/* The 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Matching Skills */}
          {(activeFilter === 'all' || activeFilter === 'matching') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b-2 border-emerald-500">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Matching Skills ({matching.length})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Qualified
                </span>
              </div>

              {matching.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4">No matching skills identified.</p>
              ) : (
                matching.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50/60 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {skill.studentLevel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                      <span>{skill.category}</span>
                      <span>Job asks: {skill.requiredLevel}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Column 2: Weak Skills */}
          {(activeFilter === 'all' || activeFilter === 'weak') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b-2 border-amber-500">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Weak / Upskill ({weak.length})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  Level Up
                </span>
              </div>

              {weak.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4">No weak skills found.</p>
              ) : (
                weak.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl border border-amber-100 bg-amber-50/30 hover:bg-amber-50/60 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                        {skill.gap}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                      <span>{skill.category}</span>
                      <span className="font-medium text-amber-700">Quick win</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Column 3: Missing Skills */}
          {(activeFilter === 'all' || activeFilter === 'missing') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b-2 border-rose-500">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Missing Skills ({missing.length})
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                  High Priority
                </span>
              </div>

              {missing.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-4">No missing skills detected! 100% matched!</p>
              ) : (
                missing.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3.5 rounded-xl border border-rose-100 bg-rose-50/30 hover:bg-rose-50/60 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-xs text-slate-900">{skill.name}</span>
                      <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                        {skill.importance}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500">
                      <span>{skill.category}</span>
                      <span>Target: {skill.requiredLevel}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

