import React from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  Trash2,
  ExternalLink,
  Calendar,
  Building,
  Target,
  Award,
  Sparkles,
} from 'lucide-react';

export default function HistoryView() {
  const { savedAnalyses, loadAnalysis, deleteAnalysis, setActiveTab } = useApp();

  const getScoreBadge = (score) => {
    if (score >= 80) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (score >= 60) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (score >= 40) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-rose-100 text-rose-800 border-rose-200';
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Analysis History ({savedAnalyses.length})
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              All job description evaluations and roadmap checkpoints stored in your database.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('analyzer')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-purple text-white text-xs font-semibold rounded-xl shadow-sm hover:opacity-95"
          >
            <Sparkles className="w-3.5 h-3.5" /> New Assessment
          </button>
        </div>

        {savedAnalyses.length === 0 ? (
          <div className="text-center py-16 px-4">
            <History className="w-12 h-12 text-purple-200 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No saved analyses yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              When you paste and analyze job descriptions, they are automatically cataloged here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {savedAnalyses.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-purple-200 hover:shadow-soft transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getScoreBadge(
                        item.matchScore
                      )}`}
                    >
                      {item.matchScore}% Match
                    </span>
                    <button
                      onClick={() => deleteAnalysis(item._id)}
                      className="text-slate-300 hover:text-rose-600 p-1 rounded transition-colors"
                      title="Delete this analysis"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mt-2.5">{item.title}</h3>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <Building className="w-3.5 h-3.5 text-purple-600" />
                    <span className="font-medium text-slate-700">{item.company}</span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {item.jobDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(item.createdAt)}</span>
                  </div>

                  <button
                    onClick={() => loadAnalysis(item._id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors"
                  >
                    <span>Open Roadmap</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

