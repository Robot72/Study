<?php

$eng_string = 'abcdefghijklmnoprst';

$str_length = strlen($eng_string);

$output_string = '';

for($i = 0; $i < $str_length; $i += 3) {
	
	if($i + 3 <= $str_length) {
		$output_string .= substr($eng_string, $i, 2);
		$output_string .= '$';
	} else {
		$output_string .= substr($eng_string, $i);
	}
	
}

echo $output_string;
