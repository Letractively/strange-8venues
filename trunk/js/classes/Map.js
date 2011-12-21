var LoadMap = function(s){
	var MapType = s.b.obj;
	var Group = s.b.group;
	var terr = s.t;
	if(activeMap == "none") {
		var id = 0;
	} else { var id = activeMap.lastID; }
	var exists = false;
	var existsAt;
	// If map exists, load it; otherwise, create it
	for(mi=0; mi<Group.length; mi++){
		if(Group[mi].id == id){
			exists = true;
			Map.loadMe(Group[mi], 'enter');
			break;
		}
	}
	if(exists == false) {
		var m = new MapType();
		Map.init(m, id, terr);
	}
};
var Map = function(){
	// m-> map
	this.init = function(m, id, terr){
		activeMap = m;
		m.id = id;
		m.squares = [];
		var dir = me.lastDir;
		if(dir == undefined){
			var startX = getRandom(m.startCols-1);
			var startY = getRandom(m.startRows-1);
			startX == 0 ? startX = 1 : ""
			startY == 0 ? startY = 1 : ""
			m.startLoc=[startX, startY];
		}
		var startSquares = [
			[Math.floor(m.startCols/2),m.startRows-1],
			[Math.floor(m.startCols/2), 0],
			[m.startCols-1, Math.floor(m.startRows/2)],
			[0, Math.floor(m.startRows/2)]
		];
		switch (dir) {
			case "up" : m.startLoc = startSquares[0]; break;
			case "down" : m.startLoc = startSquares[1]; break;
			case "left" : m.startLoc = startSquares[2]; break;
			case "right" : m.startLoc = startSquares[3]; break;
			default: break;
		}
		me.location = m.type;
		me.coords = m.startLoc;
		
		// Set background color to match terrain
		mapContainerCell.removeClass();
		mapContainerCell.addClass(terr.type);
		m.terr = terr.type;
		
		// Generate map
		setIdent(m.id);
		m.mapGrid = newGrid();
		mapContainer.append(m.mapGrid);
		m.mg = getGrid();
			// Generate Squares+Terrain
			for (i=0; i<m.startRows; i++) {
				m.mg.append(newRow(i));
				var row = getRow(i);
				for (j=0; j<m.startCols; j++) {
					var tc = [j,i];
					// Make square passable?
					var p = false;
					if(dir == undefined){
						if (tc.toString()==m.startLoc.toString()) { p = true; }
					} else {
						for(k=0; k<startSquares.length; k++){
							if (tc.toString()==startSquares[k].toString()) { p = true; }
						}
					}
					var n = new Square([j, i]);
					m.squares.push(n);
					n.addToRow(row, false, p);
				}
			}
			
			// Seek and label terrain features
			generateTerrainLabels(2,7);
			generateTerrainLabels(1,4);
			
			// Generate Locations
			var locations = activeMap.locations;
				// Create array for occupied squares
				var occupado = [];
			for(var bi=0; bi<locations.length; bi++){
				var loc_type = locations[bi].type;
				var total_locs_remaining = loc_type.maxi - loc_type.generated;
				if(total_locs_remaining > 0){
					var loc_max;
					// If the bldg maximum is greater than what's left, set max to what's left
					if(locations[bi].maxi >= total_locs_remaining) {
						loc_max = total_locs_remaining;
					} else { loc_max = locations[bi].maxi; }
					
					// Get a random count based on max available
					var loc_count = getRandom(loc_max+1);
					
					// If the count is less than the minimum reqd, set it for the minimum
					// This may overstep the stated maximum, but will only do so once per building type
					if(loc_count < locations[bi].mini) {
						loc_count = locations[bi].mini;
					}
					
					// If there's only one of a location overall, make sure it gets generated
					if(loc_type.maxi == 1) {
						loc_count = 1;
					}

					for(bc=0; bc<loc_count; bc++){
						do{
							var maybe_here = [getRandom(m.startCols), getRandom(m.startRows)];
							var loc_location = getSquare(maybe_here);
							var loc_square = getSquareId(maybe_here);
						}
						while(loc_location.buildings == false || loc_location.passable == false || $.inArray(loc_square, occupado) >= 0)
						occupado.push(loc_square);
						loc_location.b = loc_type;
						loc_location.b.generated++; // add to total generated
						loc_location.onMap.find('.b').addClass(loc_location.b.type);
					}
				}
			}
		
		// Place player
		me.currentSquare = getSquare(me.coords).id;
		me.locIt(me.currentSquare, me.previousSquare);
		me.updateStatus(me.coords);
		
		// Make active, live, receiving input
		m.group.push(m);
		
		// Center map
		centerOn(me);
		input.mapTouchDrag(m.mg);
		m.mg.draggable({
			cursor: 'move'
		});
		
		return m;
	};
	// m-> map
	this.saveMe = function(m){
		m.mg.draggable( "option", "disabled", true );
		m.lastPrev = me.previousSquare;
		m.mapCoords = me.coords;
		m.lastID = getSquare(me.coords).id;// + '_' + m.group.length;
		m.mapHTML = m.mg.html();
		m.mg.remove();
	};
	// m-> map, e-> entering or exiting
	this.loadMe = function(m, e){
		activeMap = m;
		// Set background color to match terrain
		mapContainerCell.removeClass();
		mapContainerCell.addClass(m.terr);
		// Place player back on map
		me.location = m.type;
		// Set current map identity
		setIdent(m.id);
		// Clear out the map container, add map grid back in
		m.mapGrid = newGrid();
		mapContainer.append(m.mapGrid);
		m.mg = getGrid();
		m.mg.append(m.mapHTML);
		// Rebind squares to html
		rebindSquares();
		if(e == "enter"){
			// Set player location
			var startX = 0;
			var startY = 0;
			var dir = me.lastDir;
			switch (dir) {
				case "up" :
					startX = Math.floor(m.startCols/2);
					startY = m.startRows-1;
					break;
				case "down" : 
					startX = Math.floor(m.startCols/2);
					break;
				case "left" : 
					startX = m.startCols-1;
					startY = Math.floor(m.startRows/2);
					break;
				case "right" : 
					startY = Math.floor(m.startRows/2);
					break;
			}
			me.coords = [startX, startY];
		}
		else {
			me.coords = m.mapCoords;
		}
		
		me.currentSquare = getSquare(me.coords).id;
		me.locIt(me.currentSquare, m.lastPrev);
		me.updateStatus(me.coords);
		
		// Center the map
		centerOn(me);
		input.mapTouchDrag(m.mg);
		m.mg.draggable({
			cursor: 'move',
			disabled: false
		});
	};
};
