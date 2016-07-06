<?php 
// Component - компонент 
// объявляет интерфейс для компонуемых объектов; 
// предоставляет подходящую реализацию операций по умолчанию, 
// общую для всех классов; 
// объявляет интерфейс для доступа к потомкам и управлению ими; 
// определяет интерфейс доступа к родителю компонента в рекурсивной структуре 
// и при необходимости реализует его. Описанная возможность необязательна; 
abstract class Component { 
	protected $name; 
	// Constructor 
	public function __construct($name) 
	{ 
		$this->name = $name; 
	} 
	
	public abstract function Add(Component $c); 
	public abstract function Remove(Component $c); 
	public abstract function Display(); 
} 

// Composite - составной объект 
// определяет поведение компонентов, у которых есть потомки; 
// хранит компоненты-потомоки; 
// реализует относящиеся к управлению потомками операции и интерфейс 
class Composite extends Component 
{ 
	private $children = array(); 
	public function Add(Component $component) 
	{ 
		$this->children[$component->name] = $component; 
	} 
	
	public function Remove(Component $component) 
	{ 
		unset($this->children[$component->name]); 
	} 
	
	public function Display()
	{ 
		foreach($this->children as $child) 
			$child->Display(); 
	} 
} 

// Leaf - лист 
// представляет листовой узел композиции и не имеет потомков; 
// определяет поведение примитивных объектов в композиции; 
class Leaf extends Component 
{ 
	public function Add(Component $c) : string
	{ 
		print ("Cannot add to a leaf"); 
	} 
	
	public function Remove(Component $c) : string
	{ 
		print("Cannot remove from a leaf"); 
	} 
	
	public function Display()
	{ 
		print_r($this->name . '<br>'); 
	} 
} 

// Create a tree structure 
$root = new Composite("root"); 
$root->Add(new Leaf("Leaf A")); 
$root->Add(new Leaf("Leaf B")); 
$comp = new Composite("Composite X"); 
$comp->Add(new Leaf("Leaf XA")); 
$comp->Add(new Leaf("Leaf XB")); 
$root->Add($comp); $root->Add(new Leaf("Leaf C")); // Add and remove a leaf 
$leaf = new Leaf("Leaf D"); 
$root->Add($leaf); 
$root->Remove($leaf); // Recursively display tree 
$root->Display();
