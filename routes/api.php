<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'auth:api'], function(){
    
    //Posts api routes
    
    Route::post("/posts", "API\PostController@store")->name("posts.store");
    Route::put("/posts/{post}", "API\PostController@update")->name("posts.update");
    Route::delete("/posts/{post}", "API\PostController@destroy")->name("posts.destroy");
    Route::get("/getmyposts/filtro/{filtro}", "API\PostController@getMyPostsByFilter")->name("posts.getMyPostsByFilter");
    Route::get('verifypostowner/{id}', "API\PostController@verifyPostOwner");
    
    //Comments api routes
    
    Route::post("/comments", "API\CommentController@store")->name("comments.store");
    Route::put("/comments/{comment}", "API\CommentController@update")->name("comments.update");
    Route::delete("/comments/{comment}", "API\CommentController@destroy")->name("comments.destroy");
});

Route::get("/posts/filtro/{filtro}", "API\PostController@showPostsByFilter")->name("posts.showPostsByFilter");
Route::get("/posts/{id}", "API\PostController@show")->name("posts.show");
Route::get("/comments/{id}", "API\CommentController@index")->name("comments.index");


