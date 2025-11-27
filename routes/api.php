<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\PostController;
use App\Http\Middleware\CheckIsAdmin;
use App\Http\Middleware\CheckIsUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');






Route::post('auth/register', [AuthController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);
// Route::get('/post/{id}/comments', [CommentController::class, 'index']);

Route::get('/post', [PostController::class, 'index']);
Route::get('/post/{id}', [PostController::class, 'show']);

        Route::get('/category/user', [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::get('/user', [AuthController::class, 'user']);


    Route::middleware(CheckIsAdmin::class)->group(function() {
    Route::post('/category', [CategoryController::class, 'store']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
        Route::get('/category', [CategoryController::class, 'index']);
        Route::get('/category/{id}', [CategoryController::class, 'show']);
        Route::delete('/category/{id}', [CategoryController::class, 'destroy']);
    });

    
    

    Route::middleware(CheckIsUser::class)->group(function() {
        Route::post('/post', [PostController::class, 'store']);
        Route::put('/post/{id}', [PostController::class, 'update']);
        Route::delete('/post/{id}', [PostController::class, 'destroy']);
        Route::get('/myposts', [PostController::class, 'myPosts']);

        Route::post('/comment', [CommentController::class, 'store']);
        Route::put('/comment/{id}', [CommentController::class, 'update']);
        Route::delete('/comment/{id}', [CommentController::class, 'destroy']);
        Route::post('/comment/{id}/like', [LikeController::class, 'store']);
        Route::post('/comment/{id}/like', [LikeController::class, 'store']);
        Route::delete('/comment/{id}/unlike', [LikeController::class, 'destroy']);
Route::get('/post/{id}/comments', [LikeController::class, 'index']);

    });

});