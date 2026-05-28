'use client'

import { deleteDynamicPage } from '@/app/action/dynamicPage';

export default function DeleteButton({ slug }: { slug: string }) {
  const handleDelete = async () => {
    if (!confirm('Supprimer cette page ?')) return;
    await deleteDynamicPage(slug);
  }

  return (
    <button onClick={handleDelete} className="text-red-500 hover:underline">
      Supprimer
    </button>
  )
}