<?php

use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    $body = $faker->sentence(100);
    return [
        'user_id' => rand(1, 2),
        'body' => $body
    ];
});
