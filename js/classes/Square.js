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
						this.vicinity.push(vType);
					}
					else{
						this.vicinity.push('');
					}
				}
			}
		}
		//return this.vicinity;
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
		s += "</div>";
		statuss.show(s);
	};
	Squares.push(this);
}