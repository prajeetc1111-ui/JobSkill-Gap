import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  Circle,
  FileEdit,
  Save,
  Filter,
  Flame,
  Award,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function LearningChecklist() {
  const { currentPlan, updateChecklistStatus, setActiveTab } = useApp();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'to_learn' | 'learning' | 'completed'
  const [editingNotesSkill, setEditingNotesSkill] = useState(null);
  const [tempNotes, setTempNotes] = useState('');

  if (!currentPlan || !currentPlan.items || currentPlan.items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 shadow-soft">
        <ListTodo className="w-12 h-12 text-purple-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No Learning Checklist Active</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
          Analyze a job description to populate your personalized learning checklist with tracked milestones.
        </p>
        <button
          onClick={() => setActiveTab('analyzer')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-purple text-white text-xs font-semibold rounded-xl shadow-md hover:opacity-95"
        >
          <Sparkles className="w-4 h-4" /> Start New Assessment
        </button>
      </div>
    );
  }

  const {
    items = [],
    progressPercentage = 0,
    totalSkills = 0,
    completedSkills = 0,
    totalEstimatedHours = 0,
    remainingHours = 0,
    title,
  } = currentPlan;

  const inProgressCount = items.filter((i) => i.status === 'learning').length;
  const toLearnCount = items.filter((i) => i.status === 'to_learn').length;

  const filteredItems = items.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const handleStatusToggle = (item, newStatus) => {
    updateChecklistStatus(item.skillName, newStatus, item.notes);
  };

  const startEditNotes = (item) => {
    setEditingNotesSkill(item.skillName);
    setTempNotes(item.notes || '');
  };

  const saveNotes = (item) => {
    updateChecklistStatus(item.skillName, item.status, tempNotes);
    setEditingNotesSkill(null);
  };

  return (
    <div className="space-y-6">
      {/* Progress & Milestone Header Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-purple-100 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {title || 'Upskilling Roadmap'}
              </h2>
              {progressPercentage === 100 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> 100% Ready!
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Interactive milestone tracker • Updates save in real-time to your database.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-black text-purple-700">{progressPercentage}%</span>
              <p className="text-[11px] text-slate-500 font-medium">Checklist Completed</p>
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="mt-5">
          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-gradient-purple h-full rounded-full transition-all duration-700 ease-out shadow-xs"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 mt-2.5">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-900">
                {completedSkills} of {totalSkills} skills mastered
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-purple-700 font-medium">{inProgressCount} in progress</span>
            </div>
            <div className="flex items-center gap-1 font-semibold text-slate-700">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>~{remainingHours} hours remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-purple-100 shadow-soft">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterStatus === 'all'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Skills ({items.length})
          </button>
          <button
            onClick={() => setFilterStatus('to_learn')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterStatus === 'to_learn'
                ? 'bg-white text-slate-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            To Learn ({toLearnCount})
          </button>
          <button
            onClick={() => setFilterStatus('learning')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterStatus === 'learning'
                ? 'bg-white text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Progress ({inProgressCount})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              filterStatus === 'completed'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed ({completedSkills})
          </button>
        </div>

        <span className="text-xs text-slate-400">
          Click status pill to mark progress
        </span>
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isCompleted = item.status === 'completed';
          const isLearning = item.status === 'learning';
          const isEditingNotes = editingNotesSkill === item.skillName;

          return (
            <div
              key={item.skillName}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-emerald-50/20 border-emerald-200 shadow-xs'
                  : isLearning
                  ? 'bg-purple-50/20 border-purple-200 shadow-soft'
                  : 'bg-white border-slate-200 shadow-soft'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left: Skill title & details */}
                <div className="flex items-start gap-3">
                  {/* Status Indicator Icon button */}
                  <button
                    onClick={() => {
                      if (item.status === 'to_learn') handleStatusToggle(item, 'learning');
                      else if (item.status === 'learning') handleStatusToggle(item, 'completed');
                      else handleStatusToggle(item, 'to_learn');
                    }}
                    title="Click to cycle status"
                    className="mt-0.5 shrink-0"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : isLearning ? (
                      <div className="w-5 h-5 rounded-full border-2 border-purple-600 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-purple-500 transition-colors" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-bold text-sm sm:text-base ${
                          isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
                        }`}
                      >
                        {item.skillName}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          item.priority === 'Critical'
                            ? 'bg-rose-100 text-rose-800'
                            : item.priority === 'High'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {item.whyImportant || `Target level: ${item.targetLevel}`}
                    </p>
                  </div>
                </div>

                {/* Right: Status Switcher Pills */}
                <div className="flex items-center gap-2 justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/70">
                    <button
                      onClick={() => handleStatusToggle(item, 'to_learn')}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                        item.status === 'to_learn'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      To Learn
                    </button>
                    <button
                      onClick={() => handleStatusToggle(item, 'learning')}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                        item.status === 'learning'
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => handleStatusToggle(item, 'completed')}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                        item.status === 'completed'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Completed
                    </button>
                  </div>

                  <button
                    onClick={() => startEditNotes(item)}
                    title="Add notes or study links"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                  >
                    <FileEdit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notes Display / Editor */}
              {(item.notes || isEditingNotes) && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  {isEditingNotes ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempNotes}
                        onChange={(e) => setTempNotes(e.target.value)}
                        placeholder="Add your study notes, GitHub repo links, or key takeaways..."
                        rows={2}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingNotesSkill(null)}
                          className="px-2.5 py-1 text-xs text-slate-500 hover:bg-slate-100 rounded-md"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveNotes(item)}
                          className="px-3 py-1 text-xs font-semibold bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center gap-1"
                        >
                          <Save className="w-3 h-3" /> Save Note
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 p-2.5 rounded-lg text-xs text-slate-600 flex items-start justify-between">
                      <p className="italic">"{item.notes}"</p>
                      <button
                        onClick={() => startEditNotes(item)}
                        className="text-[10px] text-purple-600 hover:underline ml-2 shrink-0 font-medium"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

