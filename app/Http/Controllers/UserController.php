<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use Carbon\Carbon;

class UserController extends Controller
{

    public function login(Request $request){
        $email = $request->input("correo");
        $password = $request->input("contrasena");
        $credentials = ["email" => $email, "password" => $password];
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            $token->save();
            return response()->json([
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()
            ]);
        }else{
            return response()->json([
                'message' => 'Unauthorized'], 401);
        }
    }

    public function verifyEmail($email) {     
         $user = User::where("email", "=", $email)->first();
         if($user){
             return response()->json(0);            
         }else {
            return response()->json(1);         
         }
    }

    public function register(Request $request){
                $request->validate(["nombre" => "required", "correo" => "required|unique:users,email|email", "contrasena" => "required"]);           
                $user = new User();      
                $user->name = $request->input("nombre");     
                $user->email = $request->input("correo");     
                $user->password = Hash::make($request->input("contrasena"));     
                $user->save();
    }

    public function logout(Request $request){
            $token = $request->user()->token();
            $token->delete();
            return response()->json(["message" => "You have been succesfully logged out!"], 200);
    }
}
