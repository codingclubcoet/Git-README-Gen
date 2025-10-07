import React from 'react';

const GithubStatsForm = ({ formData, handleInputChange, themes }) => {
  const statsOptions = [
    {
      name: 'showStats',
      label: 'GitHub Stats',
      description: 'Display your GitHub statistics including stars, commits, and PRs',
      icon: '📈',
      enabled: formData.showStats
    },
    {
      name: 'showStreak',
      label: 'GitHub Streak',
      description: 'Show your contribution streak and total contributions',
      icon: '🔥',
      enabled: formData.showStreak
    },
    {
      name: 'showTopLangs',
      label: 'Top Languages',
      description: 'Display your most used programming languages',
      icon: '💻',
      enabled: formData.showTopLangs
    }
  ];

  const themeGroups = {
    'Dark Themes': ['radical', 'dark', 'dracula', 'tokyonight', 'monokai'],
    'Colorful Themes': ['vue', 'synthwave', 'cobalt', 'gruvbox'],
    'Light Themes': ['onedark', 'nightowl', 'highcontrast']
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 transition-all duration-300 hover:border-slate-600/50">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-xl">📊</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">GitHub Stats</h2>
          <p className="text-slate-400">Customize your GitHub statistics display</p>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-lg font-semibold text-white">
            Stats Theme
          </label>
          <div className="px-3 py-1 bg-slate-700/50 rounded-full">
            <span className="text-slate-300 text-sm font-medium">Current: {formData.theme}</span>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(themeGroups).map(([groupName, groupThemes]) => (
            <div key={groupName}>
              <h4 className="text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">
                {groupName}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {groupThemes.map(theme => (
                  <button
                    key={theme}
                    onClick={() => handleInputChange({
                      target: { name: 'theme', value: theme }
                    })}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      formData.theme === theme
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 border-transparent text-white shadow-lg'
                        : 'bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-sm font-medium mb-1">{theme}</div>
                      <div className="text-xs opacity-70 capitalize">
                        {theme === formData.theme ? 'Selected' : 'Select'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Theme Preview */}
        
      </div>

      {/* Stats Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Display Options</h3>
        
        {statsOptions.map((option, index) => (
          <div 
            key={option.name}
            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${
              option.enabled
                ? 'bg-green-500/10 border-green-500/50 shadow-lg shadow-green-500/10'
                : 'bg-slate-900/50 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  option.enabled 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  <span className="text-lg">{option.icon}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">{option.label}</span>
                    {option.enabled && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm mt-1">{option.description}</p>
                </div>
              </div>
              
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name={option.name}
                  checked={option.enabled}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className={`w-12 h-6 rounded-full transition-all duration-300 ${
                  option.enabled ? 'bg-green-500' : 'bg-slate-700'
                } peer-focus:ring-2 peer-focus:ring-green-500/50`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                    option.enabled ? 'transform translate-x-7' : 'transform translate-x-1'
                  }`} />
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Preview */}
      <div className="mt-8 p-6 bg-slate-900/30 rounded-2xl border border-slate-700">
        <h4 className="text-white font-semibold mb-4 flex items-center">
          <span className="text-yellow-400 mr-2">👀</span>
          Live Preview Configuration
        </h4>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span className="text-slate-400">GitHub Stats</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              formData.showStats ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {formData.showStats ? 'Visible' : 'Hidden'}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-slate-700">
            <span className="text-slate-400">Contribution Streak</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              formData.showStreak ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {formData.showStreak ? 'Visible' : 'Hidden'}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-400">Top Languages</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              formData.showTopLangs ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {formData.showTopLangs ? 'Visible' : 'Hidden'}
            </span>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <span className="text-blue-400 text-sm">💡</span>
            <p className="text-blue-300 text-xs">
              All stats will automatically use the <strong>{formData.theme}</strong> theme
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="mt-6 flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
        <div className="text-slate-300">
          <div className="font-semibold">Active Features</div>
          <div className="text-sm text-slate-400">
            {statsOptions.filter(opt => opt.enabled).length} of {statsOptions.length} enabled
          </div>
        </div>
        <div className="text-right">
          <div className="text-orange-400 font-bold text-lg">{formData.theme}</div>
          <div className="text-xs text-slate-400">Selected Theme</div>
        </div>
      </div>
    </div>
  );
};

export default GithubStatsForm;