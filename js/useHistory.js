//
var Obj = {
    id: 2,
    name: 'Test'
};
var arrPropsOfTheObj = Object.keys(Obj);
arrPropsOfTheObj = Object.keys(Obj).sort();

/** It's expression will know distance scrolling top window(display). **/

var scrolled = window.pageYOffset || document.documentElement.scrollTop; 

/** Split of a string to an array **/
var arr = "a,b,c".split(','); // arr = ['a', 'b', 'c']

/** Search a sub string **/
'Good day'.indexOf('day');
if( ~str.indexOf('search') ) { } // Beauty call

/** FOREACH for an array **/
[1, 2, 3, 4, 5].forEach(value, index, array) {
    //to do
}

/** Univeral rounding **/
let roundedValue = Math.round(notRoundedValue * 1000) / 1000);
