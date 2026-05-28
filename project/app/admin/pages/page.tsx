import { getAllDynamicPage } from '@/app/action/dynamicPage';
import Link from 'next/link';
import DeleteButton from './DeletionButton';

export const dynamic = 'force-dynamic';

export default async function DynamicPageList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { pages, totalPages } = await getAllDynamicPage(currentPage);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Pages</h1>
          <Link href="/admin/pages/add" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Créer
          </Link>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Titre</th>
              <th className="text-left py-2">Slug</th>
              <th className="text-left py-2">Publié</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b">
                <td className="py-2">{page.title}</td>
                <td className="py-2">{page.slug}</td>
                <td className="py-2">{page.published ? 'Oui' : 'Non'}</td>
                <td className="py-2 flex gap-2">
                  <Link href={`/admin/pages/${page.slug}`} className="text-blue-500 hover:underline">
                    Modifier
                  </Link>
                  <DeleteButton slug={page.slug} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-2 pb-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/admin/pages?page=${p}`}
              className={`px-3 py-1 rounded border ${currentPage === p ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            >
              {p}
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}