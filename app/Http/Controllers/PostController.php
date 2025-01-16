<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->get();
        return inertia('Post/Post', [
            'posts' => $posts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Post/CreatePost');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|min:3',
            'content' => 'required|min:5',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($request->hasFile('thumbnail')) {
            $thumbnail = $request->file('thumbnail');
            $thumbnail_name = $thumbnail->hashName();
            $thumbnail->storePubliclyAs('thumbnails', $thumbnail_name, 'public');

            $validatedData['thumbnail'] = $thumbnail_name;
        }

        Post::create($validatedData);

        return redirect()->route('post.index')->with('success', 'Add Post Sukses');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return inertia('Post/DetailPost', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return inertia('Post/EditPost', [
            'post' => Post::findOrFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|min:3',
            'content' => 'required|min:5',
            'thumbnail' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        sleep(5);

        $post = Post::findOrFail($id);

        if ($request->hasFile('thumbnail')) {

            $thumbnail = $request->file('thumbnail');
            $thumbnail_name = $thumbnail->hashName();
            $thumbnail->storePubliclyAs('thumbnails', $thumbnail_name, 'public');

            $validatedData['thumbnail'] = $thumbnail_name;

            if ($post->thumbnail && Storage::disk('public')->exists('thumbnails/' . $post->thumbnail)) {
                Storage::disk('public')->delete('thumbnails/' . $post->thumbnail);
            }
        }

        $post->update($validatedData);

        return redirect()->route('post.index')->with('success', 'Post updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('post.index')->with('success', 'Post deleted successfully');
    }
}
