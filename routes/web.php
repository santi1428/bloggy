<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function(){
//     $posts = App\Post::find(10);
//     return $posts->comments;
//     // $comentario = App\Comment::find(1);
//     // return $comentario->user->name;

// });
// Route::get("/register", "VueController@index");
// Route::get("/login", "VueController@index");

Route::get('/{pages}', "VueController@index")
->where('pages', '(|register|login|posts|logout|posts/create|profile|myposts|recoverpassword)');

Route::get('posts/{id}', "VueController@index");
Route::get('posts/update/{id}', "VueController@index");
Route::get("/register/{email}", "UserController@verifyEmail");
Route::post("/uploadprofileimage", "UserController@uploadProfileImage")->middleware("auth:api");
Route::post("/register", "UserController@register");
Route::post("/login", "UserController@login");
Route::post("/logout", "UserController@logout")->middleware("auth:api");
Route::get("/isloggedin", function(){
    return response()->json(["message" => "You are logged in"], 200);
})->middleware("auth:api");
// Route::get("/index", function(){
//     $token = csrf_token();
//     return response()->json(["csrf_token" => $token]);
// });
Route::get("/userdata", "UserController@show")->middleware("auth:api");
Route::post("/updateuser", "UserController@updateProfile")->middleware("auth:api");
Route::post("/updatepassword", "UserController@updatePassword")->middleware("auth:api");
Route::post("/like", "UserController@like")->middleware("auth:api");
Route::post("/removeLike", "UserController@removeLike")->middleware("auth:api");
Route::post("/recoverpassword", "UserController@recoverPassword");
Route::post("/resetpassword", "UserController@resetPassword");
