import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function SignIn() {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            email: "",
            password: "",
        });

    const { flash, csrf_token } = usePage().props;

    const [flashMessage, setFlashMessage] = useState({
        error: flash.error || null,
        success: flash.success || null,
        message: flash.message || null,
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (flash) {
            setFlashMessage(flash); // Update state jika ada flash error dari server
            setIsVisible(true); // Mulai transisi muncul setelah state diupdate
        }
    }, [flash]); // Jalankan efek jika flash berubah

    useEffect(() => {
        if (
            flashMessage.error ||
            flashMessage.success ||
            flashMessage.message
        ) {
            reset();
            const timer = setTimeout(() => {
                setIsVisible(false); // Mulai transisi menghilang setelah 3 detik
                setTimeout(
                    () =>
                        setFlashMessage({
                            error: null,
                            success: null,
                            message: null,
                        }),
                    300
                ); // Hapus state setelah transisi selesai
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    function onSubmit(e) {
        e.preventDefault();
        post("/sign-in", {
            _token: csrf_token,
            data,
        });
    }

    return (
        <div className="container mx-auto w-1/3">
            <h1 className="title">SignIn</h1>

            <form
                className="mt-8 flex flex-col gap-5 transition-transform duration-300"
                onSubmit={onSubmit}
            >
                {flashMessage.error && (
                    <div
                        className={`bg-red-600 text-white p-3 text-xs rounded transition-opacity duration-300 ${
                            isVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {flashMessage.error}
                    </div>
                )}
                {flashMessage.success && (
                    <div
                        className={`bg-green-600 text-white p-3 text-xs rounded transition-opacity duration-300 ${
                            isVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {flashMessage.success}
                    </div>
                )}
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                            setData("email", e.target.value);
                            clearErrors("email");
                        }}
                        value={data.email}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => {
                            setData("password", e.target.value);
                            clearErrors("password");
                        }}
                        value={data.password}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs">
                            {errors.password}
                        </p>
                    )}
                </div>

                <button
                    className="p-2 rounded bg-blue-600 text-white"
                    disabled={processing}
                >
                    {processing ? "Loading..." : "Sign In"}
                </button>
            </form>

            <p className="text-center mt-8 text-sm">
                Belum punya akun?{" "}
                <Link href="/sign-up" className="text-blue-500">
                    Daftar disini
                </Link>
            </p>
        </div>
    );
}
