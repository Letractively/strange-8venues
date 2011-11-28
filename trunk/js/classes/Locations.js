var Overlands = [];
var Overland = function(){
    this.type = Overland_prop.type;
    this.group = Overland_prop.group;
    this.buildings = [{
			t: Village_prop, maxi: 5, mini: 1
		},{
			t: Castle_prop, maxi: 3, mini: 1
		},{
			t: Temple_prop, maxi: 3, mini: 1
	}];
    this.terrain = [Desert, Plains, Grass, Hill, Mountain, River, LowGrass, Sea];
    this.entry = "open";
    this.startRows = getRandom(10)+8; // 8-18 max
    this.startCols = getRandom(14)+10; // 14-24 max
};
var Overland_prop = { type: "overland", obj: Overland, group: Overlands, maxi: 1, mini: 1, generated: 0 };

var Villages = [];
var Village = function(){
    this.type = Village_prop.type;
    this.group = Village_prop.group;
    this.buildings = [{
			t: Shop_prop, maxi: 3, mini: 1
		},{
			t: Restaurant_prop, maxi: 3, mini: 1
	}];
    this.terrain = [Lake, Grass, LowGrass, Forest, Dirt, Concrete]
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
};
var Village_prop = { type: "village", obj: Village, group: Villages, maxi: 5, mini: 1, generated: 0 };

var Castles = [];
var Castle = function(){
    this.type = Castle_prop.type;
    this.group = Castle_prop.group;
    this.buildings = [];
    this.terrain = [Concrete, Floor, Dirt];
    this.entry = "open";
    this.max = {total:3, perMap:3};
    this.startRows = getRandom(7)+3;
    this.startCols = getRandom(7)+3;
};
var Castle_prop = { type: "castle", obj: Castle, group: Castles, maxi: 3, mini: 1, generated: 0 };

var Temples = [];
var Temple = function(){
    this.type = Temple_prop.type;
    this.group = Temple_prop.group;
    this.buildings = [{
			t: Sanctuary_prop, maxi: 1, mini: 1
	}];
    this.terrain = [Concrete, Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
};
var Temple_prop = { type: "temple", obj: Temple, group: Temples, maxi: 3, mini: 1, generated: 0 };

var Shops = [];
var Shop = function(){
    this.type = Shop_prop.type;
    this.group = Shop_prop.group;
    this.buildings = [];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
};
var Shop_prop = { type: "shop", obj: Shop, group: Shops, maxi: 6, mini: 1, generated: 0  };

var Restaurants = [];
var Restaurant = function(){
    this.type = Restaurant_prop.type;
    this.group = Restaurant_prop.group;
    this.buildings = [];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
};
var Restaurant_prop = { type: "restaurant", obj: Restaurant, group: Restaurants, maxi: 6, mini: 1, generated: 0 };

var Sanctuaries = [];
var Sanctuary = function(){
    this.type = Sanctuary_prop.type;
    this.group = Sanctuary_prop.group;
    this.buildings = [{
			t: Gateway_prop, maxi: 1, mini: 0
	}];
    this.terrain = [Floor];
    this.entry = "open";
    this.startRows = getRandom(3)+3;
    this.startCols = getRandom(3)+3;
};
var Sanctuary_prop = { type: "sanctuary", obj: Sanctuary, group: Sanctuaries, maxi:3, mini: 1, generated: 0 };

var Gateways = [];
var Gateway = function(){
    this.type = Gateway_prop.type;
    this.group = Gateway_prop.group;
    this.buildings = [];
    this.terrain = [Dirt];
    this.entry = "open";
    this.startRows = 1;
    this.startCols = getRandom(5)+10;
};
var Gateway_prop = { type: "gateway", obj: Gateway, group: Gateways, maxi: 1, mini: 1, generated: 0 };