###Загрузка файлов 
####Загрузка методом POST
----------------------------
Замечание:
Cледует убедиться, что в атрибутах формы указан enctype="multipart/form-data".
Смежные замечания по конфигурации
Директивы *file_uploads*, *upload_max_filesize*, *upload_tmp_dir*, *post_max_size* и *max_input_time* конфигурационного файла **php.ini**
$_FILES['userfile'] - содержит все сведения о файле
$_FILES['userfile']['tmp_name'] - временное имя сохрененного файла, загруженного на сервер.
