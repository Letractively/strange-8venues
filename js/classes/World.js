var World = function(){
	this.build = function(){
		var metros = [];
		var offices = [];
		var Loading = new D_Alert();
		
		Loading.openMe("Loading...", "Building your world");
		// Build Overland map, get metropoli
		var Level_1 = Map.init(new Overland(), 0, Sea);
		for(i=0; i<Level_1.squares.length; i++){
			if(Level_1.squares[i].b != undefined){
				if(Level_1.squares[i].b.type == "metropolis"){
					metros.push(Level_1.squares[i]);
				}
			}
		}
		var myMetro = metros[getRandom(metros.length)];
		// Place player
		Level_1.mg.find('.lit').addClass('unlit');
		Level_1.mg.find('.lit').removeClass('lit');	
		me.locIt(myMetro.id, me.currentSquare);
		previousMaps.push(Level_1);
		Map.saveMe(Level_1);
		
		Loading.updateMe('Building your metropolis');
		// Build a metropolis
		var Level_2 = Map.init(new City(), myMetro.id, myMetro.t);
		for(i=0; i<Level_2.squares.length; i++){
			if(Level_2.squares[i].b != undefined){
				if(Level_2.squares[i].b.type == "office"){
					offices.push(Level_2.squares[i]);
				}
			}
		}
		var myOffice = offices[getRandom(offices.length)];
		// Place player
		Level_2.mg.find('.lit').addClass('unlit');
		Level_2.mg.find('.lit').removeClass('lit');	
		me.locIt(myOffice.id, me.currentSquare);
		previousMaps.push(Level_2);
		Map.saveMe(Level_2);
		
		Loading.updateMe('Building your office');
		// Build an office
		var StartingLocation = Map.init(new Office(), myOffice.id, myOffice.t);
		Loading.closeMe();
	};
};