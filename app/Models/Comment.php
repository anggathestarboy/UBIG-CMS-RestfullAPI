<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    protected $fillable = ['content', 'user_id', 'post_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function post() {
        return $this->belongsTo(Post::class);
    }

        public function likes()
    {
        return $this->hasMany(CommentLike::class);
    }

public function likedByCurrentUser()
{
    return $this->likes()->where('user_id', Auth::user()->id)->exists();
}
}
