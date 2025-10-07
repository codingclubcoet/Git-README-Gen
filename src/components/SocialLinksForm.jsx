import React from 'react';

const SocialLinksForm = ({ formData, handleInputChange }) => {
  const socialPlatforms = [
    {
      name: 'portfolio',
      label: 'Portfolio Website',
      placeholder: 'https://yourportfolio.com',
      icon: '🌐',
      prefix: '',
      color: 'from-purple-500 to-pink-600',
      description: 'Your personal website or portfolio',
      validation: 'url'
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      placeholder: 'yourusername',
      icon: '💼',
      prefix: 'linkedin.com/in/',
      color: 'from-blue-600 to-blue-800',
      description: 'Your LinkedIn profile username',
      validation: 'text'
    },
    {
      name: 'twitter',
      label: 'Twitter / X',
      placeholder: 'yourusername',
      icon: '🐦',
      prefix: 'twitter.com/',
      color: 'from-sky-500 to-blue-600',
      description: 'Your Twitter/X username',
      validation: 'text'
    },
    {
      name: 'email',
      label: 'Email Address',
      placeholder: 'your.email@example.com',
      icon: '📧',
      prefix: 'mailto:',
      color: 'from-red-500 to-orange-600',
      description: 'Your professional email address',
      validation: 'email'
    }
  ];

  const getFullUrl = (platform, value) => {
    if (!value) return '';
    
    switch (platform.name) {
      case 'portfolio':
        return value;
      case 'linkedin':
        return `https://linkedin.com/in/${value}`;
      case 'twitter':
        return `https://twitter.com/${value}`;
      case 'email':
        return `mailto:${value}`;
      default:
        return value;
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getValidationState = (platform, value) => {
    if (!value) return 'empty';
    
    switch (platform.validation) {
      case 'url':
        return isValidUrl(value) ? 'valid' : 'invalid';
      case 'email':
        return isValidEmail(value) ? 'valid' : 'invalid';
      default:
        return value.length > 0 ? 'valid' : 'empty';
    }
  };

  const filledCount = socialPlatforms.filter(platform => formData[platform.name].length > 0).length;

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 transition-all duration-300 hover:border-slate-600/50">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-xl">🔗</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Social Links</h2>
          <p className="text-slate-400">Connect with your audience across platforms</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8 p-4 bg-slate-900/30 rounded-xl border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-300 font-medium">Links Added</span>
          <span className="text-green-400 font-bold">
            {filledCount} of {socialPlatforms.length}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(filledCount / socialPlatforms.length) * 100}%`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>Add more links for better connectivity</span>
          <span>{Math.round((filledCount / socialPlatforms.length) * 100)}% complete</span>
        </div>
      </div>

      {/* Social Platform Inputs */}
      <div className="space-y-6">
        {socialPlatforms.map((platform, index) => {
          const value = formData[platform.name];
          const validationState = getValidationState(platform, value);
          const fullUrl = getFullUrl(platform, value);
          
          return (
            <div 
              key={platform.name}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-4">
                {/* Platform Icon */}
                <div className={`w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-lg">{platform.icon}</span>
                </div>

                {/* Input Field */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                      {platform.label}
                    </label>
                    <div className="flex items-center space-x-2">
                      {validationState === 'valid' && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full font-medium flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                          Valid
                        </span>
                      )}
                      {validationState === 'invalid' && (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1"></span>
                          Invalid
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    {platform.prefix && platform.name !== 'email' && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                        {platform.prefix}
                      </div>
                    )}
                    <input
                      className={`w-full pl-${platform.prefix && platform.name !== 'email' ? '24' : '4'} pr-4 py-4 bg-slate-900/50 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm ${
                        validationState === 'valid' 
                          ? 'border-green-500/50 focus:ring-green-500 hover:border-green-400/50' 
                          : validationState === 'invalid'
                          ? 'border-red-500/50 focus:ring-red-500 hover:border-red-400/50'
                          : 'border-slate-700 focus:ring-blue-500 hover:border-slate-600'
                      }`}
                      type={platform.validation}
                      name={platform.name}
                      value={value}
                      onChange={handleInputChange}
                      placeholder={platform.placeholder}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-slate-500 flex items-center">
                      <span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span>
                      {platform.description}
                    </p>
                    {fullUrl && validationState === 'valid' && (
                      <a 
                        href={fullUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                      >
                        Test Link ↗
                      </a>
                    )}
                  </div>

                  {/* Preview URL */}
                  {fullUrl && validationState === 'valid' && (
                    <div className="mt-2 p-2 bg-slate-900/50 rounded-lg border border-slate-700">
                      <div className="text-xs text-slate-400 font-mono truncate">
                        {fullUrl}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Connection Line */}
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`w-full bg-gradient-to-b ${platform.color} transition-all duration-500 ${
                    validationState === 'valid' ? 'opacity-100' : 'opacity-30'
                  }`}
                  style={{ 
                    height: value ? '100%' : '0%'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex space-x-3">
          <button
            onClick={() => {
              socialPlatforms.forEach(platform => {
                if (formData[platform.name]) {
                  handleInputChange({
                    target: { name: platform.name, value: '' }
                  });
                }
              });
            }}
            className="flex-1 py-3 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>🗑️</span>
            <span>Clear All</span>
          </button>
          
          <div className="flex-1 py-3 px-4 bg-slate-700/50 rounded-xl border border-slate-600">
            <div className="text-center text-slate-300 text-sm">
              <div className="font-semibold">{filledCount} Links</div>
              <div className="text-slate-500 text-xs">Added</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-400 text-sm">💡</span>
          </div>
          <div>
            <h4 className="text-blue-300 font-semibold mb-2">Best Practices</h4>
            <ul className="text-blue-200/80 text-sm space-y-1">
              <li>• Use your professional portfolio website</li>
              <li>• Ensure all links are active and up-to-date</li>
              <li>• Use consistent usernames across platforms</li>
              <li>• Include at least 2-3 contact methods</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Preview Badges */}
      {filledCount > 0 && (
        <div className="mt-6 p-4 bg-slate-900/30 rounded-xl border border-slate-700">
          <h4 className="text-white font-semibold mb-3 flex items-center">
            <span className="text-green-400 mr-2">🛡️</span>
            README Badges Preview
          </h4>
          <div className="flex flex-wrap gap-2">
            {socialPlatforms
              .filter(platform => formData[platform.name] && getValidationState(platform, formData[platform.name]) === 'valid')
              .map(platform => (
                <div 
                  key={platform.name}
                  className="px-3 py-2 bg-slate-800 rounded-lg border border-slate-700 flex items-center space-x-2"
                >
                  <span className="text-sm">{platform.icon}</span>
                  <span className="text-slate-300 text-sm font-medium">{platform.label}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinksForm;