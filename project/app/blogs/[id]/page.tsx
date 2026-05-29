import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function genereteMetadata({ params }: { params: Promise<{ id: string }>}) {
    return{
        title: `Post ${((await params).id)}`,
        description:  `Page ${((await params).id)} de la plateforme`
    }
}

export default async function BlogUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      publishedBlogs: { where: {lockedAt: null }, orderBy: { createdAt: 'desc' } }
    }
  });

  if (!user) notFound();

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-6 w-full px-4 md:max-w-3xl mx-auto pt-10">

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{user.pseudo}</h1>
          {user.biography && <p className="text-gray-700 mt-1">{user.biography}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Articles ({user.publishedBlogs.length})</h2>
          {user.publishedBlogs.length === 0 && (
            <p className="text-gray-500">Aucun article</p>
          )}
          {user.publishedBlogs.map((post) => (
            <Link key={post.id} href={`/blogs/${user.id}/${post.id}`} className="border rounded px-3 py-2 flex justify-between items-center hover:bg-gray-50">
              <p className="font-medium">{post.title}</p>
              <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString('fr-FR')}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}