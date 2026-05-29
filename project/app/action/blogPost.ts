'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSessionCookie } from "@/lib/session";

export async function createBlogPost(data: { title: string; content: string; picture?: string; publishedById?: number }) {
    const payload = await getSessionCookie(); 
    if (!payload) return;
    const blogPost = await prisma.blogPost.create({
        data: { ...data, publishedById: payload.id }
    })
    revalidatePath(`/blog/${blogPost.publishedById}/post/${blogPost.id}`)
}

export async function updateBlogPost(id: number, data: { title: string; content: string; picture?: string }) {
    const blogPost = await prisma.blogPost.update({ where: { id }, data })
    revalidatePath(`/blog/${blogPost.publishedById}/post/${id}`)
}

export async function deleteBlogPost(id: number) {
    const blogPost = await prisma.blogPost.delete({ where: { id } })
    revalidatePath(`/blog/${blogPost.publishedById}/post/${id}`)
}

export async function getBlogPost(id: number) {
    try {
        return await prisma.blogPost.findUnique({ where: { id } })
    } catch {
        return null;
    }
}

export async function getNotLockedBlogPost(id: number) {
    try {
        return await prisma.blogPost.findUnique({ where: { id, lockedAt: null} })
    } catch {
        return null;
    }
}

export async function getAllBlogPost(page = 1, limit = 10) {
    try {
        const [posts, total] = await prisma.$transaction([
            prisma.blogPost.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.blogPost.count()
        ])
        return { posts, total, totalPages: Math.ceil(total / limit) };
    } catch {
        return { posts: [], total: 0, totalPages: 0 };
    }
}

export async function getAllUserBlogPost(page = 1, limit = 10) {
    const payload = await getSessionCookie();  
    if (!payload) return { posts: [], total: 0, totalPages: 0 };

    try {
        const [posts, total] = await prisma.$transaction([
            prisma.blogPost.findMany({
                where: { publishedById: payload.id },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.blogPost.count()
        ])
        return { posts, total, totalPages: Math.ceil(total / limit) };
    } catch {
        return { posts: [], total: 0, totalPages: 0 };
    }
}

export async function lockedBlogPost(id: number, data: {locked: boolean}) {
    const payload = await getSessionCookie();
    if(!payload) return null;
    const lockedInformation = data.locked
        ? { lockedById: payload.id, lockedAt: new Date() }
        : { lockedById: null, lockedAt: null }
    
    const blogPost = await prisma.blogPost.update({
        where: { id },
        data: lockedInformation
    })
    revalidatePath(`/blog/${blogPost.publishedById}/post/${id}`)
}