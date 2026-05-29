import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import UserLockForm from './UserLockForm';
import Link from 'next/link';

export async function genereteMetadata({ params }: { params: Promise<{ id: string }>}) {
    return{
        title: `administration blog ${((await params).id)}`,
        description:  `admin blog ${((await params).id)} de la plateforme`
    }
}

export default async function BlogUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      publishedBlogs: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!user) notFound();

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-6 w-full px-4 md:max-w-3xl mx-auto pt-10">

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{user.pseudo}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
          {user.biography && <p className="text-gray-700 mt-1">{user.biography}</p>}
        </div>

        {user.lockedAt && (
          <p className="text-red-500 text-sm">
            Bloqué depuis le {new Date(user.lockedAt).toLocaleDateString('fr-FR')}
          </p>
        )}

        <UserLockForm user={{ id: user.id, lockedAt: user.lockedAt }} />

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">Articles ({user.publishedBlogs.length})</h2>
          {user.publishedBlogs.length === 0 && (
            <p className="text-gray-500">Aucun article</p>
          )}
          {user.publishedBlogs.map((post) => (
            <Link key={post.id} href={`/admin/blogPosts/${post.id}`} className="border rounded px-3 py-2 flex justify-between items-center hover:bg-gray-50">
              <p className="font-medium">{post.title}</p>
              <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleDateString('fr-FR')}</p>
            </Link>
          ))}
        </div>

      </main>
    </div>
  )
}