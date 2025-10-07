import React from 'react';

const BasicInfoForm = ({ formData, handleInputChange }) => {
  return (
    <div className="box">
      <h2 className="title is-4">Basic Information</h2>
      
      <div className="field">
        <label className="label">Your Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Tagline</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleInputChange}
            placeholder="A passionate developer from Earth"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">About Me</label>
        <div className="control">
          <textarea
            className="textarea"
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Tell us about yourself..."
            rows="3"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;