<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    $comment = $faker->sentence(rand(15, 30));
    return [
        'UserId' => rand(1, 4),
        'PostId' => rand(1, 240),
        'created_at' => $faker->DateTime('2018-04-25 08:37:17', 'UTC'),
        'updated_at' => $faker->DateTime('2018-04-25 08:37:17', 'UTC'),
        'comment' => $comment
    ];
});
