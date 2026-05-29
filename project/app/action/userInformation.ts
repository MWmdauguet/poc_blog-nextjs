'use server';

import { prisma } from "@/lib/prisma";
import { getSessionCookie } from "@/lib/session";
import { verify, hash } from "argon2";

export async function updateUserInformation(id: number, data: { email: string; oldPassword: string; newPassword: string }) {
    const payload = await getSessionCookie(); 
    if (!payload) return { error: 'Non connecté' };

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return { error: 'Utilisateur non trouvé' };

    const valid = await verify(user.password, data.oldPassword);
    if (!valid) return { error: 'Ancien mot de passe incorrect' };

    const hashedPassword = await hash(data.newPassword);

    await prisma.user.update({
        where: { id },
        data: { email: data.email, password: hashedPassword }
    });

    return { success: true };
}

export async function updateUserBlogInformation(id: number, data: {pseudo: string, biography: string, picture: string}) {
    const payload = await getSessionCookie();
    if (!payload) return null;
    await prisma.user.update({
        where: { id },
        data
    });
}

export async function getUserInformation(id: number) {
    const payload = await getSessionCookie();
    if (!payload) return null;
    const user = await prisma.user.findFirst({ where: { id } })
    if (!user) return null;
    return { id: user.id, email: user.email };
}

export async function getBlogInformation(id: number) {
    const payload = await getSessionCookie();
    if (!payload) return null;
    const user = await prisma.user.findFirst({ where: { id } })
    if (!user) return null;
    return { id: user.id, pseudo: user.pseudo, biography: user.biography, picture: user.picture };
}