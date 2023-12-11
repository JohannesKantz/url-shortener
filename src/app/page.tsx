import Shortener from "../components/Shortener";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-0 sm:pt-[20vh] sm:p-4">
            <Shortener />
        </main>
    );
}
