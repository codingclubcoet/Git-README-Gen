import React, { useState } from 'react';

const SkillsForm = ({ formData, toggleSkill, skillsList }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = skillsList.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = {
    'Languages': skillsList.filter(skill => 
      ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust'].includes(skill)
    ),
    'Frontend': skillsList.filter(skill => 
      ['React', 'Vue', 'Angular', 'HTML', 'CSS', 'TailwindCSS', 'SASS', 'Next.js'].includes(skill)
    ),
    'Backend': skillsList.filter(skill => 
      ['Node.js', 'Express', 'Django', 'Flask', 'GraphQL'].includes(skill)
    ),
    'Databases': skillsList.filter(skill => 
      ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'].includes(skill)
    ),
    'DevOps & Tools': skillsList.filter(skill => 
      ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'Linux', 'Jenkins', 'GitHub Actions'].includes(skill)
    )
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 transition-all duration-300 hover:border-slate-600/50">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-xl">🛠️</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Skills & Technologies</h2>
          <p className="text-slate-400">Select your expertise areas</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">
            🔍
          </div>
        </div>
      </div>

      {/* Selected Skills Counter */}
      <div className="flex items-center justify-between mb-6 p-4 bg-slate-900/30 rounded-xl border border-slate-700">
        <span className="text-slate-300 font-medium">Selected Skills</span>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-400">{formData.skills.length}</span>
          <span className="text-slate-500">/ {skillsList.length}</span>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6 max-h-96 overflow-y-auto pr-2 skills-scroll">
        {searchTerm ? (
          // Search Results
          <div>
            <h3 className="text-lg font-semibold text-slate-300 mb-4">Search Results</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    formData.skills.includes(skill)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg'
                      : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="font-medium text-sm">{skill}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          // Categorized Skills
          Object.entries(categories).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      formData.skills.includes(skill)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white shadow-lg'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="font-medium text-sm">{skill}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-3 mt-6 pt-6 border-t border-slate-700">
        <button
          onClick={() => setSearchTerm('')}
          className="flex-1 py-2 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors duration-200"
        >
          Clear Search
        </button>
        <button
          onClick={() => formData.skills.length > 0 && setFormData(prev => ({ ...prev, skills: [] }))}
          className="flex-1 py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default SkillsForm;