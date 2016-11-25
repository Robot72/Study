// https://habrahabr.ru/post/176505/


<?php

abstract class InitStrategy 
{
	
	public abstract function make();	
	
}

class FullLogInitStrategy extends InitStrategy 
{
	
	public function make()
	{
		
	}
	
}

class RapidInitStrategy extends InitStrategy
{
	
	public function make()
	{
		
	}
	
}


class StartApplication 
{

	if($user->os == 'Windows XP') {
		$appTrigger = new RapidInitStrategy();
		$appTrigger->make();
	}
	
	if($user->os == 'Mac OS') {
		$appTrigger = new FullLogInitStrategy();
		$appTrigger->make();
	}
	
}
