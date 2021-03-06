# Article translates
## XXE processing from WIKI
1) https://www.owasp.org/index.php/XML_External_Entity_(XXE)_Processing

2) words:
- vulnerabilities - уязвимости
- last revision - последняя редакция
- **against** - против
- forgery - подделки
- impacts - воздействия
- to assumed - предпологает (гл), предпологаемый(прич).
- disclosing - раскрытие (сущ)
- sensitive - воспреимчивый, чувствительный (прил)
- to pivot - для разворота, вращаться, вертеться (гл)

3) Translates:
XML External Entity(XML внешняя сущность) - вид атаки направленной на приложение, которое на входе разбирает XML-данные. Эта атака происходит, когда входной XML содержит в себе ссылки на внешние сущности, при которой XML-парсер слабо настроен. Эта атака может приводить к раскрытию конфеденциальных данных, отказу в обслуживании сервиса, подделки запросов на стороне сервера, сканирование портов с точки зрения машины, на которой расположен парсер и другие воздействия на систему.

XML 1.0 стандарт определяет структуру документа. Стандарт определяет принцип вызова сущностей, которые являются еденицей хранения определенного типа. Существует несколько различных типов сущностей: внешние сущности, которые могут получать доступ к локальному и удаленному содержимому через объявленный идентификатор системы. Системным идентификатором считается URI, который может быть dereferenced (accessed) когда XML-процессор разбирает сущность. Затем XML-процессор заменяет вхождения именованного внешнего объекта содержимым, разыменованным системным идентификатором **(!)**. Если идентификатор содержит испорченные данные и XML парсер разыменовывает эти фальсифицированные данные, то в таком случае XML-процессор может разглашать конфиденциальную информацию, которая обычно не доступна для приложения. Похожие направления атаки могут использовать внешние DTD, внешние таблицы стилей, внешние схемы и т.д. которые, когда включены, позволяют совержить подобные атаки.

Атаки могут включать в себя раскрытие локальных файлов, которые могут содержать конфиденциальные данные, например пароли или личные данные пользователи, использующие файл: схемы или относительный путь в системном идентификаторе. Так как атака происходит к приложению, которое обрабатывает XML-документ, то злоумышленник может использовать это приложение, чтобы обращаться к другим внутренним системам. В следствии, возможно, получить досутп к другому контенту через http(s) - запросы или осуществить атаку путем подделки межсайтовых запросов к любым незащищенным внутренним службам. В некоторых особо исключительных ситуациях, библиотеки XML-парсеров, могут быть уязвимы для клиентских программ настолько, что, позволит выполнить произвольный код под учетной записью приложение **(!)**. NEXT sentence**(!)**

Обратите внимание, что приложению не нужно явно возвращать ответ злоумышленнику для раскрытия информации. Злоумышленник может использовать информацию от DNS для фильтрации данных через имена субдоменов DNS-сервера, которые он контролирует.

Факторы риска:
- Приложение использует парсер XML-документов.
- Фальсифицированных данных допускается в рамках системы часть идентификатора сущности, в декларации типа документа (dtd). **(!)**
- XML-процессор сконфигурирован для проверки и обработки dtd.
- XML-процессор сконфигурирован для разрешения внешних сущностей в dtd.

4) New inforamtion:

- server side request forgery

5) Additional links:

- https://sensepost.com/blog/2014/revisting-xxe-and-abusing-protocols/
- http://phpsecurity.readthedocs.io/en/latest/Injection-Attacks.html#xml-external-entity-injection

## Revisting XXE and abusing protocols

1) https://sensepost.com/blog/2014/revisting-xxe-and-abusing-protocols/

2) words:
- revesting           - восстановление
- abusing             - злоупотребление
- 

3) Translates:

## Talking about healthy sleep in english
http://engblog.ru/talking-about-healthy-sleep-in-english
