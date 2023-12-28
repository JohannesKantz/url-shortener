"use server";

import { getSession } from "next-auth/react";
import { shortenURL } from "./URLShortener";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export type FormState = {
    shortURL: string;
    error?: string;
};

export async function createShortURL(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const url = formData.get("url") as string;
    const wishedShortURL = formData.get("shortURL");
    try {
        if (wishedShortURL != null && (wishedShortURL as string).length <= 0) {
            const shortURL = await shortenURL(url);
            console.log("shortURL", shortURL);
            revalidatePath("/mylinks");
            return { shortURL };
        } else {
            const shortURL = await shortenURL(url, wishedShortURL as string);
            console.log("shortURL", shortURL);
            revalidatePath("/mylinks");
            return { shortURL };
        }
    } catch (error: any) {
        console.error(error);
        return { shortURL: "", error: error.message };
    }
}

export async function deleteShortURL(shortURLID: string) {
    try {
        const result = await prisma.url.delete({
            where: { id: shortURLID },
        });
        revalidatePath("/mylinks");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
