import React from 'react';

const ReadmePreview = ({ readme, copied, copyToClipboard, downloadReadme }) => {
  return (
    <div className="box" style={{ position: 'sticky', top: '2rem' }}>
      <h2 className="title is-4">Preview & Output</h2>
      
      {readme ? (
        <>
          <div className="buttons">
            <button className="button is-info" onClick={copyToClipboard}>
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
            <button className="button is-link" onClick={downloadReadme}>
              Download README.md
            </button>
          </div>

          <div className="content" style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '4px',
            maxHeight: '600px',
            overflow: 'auto'
          }}>
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              wordWrap: 'break-word',
              fontSize: '0.875rem'
            }}>
              {readme}
            </pre>
          </div>

          <div className="notification is-warning is-light" style={{ marginTop: '1rem' }}>
            <strong>Important:</strong> Replace <code>YOUR_GITHUB_USERNAME</code> with your actual GitHub username in the generated README!
          </div>
        </>
      ) : (
        <div className="notification is-info is-light">
          Fill in the form and click "Generate README" to see your profile README here!
        </div>
      )}
    </div>
  );
};

export default ReadmePreview;