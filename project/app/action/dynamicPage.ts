'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDynamicPage(data: {slug: string, title: string, content: string, published: boolean }) {
    await prisma.page.create({
        data
    })
    revalidatePath(`/${data.slug}`)
}

export async function updateDynamicPage(id: number, data: {slug: string, title: string, content: string, published: boolean }) {
    await prisma.page.update({
        where: { id },
        data
    })
    revalidatePath(`/${data.slug}`)
}

export async function deleteDynamicPage(slug: string) {
    await prisma.page.delete({
        where: { slug }
    })
    revalidatePath(`/${slug}`)
}

export async function getDynamicPage(slug: string) {
    const page = await prisma.page.findFirst({
        where: { slug, published: true }
    })
    return page;
}

export async function getAllDynamicPage(page = 1, limit = 10) {
    try {
        const [pages, total] = await prisma.$transaction([
            prisma.page.findMany({
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.page.count()
        ])
        return { pages, total, totalPages: Math.ceil(total / limit) };
    } catch {
        return { pages: [], total: 0, totalPages: 0 };
    }
}