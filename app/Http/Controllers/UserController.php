<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Mail\RecoverPasswordEmail;
use Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;

class UserController extends Controller
{
    public function login(Request $request){
        $email = $request->input("correo");
        $password = $request->input("contrasena");
        $credentials = ["email" => $email, "password" => $password];
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $user_name = $request->user()->name;
            $user_last_name = $request->user()->last_name;
            $user_id = $request->user()->id;
            $user_image = $request->user()->image;
            $user_email = $request->user()->email;
            $user_likes = Arr::pluck($request->user()->likes, 'PostId');
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            $token->save();
            return response()->json([
                'access_token' => $tokenResult->accessToken,
                'user_id' => $user_id,
                'user_name' => $user_name,
                'user_last_name' => $user_last_name,
                'user_image' => $user_image,
                'user_email' => $user_email,
                'user_likes' => $user_likes
            ]);
        }else{
            return response()->json([
                'message' => 'Unauthorized'], 401);
        }
    }

    public function uploadProfileImage(Request $request){
        $request->validate(["image" => "image|nullable|max:20480"]);
        if($request->hasFile("image")){
            $fileNameWithExt = $request->image->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->image->extension();
            $fileNameToStore = $fileName.'_'.$request->user()->email.'_'.time().'.'.$extension;
            $path = $request->image->storeAs('public/profile_images', $fileNameToStore);   
            $user = User::find($request->user()->id);
            if($user->image !== "noimage.png"){
                Storage::delete('public/profile_images/'.$user->image); 
            }
            $user->image = $fileNameToStore;
            $user->save();
            return response()->json(["imageName" => $fileNameToStore]);
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
        $request->validate(["nombre" => "required", "apellido" => "required", "correo" => "required|unique:users,email|email", "contrasena" => "required"]);           
        $user = new User();      
        $user->name = $request->input("nombre");  
        $user->last_name = $request->input("apellido");   
        $user->email = $request->input("correo");    
        $user->image = "noimage.png";   
        $user->password = Hash::make($request->input("contrasena"));     
        $user->save();
    }

    public function logout(Request $request){
        $token = $request->user()->token();
        $token->delete();
        return response()->json(["message" => "You have been succesfully logged out!"], 200);
    }

    public function show(Request $request){
        return response()->json([
            "name" => $request->user()->name,
            "last_name" => $request->user()->last_name,
            "email" => $request->user()->email,
            "image" => $request->user()->image,
            "likes" => Arr::pluck($request->user()->likes, 'PostId')
        ]);
    }

    public function like(Request $request){
        $request->user()->likes()->attach($request->postId);
        return Arr::pluck($request->user()->likes, 'PostId');
    }

    public function removeLike(Request $request){
        $request->user()->likes()->detach($request->postId);
        return Arr::pluck($request->user()->likes, 'PostId');
    }

    public function updateProfile(Request $request){
        $request->validate(["nombre" => "required", "apellido" => "required", "email" => "email|required", "contrasena" => "required"]);
        $user = User::find($request->user()->id);
        $hashedPassword = $user->password;
        if(Hash::check($request->contrasena, $hashedPassword)){
            if($user->name != $request->nombre){
                $user->name = $request->nombre;
            }
            if($user->last_name != $request->apellido){
                $user->last_name = $request->apellido;
            }
            if(!User::where([["email", "=", $request->email], ["id", "<>", $request->user()->id]])->first()){
                if($user->email != $request->email){
                    $user->email = $request->email;
                }
            }
            $user->save();
            return response()->json([
                'message' => 'Perfil actualizado'], 200);
            }
        else{
            return response()->json([
                'message' => 'Invalid password'], 401);
            }
    }

    public function updatePassword(Request $request){
        $request->validate(["nuevaContrasena" => "required", "contrasena" => "required"]);
        $user = User::find($request->user()->id);
        $hashedPassword = $user->password;
        if(Hash::check($request->contrasena, $hashedPassword)){
            $user->password = Hash::make($request->input("nuevaContrasena"));
            $user->save();
            return response()->json([
                'message' => 'Contraseña actualizada'], 200);
        }else{
            return response()->json([
                'message' => 'Invalid password'], 401);
            
        }
    }

    public function recoverPassword(Request $request){
        $request->validate(["email" => "required|email"]);
        $email = $request->input("email");
        $user = User::where("email", "=", $email)->first();
        if($user){
            $code = $this->generateCode(6);
            $user->reset_password_code = $code;
            $user->save();
            $this->sendRecoverPasswordEmail($user);
            return response()->json(1);            
        }else {
            return response()->json(0);         
        }  
    }

    public function sendRecoverPasswordEmail($user){
        $data = [
            'user_name' => $user->name,
            'reset_password_code' => $user->reset_password_code 
        ];
        Mail::to($user->email)->send(new RecoverPasswordEmail($data));
    }


    function generateCode($n) 
    { 
        $generatedCode = ""; 

        $domain = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"; 
        
        $len = strlen($domain); 
        
        for ($i = 0; $i < $n; $i++){
         
            $index = rand(0, $len - 1); 
            $generatedCode = $generatedCode . $domain[$index]; 
        } 
        
        return $generatedCode; 
    } 

    public function resetPassword(Request $request){
        $request->validate(["codigo" => "required", "email" => "required|email", "nuevaContraseña" => "required"]);           
        $email = $request->input("email");
        $user = User::where("email", "=", $email)->first();
        if($user){
            $codigo = $request->input("codigo");
            if($codigo == $user->reset_password_code){
                $nuevaContraseña = $request->input("nuevaContraseña");
                $user->password = Hash::make($nuevaContraseña);
                $user->reset_password_code = $this->generateCode(8);
                $user->save();
                return response()->json(1);            
            }else{
                return response()->json(0); 
            }
        }else{
            return response()->json([], 400);
        }
    }
  
    
}
