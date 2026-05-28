import { getDynamicPage } from '@/app/action/dynamicPage';
import { notFound } from 'next/navigation'
import DynamicPageUpdateForm from './DynamicPageUpdateForm';

export default async function DynamicPageUpdate({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getDynamicPage(slug);

  if (!page) notFound()

  return <DynamicPageUpdateForm page={page} />
}