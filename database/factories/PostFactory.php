<?php

use Faker\Generator as Faker;

$factory->define(App\Post::class, function (Faker $faker) {
    $body = $faker->sentence(80);
    return [
        'user_id' => rand(1, 13),
        'body' => $body
    ];
});
