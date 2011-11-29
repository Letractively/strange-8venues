/* 
	Title: Strange Avenues
	Author: Graham Cranfield
*/
var statuss = new Statuss();

var activeMap = "none";
var previousMaps=[];

var Map = new Map();
var me = new Player('Graham');
var input = new Input();

// Create the overland map
Map.init(new Overland(), 0, Sea);

statuss.add('You wake up.');
$(document).ready(function(){});