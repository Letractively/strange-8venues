var Squares = [];
var Square = function(loc){
	// Position and contents
	this.loc = loc;
	this.active = false;
	this.x = this.loc[0];
	this.y = this.loc[1];
	this.id = Squares.length;
	this.b;	this.t; this.i; this.p;
	
	// In-map
	this.passable;
	this.isFeature = false;
	
	// Methods
	this.setContents = function(makePassable){
		// Terrain
		var terrains = activeMap.terrain;
		var rand = getRandom(terrains.length);
		this.t = terrains[rand];
		if (makePassable == true) {
			while (this.t.passable == false){
				rand = getRandom(terrains.length);
				this.t = terrains[rand];
			}
		}
		this.passable = this.t.passable;
		this.buildings = this.t.buildings;
		this.onMap.addClass(this.t.type);
	};
	
	this.lookAround = function(r){
		var adjacent=[];
		var startX = this.x-r;
		var startY = this.y-r;
		var endX = this.x+r;
		var endY = this.y+r;
		
		for(ax=startX; ax<=endX; ax++){
			for(ay=startY; ay<=endY; ay++){
				if(getMapSq([ax, ay]).length > 0){
					var s = getMapSq([ax, ay]);
					var sID = s.attr('data-sID');
					adjacent.push(Squares[sID]);
				}
				else{
					adjacent.push('');
				}
			}
		}
		return adjacent;
	};
	this.addToRow = function(row, prepend, makePassable){
		var cellTemplate = '<td id="c_'+this.x+'_'+this.y+'_'+ident+'" data-sID="'+this.id+'"></td>';
		this.hasBuilding = false;
		prepend ? row.prepend(cellTemplate) : row.append(cellTemplate)
		this.onMap = getMapSq([this.x, this.y]);
		this.onMap.append(SquareTemplate);
		this.onMap.addClass('unlit');
		this.setContents(makePassable);
		this.active = true;
	};
	this.whatsHere = function(){
		var s = "<div class='whatshere'>";
		if(this.b != undefined){
			var wb = this.b.type;
				wb = wb.replace('_', ' ');
			s += "<b>Location</b> " + wb + "<br/>";
		}
		var wt = this.t.type;
			wt = wt.replace('_', ' ');
		s += "<b>Terrain</b> " + wt + "<br/>";
		s += "</div>";
		statuss.show(s);
	};
	Squares.push(this);
}
