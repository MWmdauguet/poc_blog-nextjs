'use client'

import { updateBlogPost } from '@/app/action/blogPost';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Editor from '@/components/editor';
import ImageUpload from '@/components/imageUpload';

interface FormData {
  title: string;
  content: string;
  picture: string;
}

interface Props {
  post: {
    id: number;
    title: string;
    content: string | null;
    picture: string | null;
  }
}

export default function BlogPostUpdateForm({ post }: Props) {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      title: post.title,
      content: post.content ?? '',
      picture: post.picture ?? '',
    }
  });

  const onSubmit = async (data: FormData) => {
    await updateBlogPost(post.id, { title: data.title, content: data.content, picture: data.picture || undefined });
    router.push('/user/blog');
  }

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <h1 className="text-2xl font-bold">Modifier l'article</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="title">Titre</label>
          <input id="title" {...register('title', { required: 'Titre requis' })} className="border rounded px-3 py-2" placeholder="Titre" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label>Image</label>
          <Controller
            name="picture"
            control={control}
            render={({ field }) => (
              <ImageUpload value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Contenu</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Contenu requis' }}
            render={({ field }) => <Editor value={field.value} onChange={field.onChange} />}
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50">
          {isSubmitting ? 'Modification...' : 'Modifier'}
        </button>
      </form>
    </div>
  )
}