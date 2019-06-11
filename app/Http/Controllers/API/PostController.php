<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Post;
use App\Http\Controllers\API\DB;

class PostController extends Controller
{

    public function index(Request $request)
    {
        return response()->json(Post::select('id', 'body', 'created_at', 'user_id')->orderBy('created_at', "desc")->with('user:id,name,email')->paginate(5), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate(["post" => "required"]);
        $postData = $request->input("post");
        $user = User::find($request->user()->id);
        $user->posts()->create([
            'body' => $postData
        ]);
        return response()->json(["message"=> "Se ha registrado la publicacion con éxito"], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Post::select('id', 'body', 'created_at', 'user_id')->with('user:id,name,email')->where("id", $id)->get());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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
