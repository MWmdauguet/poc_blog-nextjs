'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { updateUserInformation } from '@/app/action/userInformation'

type FormData = {
  email: string
  oldPassword: string
  newPassword: string
}

interface Props {
  user: {
    id: number
    email: string
  }
}

export default function UserInformationForm({ user }: Props) {
  const router = useRouter()
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      email: user.email,
      oldPassword: '',
      newPassword: '',
    }
  })

  const onSubmit = async (data: FormData) => {
    const result = await updateUserInformation(user.id, { email: data.email, oldPassword: data.oldPassword, newPassword: data.newPassword })
    if (result?.error) {
      setError('root', { message: result.error })
      return
    }
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold">Mes informations</h1>

        {errors.root && <p className="text-red-500 text-sm">{errors.root.message}</p>}

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email', { required: 'Email requis', pattern: { value: /\S+@\S+\.\S+/, message: 'Email invalide' } })} className="border rounded px-3 py-2" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="oldPassword">Ancien mot de passe</label>
          <input id="oldPassword" type="password" {...register('oldPassword', { required: 'Ancien mot de passe requis', minLength: { value: 6, message: 'Minimum 6 caractères' } })} className="border rounded px-3 py-2" />
          {errors.oldPassword && <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <input id="newPassword" type="password" {...register('newPassword', { required: 'Nouveau mot de passe requis', minLength: { value: 6, message: 'Minimum 6 caractères' } })} className="border rounded px-3 py-2" />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50">
          {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
        </button>
      </form>
    </div>
  )
}