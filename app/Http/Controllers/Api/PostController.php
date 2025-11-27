<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

use function PHPSTORM_META\map;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user', 'category')->get();
         return response()->json([
         "post_count" => Post::count(),
         
            'data' => [
                $posts->map(function($post) {
                    

return [

                        "id" => $post->id,
    "title"=> $post->title,
    "slug"=> $post->slug,
    "excerpt" => Str::limit($post->content, 100),  
    "user" => [ "id" => $post->user->id, "name" => $post->user->name ],
    "category" => [ "id" => $post->category->id, "name" => $post->category->name ],
    "created_at" => $post->created_at
];


                })
                

            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:posts,slug',
            'content' => 'required',
            'category_id' => 'required|exists:categories,id'
        ]);


        $post = Post::create([
            'title' => $data['title'],
            'slug' => $data['slug'],
            'content' => $data['content'],
            'user_id' => Auth::user()->id,
            'category_id' => $data['category_id']

        ]);


        return response()->json([
            "message" => "New Post has been created",
            'data' => [
                
    "id" => $post->id,
    "title"=> $post->title,
    "slug"=> $post->slug,
    "content" => $post->content,
    "user" => [ "id" => $post->user->id, "name" => $post->user->name ],
    "category" => [ "id" => $post->category->id, "name" => $post->category->name ],
    "created_at" => $post->created_at

            ]
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(
                ["message" => "Post not found"]
, 404
            );
        }
        
          return response()->json([
            'data' => [
                
    "id" => $post->id,
    "title"=> $post->title,
    "slug"=> $post->slug,
    "content" => $post->content,
    "user" => [ "id" => $post->user->id, "name" => $post->user->name ],
    "category" => [ "id" => $post->category->id, "name" => $post->category->name ],
    "created_at" => $post->created_at

            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'post not found'
            ], 404);
        }

        $user = Auth::user()->id;
        $postUser = $post->user_id;

        if ($user !== $postUser) {
            return response()->json([
                
"message" => " You are not authorized to update this post."

            ], 403);
        }

          $data = $request->validate([
            'title' => 'required',
            'slug' => "required|unique:posts,slug,$id",
            'content' => 'nullable',
            'category_id' => 'required|exists:categories,id'
        ]);


      $post->update($data);

      return response()->json([
        'message' => 'Post has been updated',
        'data' => $data
      ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
          $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'post not found'
            ], 404);
        }

        $user = Auth::user()->id;
        $postUser = $post->user_id;

        if ($user !== $postUser) {
            return response()->json([
                
"message" => " You are not authorized to delete this post."

            ], 403);
        }

        $post->delete();
        return response()->json([
                
"message" => " Post has been deleted"

            ]);
    }
    
    
    public function myPosts()
{
    $userId = Auth::id();

    $posts = Post::where('user_id', $userId)
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json([
        "message" => "My posts",
        "data" => $posts
    ]);
}
}
