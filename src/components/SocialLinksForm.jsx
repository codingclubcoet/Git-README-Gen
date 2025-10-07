import React from 'react';

const SocialLinksForm = ({ formData, handleInputChange }) => {
  return (
    <div className="box">
      <h2 className="title is-4">Social Links</h2>

      <div className="field">
        <label className="label">Portfolio/Website</label>
        <div className="control">
          <input
            className="input"
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">LinkedIn Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            placeholder="yourusername"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Twitter Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleInputChange}
            placeholder="yourusername"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinksForm;