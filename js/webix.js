//Iterate over all rows in the table
ui.datatable(function (row) { }, [boolean all]) //row is ID of the row.
//
ui.datatable.getItem(row) // row is ID of the row.
ui.datatable.updateItem(row_id, item) // item is object contains data for the row
ui.datatable.parse(data, type);
ui.datatable.clearAll();
//Example init config DataTable
ui({
    view: 'datatable',
    container: '',
    columns: [
        {
            id: '',
            header: [//or string
                {
                    text: '',
                    content: 'nameFilter',
                    css: {}// or string
                }    
            ],
            editor:"text", // 
            sort: 'string',
            adjust: 'data' //Устанавливает ширину колонки ширине максимального значения в данных
            fillspase: 5, //Пропорция ширины колонки относительно других
            template: function (obj) {
                report obj.id;
            }
        }    
    ],
    scheme: {
        $change: function (item) {
            item.$css = 'new_style_class';//Update scheme of the table dependency my own rules.
        }  
    },
    editable: true //Для включения редактирования данных в ячейках таблицы
});
//Data Editors
//editos: 'checkbox', 'inline-checkbox', 'color', 'multiselect' and other.

/**
 * Execute sorting to the column from it name
 */ 
webixTbl.sort('#column_name#', 'asc', 'string');
webixTbl.attachEvent('onEventName', function (arg1, arg2) {
    //Callback function. Found signature on doc-site.
})

/**
 * Extend of the filter
 */
webix.ui.datafilter.summAmountColumn = webix.extend({
    refresh:function(master, node, value){
        var result = 0;
        master.mapCells(null, value.columnId, null, 1, function(value){
            value = value * 1;
            if (!isNaN(value))
                result+=value;
            i+=1;
            return value;
        });
        node.firstChild.innerHTML = '<div class="nowrap text-center">'+getPrice(result)+'</div>';
    }                                                   
}, webix.ui.datafilter.summColumn);
