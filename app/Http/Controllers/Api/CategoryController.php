<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['data' => Category::select('id', 'name', 'slug')->get()]);
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
            'name' => 'required',
            'slug' => 'required|unique:categories,slug'
        ]);


       $category = Category::create($data);


        return response()->json([
                "message" => "New catecory has been created.",
  "data" => [
    "id" => $category->id,
    "name" => $category->name,
"slug" => $category->slug,
    "created_at" => $category->slug
  ], 

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

        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                "message" => "category not found"

            ], 404);
        }

           $data = $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:categories,slug'
        ]);

        $category->update($data);
        return response()->json([
            "message" => "category has been updated"

        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json(["message"=> "Category has been deleted."]
    );
    }
}
