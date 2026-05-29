import { getNotLockedBlogPost } from '@/app/action/blogPost';
import { notFound } from 'next/navigation';

export async function genereteMetadata({ params }: { params: Promise<{ id: string }>}) {
    return{
        title: `Blog post ${((await params).id)}`,
        description:  `blog post ${((await params).id)} de la plateforme`
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ postid: string }> }) {
  const { postid } = await params;
  const post = await getNotLockedBlogPost(Number(postid));

  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-6 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        {post.picture && <img src={post.picture} alt={post.title} className="w-full rounded object-cover max-h-64" />}   
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
      </main>
    </div>
  )
}