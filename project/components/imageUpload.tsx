'use client'

import { useState } from 'react';

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const { url } = await res.json();
    onChange(url);
    setUploading(false);
  }

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleUpload} className="border rounded px-3 py-2" />
      {uploading && <p className="text-sm text-gray-500">Upload en cours...</p>}
      {value && (
        <img src={value} alt="preview" className="w-48 h-48 rounded object-cover" />
      )}
    </div>
  )
}