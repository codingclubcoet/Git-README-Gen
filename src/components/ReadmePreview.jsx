import React, { useState } from 'react';
import { marked } from 'marked';

const ReadmePreview = ({ readme, copyToClipboard, downloadReadme }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState('preview'); // 'preview' or 'source'

  const handleCopy = () => {
    copyToClipboard();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Configure marked options for GitHub-style rendering
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  const renderMarkdown = () => {
    return { __html: marked(readme) };
  };

  const previewTabs = [
    { id: 'preview', label: 'Rendered Preview', icon: '👁️' },
    { id: 'source', label: 'Markdown Source', icon: '📄' },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-8 transition-all duration-300 hover:border-slate-600/50 xl:sticky xl:top-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
            <span className="text-xl">👁️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">README Preview</h2>
            <p className="text-slate-400">Real-time preview of your GitHub profile</p>
          </div>
        </div>
        
        {/* Preview Type Tabs */}
        {readme && (
          <div className="bg-slate-900/50 rounded-lg p-1 border border-slate-700">
            <div className="flex space-x-1">
              {previewTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id)}
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 whitespace-nowrap text-sm ${
                    activePreviewTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {readme ? (
        <>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={handleCopy}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 ${
                isCopied 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-blue-500/25'
              }`}
            >
              {isCopied ? (
                <>
                  <span className="text-lg">✓</span>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <span className="text-lg">📋</span>
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
            
            <button
              onClick={downloadReadme}
              className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-3"
            >
              <span className="text-lg">💾</span>
              <span>Download README.md</span>
            </button>
          </div>

          {/* Preview Container */}
          <div className="bg-slate-900/80 border-2 border-slate-700 rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-slate-600">
            {/* File Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/50">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-slate-400 text-sm font-mono">
                  {activePreviewTab === 'source' ? 'README.md' : 'README Preview'}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {activePreviewTab === 'source' ? `${readme.length} chars` : 'GitHub Style'}
              </div>
            </div>
            
            {/* Content Area */}
            <div className="max-h-[500px] overflow-auto">
              {activePreviewTab === 'source' ? (
                // Markdown Source View
                <pre className="text-slate-200 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words p-6">
                  {readme}
                </pre>
              ) : (
                // Rendered Markdown Preview
                <div 
                  className="markdown-preview p-6 text-slate-200 prose prose-invert prose-headings:text-slate-100 prose-p:text-slate-300 prose-strong:text-slate-100 prose-em:text-slate-300 prose-code:text-slate-200 prose-pre:bg-slate-800 prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none"
                  dangerouslySetInnerHTML={renderMarkdown()}
                />
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-4 gap-3 text-center">
            <div className="bg-slate-900/30 rounded-lg p-3 border border-slate-700">
              <div className="text-xl font-bold text-cyan-400">{readme.split('\n').length}</div>
              <div className="text-xs text-slate-400 mt-1">Lines</div>
            </div>
            <div className="bg-slate-900/30 rounded-lg p-3 border border-slate-700">
              <div className="text-xl font-bold text-purple-400">{readme.split(' ').length}</div>
              <div className="text-xs text-slate-400 mt-1">Words</div>
            </div>
            <div className="bg-slate-900/30 rounded-lg p-3 border border-slate-700">
              <div className="text-xl font-bold text-green-400">{readme.length}</div>
              <div className="text-xs text-slate-400 mt-1">Chars</div>
            </div>
            <div className="bg-slate-900/30 rounded-lg p-3 border border-slate-700">
              <div className="text-xl font-bold text-orange-400">
                {activePreviewTab === 'preview' ? '👁️' : '📄'}
              </div>
              <div className="text-xs text-slate-400 mt-1">View</div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-400 text-sm">⚠️</span>
              </div>
              <div>
                <h4 className="text-amber-300 font-semibold mb-1">Important Notice</h4>
                <p className="text-amber-200/80 text-sm">
                  Replace all instances of <code className="bg-amber-500/20 px-2 py-1 rounded text-amber-300 font-mono text-xs">YOUR_GITHUB_USERNAME</code> with your actual GitHub username in the generated README!
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-2xl p-12 text-center backdrop-blur-sm transition-all duration-300 hover:border-slate-600">
          <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">📝</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">No README Generated Yet</h3>
          <p className="text-slate-400 leading-relaxed max-w-md mx-auto">
            Fill in the form sections and click "Generate README" to create your amazing GitHub profile README. Your preview will appear here!
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadmePreview;