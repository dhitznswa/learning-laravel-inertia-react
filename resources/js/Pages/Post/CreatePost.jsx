import { useForm, usePage } from "@inertiajs/react";

export default function CreatePost() {
    const props = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post("/post", {
            _token: props.csrf_token,
        });
    }

    return (
        <div>
            <h1 className="title">Create Post</h1>

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
                            onChange={(e) => setData("title", e.target.value)}
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
                        onChange={(e) => setData("content", e.target.value)}
                    ></textarea>
                    {errors.content && (
                        <p className="text-red-500 text-xs mt-0">
                            {errors.content}
                        </p>
                    )}

                    <button className={"px-2 py-1 bg-blue-600 text-white rounded w-full mt-6" + (processing ? " opacity-50 cursor-not-allowed" : "")} disabled={processing}>
                        {processing ? "Submiting.." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}
