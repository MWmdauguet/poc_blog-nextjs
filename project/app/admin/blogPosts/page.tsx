import { getAllBlogPost } from '@/app/action/blogPost';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Page administration des posts',
  description: 'Page admin des posts de la plateforme',
}

export default async function BlogPostList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { posts, totalPages } = await getAllBlogPost(currentPage);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">BlogPosts</h1>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Titre</th>
              <th className="text-left py-2">Créé le</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="py-2">{post.title}</td>
                <td className="py-2">{new Date(post.createdAt).toLocaleDateString('fr-FR')}</td>
                <td className="py-2 flex gap-2">
                  <Link href={`/admin/blogPosts/${post.id}`} className="text-blue-500 hover:underline">
                    Modifier
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