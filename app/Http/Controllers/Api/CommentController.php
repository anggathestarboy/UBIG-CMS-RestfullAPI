<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'post_id' => 'required|exists:posts,id',
            'content' => 'required'
        ]);

          if (!Auth::check()) {
            return  response()->json(
["message" => "Unauthorized"], 401
            );
        }

        $comment = Comment::create([
            'post_id' => $data['post_id'],
            'user_id' => Auth::user()->id,
            'content' => $data['content']
        ]);


        return response()->json([
            "message" => "New Comment has been created.",
            "data" => [
                "id" => $comment->id,
                "post_id" => $comment->post->id,
                "user" => ["id" => $comment->user->id, "name" => $comment->user->name],
                "content" => $comment->content,
                "created_at" => $comment->created_at
            ]

        ], 201);
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
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                "message" => "comment not found"
            ], 404);
        }

        $user = Auth::user()->id;
        $commentUser = $comment->user->id;

        if ($user !== $commentUser) {
            return response()->json([
                ["message" => " You are not authorized to update this comment."]

            ], 403);
        }

           $data = $request->validate([
            'content' => 'required'
        ]);

        $comment->update($data);
        return response()->json(
            ["message" =>"Comment has been updated.","data" => ["id" => $comment->id,"content" => $comment->content]]

        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
          $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                "message" => "comment not found"
            ], 404);
        }

        $user = Auth::user()->id;
        $commentUser = $comment->user->id;

        if ($user !== $commentUser) {
            return response()->json([
                ["message" => " You are not authorized to update this comment."], 403

            ]);
        }

        $comment->delete();
        return response()->json([
            "message" =>"Comment has been deleted."

        ]);

    }
}
