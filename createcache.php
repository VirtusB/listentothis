<?php

$redditData = $_POST['redditData'];

$nowUnix = time();

$data = ['time' => $nowUnix, 'redditData' => $redditData];

$json = json_encode($data);

file_put_contents(__DIR__ . '/cache.json', $json);