var Player = function(name){
	this.name = name;
	this.coords = [];
	this.square;
	this.inventory = [];
	this.money;
	
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
		lightUpLoc(loc);
		
		// Update buttons
		input.updateActionButtons(Squares[curr]);
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
