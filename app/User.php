<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Laravel\Passport\HasApiTokens;



class User extends Model implements AuthenticatableContract
{
    use Authenticatable, HasApiTokens;

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function likes()
    {
        return $this->belongsToMany(Post::class, "likes", "UserId", "PostId");
    }

}
