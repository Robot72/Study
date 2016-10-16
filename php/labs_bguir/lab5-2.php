<?php

$string = 'абвг2д3еж1з0к9лм8но7пр6с5ту4ф3х21';

$string = str_replace('0', '*', $string);
$string = str_replace('1', '*', $string);
$string = str_replace('2', '*', $string);
$string = str_replace('3', '*', $string);
$string = str_replace('4', '*', $string);
$string = str_replace('5', '*', $string);
$string = str_replace('6', '*', $string);
$string = str_replace('7', '*', $string);
$string = str_replace('8', '*', $string);
$string = str_replace('9', '*', $string);

echo $string;
