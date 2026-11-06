import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Database,
  Layers,
  BarChart3,
  ListTodo,
  UserCheck,
  History,
  Target,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Info,
  X,
} from 'lucide-react';

export default function Navbar({ onOpenExport }) {
  const {
    activeTab,
    setActiveTab,
    dbInfo,
    savedAnalyses,
    toasts,
    removeToast,
    studentProfile,
  } = useApp();

  const navItems = [
    { id: 'analyzer', label: 'Skill Mapper', icon: Sparkles },
    { id: 'gap-results', label: 'Gap Analysis', icon: BarChart3 },
    { id: 'priority-plan', label: 'Priority Plan', icon: Target },
    { id: 'checklist', label: 'Learning Checklist', icon: ListTodo },
    { id: 'profile', label: 'Student Profile', icon: UserCheck },
    { id: 'history', label: 'History', icon: History, count: savedAnalyses.length },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center text-white shadow-purple-glow shadow-brand-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-900 bg-clip-text text-transparent">
                    JobSkill Gap
                  </span>
                  <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-semibold bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                    SaaS v1.0
                  </span>
                </div>
                <p className="hidden sm:block text-xs text-slate-500 font-medium">
                  Job Description Skill Mapper & Priority Engine
                </p>
              </div>
            </div>

            {/* Middle Nav Tabs */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/70">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-purple-700 shadow-sm shadow-purple-900/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span
                        className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                          isActive
                            ? 'bg-purple-100 text-purple-700 font-bold'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Quick Controls */}
            <div className="flex items-center gap-2.5">
              {/* DB Status Badge */}
              <div
                title={
                  dbInfo.mode === 'mongodb'
                    ? 'Connected to live MongoDB database'
                    : 'Running in resilient fallback data store mode'
                }
                className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  dbInfo.mode === 'mongodb'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>{dbInfo.mode === 'mongodb' ? 'MongoDB Active' : 'Local DB Store'}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    dbInfo.mode === 'mongodb' ? 'bg-emerald-500 animate-pulse' : 'bg-purple-500'
                  }`}
                />
              </div>

              {/* Export / Report button */}
              <button
                onClick={onOpenExport}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
              >
                Export Report
              </button>

              {/* New Analysis Action */}
              <button
                onClick={() => setActiveTab('analyzer')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-purple rounded-lg shadow-sm hover:opacity-95 transition-opacity"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Analysis</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav strip */}
        <div className="lg:hidden border-t border-purple-100/70 bg-purple-50/50 px-2 py-1.5 overflow-x-auto flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-purple-100/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-[10px] opacity-80">({item.count})</span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Floating Toast Notifications */}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-2.5 p-3 rounded-xl shadow-lg border text-xs transition-all transform animate-in slide-in-from-right-4 ${
              toast.type === 'error'
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : toast.type === 'info'
                ? 'bg-purple-50 text-purple-900 border-purple-200'
                : 'bg-emerald-50 text-emerald-900 border-emerald-200'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 font-medium">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

