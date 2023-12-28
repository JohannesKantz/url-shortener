import React from "react";
import SignInButton from "./SignInButton";
import Link from "next/link";

export default function Header() {
    return (
        <header className="container flex justify-between py-5">
            <div>
                <Link href="/">
                    <h1 className="text-xl font-bold">url-shortener</h1>
                </Link>
            </div>
            <div>
                <SignInButton></SignInButton>
            </div>
        </header>
    );
}
