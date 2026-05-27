import React, { useState, useEffect, useCallback } from 'react';
import Editor from './components/Editor';
import Output from './components/Output';
import LanguageSelector from './components/LanguageSelector';
import Toolbar from './components/Toolbar';
import { LANGUAGES, DEFAULT_SNIPPETS } from './constants/languages';

const API_BASE = import.meta.env.VITE_API_URL || '';

function getDefaultLang() {
  return LANGUAGES[0]; // Python
}

function readUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const langId = params.get('lang');
  const code = params.get('code');
  return { langId: langId ? Number(langId) : null, code };
}

export default function App() {
  const urlParams = readUrlParams();

  const initialLangId = urlParams.langId ?? getDefaultLang().id;
  const initialCode = urlParams.code
    ? atob(urlParams.code)
    : DEFAULT_SNIPPETS[initialLangId] ?? '';

  const [languageId, setLanguageId] = useState(initialLangId);
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (id) => {
    setLanguageId(id);
    setCode(DEFAULT_SNIPPETS[id] ?? '');
    setResult(null);
  };

  const handleRun = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, languageId, stdin: '' }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        setResult({ error: err.error || 'Server error' });
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: 'Connection error — is the server running on port 3001?' });
    } finally {
      setIsRunning(false);
    }
  }, [code, languageId, isRunning]);

  // Keyboard shortcut: Ctrl+Enter / Cmd+Enter
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleRun]);

  const handleShare = () => {
    const encoded = btoa(unescape(encodeURIComponent(code)));
    const url = `${window.location.origin}${window.location.pathname}?lang=${languageId}&code=${encoded}`;
    navigator.clipboard.writeText(url).catch(() => {
      // Fallback: show URL in prompt
      window.prompt('Copy this shareable link:', url);
    });
  };

  const handleReset = () => {
    setCode(DEFAULT_SNIPPETS[languageId] ?? '');
    setResult(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <span className="logo">
            <span className="logo-bracket">&lt;</span>
            CodeRun
            <span className="logo-bracket">/&gt;</span>
          </span>
        </div>
        <div className="header-center">
          <LanguageSelector selectedId={languageId} onChange={handleLanguageChange} />
        </div>
        <div className="header-right">
          <Toolbar
            onRun={handleRun}
            onShare={handleShare}
            onReset={handleReset}
            isRunning={isRunning}
          />
        </div>
      </header>

      <main className="main">
        <section className="editor-pane">
          <Editor code={code} onChange={setCode} languageId={languageId} />
        </section>
        <section className="output-pane">
          <Output result={result} isRunning={isRunning} onClear={() => setResult(null)} />
        </section>
      </main>
    </div>
  );
}
