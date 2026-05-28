
import { notFound } from 'next/navigation'
import { getDynamicPage } from '../action/dynamicPage';

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getDynamicPage(slug);

    if (!page) {
        notFound()
    }

    return (
        <div className="min-h-screen">
            <main className="flex flex-col gap-4 w-full px-4 md:max-w-3xl mx-auto pt-10">
                <h1 className="text-2xl font-bold">{page.title}</h1>
                <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: page.content ?? '' }}
                />
            </main>
        </div>
    )
}