<?php
//Registration variable with $_SESSION
session_start();
if( !isset($_SESSION['count']) ) {
    $_SESSION['count'] = 0;
} else {
    $_SESSION['count'] ++ ;
}

/* ARRAYs */
array_splice(array &$input, int $offset, [, int $length [, array $replacement]]);
$reverseArr = array_reverse($array);
array_fill_keys(['key1', 'key2'], 'value'); //: array

date('Y:m:d H:i:s');

header('Content-Type: text/html; charset=utf-8;');
serialize($obj);
unserialize($str);

strtolower($str);
intval($value);

file_get_content($file);
file_put_content($file);
