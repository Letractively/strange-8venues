// Reattach square references when loading a map
var rebindSquares = function(){
	for(i=0; i<Squares.length; i++){
		Squares[i].onMap = getMapSq([Squares[i].x,Squares[i].y]);
	}
};
var Squares = [];
var Square = function(loc, maxSquares){
	this.loc = loc;
	this.active = false;
	this.x = this.loc[0];
	this.y = this.loc[1];
	this.id = Squares.length;
	this.b;	this.t; this.i; this.p;
	this.vicinity = [];
	this.passable;
	
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
		this.onMap.find('.t').addClass(this.t.type);
		
		// Buildings
		var buildings = activeMap.buildings;
		var chance = getRandom(100);
		if(	chance > 70 && this.t.buildings == true && buildings.length > 0 ){
			// MAXIMUMS DONE...HOW TO CHECK FOR MINIMUMS?
			// Check if this map is all full building-wise
			var allFull = 0;
			for(afi=0; afi<buildings.length; afi++){
				if (buildings[afi].generated >= buildings[afi].maxi){
					allFull++;
				}
			}
			// If all buildings haven't been generated
			if (allFull < buildings.length){
				var rand = getRandom(buildings.length);
				var bldg = buildings[rand];
				while(bldg.t.generated >= bldg.t.maxi || bldg.generated >= bldg.maxi){
					var rand = getRandom(buildings.length);
					var bldg = buildings[rand];
				}
				var prevSq = this.id-1;
				prevSq < 0 ? prevSq = 0 : ''
				var abovSq = this.id-activeMap.startCols;
				abovSq < 0 ? abovSq = 0 : ''
				/*
					Generate building if:
						a) fewer than max total existing
						b) fewer than max for this map
						c) no building directly above/beside it
				*/
				if(Squares[prevSq].b == undefined && Squares[abovSq].b == undefined){
					this.b = bldg.t;
					this.onMap.find('.b').addClass(this.b.type);
					bldg.t.generated++;
					bldg.generated++;
				}
			}
			// Build out locations here - generate everything from the start?
		}
		
		// Items
	};
	this.lookAround = function(){
		var vicinitySet = true;
		for(vl=0; vl<9; vl++){
			if(this.vicinity[vl] == undefined){ vicinitySet = false; }
		}
		if(vicinitySet == false){
			this.vicinity = [];
			var xx = new Number(this.x);
			var yy = new Number(this.y);
			var xSq = [xx-1, xx, xx+1];
			var ySq = [yy-1, yy, yy+1];

			for (vy=0; vy<ySq.length; vy++){
				for (vx=0; vx<xSq.length; vx++){
					if(getMapSq([xSq[vx],ySq[vy]]).length > 0){
						var s = getMapSq([xSq[vx],ySq[vy]]);
						var sID = s.attr('data-sID');
						var vType = Squares[sID].t.type;
							vType = vType.replace('_', ' ');
						this.vicinity.push(vType);
					}
					else{
						this.vicinity.push('');
					}
				}
			}
		}
		return this.vicinity.toString();
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
			s += "<b>Building</b> " + wb + "<br/>";
		}
		var wt = this.t.type;
			wt = wt.replace('_', ' ');
		s += "<b>Terrain</b> " + wt + "<br/>";
		//s += "<b>Vicinity</b> " + this.lookAround();
		s += "</div>";
		statuss.show(s);
	};
	Squares.push(this);
}