import React, { useState } from 'react';

const MultiLanguageReadme = ({ readme, onReadmeUpdate }) => {
  const [languageReadmes, setLanguageReadmes] = useState({});
  const [activeLanguage, setActiveLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' }
  ];

  // Auto-translate function
  const translateReadme = async (targetLang) => {
    if (!readme) return;
    
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(readme)}&langpair=en|${targetLang}`);
      const data = await response.json();
      
      if (data.responseData && data.responseData.translatedText) {
        setLanguageReadmes(prev => ({
          ...prev,
          [targetLang]: data.responseData.translatedText
        }));
        
        // If switching to this language, update the main readme
        if (activeLanguage === targetLang) {
          onReadmeUpdate(data.responseData.translatedText);
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again.');
    }
  };

  const switchLanguage = (langCode) => {
    setActiveLanguage(langCode);
    
    // If we have a translated version, use it
    if (languageReadmes[langCode]) {
      onReadmeUpdate(languageReadmes[langCode]);
    } else if (langCode !== 'en') {
      // Auto-translate if not English and not already translated
      translateReadme(langCode);
    } else {
      // Switch back to original English
      onReadmeUpdate(readme);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <span className="mr-3">🌍</span>
          Multi-Language README
        </h3>
        
        <div className="text-sm text-slate-400">
          {Object.keys(languageReadmes).length} languages saved
        </div>
      </div>

      {/* Language Tabs */}
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
              activeLanguage === lang.code
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'bg-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-600/50'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
            {languageReadmes[lang.code] && (
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Translation Status */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
        {languages.map(lang => (
          <div
            key={lang.code}
            className={`p-2 rounded-lg border transition-all duration-200 cursor-pointer ${
              languageReadmes[lang.code]
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-slate-700/30 border-slate-600 text-slate-500'
            }`}
            onClick={() => switchLanguage(lang.code)}
          >
            <div className="text-lg mb-1">{lang.flag}</div>
            <div className="text-xs font-medium">
              {languageReadmes[lang.code] ? 'Translated' : 'Not translated'}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-3 mt-4 pt-4 border-t border-slate-700">
        <button
          onClick={() => {
            languages.forEach(lang => {
              if (lang.code !== 'en' && !languageReadmes[lang.code]) {
                translateReadme(lang.code);
              }
            });
          }}
          className="flex-1 py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>⚡</span>
          <span className="text-sm">Translate All</span>
        </button>
        
        <button
          onClick={() => {
            setLanguageReadmes({});
            setActiveLanguage('en');
            onReadmeUpdate(readme);
          }}
          className="flex-1 py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <span>🗑️</span>
          <span className="text-sm">Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default MultiLanguageReadme;