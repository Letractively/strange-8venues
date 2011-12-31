var Player = function(name){
	this.name = name;
	this.coords = [];
	this.square;
	this.inventory = [];
	this.money;
	this.getLocation = function(){
		if(this.location.name != undefined){
			return this.location.name;
		} else {
			return this.location.type;
		}
	};
	this.lightUpLoc = function(loc){
		var x = new Number(loc[0]);
		var y = new Number(loc[1]);
		var xSq = [x-1, x, x+1];
		var ySq = [y-1, y, y+1];
		for (i=0; i<ySq.length; i++){
			for (j=0; j<xSq.length; j++){
				var s = getMapSq([xSq[i],ySq[j]]);
				s.removeClass('unlit');
				s.addClass('lit');
			}
		}
	};
	this.locIt = function(curr, prev){
		// Set player position
		var current = Squares[curr].onMap;
		var previous;
		var loc = [Squares[curr].x, Squares[curr].y];
		me.coords = loc;
		// Remove player from previous square
		if(prev != undefined){
			previous = Squares[prev].onMap;
			findAndRemove(previous, '.p', 'me');
		}
		// Add player to current square
		findAndAdd(current, '.p', 'me');

		// Show visible squares
		this.lightUpLoc(loc);
		
		// Update buttons
		input.updateActionButtons(Squares[curr]);
	};
	
	this.updateStatus = function(c){
		// Update actual location
		var square = getSquare(c);
		// Show what's on this square
		//square.whatsHere();
	};
	this.move = function(dir){
		var isPassable = true;
		this.previousSquare = getSquare(this.coords).id;
		switch(dir){
			// Popup to leave location if reaches edge of village/castle/temple/etc.
			case "right": 
				this.coords[0]++;
				var square = getSquare(this.coords);
				if(!square || !square.t.passable){
					this.coords[0]--;
					isPassable = false;
				}
				break;
			case "left":
				this.coords[0]--;
				var square = getSquare(this.coords);
				if(!square || !square.t.passable){
					this.coords[0]++;
					isPassable = false;
				}
				break;
			case "up":
				this.coords[1]--;
				var square = getSquare(this.coords);
				if(!square || !square.t.passable){
					this.coords[1]++;
					isPassable = false;
				}
				break;
			case "down":
				this.coords[1]++;
				var square = getSquare(this.coords);
				if(!square || !square.t.passable){
					this.coords[1]--;
					isPassable = false;
				}
				break;
			default: break;
		}
		this.currentSquare = getSquare(this.coords).id;
		/*
			Successful Move
			Check all time, events, actions, etc. here
		*/
		if(isPassable == true){
			this.lastDir = dir;
			this.locIt(this.currentSquare, this.previousSquare);
			this.updateStatus(this.coords);
			// Set map position
			centerOn(me);
			// Update Time in Story
			Story.updateTime();
		}
		else if(!square){
			// if the square is non-existent (not just impassable)
			input.leaveLoc();
		}
	};
	return this;
};
