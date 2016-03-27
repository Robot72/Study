<?php
//Registration variable with $_SESSION
session_start();
if( !isset($_SESSION['count']) ) {
    $_SESSION['count'] = 0;
} else {
    $_SESSION['count'] ++ ;
}

array_splice(array &$input, int $offset, [, int $length [, array $replacement]]);

date('Y:m:d H:i:s');
