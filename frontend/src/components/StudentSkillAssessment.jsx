import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  Plus,
  Trash2,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle,
  Save,
  Search,
  Filter,
} from 'lucide-react';

const COMMON_SKILLS = [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Python',
  'HTML5',
  'CSS3',
  'Git',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Tailwind CSS',
  'Express.js',
  'Problem Solving',
];

export default function StudentSkillAssessment() {
  const {
    studentProfile,
    saveStudentProfile,
    addStudentSkill,
    removeStudentSkill,
    sampleProfiles,
    loadStudentPersona,
    taxonomy,
    showToast,
  } = useApp();

  const [name, setName] = useState(studentProfile.studentName || 'Alex Rivera');
  const [targetRole, setTargetRole] = useState(studentProfile.targetRole || 'Full Stack Engineer');
  const [email, setEmail] = useState(studentProfile.email || 'alex.rivera@example.com');

  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState('Intermediate');
  const [skillCategory, setSkillCategory] = useState('Frontend');
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const skills = studentProfile.skills || [];

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await saveStudentProfile({
        studentName: name,
        targetRole,
        email,
        skills,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    await addStudentSkill({
      name: skillName.trim(),
      level: skillLevel,
      category: skillCategory,
    });
    setSkillName('');
  };

  const handleQuickAdd = async (skill) => {
    const exists = skills.some((s) => s.name.toLowerCase() === skill.toLowerCase());
    if (exists) {
      showToast(`"${skill}" is already in your skills profile.`, 'info');
      return;
    }
    await addStudentSkill({
      name: skill,
      level: 'Intermediate',
      category: 'General',
    });
  };

  const handleLevelChange = async (skillItem, newLevel) => {
    await addStudentSkill({
      ...skillItem,
      level: newLevel,
    });
  };

  const filteredSkills = skills.filter((item) => {
    const matchesCat = filterCategory === 'All' || item.category === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getLevelBadge = (level) => {
    switch (level) {
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Intermediate':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Beginner':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Sample Student Profiles Bar */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="text-sm font-bold text-slate-800">
              Load Sample Student Personas
            </h3>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Click to simulate different skill backgrounds
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleProfiles.map((persona, idx) => (
            <button
              key={idx}
              onClick={() => loadStudentPersona(persona)}
              className="text-left p-3 rounded-xl border border-purple-100 bg-purple-50/40 hover:bg-purple-100/60 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-purple-900 group-hover:text-purple-700">
                  {persona.studentName}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-200 text-purple-800 font-semibold">
                  {persona.skills?.length || 0} skills
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{persona.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{persona.targetRole}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Info & Add Skill Form */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Details Card */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
            <div className="flex items-center gap-2 mb-4">
              <UserCheck className="w-5 h-5 text-purple-600" />
              <h3 className="text-base font-bold text-slate-800">Student Profile</h3>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Career Role
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-purple rounded-xl shadow-sm hover:opacity-95 transition-opacity"
              >
                <Save className="w-3.5 h-3.5" />
                {isSaving ? 'Saving...' : 'Save Profile Details'}
              </button>
            </form>
          </div>

          {/* Add New Skill Form */}
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-purple-600" /> Add Existing Skill
            </h3>

            <form onSubmit={handleAddSkill} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. React, PostgreSQL, Python"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Proficiency Level
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSkillLevel(lvl)}
                      className={`py-1.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                        skillLevel === lvl
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Programming Languages">Programming Languages</option>
                  <option value="Database">Database</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                  <option value="DevOps & Tools">DevOps & Tools</option>
                  <option value="Data & AI">Data & AI</option>
                  <option value="Testing">Testing</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Security">Security</option>
                  <option value="Soft Skills">Soft Skills</option>
                  <option value="General">General</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!skillName.trim()}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" /> Add to My Skills
              </button>
            </form>
          </div>

          {/* Common Skills Quick-Pills */}
          <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-soft">
            <h4 className="text-xs font-bold text-slate-700 mb-2.5">
              1-Click Add Common Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SKILLS.map((skill) => {
                const alreadyHas = skills.some(
                  (s) => s.name.toLowerCase() === skill.toLowerCase()
                );
                return (
                  <button
                    key={skill}
                    onClick={() => handleQuickAdd(skill)}
                    disabled={alreadyHas}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      alreadyHas
                        ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-default'
                        : 'bg-purple-50/70 hover:bg-purple-100 text-purple-800 border-purple-200'
                    }`}
                  >
                    {alreadyHas ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Existing Skills Grid & Proficiency Control */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-soft">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Assessed Skills ({skills.length} Total)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Adjust proficiency ratings dynamically. These will be compared against job requirements.
                </p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search skills..."
                    className="text-xs pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Programming Languages">Languages</option>
                  <option value="Database">Database</option>
                  <option value="DevOps & Cloud">DevOps</option>
                  <option value="Soft Skills">Soft Skills</option>
                </select>
              </div>
            </div>

            {skills.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-xl">
                <Award className="w-10 h-10 text-purple-300 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700">No skills assessed yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                  Add your skills using the form on the left, or load one of the preset student profiles above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[560px] overflow-y-auto pr-1">
                {filteredSkills.map((item) => (
                  <div
                    key={item.name}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-purple-200 transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                        <span className="text-[10px] text-slate-500">{item.category || 'General'}</span>
                      </div>
                      <button
                        onClick={() => removeStudentSkill(item.name)}
                        className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                        title="Remove skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500">Proficiency:</span>
                      <div className="flex items-center gap-1">
                        {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => {
                          const isCurrent = item.level === lvl;
                          return (
                            <button
                              key={lvl}
                              onClick={() => handleLevelChange(item, lvl)}
                              className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-all ${
                                isCurrent
                                  ? 'bg-purple-600 text-white shadow-xs'
                                  : 'text-slate-500 hover:bg-slate-100'
                              }`}
                            >
                              {lvl[0]}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

