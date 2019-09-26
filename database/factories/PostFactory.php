<?php

use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    $body = $faker->sentence(rand(50, 100));
    return [
        'user_id' => rand(1, 20),
        'body' => $body
    ];
});
