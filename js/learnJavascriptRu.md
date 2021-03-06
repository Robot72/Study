# Document, Events, Interfaces
## Создание графических компонентов
### Графические компоненты


## Документ и объекты страницы
### Окружение: DOM, BOM и JS
BOM - объектная модель браузера.
### Дерево DOM
http://learn.javascript.ru/dom-nodes
- DOM - это представление документа в виде дерева объектов, доступное для изменения в JS.

### Работа с DOM из консоли

http://learn.javascript.ru/dom-console
- Переместится из консоли в элементы
- Выбрать в консоли последние элементы js-ом ($0)

### Навигация по DOM-элементам

http://learn.javascript.ru/traversing-dom

### Attributes and DOM-properties

http://learn.javascript.ru/attributes-and-custom-properties

### Summary
- Creat&Clone element
  - document.createElement('div');
  - document.createTextNode('Exciting today!');
  - document.cloneNode(deep); //if (deep == false) than clone without clildren
- Node properties
  - node.nodeType * 1(element), 3(text) *
  - elem.tagName
  - elem.innerHTML
  - elem.outerHTML
  - node.data & node.nodeValue
  - node.textNode (IE9+)
  - elem.hidden (true/false) (IE10+)
- Attributes
  - elem.getAttrubute(attrName), elem.hasAttribute(attrName), elem.setAttribute(attrName)
  - elem.dataset.* (IE10+)
- Links
  - document.documentElement
  - document.body
  - document.head (IE9+)
  - Only elemens: (All IE9+, except "children" that work IE8-)
    - parentElement
    - nextElementSubling
    - previousElementSubling
    - children, firstElementChild, lastElementChild
  - table.rows[N]
  - tr.cells[N]
- Search
  - \*.querySelector(css);
  - \*.querySelectorAll(css);
  - document.getElementById(id);
  - document.getElementsByClassName(class);
  - document.getElementsByTagName(tag);
  - document.getElementsByTagName(tag);
  - document.getElementsByName(name);
  - elem.matches(css);
  - elem.closest(css);
  - elem1.contains(elem2);
  - elem1.compareDocumentPosition(elem2);
- Updating
  - parent.appendChild(clildElem);
  - parent.removeChild(child);
  - parent.insertBefore(newChild, refNode);
  - parent.insertAfter(newChild, refNode);
  - parent.insertAdjacentHTML("beforeBegin|afterBegin|beforeEnd|afterEnd", html);
  - document.write(....);
- Classes&Styles
  - elem.className
  - elem.classList.add(class), remove(class), toggle(class), contains(class) IE10+
  - elem.style
  - getComputedStyle(elem, '')
- Elements Size&Scroll
  - clientLeft/Top
  - clientWidth/Height
  - scrollWidth/Height
  - scrollLeft/Top
  - offsetWidth/Height
- Page Size&Scroll
  - document.documentElement.clientHeight - height showing area
  - window.pageYOffset || document.documentElement.scrollTop - read scrool
  - window.scrollBy()



## ОСНОВЫ РАБОТЫ С СОБЫТИЯМИ
-------------------------
INTRO BROWSER EVENT
-------------------
Есть три способа назначения обработчиков событий:
Атрибут HTML: onclick="...".
Свойство: elem.onclick = function.
Специальные методы:
Современные: elem.addEventListener( событие, handler[, phase]), удаление через removeEventListener.
Для старых IE8-: elem.attachEvent( on+событие, handler ), удаление через detachEvent.
ПОРЯДОК ОБРАБОТКИ СОБЫТИЙ
-------------------------

    1) JavaScript выполняется в едином потоке. Современные браузеры позволяют порождать подпроцессы Web Workers, они выполняются параллельно и могут отправлять/принимать сообщения, но не имеют доступа к DOM.
    2) Обычно события становятся в очередь и обрабатываются в порядке поступления, асинхронно, независимо друг от друга.
    3) Синхронными являются вложенные события, инициированные из кода.
    4) Чтобы сделать событие гарантированно асинхронным, используется вызов через setTimeout(func, 0).

ОБЪЕКТ СОБЫТИЯ
--------------
Он передается первым аргументом event в обработчик для всех браузеров, кроме IE8-, в которых используется глобальная переменная window.event.
ВСПЛЫТИЕ И ПЕРЕХВАТ
-------------------
http://learn.javascript.ru/event-bubbling
Алгоритм:

    - При наступлении события – элемент, на котором оно произошло, помечается как «целевой» (event.target).
    - Далее событие сначала двигается вниз от корня документа к event.target, по пути вызывая обработчики, поставленные через addEventListener(...., true).
    - Далее событие двигается от event.target вверх к корню документа, по пути вызывая обработчики, поставленные через on* и addEventListener(...., false).

Каждый обработчик имеет доступ к свойствам события:

    - event.target – самый глубокий элемент, на котором произошло событие.
    - event.currentTarget (=this) – элемент, на котором в данный момент сработал обработчик (до которого «доплыло» событие).
    - event.eventPhase – на какой фазе он сработал (погружение =1, всплытие = 3).

Любой обработчик может остановить событие вызовом event.stopPropagation(), но делать это не рекомендуется, так как в дальнейшем это событие может понадобиться, иногда для самых неожиданных вещей.

В современной разработке стадия погружения используется очень редко.

Этому есть две причины:

    1) Историческая – так как IE лишь с версии 9 в полной мере поддерживает современный стандарт.

    2) Разумная – когда происходит событие, то разумно дать возможность первому сработать обработчику на самом элементе, поскольку он наиболее конкретен. Код, который поставил обработчик именно на этот элемент, знает максимум деталей о том, что это за элемент, чем он занимается.

    Далее имеет смысл передать обработку события родителю – он тоже понимает, что происходит, но уже менее детально, далее – выше, и так далее, до самого объекта document, обработчик на котором реализовывает самую общую функциональность уровня документа.
ДЕЛЕГИРОВАНИЕ СОБЫТИЙ
---------------------
Делегирование событий – это здорово! Пожалуй, это один из самых полезных приёмов для работы с DOM. Он отлично подходит, если есть много элементов, обработка которых очень схожа.

Алгоритм:

    1) Вешаем обработчик на контейнер.
    2) В обработчике: получаем event.target.
    3) В обработчике: если event.target или один из его родителей в контейнере (this) – интересующий нас элемент – обработать его.

Зачем использовать:

    - Упрощает инициализацию и экономит память: не нужно вешать много обработчиков.
    - Меньше кода: при добавлении и удалении элементов не нужно ставить или снимать обработчики.
    - Удобство изменений: можно массово добавлять или удалять элементы путём изменения innerHTML.

Конечно, у делегирования событий есть свои ограничения.

    - Во-первых, событие должно всплывать. Нельзя, чтобы какой-то промежуточный обработчик вызвал event.stopPropagation() до того, как событие доплывёт до нужного элемента.
    - Во-вторых, делегирование создает дополнительную нагрузку на браузер, ведь обработчик запускается, когда событие происходит в любом месте контейнера, не обязательно на элементах, которые нам интересны. Но обычно эта нагрузка настолько пустяковая, её даже не стоит принимать во внимание.

ПРИЕМ ПРОЕКТИРОВАНИЯ "ПОВЕДЕНИЕ"
--------------------------------
Прием состоит из двух частей:

    1)Элементу ставится атрибут, описывающий его поведение.
    2)При помощи делегирования ставится обработчик на документ, который ловит все клики и, если элемент имеет нужный атрибут, производит нужное действие.

Шаблон «поведение» удобен тем, что сколь угодно сложное JavaScript-поведение можно «навесить» на элемент одним лишь атрибутом. А можно – несколькими атрибутами на связанных элементах.
ДЕЙСТВИЯ БРАУЗЕРА ПО-УМОЛЧАНИЮ
------------------------------

    1) Браузер имеет встроенные действия при ряде событий – переход по ссылке, отправка формы и т.п. Как правило, их можно отменить.
    2) Есть два способа отменить действие по умолчанию: первый – использовать event.preventDefault() (IE8-: event.returnValue=false), второй – return false из обработчика. Второй способ работает только если обработчик назначен через onсобытие.
ГЕНЕРАЦИЯ СОБЫТИЙ НА ЭЛЕМЕНТАХ
------------------------------
В 98% случаев, когда разработчик начинающего или среднего уровня хочет сгенерировать встроенное событие – это вызвано «кривой» архитектурой кода, и взаимодействие нужно на уровне выше.
Как правило события имеет смысл генерировать:

    Либо как явный и грубый хак, чтобы заставить работать сторонние библиотеки, в которых не предусмотрены другие средства взаимодействия.
    Либо для автоматического тестирования, чтобы скриптом «нажать на кнопку» и посмотреть, произошло ли нужное действие.
    Либо при создании своих «элементов интерфейса». Например, никто не мешает при помощи JavaScript создать из <div class="calendar"> красивый календарь и генерировать на нём событие change при выборе даты. Эту тему мы разовьём позже.

##СОБЫТИЯ В ДЕТАЛЯХ

#Additional
##Веб-компоненты: взгляд в будущее

##РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ
Паттерны и флаги
----------------

- Регулярное выражение состоит из шаблона и необязательных флагов g(много совпадений), i(нет регистровой зависимости) и m(включает многострочный режим).
- Поиск по регулярному выражению без флагов и спец. символов, которые мы изучим далее – это то же самое, что и обычный поиск подстроки в строке. Но флаги и спец. символы, как мы увидим далее, могут сделать его гораздо мощнее.
- Метод строки str.search(regexp) возвращает индекс, на котором найдено совпадение.

Методы RegExp и String
----------------------

Для поиска одного совпадения
- Найти позицию первого совпадения – str.search(reg).
- Найти само совпадение – str.match(reg).
- Проверить, есть ли хоть одно совпадение – regexp.test(str) или str.search(reg) != -1. `/MY/i.test('hello my friend, hello my enemies!');` `"hello".search(/h/gi); `
- Найти совпадение с нужной позиции – regexp.exec(str), начальную позицию поиска задать в regexp.lastIndex.
Для поиска всех совпадений:
- Найти массив совпадений – str.match(reg), с флагом g.
- Получить все совпадения, с подробной информацией о каждом – regexp.exec(str) с флагом g, в цикле.
Для поиска-и-замены: : - Замена на другую строку или результат функции -- `str.replace(reg, str|func)`
Пример "регулярки":
`srt.replace(/hello/gi, 'bye-bye');`
Для разбивки строки на части:
- str.split(str|reg)

Классы и спецсимволы
--
- \d – цифры.
- \D – не-цифры.
- \s – пробельные символы, переводы строки.
- \S – всё, кроме \s.
- \w – латинница, цифры, подчёркивание '_'.
- \W – всё, кроме \w.
- '.' – точка обозначает любой символ, кроме перевода строки.
- \b - Граница слова
- \B - не граница слова
- **\ - используй обратный слэш, когда нужно экранировать спец. символы рег. выражений**
- **$$ - вставляет символ доллара при замене**

Если хочется поискать именно сочетание "\d" или символ «точка», то его экранируют обратным слэшем, вот так: \\.

Заметим, что регулярное выражение может также содержать перевод строки \n, табуляцию \t и прочие спецсимволы для строк. Конфликта с классами не происходит, так как для них зарезервированы другие буквы.

Наборы и диапазоны
--
Если в регулярном выражении несколько символов или символьных классов заключены в квадратные скобки […], то это означает "искать любой символ из указанных в […]".
- конструкция [^ ] означает инверсию или "кроме"
- может использоваться как диапазон, а не набор символов: [a-z]

#Language JS

##STRUCTURE OF THE DATA

###Introduce for properties and methods

Все значения в JavaScript, за исключением null и undefined, содержат набор вспомогательных функций и значений, доступных «через точку».

###Numbers

Все числа в JavaScript, как целые так и дробные, имеют тип Number и хранятся в 64-битном формате IEEE-754, также известном как «double precision».

Способы записи:

    0xFF
    2e10
    2e-5

Деление на ноль и Infinity

NaN (Not a number)

    Возвращается, когда не может быть совершена математическая операция.
    Значение NaN – единственное, в своем роде, которое не равно ничему, включая себя.
    Значение NaN можно проверить специальной функцией isNaN(n),
    Значение NaN «прилипчиво». Любая операция с NaN возвращает NaN.

- Числа могут быть записаны в шестнадцатиричной, восьмеричной системе, а также «научным» способом.
- В JavaScript существует числовое значение бесконечность Infinity.
- Ошибка вычислений дает NaN.
- Арифметические и математические функции преобразуют строку в точности в число, игнорируя начальные и конечные пробелы.
- Функции parseInt/parseFloat делают числа из строк, которые начинаются с числа.
- Есть четыре способа округления: Math.floor, Math.round, Math.ceil и битовый оператор. Для округления до нужного знака используйте +n.toFixed(p) или трюк с умножением и делением на 10p.
- Дробные числа дают ошибку вычислений. При необходимости ее можно отсечь округлением до нужного знака.
- Случайные числа от 0 до 1 генерируются с помощью Math.random(), остальные – преобразованием из них.

###String

http://learn.javascript.ru/string

    var str = "Good day! Gooood-good how are you? are";
    var target = "are";
    var pos = -1;
    while( (pos = str.indexOf(target, pos + 1)) != -1 ) {
        alert(pos);
    }

    String.fromCharCode(1024)   //Получает символ по его коду
    str.charCodeAt(pos);      //получает код символа

    //Сравнение строк! Самый надедный способ:
    var str = "Вася";
    var str.localeCompore(str2); // return -1 or 0 or 1 . Подробно эта тема освещена http://learn.javascript.ru/intl


###Methods of the array

http://learn.javascript.ru/array-methods

- [1, 2, 3, 4, 5, 6, 7].splice(1, 1); // return [1, 3, 4, 5, 6, 7]
- [1, 2].slice(1); // return [1]
- [1, 2, 3, 12].sort(); // return [1, 12, 2, 3]

###Arrays(iteration methods)

- arr.forEach( function(item, i, arr) {  } );
- arr.filter( function(item, i, arr) { return item > 0 ? true : false } );
- arr.map( function(item, i, arr) { return item.length } );
- arr.some( function(item) { return item>0 ? true : false } );     arr.every( function(item) {return item>0 ? true : false } );
- arr.reduce( function(previousValue, currentItem, i, arr) { return previousValue + currentItem; };    and to be method reduceRight

###Psevdoarray of array

- arguments has prop ".length" and Psevdoarray isn't array or object
- deprecated props: arguments.callee, arguments.caller, arguments.callee.caller
- if may be null or 0 use operator ||
- func(options) {}       options = {prop1: 'd', prop2: '2'}

##Operators

###Побитовые операторы

    AND(и) ( & )
    OR(или) ( | )
    XOR(побитовое исключающее или) ( ^ )
    NOT(не) ( ~ )
    LEFT SHIFT(левый сдвиг) ( << )
    RIGHT SHIFT(правый сдвиг) ( >> )
    ZERO-FILL RIGHT SHIFT(правый сдвиг с заполнением нулями) ( >>> )

Функции для работы с побитовыми операторами
var access = parseInt('110000', 2); //Получение числа из строки
var access = access.toString(2) //Обратно двоичную строку из числа

##Замыкания и область видимости
###Global object
Перед выполненим кода,в результате инициализации:
- Все функции объявленные как **Function Decloration** доступны для использования и созданы полностью.
- Переменные объявлены, **НО** равны *undefined*, присваивание выполнится тогда, когда дойдет до них выполение.

###Loopback. Function internally system.
**Замыкания** - это функция со всеми внешними переменными которые ей доступн(чаще имеются ввиду только переменные).
Замыкания в JS означает следующее:
- Все параметры и переменные функции являются свойствами объекта LexicalEnvironment. Каждый запуск функции создает такой объект, на верхнем уровне - это глобальные объект(т.е. чаще всего window).
- При создании функции она получает системное св-во [[Scope]], которое ссылается на LexicalEnvironment в котором она была создана.
- При каждом вызове функции, если в ее теле не будет найдено объявление(var) некоторой переменной, которая используется в ней, то будет осуществлятся поиск во внешнем LexicalEnvironment c Место своего "рождения" этой переменной, через [[Scope]].

###[[Scope]] для new Function
- Функции созданные с помощью конструкции new Function() ссылаются в [[Scope]] не на внешний объект переменных, а на window.
- Такие функции не могут использовать замыкание. Если понадобиться передать внешние переменные, то можно передать в качестве параметров.

### Прием проектирования "Модуль"
Конструкция модуль (function() { }());
- без скобок интрерпретатор пытается прочитать Function Declaration, а имени у функции нет, тогда вылетает ошибка.
- даже если имя поставить, то работать не будет, разрешено вызывать на месте только Function Expression.

    Узнал о Lodach библиотеке, может делать глубокую копию объектов. Еще узнал о том, что модуль можно передать через return(экспорт, через return), а не только через свойство window.

### Manage by memory
- http://learn.javascript.ru/memory-management
- https://ru.wikipedia.org/wiki/%D0%A1%D0%B1%D0%BE%D1%80%D0%BA%D0%B0_%D0%BC%D1%83%D1%81%D0%BE%D1%80%D0%B0_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)

##Object methods
###Object methods, this
- Reference type

###Conversion objects: toString and valueOf
There are object methods. I may to override them and use for compare and othere tasks.
http://learn.javascript.ru/object-conversion

###Object descriptor, getter and setter
http://learn.javascript.ru/descriptors-getters-setters
- Object.key(obj)
- Object.defineProperty(obj, {descriptor: value});
- Object.defineProperties(obj, {
    prop: descriptors,
    prop2: descriptors2
    })
- Object.getOwnPropertyNames(obj)   
- Object.getOwnPropertyNames(obj, 'prop') // obj[prop]

###Static and Fabric methods
http://learn.javascript.ru/static-properties-and-methods
- Общие действия данного типа, имеющие отношения ко всем экземплярам этого типа.
- Методы не привязанные к конкретному объекту, например сравнение.
- Вспомогательные методы, которые полезны вне объекта, например для форматирования даты.
- ФАБРИЧНЫЕ МЕТОДЫ(чтобы не плодить полиморфные меторы или полиморфный конструктор) - улучшают читаемость и поддержку кода, делают более надежной систему.

###Method call and apply

    function showFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    var user = {
        firstName: 'Alexander',
        lastName: 'Block'
    };

    showFullName()


##Others features of the Language
###[[Class]], instanceof
