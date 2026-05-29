'use server';

import { prisma } from "@/lib/prisma";
import { getSessionCookie } from "@/lib/session";

export async function getAllBlog(page = 1, limit = 10) {
    try {
        const [blogs, total] = await prisma.$transaction([
            prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.user.count()
        ])
        return { blogs, total, totalPages: Math.ceil(total / limit) };
    } catch {
        return { blogs: [], total: 0, totalPages: 0 };
    }
}

export async function getAllNotLockedBlog(page = 1, limit = 10) {
    try {
        const [blogs, total] = await prisma.$transaction([
            prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                where: {lockedAt: null }
            }),
            prisma.user.count()
        ])
        return { blogs, total, totalPages: Math.ceil(total / limit) };
    } catch {
        return { blogs: [], total: 0, totalPages: 0 };
    }
}
export async function lockedBlog(id: number, data: {locked: boolean}) {
    const payload = await getSessionCookie();
    if(!payload) return null;
    const lockedInformation = data.locked
        ? { lockedById: payload.id, lockedAt: new Date() }
        : { lockedById: null, lockedAt: null }
    
    await prisma.user.update({
        where: { id },
        data: lockedInformation
    })
}