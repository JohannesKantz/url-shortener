import { nanoid } from "nanoid";
import prisma from "./prisma";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function shortenURL(targetURL: string, shortURL?: string) {
    let id = nanoid(6);

    const session = await await getServerSession(authOptions);

    if (shortURL) {
        // Make sure the URL doesn't already exist
        const result = await prisma.url.findFirst({
            where: { shortUrl: shortURL },
        });
        if (result) throw new Error("URL already exists");
        id = shortURL;
    } else {
        // Make sure the URL doesn't already exist
        while (true) {
            const result = await prisma.url.findFirst({
                where: { shortUrl: id },
            });
            if (!result) break;
            id = nanoid(6);
        }
    }

    const result = await prisma.url.create({
        data: {
            shortUrl: id,
            targetUrl: targetURL,
            userId: session?.user.id,
        },
    });

    if (!result) throw new Error("Failed to create URL");

    return id;
}

function isValidURL(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
