import React, { useState, useEffect } from 'react';
import BasicInfoForm from './components/BasicInfoForm';
import ActivitiesForm from './components/ActivitiesForm';
import SocialLinksForm from './components/SocialLinksForm';
import SkillsForm from './components/SkillsForm';
import GithubStatsForm from './components/GithubStatsForm';
import ReadmePreview from './components/ReadmePreview';
import './App.css';

function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

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
  const [copied, setCopied] = useState(false);

  const skillsList = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust',
    'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Docker', 'Kubernetes',
    'AWS', 'Azure', 'GCP', 'Git', 'Linux', 'HTML', 'CSS', 'TailwindCSS'
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

  const generateReadme = () => {
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
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(readme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReadme = () => {
    const blob = new Blob([readme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <section className="hero is-info is-bold">
        <div className="hero-body">
          <p className="title">GitHub Profile README Generator</p>
          <p className="subtitle">Create an awesome GitHub profile README in minutes!</p>
        </div>
      </section>

      <div className="columns" style={{ marginTop: '2rem' }}>
        <div className="column is-6">
          <BasicInfoForm formData={formData} handleInputChange={handleInputChange} />
          <ActivitiesForm formData={formData} handleInputChange={handleInputChange} />
          <SocialLinksForm formData={formData} handleInputChange={handleInputChange} />
          <SkillsForm formData={formData} toggleSkill={toggleSkill} skillsList={skillsList} />
          <GithubStatsForm formData={formData} handleInputChange={handleInputChange} themes={themes} />
          
          <button className="button is-success is-fullwidth is-large" onClick={generateReadme}>
            Generate README
          </button>
        </div>

        <div className="column is-6">
          <ReadmePreview 
            readme={readme}
            copied={copied}
            copyToClipboard={copyToClipboard}
            downloadReadme={downloadReadme}
          />
        </div>
      </div>
    </div>
  );
}

export default App;