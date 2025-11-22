<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
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

Route::get('/post', [PostController::class, 'index']);
Route::get('/post/{id}', [PostController::class, 'show']);


Route::middleware('auth:sanctum')->group(function() {
    Route::post('/auth/logout', [AuthController::class, 'logout']);



    Route::middleware(CheckIsAdmin::class)->group(function() {
    Route::post('/category', [CategoryController::class, 'store']);
    Route::put('/category/{id}', [CategoryController::class, 'update']);
        Route::get('/category', [CategoryController::class, 'index']);
        Route::delete('/category/{id}', [CategoryController::class, 'destroy']);
    });


    Route::middleware(CheckIsUser::class)->group(function() {
        Route::post('/post', [PostController::class, 'store']);
        Route::put('/post/{id}', [PostController::class, 'update']);
        Route::delete('/post/{id}', [PostController::class, 'destroy']);
    });

});