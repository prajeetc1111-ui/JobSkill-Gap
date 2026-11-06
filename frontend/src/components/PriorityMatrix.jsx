import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Target,
  Clock,
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function PriorityMatrix() {
  const { currentPlan, updateSkillPriority, setActiveTab } = useApp();
  const [filterPriority, setFilterPriority] = useState('All');
  const [expandedSkill, setExpandedSkill] = useState(null);

  if (!currentPlan || !currentPlan.items || currentPlan.items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 shadow-soft">
        <Target className="w-12 h-12 text-purple-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No Priority Plan Generated</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Run a skill gap analysis to automatically construct a customized, prioritized learning plan.
        </p>
        <button
          onClick={() => setActiveTab('analyzer')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-purple text-white text-xs font-semibold rounded-xl shadow-md hover:opacity-95"
        >
          <Sparkles className="w-4 h-4" /> Start Analysis
        </button>
      </div>
    );
  }

  const { items, title, totalEstimatedHours } = currentPlan;

  const toggleExpand = (skillName) => {
    setExpandedSkill(expandedSkill === skillName ? null : skillName);
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'High':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Medium':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Low':
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const filteredItems = items.filter(
    (item) => filterPriority === 'All' || item.priority === filterPriority
  );

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                {items.length} Skills
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Estimated total study time:{' '}
              <span className="font-bold text-purple-700">~{totalEstimatedHours} hours</span> (~
              {Math.max(1, Math.round(totalEstimatedHours / 12))} weeks at 12 hrs/week)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('checklist')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-purple text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-95"
            >
              <span>Go to Interactive Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Priority Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map((p) => {
              const count = p === 'All' ? items.length : items.filter((i) => i.priority === p).length;
              const isActive = filterPriority === p;
              return (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'bg-white text-purple-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p} ({count})
                </button>
              );
            })}
          </div>

          <span className="text-xs text-slate-400">
            Click priority selector on any card to adjust ranking
          </span>
        </div>
      </div>

      {/* Priority Engine Cards Grid */}
      <div className="space-y-3.5">
        {filteredItems.map((item) => {
          const isExpanded = expandedSkill === item.skillName;
          return (
            <div
              key={item.skillName}
              className="bg-white rounded-2xl border border-purple-100 shadow-soft overflow-hidden transition-all hover:border-purple-200"
            >
              {/* Card Header Row */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  {/* Priority Selector Dropdown */}
                  <select
                    value={item.priority}
                    onChange={(e) => updateSkillPriority(item.skillName, e.target.value)}
                    className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border cursor-pointer focus:outline-none transition-colors ${getPriorityBadge(
                      item.priority
                    )}`}
                  >
                    <option value="Critical">🔴 Critical</option>
                    <option value="High">🟣 High</option>
                    <option value="Medium">🔵 Medium</option>
                    <option value="Low">⚪ Low</option>
                  </select>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900">
                        {item.skillName}
                      </h3>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.whyImportant}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      {item.estimatedHours} hrs
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-medium">{item.difficulty}</span>
                  </div>

                  <button
                    onClick={() => toggleExpand(item.skillName)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900 px-2.5 py-1 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'Curated Resources'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Collapsible Action Steps & Resources */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 bg-purple-50/30 border-t border-purple-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Action Steps */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-purple-600" /> Recommended Action Steps
                    </h4>
                    <ul className="space-y-1.5">
                      {item.actionSteps?.map((step, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-700 flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-purple-100/60"
                        >
                          <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Curated Resources */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-purple-600" /> Curated Guides & Docs
                    </h4>
                    <div className="space-y-2">
                      {item.resources?.map((res, idx) => (
                        <a
                          key={idx}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-purple-100 hover:border-purple-300 hover:bg-purple-50/50 transition-all group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-purple-100 text-purple-800">
                              {res.type}
                            </span>
                            <span className="text-xs font-semibold text-slate-800 group-hover:text-purple-700">
                              {res.title}
                            </span>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

