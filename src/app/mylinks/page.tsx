import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";

import ShortURLRemoveButton from "./ShortURLRemoveButton";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session) return <div>Not logged in</div>;

    const shortlinks = await prisma.url.findMany({
        where: { userId: session.user.id },
    });

    return (
        <main className="container flex min-h-fit flex-col p-0 sm:pt-[20vh] sm:p-4">
            Profile Page
            <Table>
                <TableCaption>A list of your recent links.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]">Shortlink</TableHead>
                        <TableHead>Full URL</TableHead>
                        <TableHead>Clicks</TableHead>
                        <TableHead className="text-right">Remove</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {shortlinks.map((shortlink) => {
                        return (
                            <TableRow>
                                <TableCell className="font-medium">
                                    {shortlink.shortUrl}
                                </TableCell>
                                <TableCell>{shortlink.targetUrl}</TableCell>
                                <TableCell>{shortlink.clicks}</TableCell>
                                <TableCell className="text-right">
                                    <ShortURLRemoveButton
                                        shortlinkID={shortlink.id}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </main>
    );
}
