import React from 'react';

const BasicInfoForm = ({ formData, handleInputChange }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 transition-all duration-300 hover:border-slate-600/50">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-xl">👤</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Basic Information</h2>
          <p className="text-slate-400">Tell us about yourself</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="group">
          <label className="block text-sm font-semibold text-slate-300 mb-3 group-hover:text-white transition-colors">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            className="w-full px-4 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm hover:border-slate-600"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-slate-300 mb-3 group-hover:text-white transition-colors">
            Professional Tagline
          </label>
          <input
            className="w-full px-4 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm hover:border-slate-600"
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleInputChange}
            placeholder="Full Stack Developer & Open Source Enthusiast"
          />
          <p className="text-xs text-slate-500 mt-2">This appears below your name as a brief introduction</p>
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-slate-300 mb-3 group-hover:text-white transition-colors">
            About Me
          </label>
          <textarea
            className="w-full px-4 py-4 bg-slate-900/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-white placeholder-slate-500 backdrop-blur-sm hover:border-slate-600 resize-none"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="I'm a passionate developer who loves building amazing web applications. With expertise in modern technologies, I enjoy solving complex problems and creating user-friendly solutions..."
            rows="5"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>Share your story and passion</span>
            <span>{formData.about.length}/500</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;