import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { id: [string] } }) {
    const result = await prisma.url.findUnique({
        where: { shortUrl: params.id[0] },
    });
    const targetUrl = result?.targetUrl;

    if (targetUrl) {
        await prisma.url.update({
            where: { shortUrl: params.id[0] },
            data: { clicks: { increment: 1 } },
        });
        redirect(targetUrl);
    }

    return (
        <main className="container flex min-h-fit flex-col items-center justify-between p-0 sm:pt-[20vh] sm:p-4">
            <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Card className="mt-4 overflow-hidden">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">
                            Error: This short link does not exist
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="">
                            <Link href="/" className="text-blue-600">
                                Create your own short link
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
