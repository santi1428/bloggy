<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Comment;

class CommentController extends Controller
{

    public function index($id)
    {
        return Comment::select('comments.id', 'comments.comment', 'comments.created_at', 'users.image', 'users.name')
        ->join('users', 'comments.UserId', '=', 'users.id')
        ->where('comments.PostId', '=', $id)->orderBy('comments.created_at', 'DESC')->get();
    }

    public function store(Request $request)
    {
        $request->validate(["comment"]);
        $userId = $request->user()->id;
        $postId = $request->input("postId");
        $comment = $request->input('comment');
        $user = User::find($userId);
        $user->comments()->create([
            'comment' => $comment,
            'PostId' => $postId
        ]);

        return response()->json(["msg" => "todo salio bien", "data" => $request->comment]);
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        $comment = Comment::find($id);
        $comment->delete();
        return response()->json(["message" => "Se ha eliminado el comentario con éxito!"], 200);       
    }
}
