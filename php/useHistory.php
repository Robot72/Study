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

/* STRINGs */
serialize($obj);
unserialize($str);
strtolower($str);
intval($value);
$str = <<<EOT
   many string
EOT;

/* FILES */
file_get_content($file);
file_put_content($file);
substr(sprintf('%o', fileperms('filename')), -3); //Get permissions code for access to perpose file

/** SPL **/
$array = [['d', 'f' => 'd'], 'e'];
$arrIter = new \RecursiveArrayIterator($array);
$iterator = new \RecursiveIteratorIterator($arrIter, \RecursiveIteratorIterator::SELF_FIRST);
$iterator->rewind();
while ( $iterator->valid() ) {
    $currentDepth = $iterator->getDepth();
    $currentKey = $iterator->key();
    echo $currentKey;
    $iterator->next();
}

/** 
Send file to output throw header()
**/
header('Content-Type: application/txt');
header('Content-Disposition: attachment; filename="odata-log.txt"');
$file = 'text.txt';
readfile( $file );
