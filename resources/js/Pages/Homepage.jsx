import { Link, usePage } from "@inertiajs/react";

export default function Homepage() {
    const { auth } = usePage().props;

    return (
        <div>
            <h1 className="title">
                Selamat Datang {auth ? auth.user?.name : "Guest"}
            </h1>
            <Link
                preserveScroll
                href="/"
                className="block mt-[1000px] text-center font-bold text-2xl"
            >
                {new Date().toLocaleTimeString()}
            </Link>
        </div>
    );
}
