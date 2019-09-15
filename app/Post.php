<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{


        public $primaryKey = "id"; 
        protected $fillable = ['body'];
        protected $hidden = ['pivot'];
        
        public function user(){
            return $this->belongsTo('App\User');
        }

        public function likes()
        {
            return $this->belongsToMany(User::class, "likes", "PostId", "UserId")->select(['PostId']);
        }

        public function comments(){
            return $this->hasMany("App\Comment", "PostId");
        }
    
}
