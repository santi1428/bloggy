<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
        public $primaryKey = "id"; 
        protected $fillable = ['body'];

        public function user(){
            return $this->belongsTo('App\User');
        }

        public function likes()
        {
            return $this->belongsToMany(User::class, "likes", "PostId", "UserId");
        }
    
}
