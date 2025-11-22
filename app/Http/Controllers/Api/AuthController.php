<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
   public function register(Request $request) {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' =>'required|min:6'
        ]);


        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt( $data['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Account has been created successfully',
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->email,
                'token' => $token,
                'created_at' => $user->created_at
            ]
        ], 201);
   }


   public function login(Request $request) {
    $validasi = $request->validate(['email' => 'required',
     'password' => 'required']);


    if (!Auth::attempt($validasi)) {
        return response()->json([
            'message' => "Wrong email or password"
        ], 400);
    }


    $user = Auth::user();


    $token = $user->createToken('auth_token')->plainTextToken;


    return response()->json([
        "message"  => "Login success.", 
  "data"=> [
    "id" => $user->id,
    "name"=> $user->name,
    "email" => $user->email,
    "role"=> $user->role,
    "token" => $token,
    "created_at"=> $user->created_at
  ]

  ]);

   }

   public function logout(Request $request) {
    

    if (!$request->user()) {
       return response()->json(['message' => "Unauthenticated "], 401);
    }
         $request->user()->currentAccessToken()->delete();
         return response()->json(['message' => "Logout success"]);
    
   

   }

}
