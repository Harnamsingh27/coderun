import React, { useState } from 'react';

export default function Toolbar({ onRun, onShare, onReset, isRunning }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    onShare();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="toolbar">
      <button
        className="btn btn-run"
        onClick={onRun}
        disabled={isRunning}
        title="Run code (Ctrl+Enter)"
      >
        {isRunning ? (
          <>
            <span className="spinner spinner-sm" />
            Running…
          </>
        ) : (
          <>
            <span className="run-icon">▶</span>
            Run
          </>
        )}
      </button>

      <button className="btn btn-share" onClick={handleShare} title="Copy shareable link">
        {copied ? '✓ Copied!' : '⎘ Share'}
      </button>

      <button className="btn btn-reset" onClick={onReset} title="Reset to starter code">
        ↺ Reset
      </button>
    </div>
  );
}
