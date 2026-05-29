'use client'

import { lockedBlogPost } from '@/app/action/blogPost';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  post: {
    id: number;
    lockedAt: Date | null;
  }
}

export default function BlogPostLockForm({ post }: Props) {
  const router = useRouter();
  const [locked, setLocked] = useState(!!post.lockedAt);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    const newLocked = !locked;
    setLocked(newLocked);
    await lockedBlogPost(post.id, { locked: newLocked });
    router.refresh();
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-between border rounded px-3 py-2">
      <span className="font-medium">Verrouillé</span>
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors disabled:opacity-50 ${locked ? 'bg-black' : 'bg-gray-200'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${locked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  )
}