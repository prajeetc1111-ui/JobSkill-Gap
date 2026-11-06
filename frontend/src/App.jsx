import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import JobDescriptionInput from './components/JobDescriptionInput';
import StudentSkillAssessment from './components/StudentSkillAssessment';
import SkillGapResults from './components/SkillGapResults';
import PriorityMatrix from './components/PriorityMatrix';
import LearningChecklist from './components/LearningChecklist';
import HistoryView from './components/HistoryView';
import ExportModal from './components/ExportModal';
import {
  Sparkles,
  Database,
  Layers,
  Heart,
  ExternalLink,
  Github,
  BookOpen,
} from 'lucide-react';

export default function App() {
  const { activeTab, dbInfo } = useApp();
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Top Navbar */}
      <Navbar onOpenExport={() => setExportOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Analytics Banner */}
        <StatsOverview />

        {/* Tab-driven Content Router */}
        {activeTab === 'analyzer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <JobDescriptionInput />
            </div>
            <div className="lg:col-span-5">
              <StudentSkillAssessment />
            </div>
          </div>
        )}

        {activeTab === 'gap-results' && <SkillGapResults />}

        {activeTab === 'priority-plan' && <PriorityMatrix />}

        {activeTab === 'checklist' && <LearningChecklist />}

        {activeTab === 'profile' && <StudentSkillAssessment />}

        {activeTab === 'history' && <HistoryView />}
      </main>

      {/* Export / Report Modal */}
      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} />

      {/* Modern SaaS Footer */}
      <footer className="mt-auto border-t border-purple-100 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-purple-700">JobSkill Gap</span>
            <span>—</span>
            <span>Automated Job Description Skill Mapper & Learning Roadmap Engine</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Database className="w-3.5 h-3.5 text-purple-600" />
              <span>DB Mode: <strong>{dbInfo.mode === 'mongodb' ? 'MongoDB (Mongoose)' : 'Local File Store'}</strong></span>
            </span>
            <span>•</span>
            <span>React + Vite + Express + Node</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

