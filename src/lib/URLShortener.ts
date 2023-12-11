import { nanoid } from "nanoid";
import prisma from "./prisma";

export async function shortenURL(targetURL: string) {
    let id = nanoid(6);

    // Make sure the URL doesn't already exist
    while (true) {
        const result = await prisma.url.findFirst({ where: { shortUrl: id } });
        if (!result) break;
        id = nanoid(6);
    }

    const result = await prisma.url.create({
        data: {
            shortUrl: id,
            targetUrl: targetURL,
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
