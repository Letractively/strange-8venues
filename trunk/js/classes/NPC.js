var NPCs = [];
var NPC = function(type, loc, name){
	this.name = name;
	this.loc = loc;
	this.inventory = [];
	this.type = type;
	this.init = function(){
	};
	return this;
}