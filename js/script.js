/* 
	Title: Strange Avenues
	Author: Graham Cranfield
*/
var input = new Input();
var Loading = new D_Loading();
Loading.openMe("Loading...", LoadingAnim + "Building your world");

var statuss = new Statuss();
var activeMap = "none";
var previousMaps=[];
var me = new Player('Inspector');
var Map = new Map();
var World = new World();
var Story = new Story();

World.build();

Loading.closeMe();

oDialog.load('stories/introduction.html');
input.M_Dialog('welcome');

$(document).ready(function(){});

//statuss.show(me.name + ', you wake up in your ' + me.getLocation());
