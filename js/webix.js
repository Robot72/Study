//Iterate over all rows in the table
ui.datatable(function (row) { }, [boolean all]) //row is ID of the row.
//
ui.datatable.getItem(row) // row is ID of the row.
ui.datatable.updateItem(row_id, item) // item is object contains data for the row
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
            sort: 'string',
            template: function (obj) {
                report obj.id;
            }
        }    
    ]
})
