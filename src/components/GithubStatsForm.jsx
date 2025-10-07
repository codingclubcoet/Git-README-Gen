import React from 'react';

const GithubStatsForm = ({ formData, handleInputChange, themes }) => {
  return (
    <div className="box">
      <h2 className="title is-4">GitHub Stats Options</h2>

      <div className="field">
        <label className="label">Theme</label>
        <div className="control">
          <div className="select is-fullwidth">
            <select name="theme" value={formData.theme} onChange={handleInputChange}>
              {themes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            name="showStats"
            checked={formData.showStats}
            onChange={handleInputChange}
          />
          {' '}Show GitHub Stats
        </label>
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            name="showStreak"
            checked={formData.showStreak}
            onChange={handleInputChange}
          />
          {' '}Show GitHub Streak
        </label>
      </div>

      <div className="field">
        <label className="checkbox">
          <input
            type="checkbox"
            name="showTopLangs"
            checked={formData.showTopLangs}
            onChange={handleInputChange}
          />
          {' '}Show Top Languages
        </label>
      </div>
    </div>
  );
};

export default GithubStatsForm;