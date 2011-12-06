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
		//alert(terr.type);
		Map.init(m, id, terr);
	}
};
var Map = function(){
	// m-> map
	this.init = function(m, id, terr){
		activeMap = m;
		m.id = id;
		m.grid = [];
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
					// Is this a border square?
					/*var border = false;
					if(j==0 || i==0 || j==m.startCols-1 || i==m.startRows-1){
						border = true;
					}*/
					var n = new Square([j, i]);
					n.addToRow(row, false, p);
				}
			}
			
			// Seek and label terrain features
			for(i=0; i<Squares.length; i++){
				var sq = Squares[i];
				
				if(sq.isFeature != true){
					// Second Pass, Range = 2
					var adj = sq.lookAround(2);
					var ftype;
					var greatest=0;
					var makeFeature=[];

					for(pz=0; pz<adj.length; pz++){
						if(adj[pz].isFeature != true){
							var mycount = 0;
							var temp=[];
							for(qz=0; qz<adj.length; qz++){
								if(adj[pz].t != undefined && adj[qz].t != undefined && adj[pz].t.type == adj[qz].t.type && adj[pz].t.label != undefined){
									mycount++;
									temp.push(adj[pz]);
								}
							}
							if(mycount > greatest){
								greatest = mycount;
								ftype =adj[pz].t.label;
								makeFeature = temp;
							}
						}
					}
					
					if(greatest >= 8){
						for(n=0; n<makeFeature.length; n++){
							makeFeature[n].isFeature = true;
						}
						sq.onMap.append(mapLabel);
						sq.onMap.find('.t_label').prop('id', 't_label_'+sq.id);
						var labelID = $('#t_label_'+sq.id);
						var ta = TerrainAdj[getRandom(TerrainAdj.length)];
						labelID.html("The " + ta + "<br/>" + ftype);
						labelID.fadeTo(0, '.6');
						labelID.css({
							'z-index': i+3000,
							'margin-top': -sq.onMap.height() + ((sq.onMap.height()-labelID.height())/2)-3,
							'margin-left': ((sq.onMap.width()-labelID.width())/2)-3
						});
					}
				}
			}
			
			for(i=0; i<Squares.length; i++){
				var sq = Squares[i];
				if(sq.isFeature != true && sq.t.label != undefined){	
					// First Pass, Range = 1
					var adj = sq.lookAround(1);
					var type = sq.t.type;
					var tc = 0;
					var temp = [];
					for(j=0; j<adj.length; j++){
						if(adj[j] != ""){
							if (adj[j].t.type == type){
								temp.push(adj[j]);
								tc++;
							}
						}
					}
					if(tc >= 4){
						for(k=0; k<temp.length; k++){
							temp[k].isFeature = true;
						}
						sq.onMap.append(mapLabel);
						sq.onMap.find('.t_label').prop('id', 't_label_'+sq.id);
						var labelID = $('#t_label_'+sq.id);
						var ta = TerrainAdj[getRandom(TerrainAdj.length)];
						labelID.html("The " + ta + "<br/>" + sq.t.label);
						labelID.fadeTo(0, '.6');
						labelID.css({
							'z-index': i+3000,
							'margin-top': -sq.onMap.height() + ((sq.onMap.height()-labelID.height())/2)-3,
							'margin-left': ((sq.onMap.width()-labelID.width())/2)-3
						});
					}
				}
			}
			
			// Generate Buildings
			var buildings = activeMap.buildings;
				// Create array for occupied squares
				var occupado = [];
			for(var bi=0; bi<buildings.length; bi++){
				var total_bldgs_remaining = buildings[bi].t.maxi - buildings[bi].t.generated;
				if(total_bldgs_remaining > 0){
					var bldg_max;
					// If the bldg maximum is greater than what's left, set max to what's left
					if(buildings[bi].maxi >= total_bldgs_remaining) {
						bldg_max = total_bldgs_remaining;
					} else { bldg_max = buildings[bi].maxi; }
					
					// Get a random count based on max available
					var bldg_count = getRandom(bldg_max+1);
					
					// If the count is less than the minimum reqd, set it for the minimum
					// This may overstep the stated maximum, but will only do so once per building type
					if(bldg_count < buildings[bi].mini) {
						bldg_count = buildings[bi].mini;
					}
					
					// If there's only one of a location overall, make sure it gets generated
					if(buildings[bi].t.maxi == 1) {
						bldg_count = 1;
					}

					for(bc=0; bc<bldg_count; bc++){
						do{
							var maybe_here = [getRandom(m.startCols), getRandom(m.startRows)];
							var bldg_location = getSquare(maybe_here);
							var bldg_square = getSquareId(maybe_here);
						}
						while(bldg_location.buildings == false || bldg_location.passable == false || $.inArray(bldg_square, occupado) >= 0)
						occupado.push(bldg_square);
						bldg_location.b = buildings[bi].t;
						bldg_location.b.generated++; // add to total generated
						bldg_location.onMap.find('.b').addClass(bldg_location.b.type);
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
