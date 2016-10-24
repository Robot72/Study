moment().format('MM/YYYY'); //get current month and year
moment('not is a re').isValit();
moment().endOf().format('DD/MM/YYYY');
moment().startOf().format('DD/MM/YYYY');
moment().month();
moment().month(2);
moment().day();
moment().add(2, 'day');
moment().subtract(2, 'month');
moment().format('MMMM');

//Differerent duration
var from = moment(params.dateFrom, 'DD.MM.YYYY');
var to = moment(params.dateTo, 'DD.MM.YYYY');                
console.log( moment.duration(to.diff(from)).asDays() );
