import React, { useState } from 'react';

const LanguageSelector = ({ currentLanguage, onLanguageChange, onTranslate, readme, isTranslating }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', native: 'Português' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', native: '中文' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺', native: 'Русский' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', native: 'العربية' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  const handleTranslate = () => {
    onTranslate(currentLanguage);
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-slate-800/50 hover:bg-slate-700/50 px-4 py-2 rounded-xl border border-slate-700 transition-all duration-200"
        >
          <span className="text-lg">{currentLang.flag}</span>
          <span className="text-white text-sm font-medium">{currentLang.name}</span>
          <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-slate-700 z-50">
              <div className="p-3 border-b border-slate-700">
                <h3 className="text-white font-semibold text-sm">Select Language</h3>
              </div>
              
              <div className="max-h-64 overflow-y-auto">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-all duration-200 ${
                      currentLanguage === lang.code
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{lang.name}</div>
                      <div className="text-xs text-slate-400">{lang.native}</div>
                    </div>
                    {currentLanguage === lang.code && (
                      <span className="text-blue-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Auto-translate Button */}
      {readme && currentLanguage !== 'en' && (
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTranslating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Translating...</span>
            </>
          ) : (
            <>
              <span>🌐</span>
              <span>Auto Translate</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default LanguageSelector;