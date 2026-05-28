'use client'

import { createDynamicPage } from '@/app/action/dynamicPage';
import { useForm, Controller } from 'react-hook-form';
import Editor from '@/components/editor';
import { useRouter } from 'next/navigation';

interface FormData {
  title: string;
  slug: string;
  content: string;
  published: boolean;
}

export default function DynamicPageAdd() {
  const router = useRouter();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      published: false,
    }
  });

  const onSubmit = async (data: FormData) => {
    await createDynamicPage({ title: data.title, slug: data.slug, content: data.content, published: data.published });
    router.push(`/admin/pages`)
  }

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
        <h1 className="text-2xl font-bold">Créer une page</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            {...register('title', { required: 'Titre requis' })}
            className="border rounded px-3 py-2"
            placeholder="Titre"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="slug">Slug</label>
          <input
            id="slug"
            {...register('slug', { required: 'Slug requis' })}
            className="border rounded px-3 py-2"
            placeholder="mon-url"
          />
          {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label>Contenu</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Contenu requis' }}
            render={({ field }) => (
              <Editor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            {...register('published')}
            className="w-4 h-4"
          />
          <label htmlFor="published">Publié</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Création...' : 'Créer la page'}
        </button>
      </form>
    </div>
  )
}