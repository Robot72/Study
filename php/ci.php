<?php
// Code Igniter version 3
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
    $sql->result_array();
    $sql->result_object();
} 
//Ust Query builder
$sql = $this->db->get_where('TBL_NAME', ['id' => 3, 'name' => 'alex']);

//Load and Get config item:
$this->load->config('config_name');
$this->config->item('config_item');

//Work with form validation
$this->load->library('form_validation');
if( $this->form_validation->run() ) { ... } else { ... }
if( $this->form_validation->run('validation_rules') ) { 
    $field = set_value('name');
    ...
} else { 
    $errors = $this->form_validation->error_array();
    ...
}
