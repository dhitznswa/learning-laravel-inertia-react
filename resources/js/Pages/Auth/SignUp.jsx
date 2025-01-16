import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function SignUp() {
    const props = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    function onSubmit(e) {
        e.preventDefault();
        post("/sign-up", {
            _token: props.csrf_token,
            data,
        });
    }

    return (
        <div className="container mx-auto w-1/3">
            <h1 className="title">SignUp</h1>

            <form className="mt-8 flex flex-col gap-5" onSubmit={onSubmit}>
                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>
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
                        onChange={(e) => setData("email", e.target.value)}
                    />
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
                        onChange={(e) => setData("password", e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Repeat Password
                    </label>
                    <input
                        type="password"
                        id="password_confirmation"
                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                    />
                </div>

                {errors && (
                    <div className="text-red-500">
                        {Object.keys(errors).map((key) => (
                            <p className="text-xs" key={key}>
                                + {errors[key]}
                            </p>
                        ))}
                    </div>
                )}

                <button className="p-2 rounded bg-blue-600 text-white">
                    Daftar
                </button>
            </form>
        </div>
    );
}
