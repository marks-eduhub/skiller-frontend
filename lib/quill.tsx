import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; 
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TextEditor() {
  const [value, setValue] = useState('');

  return (
    <div className="max-w-lg  ">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ],
        }}
      />
    </div>
  );
}