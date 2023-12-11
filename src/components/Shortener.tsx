"use client";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFormState } from "react-dom";

import { createShortURL } from "@/lib/actions";
import { useEffect, useRef } from "react";

const baseURL = "http://localhost:3000/";

export default function Component() {
    const [formState, formAction] = useFormState(createShortURL, {
        shortURL: "",
    });
    const shortURL = baseURL + (formState.shortURL ?? "");

    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        formRef.current?.reset();
    }, [shortURL]);

    const copyToClipboard = () => {
        if (shortURL === baseURL) return;
        navigator.clipboard.writeText(shortURL);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Card className="overflow-hidden">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        URL Shortener
                    </CardTitle>
                    <CardDescription>
                        Enter your long URL below to get a short URL.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        action={formAction}
                        ref={formRef}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="url">URL</Label>
                            <Input
                                className="rounded-md"
                                id="url"
                                name="url"
                                placeholder="https://www.yourlongurl.com"
                                required
                                type="url"
                            />
                        </div>
                        <Button className="w-full" type="submit">
                            Shorten URL
                        </Button>
                    </form>
                </CardContent>
            </Card>
            {shortURL !== baseURL && (
                <Card className="mt-4 overflow-hidden">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold">
                            Your Short URL
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                        <div className="truncate">
                            <Link href={shortURL} target="_blank">
                                <span className="text-blue-600">
                                    {shortURL}
                                </span>
                            </Link>
                        </div>
                        <Button
                            className="ml-4"
                            size="sm"
                            variant="outline"
                            onClick={copyToClipboard}
                        >
                            <CopyIcon className="w-4 h-4" />
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function CopyIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
    );
}
