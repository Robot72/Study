# This is php-project

Project structure
<pre>
|
|_application
  |_frontend
    |_pages - modules
      |_pg_name_module
        |_controllers
        | |_pg_name.php - the name of the controller
        |_helpers
          |_name_helper.php - the name of the helper. It is JS-file. The file starts with this codes: <script src="good.js"></script>
      

</pre>

Feature of the model-class. It allows add json response for methods. The methods will be execute function of the action controller's. To do http-request may at the url-address: /ajax/module/method
<pre>
public function index($mname)
{
    $this->mname = $mname;
}
</pre>
