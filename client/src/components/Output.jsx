import React from 'react';

export default function Output({ result, isRunning, onClear }) {
  const renderContent = () => {
    if (isRunning) {
      return (
        <div className="output-running">
          <span className="spinner" />
          <span>Running...</span>
        </div>
      );
    }

    if (!result) {
      return <span className="output-ready">Ready — press Run or Ctrl+Enter</span>;
    }

    const statusId = result.status?.id;

    // Status 6 = Compilation Error (Judge0 puts the error in compile_output)
    // Status 11 = Runtime Error (stderr)
    // Status 5  = Time Limit Exceeded
    // Status 4  = Wrong Answer
    // Status 3  = Accepted

    return (
      <>
        {/* Compilation error — status 6 */}
        {result.compile_output && (
          <div>
            <span className="output-label error">Compilation Error:</span>
            <pre className="output-error">{result.compile_output}</pre>
          </div>
        )}

        {/* Runtime error — status 11 */}
        {result.stderr && !result.compile_output && (
          <div>
            <span className="output-label error">Runtime Error:</span>
            <pre className="output-error">{result.stderr}</pre>
          </div>
        )}

        {/* Time Limit Exceeded — status 5 */}
        {statusId === 5 && (
          <pre className="output-tle">⏱ Time Limit Exceeded</pre>
        )}

        {/* Wrong Answer — status 4 */}
        {statusId === 4 && (
          <pre className="output-tle">✗ Wrong Answer</pre>
        )}

        {/* Stdout */}
        {result.stdout && (
          <pre className="output-stdout">{result.stdout}</pre>
        )}

        {/* Accepted with no output */}
        {!result.stdout && !result.stderr && !result.compile_output && statusId === 3 && (
          <span className="output-ready">Program exited with no output.</span>
        )}

        {/* Connection / server error */}
        {result.error && (
          <pre className="output-error">{result.error}</pre>
        )}

        {/* Unexpected status catch-all */}
        {statusId && ![3, 4, 5, 6, 11].includes(statusId) && !result.stdout && (
          <pre className="output-error">
            {result.stderr || result.compile_output || `Execution failed (status ${statusId}: ${result.status?.description ?? 'unknown'})`}
          </pre>
        )}

        {/* Execution stats */}
        {(result.time || result.memory) && (
          <div className="output-meta">
            {result.time   && <span>Time: {result.time}s</span>}
            {result.memory && <span>Memory: {result.memory} KB</span>}
            {result.status && <span>Status: {result.status.description}</span>}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="output-panel">
      <div className="output-header">
        <span className="output-title">Output</span>
        <button className="btn-clear" onClick={onClear} title="Clear output">
          Clear
        </button>
      </div>
      <div className="output-body">{renderContent()}</div>
    </div>
  );
}
