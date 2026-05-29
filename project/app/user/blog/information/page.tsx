import { getBlogInformation } from '@/app/action/userInformation'
import { getSessionCookie } from '@/lib/session'
import { notFound } from 'next/navigation'
import BlogInformationForm from './blogInformationForm'

export default async function BlogInformationPage() {
  const payload = await getSessionCookie()
  if (!payload) notFound()

  const user = await getBlogInformation(payload.id)
  if (!user) notFound()

  return <BlogInformationForm user={user} />
}