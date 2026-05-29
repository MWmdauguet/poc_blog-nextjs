'use client'

import { deleteBlogPost } from '@/app/action/blogPost';
import { useRouter } from 'next/navigation';

export default function DeleteBlogButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Supprimer cet article ?')) return;
    await deleteBlogPost(id);
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Supprimer
    </button>
  )
}