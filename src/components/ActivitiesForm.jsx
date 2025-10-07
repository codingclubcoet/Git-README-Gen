import React from 'react';

const ActivitiesForm = ({ formData, handleInputChange }) => {
  return (
    <div className="box">
      <h2 className="title is-4">Current Activities</h2>

      <div className="field">
        <label className="label">Currently Working On</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="currentlyWorking"
            value={formData.currentlyWorking}
            onChange={handleInputChange}
            placeholder="My awesome project"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Currently Learning</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="currentlyLearning"
            value={formData.currentlyLearning}
            onChange={handleInputChange}
            placeholder="React, Node.js, Docker"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Looking to Collaborate On</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="collaborateOn"
            value={formData.collaborateOn}
            onChange={handleInputChange}
            placeholder="Open source projects"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Ask Me About</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="askMeAbout"
            value={formData.askMeAbout}
            onChange={handleInputChange}
            placeholder="JavaScript, React, Web Development"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Fun Fact</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="funFact"
            value={formData.funFact}
            onChange={handleInputChange}
            placeholder="I code better with coffee"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesForm;