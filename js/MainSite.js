window.jQuery = $  = require('jquery');
window.Popper = require('popper.js');
var bootstrap = require('bootstrap');
var test = true;
var pagePath = window.location.pathname.split( '/' );
var activePage = 'index';
if(activePage.length > 0){
	activePage = pagePath[0];
}
if(test){
	activePage = '';
}
console.log(pathArray);