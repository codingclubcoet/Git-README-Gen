import React, { useState } from 'react';
import BasicInfoForm from './components/BasicInfoForm';
import ActivitiesForm from './components/ActivitiesForm';
import SocialLinksForm from './components/SocialLinksForm';
import SkillsForm from './components/SkillsForm';
import GithubStatsForm from './components/GithubStatsForm';
import ReadmePreview from './components/ReadmePreview';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    about: '',
    location: '',
    portfolio: '',
    twitter: '',
    linkedin: '',
    email: '',
    skills: [],
    currentlyLearning: '',
    currentlyWorking: '',
    collaborateOn: '',
    askMeAbout: '',
    funFact: '',
    showStats: true,
    showStreak: true,
    showTopLangs: true,
    theme: 'radical'
  });

  const [readme, setReadme] = useState('');
  const [activeTab, setActiveTab] = useState('basic');
  const [isGenerating, setIsGenerating] = useState(false);

  const skillsList = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
    'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'Git', 'Linux', 'HTML', 'CSS', 'TailwindCSS',
    'SASS', 'Next.js', 'GraphQL', 'Firebase', 'Jenkins', 'GitHub Actions'
  ];

  const themes = [
    'radical', 'dark', 'tokyonight', 'dracula', 'monokai', 'gruvbox',
    'onedark', 'cobalt', 'synthwave', 'highcontrast', 'nightowl', 'vue'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const generateReadme = async () => {
    setIsGenerating(true);

    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    let markdown = '';

    // Header
    if (formData.name) {
      markdown += `# Hi there 👋, I'm ${formData.name}\n`;
    }

    if (formData.tagline) {
      markdown += `### ${formData.tagline}\n\n`;
    }

    // Banner
    markdown += `![Profile Banner](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=${encodeURIComponent(formData.name || 'Welcome')}&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient)\n\n`;

    // About section
    if (formData.about) {
      markdown += `## 🚀 About Me\n${formData.about}\n\n`;
    }

    // Current activities
    const activities = [];
    if (formData.currentlyWorking) {
      activities.push(`- 🔭 I'm currently working on **${formData.currentlyWorking}**`);
    }
    if (formData.currentlyLearning) {
      activities.push(`- 🌱 I'm currently learning **${formData.currentlyLearning}**`);
    }
    if (formData.collaborateOn) {
      activities.push(`- 👯 I'm looking to collaborate on **${formData.collaborateOn}**`);
    }
    if (formData.askMeAbout) {
      activities.push(`- 💬 Ask me about **${formData.askMeAbout}**`);
    }
    if (formData.funFact) {
      activities.push(`- ⚡ Fun fact: **${formData.funFact}**`);
    }

    if (activities.length > 0) {
      markdown += activities.join('\n') + '\n\n';
    }

    // Skills
    if (formData.skills.length > 0) {
      markdown += `## 🛠️ Skills & Technologies\n\n`;
      formData.skills.forEach(skill => {
        const skillLower = skill.toLowerCase().replace(/\./g, '').replace('#', 'sharp');
        markdown += `![${skill}](https://img.shields.io/badge/-${skill}-05122A?style=flat&logo=${skillLower}) `;
      });
      markdown += '\n\n';
    }

    // Social links
    const socials = [];
    if (formData.portfolio) {
      socials.push(`[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=About.me&logoColor=white)](${formData.portfolio})`);
    }
    if (formData.linkedin) {
      socials.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${formData.linkedin})`);
    }
    if (formData.twitter) {
      socials.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${formData.twitter})`);
    }
    if (formData.email) {
      socials.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${formData.email})`);
    }

    if (socials.length > 0) {
      markdown += `## 📫 Connect with Me\n\n`;
      markdown += socials.join(' ') + '\n\n';
    }

    // GitHub Stats
    markdown += `## 📊 GitHub Stats\n\n`;

    if (formData.showStats) {
      markdown += `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_GITHUB_USERNAME&show_icons=true&theme=${formData.theme}&hide_border=true&count_private=true)\n\n`;
    }

    if (formData.showStreak) {
      markdown += `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=YOUR_GITHUB_USERNAME&theme=${formData.theme}&hide_border=true)\n\n`;
    }

    if (formData.showTopLangs) {
      markdown += `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_GITHUB_USERNAME&layout=compact&theme=${formData.theme}&hide_border=true)\n\n`;
    }

    // Footer
    markdown += `---\n\n`;
    markdown += `<p align="center">\n  <img src="https://komarev.com/ghpvc/?username=YOUR_GITHUB_USERNAME&label=Profile%20views&color=0e75b6&style=flat" alt="profile views" />\n</p>\n\n`;
    markdown += `<p align="center">⭐️ From [YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)</p>`;

    setReadme(markdown);
    setIsGenerating(false);
    toast.success('README generated successfully!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(readme);
    toast.success('Copied to clipboard!');
  };

  const downloadReadme = () => {
    const blob = new Blob([readme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('README downloaded!');
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '👤' },
    { id: 'activities', label: 'Activities', icon: '🚀' },
    { id: 'social', label: 'Social Links', icon: '🔗' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'github', label: 'GitHub Stats', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid #334155'
          },
        }}
      />

      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl border-b border-white/10">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 py-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              GitHub README Generator
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Craft your perfect GitHub profile README with our intuitive generator.
              <span className="block text-slate-400 text-lg mt-2">Stand out from the crowd in minutes! ✨</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Enhanced Tab Navigation */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700/50 p-2">
              <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                      }`}
                  >
                    <span className="mr-2 text-sm">{tab.icon}</span>
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 font-medium">Form Progress</span>
                <span className="text-blue-400 font-bold">
                  {Math.round((Object.values(formData).filter(val =>
                    Array.isArray(val) ? val.length > 0 : val.toString().length > 0
                  ).length / Object.keys(formData).length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(Object.values(formData).filter(val =>
                      Array.isArray(val) ? val.length > 0 : val.toString().length > 0
                    ).length / Object.keys(formData).length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Form Sections */}
            <div className="space-y-6">
              {activeTab === 'basic' && (
                <BasicInfoForm formData={formData} handleInputChange={handleInputChange} />
              )}
              {activeTab === 'activities' && (
                <ActivitiesForm formData={formData} handleInputChange={handleInputChange} />
              )}
              {activeTab === 'social' && (
                <SocialLinksForm formData={formData} handleInputChange={handleInputChange} />
              )}
              {activeTab === 'skills' && (
                <SkillsForm formData={formData} toggleSkill={toggleSkill} skillsList={skillsList} />
              )}
              {activeTab === 'github' && (
                <GithubStatsForm formData={formData} handleInputChange={handleInputChange} themes={themes} />
              )}
            </div>

            {/* Enhanced Generate Button */}
            <button
              onClick={generateReadme}
              disabled={isGenerating}
              className={`w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-bold py-5 px-6 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${isGenerating ? 'animate-pulse' : ''
                }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating README...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-xl">✨</span>
                  <span className="text-lg">Generate README</span>
                  <span className="text-xl">🚀</span>
                </div>
              )}
            </button>
          </div>

          {/* Right Column - Preview */}
          <div className="xl:sticky xl:top-8">
            <ReadmePreview
              readme={readme}
              copyToClipboard={copyToClipboard}
              downloadReadme={downloadReadme}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-slate-500 text-sm">
            Made with ❤️ for the developer community •
            <span className="text-blue-400 ml-1">GitHub README Generator v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;