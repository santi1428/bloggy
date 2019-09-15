<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Post;

class PostController extends Controller
{

    public function index(Request $request)
    {
        return response()->json(Post::select('id', 'body', 'created_at', 'user_id')->orderBy('created_at', "desc")->with('user:id,name,email,image')->paginate(5), 200);
    }

    public function store(Request $request)
    {
        $request->validate(["post" => "required"]);
        $postData = $request->input("post");
        $user = User::find($request->user()->id);
        $post = $user->posts()->create([
            'body' => $postData
        ]);
        return response()->json(["message"=> "Se ha registrado la publicacion con éxito", "postId" => $post->id], 200);
    }

    public function show($id)
    {
        return response()->json(Post::select('id', 'body', 'created_at', 'user_id')->with('user:id,name,email,image')->where("id", $id)->get());
    }

    public function update($id, Request $request)
    {
        $user = User::find($request->user()->id);
        $post = $user->posts->find($id);
        $post->body = $request->input("postData");
        $post->save();
    }

    public function destroy($post, Request $request)
    {
        $user = User::find($request->user()->id);
        $post = $user->posts->find($post);
        $post->delete();
        return response()->json(["message" => "Se ha eliminado la publicación con éxito!"], 200);       
    }

    public function verifyPostOwner($post, Request $request){
        $user = User::find($request->user()->id);
        $post = $user->posts->find($post);
        if($post){
            return response()->json(["message" => "Es el dueño"], 200);
        }else{
            return response()->json(["message" => "No es el dueño"], 401);
        }
    }

}
