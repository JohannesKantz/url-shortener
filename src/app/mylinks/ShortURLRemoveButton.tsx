"use client";
import { deleteShortURL } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import React from "react";

export default function ShortURLRemoveButton({
    shortlinkID,
}: {
    shortlinkID: string;
}) {
    return (
        <button
            onClick={async () => {
                const r = await deleteShortURL(shortlinkID);
                console.log(r);
            }}
        >
            Remove
        </button>
    );
}
