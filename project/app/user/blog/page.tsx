import { getAllUserBlogPost } from '@/app/action/blogPost';
import Link from 'next/link';
import DeleteBlogButton from './DeleteBlogButton';

export const dynamic = 'force-dynamic';

export default async function BlogPostList({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const { posts, totalPages } = await getAllUserBlogPost(currentPage);

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog</h1>
          <Link href="/user/blog/add" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            Créer
          </Link>
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
                  <Link href={`/user/blog/${post.id}`} className="text-blue-500 hover:underline">
                    Modifier
                  </Link>
                  <DeleteBlogButton id={post.id} />
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