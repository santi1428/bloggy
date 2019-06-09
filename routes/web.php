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

// Route::get('/', "VueController@index");
// Route::get("/register", "VueController@index");
// Route::get("/login", "VueController@index");

Route::get('/{pages}', "VueController@index")
->where('pages', '(|register|login|posts|logout|posts/create)');

Route::get('posts/{id}', "VueController@index");


Route::get("/register/{email}", "UserController@verifyEmail");
Route::post("/register", "UserController@register");
Route::post("/login", "UserController@login");
Route::post("/logout", "UserController@logout")->middleware("auth:api");
Route::get("/isloggedin", function(){
    return response()->json(["message" => "You are logged in"], 200);
})->middleware("auth:api");