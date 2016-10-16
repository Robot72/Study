<?php

$string = 'Smith Joun Adamand hello application';

//Получаем массив строк из слов в строке
$array = str_word_count($string, 1);

//Объявление строке в которую будем набирать первые символы для аббривиатуры
$output = '';

for($i = 0; $i < count($array); $i++) {
  //Получение первого символа из слова и добовление в строку результатов
	$output .= substr( $array[$i], 0, 1 );
}

//Делаем все символы в строке заглавными
$output = strtoupper($output);

echo $output;
