import { Link, usePage } from "@inertiajs/react";

export default function Layout({ children }) {
    const { auth } = usePage().props;

    return (
        <>
            <div className="w-full bg-slate-500 mb-5">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl py-5">My App</h1>
                    <div className="flex flex-row gap-5">
                        <Link
                            href="/"
                            className="text-white hover:text-gray-300"
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className="text-white hover:text-gray-300"
                        >
                            About
                        </Link>
                        {auth?.user ? (
                            <Link
                                href="/post"
                                className="text-white hover:text-gray-300"
                            >
                                My Post
                            </Link>
                        ) : (
                            ""
                        )}
                        {auth?.user ? (
                            <Link
                                href="/sign-out"
                                className="text-white hover:text-gray-300"
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="text-white hover:text-gray-300"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full progress-bar"></div>

            <main>{children}</main>
        </>
    );
}
