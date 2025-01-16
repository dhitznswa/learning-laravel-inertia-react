import { Link, useForm } from "@inertiajs/react";

export default function DetailPost({ post }) {
    const { delete: destroy } = useForm();

    function deletePost(e) {
        e.preventDefault();
        destroy(`/post/${post.id}`);
    }

    return (
        <div>
            <div className="flex gap-2 justify-center items-center w-1/2 mx-auto">
                <form onSubmit={deletePost}>
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs font-semibold uppercase"
                    >
                        Delete
                    </button>
                </form>
                <Link
                    href={`/post/${post.id}/edit`}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs font-semibold uppercase"
                >
                    Update
                </Link>
            </div>

            <h1 className="title">{post.title}</h1>
            <p className="text-sm text-slate-400 text-center mt-0">
                Published at {new Date(post.updated_at).toDateString()}
            </p>

            <div className="mt-8 w-1/3 mx-auto">
                <img
                    src={`${
                        post.thumbnail
                            ? `/storage/thumbnails/${post.thumbnail}`
                            : "https://yk.rsw.jp/image/noimage.png"
                    }`}
                    alt=""
                    className="w-full rounded-lg border border-slate-400 mb-3 aspect-video object-cover"
                />
                {post.content}
            </div>
        </div>
    );
}
