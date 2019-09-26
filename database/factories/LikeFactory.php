<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Like;
use Faker\Generator as Faker;

$factory->define(Like::class, function (Faker $faker) {
    return [
        'PostId' => rand(1, 240),
        'UserId' => rand(1, 30)
    ];
});
