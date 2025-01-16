import { Head, Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Post({ posts }) {
    const { flash, auth } = usePage().props;

    const [flashMSGSuccess, setFlashMSGSuccess] = useState(flash.success);

    setTimeout(() => {
        setFlashMSGSuccess(null);
    }, 3000);

    return (
        <>
            <Head>
                <title>MyPost</title>
            </Head>
            <div className="w-full relative">
                <h1 className="title underline">My Post</h1>

                <div className="mt-2 flex justify-end">
                    <Link
                        href="/post/create"
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                    >
                        Create Post
                    </Link>
                </div>

                <div className="absolute top-0 right-1">
                    {flashMSGSuccess && (
                        <div className="px-2 py-1 bg-green-500 text-white text-xs uppercase rounded flex gap-2 relative">
                            {flashMSGSuccess}{" "}
                            <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-white text-black flex items-center justify-center">
                                x
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 relative">
                    {posts.map((post) => (
                        <article
                            className="w-full bg-white border border-slate-300 p-5 rounded-lg shadow mb-2"
                            key={post.id}
                        >
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <h1 className="text-xl font-bold">
                                        {post.title}
                                    </h1>
                                    <p className="text-xs text-slate-500">
                                        {new Date(
                                            post.created_at
                                        ).toDateString()}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-2">{post.content}</p>

                            <div className="mt-3">
                                <Link
                                    href={`/post/${post.id}`}
                                    className="text-sm font-bold text-blue-600"
                                >
                                    Read more...
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
