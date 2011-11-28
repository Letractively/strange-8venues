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

LoadMap(Overland_prop.obj, Overland_prop.group);

statuss.add('You wake up.');
$(document).ready(function(){});