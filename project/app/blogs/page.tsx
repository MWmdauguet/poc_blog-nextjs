import { getAllNotLockedBlog } from '@/app/action/blog';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blogs',
  description: 'Page Blogs de la plateforme',
}

export default async function BlogList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { blogs, totalPages } = await getAllNotLockedBlog(currentPage);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">BlogPosts</h1>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Pseudo</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b">
                <td className="py-2">{blog.pseudo}</td>
                <td className="py-2 flex gap-2">
                  <Link href={`/blogs/${blog.id}`} className="text-blue-500 hover:underline">
                    voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-2 pb-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/user/blog?page=${p}`}
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