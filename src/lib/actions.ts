"use server";

import { shortenURL } from "./URLShortener";

export type FormState = {
    shortURL: string;
};

export async function createShortURL(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    const url = formData.get("url") as string;
    try {
        const shortURL = await shortenURL(url);
        console.log("shortURL", shortURL);
        return { shortURL };
    } catch (error) {
        console.error(error);
    }
    return { shortURL: "" };
}
