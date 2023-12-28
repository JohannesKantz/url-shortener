"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function SignInButton() {
    const { data: session, status } = useSession();

    return (
        <div>
            {status === "authenticated" && !!session.user?.email && (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={session.user.image!} />
                                <AvatarFallback>
                                    {session.user.name}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                My Account: {session.user.name}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="/">Create Shortlink</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link href="/mylinks">Manage my links</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <button
                                    onClick={() => {
                                        signOut();
                                    }}
                                >
                                    Sign out
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )}
            {status === "loading" && <>Loading...</>}
            {status === "unauthenticated" && (
                <button
                    onClick={() => {
                        signIn();
                    }}
                >
                    Sign in
                </button>
            )}
        </div>
    );
}
