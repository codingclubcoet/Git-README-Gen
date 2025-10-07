import React from 'react';

const ActivitiesForm = ({ formData, handleInputChange }) => {
  const activityFields = [
    {
      name: 'currentlyWorking',
      label: 'Currently Working On',
      placeholder: 'My awesome project',
      icon: '🔭',
      description: 'What project are you currently focused on?',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      name: 'currentlyLearning',
      label: 'Currently Learning',
      placeholder: 'React, Node.js, Docker, Machine Learning',
      icon: '🌱',
      description: 'What technologies or skills are you learning?',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'collaborateOn',
      label: 'Looking to Collaborate On',
      placeholder: 'Open source projects, Web3 applications, AI projects',
      icon: '👯',
      description: 'What type of projects interest you for collaboration?',
      color: 'from-purple-500 to-pink-600'
    },
    {
      name: 'askMeAbout',
      label: 'Ask Me About',
      placeholder: 'JavaScript, React, Web Development, Career advice',
      icon: '💬',
      description: 'What topics can you help others with?',
      color: 'from-orange-500 to-red-600'
    },
    {
      name: 'funFact',
      label: 'Fun Fact',
      placeholder: 'I can solve a Rubik\'s cube in under 2 minutes!',
      icon: '⚡',
      description: 'Share something interesting about yourself',
      color: 'from-yellow-500 to-amber-600'
    }
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 transition-all duration-300 hover:border-slate-600/50">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-xl">🚀</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Current Activities</h2>
          <p className="text-slate-400">Share what you're working on and interested in</p>
        </div>
      </div>

      <div className="space-y-6">
        {activityFields.map((field, index) => (
          <div 
            key={field.name}
            className="group relative"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-r ${field.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-lg">{field.icon}</span>
              </div>

              {/* Input Field */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {field.label}
                  </label>
                  {formData[field.name] && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-medium">Filled</span>
                    </div>
                  )}
                </div>

                <input
                  className={`w-full px-4 py-4 bg-slate-900/50 border rounded-xl focus:ring-2 focus:border-transparent transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm ${
                    formData[field.name] 
                      ? 'border-green-500/50 focus:ring-green-500 hover:border-green-400/50' 
                      : 'border-slate-700 focus:ring-blue-500 hover:border-slate-600'
                  }`}
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                />

                <p className="text-xs text-slate-500 mt-2 flex items-center">
                  <span className="w-1 h-1 bg-slate-500 rounded-full mr-2"></span>
                  {field.description}
                </p>

                {/* Character counter for longer inputs */}
                {formData[field.name] && (
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-slate-500">
                      {formData[field.name].length} characters
                    </div>
                    {formData[field.name].length > 100 && (
                      <div className="text-xs text-amber-400 flex items-center">
                        <span>💡</span>
                        <span className="ml-1">Consider being concise</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Progress indicator line */}
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`w-full bg-gradient-to-b ${field.color} transition-all duration-500 ${
                  formData[field.name] ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ 
                  height: formData[field.name] ? '100%' : '0%'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Completion Status */}
      <div className="mt-8 pt-6 border-t border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-300 font-medium">Section Completion</span>
          <span className="text-blue-400 font-bold">
            {Math.round((activityFields.filter(field => formData[field.name].length > 0).length / activityFields.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(activityFields.filter(field => formData[field.name].length > 0).length / activityFields.length) * 100}%`
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500 mt-2">
          <span>{activityFields.filter(field => formData[field.name].length > 0).length} of {activityFields.length} fields filled</span>
          <span>✨ Complete all for best results</span>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl backdrop-blur-sm">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-blue-400 text-sm">💡</span>
          </div>
          <div>
            <h4 className="text-blue-300 font-semibold mb-2">Pro Tips</h4>
            <ul className="text-blue-200/80 text-sm space-y-1">
              <li>• Be specific about technologies and project types</li>
              <li>• Mention your learning goals and interests</li>
              <li>• Highlight unique skills or experiences</li>
              <li>• Keep it professional but show personality</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesForm;