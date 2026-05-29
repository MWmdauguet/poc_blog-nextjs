import { getBlogPost } from '@/app/action/blogPost';
import { notFound } from 'next/navigation';
import BlogPostUpdateForm from './BlogPostUpdateForm';

export async function genereteMetadata({ params }: { params: Promise<{ id: string }>}) {
    return{
        title: ` blog post utilisateur ${((await params).id)}`,
        description:  `blog post utilisateur ${((await params).id)} de la plateforme`
    }
}

export default async function BlogPostUpdate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(Number(id));

  if (!post) notFound();

  return <BlogPostUpdateForm post={post} />
}