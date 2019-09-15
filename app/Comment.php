<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';

    protected $primaryKey = 'id';

    protected $fillable = ['comment', 'PostId'];

    public function user(){
        return $this->belongsTo('App\User', 'UserId')->select(["UserId", "comment", "created_at"]);
    }
 

}
