'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { updateUserBlogInformation } from '@/app/action/userInformation'

type FormData = {
  pseudo: string
  biography: string
}

interface Props {
  user: {
    id: number
    pseudo: string
    biography: string|null
    picture: string|null
  }
}

export default function BlogInformationForm({ user }: Props) {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      pseudo: user.pseudo,
      biography: user.biography ?? '',
    }
  })

  const onSubmit = async (data: FormData) => {
    await updateUserBlogInformation(user.id, { pseudo: data.pseudo, biography: data.biography, picture: '' })
    router.push('/user/blog/information')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Mon profil blog</h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="pseudo">Pseudo</label>
          <input id="pseudo" {...register('pseudo', { required: 'Pseudo requis' })} className="border rounded px-3 py-2" placeholder="Pseudo" />
          {errors.pseudo && <p className="text-red-500 text-sm">{errors.pseudo.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="biography">Biographie</label>
          <textarea id="biography" {...register('biography')} className="border rounded px-3 py-2 min-h-[120px]" placeholder="Parle de toi..." />
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50">
          {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  )
}