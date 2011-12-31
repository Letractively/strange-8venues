/*
	Depth 1
	The Overland
*/
var Overlands = [];
var Overland = function(){
    this.type = Overland_prop.type;
    this.group = Overland_prop.group;
    this.locations = [{
			type: Metropolis_prop, maxi: Metropolis_prop.maxi, mini: Metropolis_prop.mini
		},{
			type: City_prop, maxi: City_prop.maxi, mini: City_prop.mini
		},{
			type: SmallTown_prop, maxi: SmallTown_prop.maxi, mini: SmallTown_prop.mini
		},{
			type: Village_prop, maxi: Village_prop.maxi, mini: Village_prop.mini
		}];
    this.terrain = [Desert, Plains, Grass, Hill, Mountain, River, LowGrass, Sea, Forest];
    this.entry = "open";
    this.startRows = getRandom(10)+8; // 8-18 max
    this.startCols = getRandom(14)+10; // 14-24 max
	this.depth = 1;
};
var Overland_prop = { type: "overland", obj: Overland, group: Overlands, maxi: 1, mini: 1 };

/*
	Depth 2
	Cities, Small Towns, Villages, Castles
*/
var Metropolises = [];
var Metropolis = function(){
    this.type = Metropolis_prop.type;
    this.group = Metropolis_prop.group;
    this.locations = [{
		    type: Office_prop, maxi: 5, mini: 2
		},{
		    type: Shop_prop, maxi: 3, mini: 1
		},{
		    type: Restaurant_prop, maxi: 3, mini: 1
		},{
		    type: House_prop, maxi: 10, mini: 5
	}];
    this.terrain = [Lake, Grass, Forest, Dirt, Concrete];
    this.entry = "open";
    this.startRows = getRandom(8)+5;
    this.startCols = getRandom(8)+5;
	this.depth = 2;
};
var Metropolis_prop = { type: "metropolis", obj: Metropolis, group: Metropolises, maxi: 3, mini: 1 };

var Cities = [];
var City = function(){
    this.type = City_prop.type;
    this.group = City_prop.group;
    this.locations = [{
		    type: Office_prop, maxi: 5, mini: 2
		},{
		    type: Shop_prop, maxi: 3, mini: 1
		},{
		    type: Restaurant_prop, maxi: 3, mini: 1
		},{
		    type: House_prop, maxi: 10, mini: 5
	}];
    this.terrain = [Lake, Grass, Forest, Dirt, Concrete];
	this.entry = "open";
    this.startRows = getRandom(7)+3;
    this.startCols = getRandom(7)+3;
	this.depth = 2;
};
var City_prop = { type: "city", obj: City, group: Cities, maxi: 5, mini: 2 };

var SmallTowns = [];
var SmallTown = function(){
    this.type = SmallTown_prop.type;
    this.group = SmallTown_prop.group;
    this.locations = [{
		    type: Shop_prop, maxi: 3, mini: 1
	    },{
		    type: House_prop, maxi: 5, mini: 3
	    },{
		    type: Restaurant_prop, maxi: 3, mini: 1
	}];
    this.terrain = [Lake, Grass, LowGrass, Forest, Dirt, Concrete]
    this.entry = "open";
    this.startRows = getRandom(4)+5;
    this.startCols = getRandom(4)+5;
	this.depth = 2;
};
var SmallTown_prop = { type: "small_town", obj: SmallTown, group: SmallTowns, maxi: 5, mini: 3 };

var Villages = [];
var Village = function(){
    this.type = Village_prop.type;
    this.group = Village_prop.group;
    this.locations = [{
		    type: Shop_prop, maxi: 3, mini: 1
	    },{
		    type: Restaurant_prop, maxi: 3, mini: 1
	    },{
		    type: House_prop, maxi: 5, mini: 3
	    },{
		    type: Temple_prop, maxi: 1, mini: 1
	}];
    this.terrain = [Lake, Grass, LowGrass, Forest, Dirt, Concrete]
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
	this.depth = 2;
};
var Village_prop = { type: "village", obj: Village, group: Villages, maxi: 8, mini: 4 };

/*
	Depth 3
	Offices, Temples, Houses, Shops, Restaurants, Sanctuaries, Gateways
*/
var Offices = [];
var Office = function(){
    this.type = Office_prop.type;
    this.group = Office_prop.group;
    this.locations = [];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(5)+3;
    this.startCols = getRandom(5)+3;
	this.depth = 3;
	this.doors = 1;
};
var Office_prop = { type: "office", obj: Office, group: Offices, maxi: 20, mini: 3 };

var Temples = [];
var Temple = function(){
    this.type = Temple_prop.type;
    this.group = Temple_prop.group;
    this.locations = [{
			type: Sanctuary_prop, maxi: 1, mini: 1
	}];
    this.terrain = [Concrete, Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
	this.depth = 3;
	this.doors = getRandom(1) + 1;
};
var Temple_prop = { type: "temple", obj: Temple, group: Temples, maxi: 3, mini: 1 };

var Houses = [];
var House = function(){
    this.type = House_prop.type;
    this.group = House_prop.group;
    this.locations = [];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
	this.depth = 3;
	this.doors = getRandom(1) + 2;
};
var House_prop = { type: "house", obj: House, group: Houses, maxi: 20, mini: 1, generated: 0  };

var Shops = [];
var Shop = function(){
    this.type = Shop_prop.type;
    this.group = Shop_prop.group;
    this.locations = [];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
	this.depth = 3;
	this.doors = getRandom(1) + 1;
};
var Shop_prop = { type: "shop", obj: Shop, group: Shops, maxi: 6, mini: 1, generated: 0  };

var Restaurants = [];
var Restaurant = function(){
    this.type = Restaurant_prop.type;
    this.group = Restaurant_prop.group;
    this.locations = [];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
	this.depth = 3;
	this.doors = getRandom(1) + 1;
};
var Restaurant_prop = { type: "restaurant", obj: Restaurant, group: Restaurants, maxi: 6, mini: 1, generated: 0 };

var Sanctuaries = [];
var Sanctuary = function(){
    this.type = Sanctuary_prop.type;
    this.group = Sanctuary_prop.group;
    this.locations = [{
			type: Gateway_prop, maxi: 1, mini: 0
	}];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
	this.depth = 3;
	this.doors = 1;
};
var Sanctuary_prop = { type: "sanctuary", obj: Sanctuary, group: Sanctuaries, maxi:3, mini: 1, generated: 0 };

var Gateways = [];
var Gateway = function(){
    this.type = Gateway_prop.type;
    this.group = Gateway_prop.group;
    this.locations = [];
    this.terrain = [Dirt];
    this.entry = "open";
    this.startRows = 1;
    this.startCols = getRandom(5)+10;
	this.depth = 3;
	this.doors = 2;
};
var Gateway_prop = { type: "gateway", obj: Gateway, group: Gateways, maxi: 1, mini: 1, generated: 0 };
