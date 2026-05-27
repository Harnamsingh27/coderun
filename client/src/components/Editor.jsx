import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { LANGUAGES } from '../constants/languages';

export default function Editor({ code, onChange, languageId }) {
  const lang = LANGUAGES.find((l) => l.id === languageId);
  const monacoLang = lang ? lang.monaco : 'plaintext';

  return (
    <div className="editor-wrapper">
      <MonacoEditor
        height="100%"
        language={monacoLang}
        value={code}
        theme="vs-dark"
        onChange={(val) => onChange(val ?? '')}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          minimap: { enabled: false },
          lineNumbers: 'on',
          wordWrap: 'off',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          renderLineHighlight: 'line',
          smoothScrolling: true,
        }}
      />
    </div>
  );
}
