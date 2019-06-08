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

Route::group(['middleware' => 'auth:api'], function()
{
    Route::post("/posts", "API\PostController@store")->name("posts.store");
    Route::put("/posts/{post}", "API\PostController@update")->name("posts.update");
    Route::delete("/posts/{post}", "API\PostController@destroy")->name("posts.destroy");

});
Route::get("/posts", "API\PostController@index")->name("posts.index");
Route::get("/posts/{post}", "API\PostController@show")->name("posts.show");


