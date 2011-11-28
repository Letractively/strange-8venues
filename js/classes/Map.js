var LoadMap = function(MapType, Group){
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
		Map.init(m, id);
	}
};
var Map = function(){
	// m-> map
	this.init = function(m, id){
		activeMap = m;
		m.id = id;
		m.grid = [];
		var dir = me.lastDir;
		if(dir == undefined){
			var startX = getRandom(m.startCols);
			var startY = getRandom(m.startRows);
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
		
		// Create a map
		setIdent(m.id);
		m.mapGrid = newGrid();
		mapContainer.append(m.mapGrid);
		m.mg = getGrid();
		for (i=0; i<m.startRows; i++) {
			m.mg.append(newRow(i));
			var row = getRow(i);
			var gridRow = [i];
			m.grid.push(gridRow);
			for (j=0; j<m.startCols; j++) {
				var tc = [j,i];
				var p = false;
				if(dir == undefined){
					if (tc.toString()==m.startLoc.toString()) { p = true; }
				} else {
					for(k=0; k<startSquares.length; k++){
						if (tc.toString()==startSquares[k].toString()) { p = true; }
					}
				}
				var n = new Square([j, i]);
				n.addToRow(row, false, p);
				var gridCol = [j];
				m.grid[i].push(gridCol);
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
	};
	// m-> map
	this.saveMe = function(m){
		m.mg.draggable( "option", "disabled", true );
		m.lastPrev = me.previousSquare;
		m.mapCoords = me.coords;
		m.lastID = getSquare(me.coords).id + '_' + m.group.length;
		m.mapHTML = m.mg.html();
		m.mg.remove();
	};
	// m-> map, e-> entering or exiting
	this.loadMe = function(m, e){
		activeMap = m;
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