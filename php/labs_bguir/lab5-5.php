<?php

//Задача не содержит конкретных условий(сколько цифр имеет номер кредитной карты и в каком формате задан этот номер)
//Мною предпологается, что цифры не разделены пробелом или иными символами в номере карты, и номер карты состоит из 16 цифр
//Также предполагаю, что входные данные - это строка
$string = "1234123412346789";

$last_numbers = substr($string, 12, 4);

echo '************' . $last_numbers;