/* 
	Title: Strange Avenues
	Author: Graham Cranfield
*/
var statuss = new Statuss();

var activeMap = "none";
var previousMaps=[];

var me = new Player('Graham');
var input = new Input();

var Map = new Map();
var World = new World();
World.build();

statuss.add('You wake up.');
$(document).ready(function(){});