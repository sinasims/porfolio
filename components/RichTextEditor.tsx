// components/RichTextEditor.tsx
'use client';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useState, useCallback } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

// تنظیمات ابزارهای عادی (بدون دکمه source)
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['code-block'],
    ['link', 'image'],
    ['clean'],
  ],
};

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'متن خود را بنویسید...',
}: RichTextEditorProps) {
  const [isSourceMode, setIsSourceMode] = useState(false);

  const handleEditorChange = useCallback(
    (content: string) => {
      if (!isSourceMode) onChange(content);
    },
    [isSourceMode, onChange]
  );

  const handleSourceChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div className="richtext-editor" dir="rtl">
      {/* دکمه سورس در بالای ادیتور */}
      <div className="mb-2 flex justify-end">
        <button
          type="button"
          onClick={() => setIsSourceMode(!isSourceMode)}
          className={`px-3 py-1 text-sm rounded-md transition ${
            isSourceMode
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {isSourceMode ? '🔤 حالت عادی' : '📄 نمایش کد HTML'}
        </button>
      </div>

      {/* ادیتور اصلی */}
      {!isSourceMode && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleEditorChange}
          modules={modules}
          placeholder={placeholder}
          style={{ height: '400px' }}
        />
      )}

      {/* حالت نمایش کد خام */}
      {isSourceMode && (
        <textarea
          value={value}
          onChange={handleSourceChange}
          className="w-full p-4 font-mono text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
          style={{ minHeight: '400px', direction: 'ltr' }}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}