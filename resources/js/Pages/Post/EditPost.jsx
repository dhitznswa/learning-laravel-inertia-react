import { router, useForm, usePage } from "@inertiajs/react";

export default function CreatePost({ post }) {
    const props = usePage().props;

    const { data, setData, processing, errors, progress } = useForm({
        title: post.title,
        content: post.content,
        thumbnail: post.thumbnail,
    });

    console.log(data);
    console.log(props);

    function handleSubmit(e) {
        e.preventDefault();

        router.post(
            `/post/${post.id}`,
            {
                _method: "PUT",
                title: data.title,
                content: data.content,
                thumbnail: data.thumbnail,
            },
            {
                forceFormData: true,
            }
        );
    }

    return (
        <div>
            <h1 className="title">Update Post</h1>

            <div className="mt-8 w-[30%] mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="mb-2 font-bold">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            className="px-2 py-1 w-full rounded-lg outline-none border-2 border-slate-400 focus:border-blue-600"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    title: e.target.value,
                                })
                            }
                            value={data.title}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <textarea
                        name="content"
                        id="content"
                        rows={10}
                        className="px-2 py-1 w-full rounded-lg outline-none border-2 border-slate-400 focus:border-blue-600"
                        onChange={(e) =>
                            setData({
                                ...data,
                                content: e.target.value,
                            })
                        }
                        value={data.content}
                    ></textarea>
                    {errors.content && (
                        <p className="text-red-500 text-xs mt-0">
                            {errors.content}
                        </p>
                    )}

                    <div className="mb-4">
                        <label htmlFor="thumbnail" className="mb-2 font-bold">
                            Gambar
                        </label>
                        <input
                            type="file"
                            name="thumbnail"
                            id="thumbnail"
                            className="px-2 py-1 w-full rounded-lg outline-none border-2 border-slate-400 focus:border-blue-600"
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    thumbnail: e.target.files[0],
                                })
                            }
                        />
                        {errors.thumbnail && (
                            <p className="text-red-500 text-xs">
                                {errors.thumbnail}
                            </p>
                        )}
                        {progress && (
                            <progress
                                value={progress.percentage}
                                max="100"
                                className="w-full mt-4"
                            >
                                {progress.percentage}%
                            </progress>
                        )}
                    </div>

                    <button
                        className={
                            "px-2 py-1 bg-blue-600 text-white rounded w-full mt-6" +
                            (processing ? " opacity-50 cursor-not-allowed" : "")
                        }
                        disabled={processing}
                    >
                        {processing ? "Submiting.." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}