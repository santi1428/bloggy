<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Post;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{

    public function index(Request $request)
    {
        return response()->json(Post::select('posts.id', DB::raw('(SELECT COUNT(*) FROM comments WHERE PostId = posts.id) AS comments_amount'), DB::raw('(SELECT COUNT(*) FROM likes WHERE PostId = posts.id) AS likes_amount'), 'posts.body', 'posts.created_at', 'posts.user_id as userId', 'users.name as userName', 'users.email as userEmail', 'users.image as userImage')->join('users', 'posts.user_id', '=', 'users.id')->orderBy("created_at", "desc")->paginate(5), 200);
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
        return response()->json(Post::select('posts.id', DB::raw('(SELECT COUNT(*) FROM likes WHERE PostId = posts.id) AS likes_amount'), DB::raw('(SELECT COUNT(*) FROM comments WHERE PostId = posts.id) AS comments_amount'), 'posts.body', 'posts.created_at', 'posts.user_id as userId', 'users.name as userName', 'users.email as userEmail', 'users.image as userImage')->join('users', 'posts.user_id', '=', 'users.id')->where("posts.id", $id)->get(), 200);
        // return response()->json(Post::select('id', 'body', 'created_at', 'user_id')->with('user:id,name,email,image')->where("id", $id)->get());
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


    public function getMyPosts(Request $request){
        $userId = $request->user()->id;
        return response()->json(Post::select('posts.id', DB::raw('(SELECT COUNT(*) FROM comments WHERE PostId = posts.id) AS comments_amount'), DB::raw('(SELECT COUNT(*) FROM likes WHERE PostId = posts.id) AS likes_amount'), 'posts.body', 'posts.created_at', 'posts.user_id as userId', 'users.name as userName', 'users.email as userEmail', 'users.image as userImage')->join('users', 'posts.user_id', '=', 'users.id')->where('posts.user_id', $userId)->orderBy("created_at", "desc")->paginate(5), 200);
    }


}
