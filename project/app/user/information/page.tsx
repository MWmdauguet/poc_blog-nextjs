import { getUserInformation } from '@/app/action/userInformation'
import { getSessionCookie } from '@/lib/session'
import { notFound } from 'next/navigation'
import UserInformationForm from './UseInformationForm'

export const metadata = {
  title: 'Informtions utilisateur',
  description: 'Page information utilisateur de la plateforme',
}

export default async function UserInformationPage() {
  const payload = await getSessionCookie()
  if (!payload) notFound()

  const user = await getUserInformation(payload.id)
  if (!user) notFound()

  return <UserInformationForm user={user} />
}