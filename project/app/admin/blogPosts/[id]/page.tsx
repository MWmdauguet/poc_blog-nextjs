import { getBlogPost } from '@/app/action/blogPost';
import { notFound } from 'next/navigation';
import BlogPostLockForm from './BlogPostLockForm';

export async function genereteMetadata({ params }: { params: Promise<{ id: string }>}) {
    return{
        title: `administration Blog post ${((await params).id)}`,
        description:  `admin blog post ${((await params).id)} de la plateforme`
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(Number(id));

  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-6 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        {post.picture && <img src={post.picture} alt={post.title} className="w-full rounded object-cover max-h-64" />}
        {post.lockedAt && (
        <p className="text-red-500 text-sm">
            Bloqué depuis le {new Date(post.lockedAt).toLocaleDateString('fr-FR')}
        </p>
        )}        
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
        <BlogPostLockForm post={post} />
      </main>
    </div>
  )
}