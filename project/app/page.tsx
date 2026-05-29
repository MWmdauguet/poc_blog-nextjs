import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { lockedBlog } from './action/blog';

export const metadata = {
  title: 'Accueil',
  description: 'Page d\'accueil de la plateforme',
}

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 10;

  const where = {
    lockedAt: null,
    ...(search ? { pseudo: { contains: search } } : {})
  }

  const [blogs, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: { id: true, pseudo: true, biography: true, picture: true, lockedAt: true },
      skip: (currentPage - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.user.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <h1 className="text-2xl font-bold">Blogs</h1>

        <form method="GET">
          <input
            name="search"
            defaultValue={search}
            placeholder="Rechercher un blogueur..."
            className="border rounded px-3 py-2 w-full"
          />
        </form>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Pseudo</th>
              <th className="text-left py-2">Biographie</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b">
                <td className="py-2">{blog.pseudo}</td>
                <td className="py-2 text-gray-500 text-sm">{blog.biography ?? '-'}</td>
                <td className="py-2">
                  <Link href={`/blogs/${blog.id}`} className="text-blue-500 hover:underline">
                    Voir
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
              href={`/?page=${p}${search ? `&search=${search}` : ''}`}
              className={`px-3 py-1 rounded border ${currentPage === p ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
            >
              {p}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}