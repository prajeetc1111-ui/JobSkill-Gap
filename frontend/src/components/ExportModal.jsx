import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Download, Copy, Printer, Check, FileText } from 'lucide-react';

export default function ExportModal({ isOpen, onClose }) {
  const { currentAnalysis, currentPlan, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !currentAnalysis) return null;

  const exportPayload = {
    metadata: {
      generatedAt: new Date().toISOString(),
      appName: 'JobSkill Gap – Job Description Skill Mapper',
    },
    analysis: currentAnalysis,
    plan: currentPlan,
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);

  const handleDownloadJSON = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jobskill-gap-${(currentAnalysis.title || 'report')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported JSON successfully!', 'success');
  };

  const handleCopyMarkdown = () => {
    const matching = currentAnalysis.breakdown?.matching || [];
    const weak = currentAnalysis.breakdown?.weak || [];
    const missing = currentAnalysis.breakdown?.missing || [];

    const md = `# JobSkill Gap Assessment Report
**Role:** ${currentAnalysis.title}
**Company:** ${currentAnalysis.company}
**Match Score:** ${currentAnalysis.matchScore}% (${currentAnalysis.readinessLevel})
**Candidate:** ${currentAnalysis.studentName || 'Student'}

## 1. Matching Skills (${matching.length})
${matching.map((s) => `- **${s.name}**: ${s.studentLevel} (Required: ${s.requiredLevel})`).join('\n')}

## 2. Weak Skills / Need Proficiency Upgrade (${weak.length})
${weak.map((s) => `- **${s.name}**: Current ${s.studentLevel} -> Job requires ${s.requiredLevel}`).join('\n')}

## 3. Missing Skills (${missing.length})
${missing.map((s) => `- **${s.name}** (${s.importance} priority, Category: ${s.category})`).join('\n')}

## 4. Prioritized Learning Roadmap
${(currentPlan?.items || [])
  .map(
    (item, idx) =>
      `${idx + 1}. **${item.skillName}** [${item.priority}] - Est. ${item.estimatedHours} hrs - Status: ${item.status}`
  )
  .join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    showToast('Markdown summary copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900">
              Export Skill Gap & Learning Report
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
          <button
            onClick={handleDownloadJSON}
            className="flex items-center justify-center gap-2 p-3 rounded-xl border border-purple-200 bg-purple-50 text-purple-900 font-semibold text-xs hover:bg-purple-100 transition-colors"
          >
            <Download className="w-4 h-4 text-purple-600" /> Download JSON
          </button>
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold text-xs hover:bg-slate-50 transition-colors shadow-xs"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-slate-600" />
            )}
            {copied ? 'Copied Markdown' : 'Copy Markdown'}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold text-xs hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4 text-slate-600" /> Print / Save PDF
          </button>
        </div>

        {/* JSON Preview */}
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-600 mb-1">
            Raw Payload Preview
          </label>
          <pre className="bg-slate-900 text-purple-200 p-4 rounded-xl text-[11px] font-mono h-64 overflow-y-auto leading-relaxed">
            {jsonString}
          </pre>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

