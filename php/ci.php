<?php
//Models
//  Connecting to your DB
//  Connectivity settings, as defined in your database config file will be used
$this->load->model('model_name', '', TRUE);

//Get segment path from uri
$this->uri->segment($int); 

//Use paginator
$this->load->library('pagination');

$config['base_url'] = 'http://example.com/index.php/test/page/';
$config['total_rows'] = 200;
$config['per_page'] = 20;

$this->pagination->initialize($config);

echo $this->pagination->create_links();

//DB quick start:
$sql = $this->db->query('SELECT * FROM TABLE');
if($sql->num_rows() > 0) {
    $sql->result(); // return array of the stdClassES
} 
