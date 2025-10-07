import React from 'react';

const SkillsForm = ({ formData, toggleSkill, skillsList }) => {
  return (
    <div className="box">
      <h2 className="title is-4">Skills</h2>
      <div className="field is-grouped is-grouped-multiline">
        {skillsList.map(skill => (
          <div className="control" key={skill}>
            <button
              className={`button ${formData.skills.includes(skill) ? 'is-info' : 'is-light'}`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;