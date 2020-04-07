<?php

function logVisit() {
    date_default_timezone_set('Europe/Copenhagen');
    $ip = get_ip_address(false);
    $date = date('d-m-Y H:i:s');

    $log = "\n$date \t User with IP $ip visited";

    file_put_contents(__DIR__ . '/log.txt', $log, FILE_APPEND);
}

function get_ip_address($strict = true){
    foreach (array('HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_FORWARDED', 'HTTP_X_CLUSTER_CLIENT_IP', 'HTTP_FORWARDED_FOR', 'HTTP_FORWARDED', 'REMOTE_ADDR') as $key){
        if (array_key_exists($key, $_SERVER) === true){
            foreach (explode(',', $_SERVER[$key]) as $ip){
                $ip = trim($ip);

                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false){
                    return $ip;
                }

                if (!$strict) {
                    return $_SERVER['REMOTE_ADDR']; // upræcis.
                }
            }
        }
    }
    return false;
}