<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
// use Dom\Comment;
use App\Models\CommentLike;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index($postId)
{

    $comments = Comment::with(['user', 'likes'])
                        ->where('post_id', $postId)
                        ->get();

 
    $result = $comments->map(function ($comment) {
        return [
            "id" => $comment->id,
            "user" => [
                "id" => $comment->user->id,
                "name" => $comment->user->name
            ],
            "content" => $comment->content,
            "likes" => $comment->likes->count(),
            "liked_by_current_user" => Auth::check() ? $comment->likes()
                    ->where('user_id', Auth::user()->id)
                    ->exists() : false,
            "created_at" => $comment->created_at
        ];
    });

    return response()->json([
        "data" => $result
    ], 200);
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
    public function store(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
          return response()->json(["message" => "comment not found."], 404
        );
        }

        try {
            
        CommentLike::create([
            'user_id' => Auth::user()->id,
            'comment_id' => $comment->id
        ]);

        return response()->json(["message"=>"Success."], 201
    );
        } catch (\Throwable $th) {
            return response()->json([
                "message"=>" already liked this comment."

            ], 409);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
          $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(["message" => "comment not found."], 404);
        }

        $existing = CommentLike::where('comment_id', $id)
                                ->where('user_id', Auth::id())
                                ->first();

        if (!$existing) {
            return response()->json(["message" => "not liked this comment."], 409);
        }

        $existing->delete();

        return response()->json(["message" => "Like has been deleted."], 200);
    }
}
