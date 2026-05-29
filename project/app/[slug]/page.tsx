
import { notFound } from 'next/navigation'
import { getPublishedDynamicPage } from '../action/dynamicPage';

export async function genereteMetadata({ params }: { params: Promise<{ slug: string }>}) {
    return{
        title: `${((await params).slug)}`,
        description:  `Page ${((await params).slug)} de la plateforme`
    }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPublishedDynamicPage(slug);

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