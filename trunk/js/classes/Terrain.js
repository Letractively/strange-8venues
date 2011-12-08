var Desert 	= { type: 'desert', passable: true, buildings: true, label: 'Deserts' };
var Plains 	= { type: 'plains', passable: true, buildings: true, label: 'Plains' };
var Grass 	= { type: 'grass', passable: true, buildings: true, label: 'Grasslands' };
var Forest	= { type: 'forest', passable: true, buildings: true, label: 'Forests' };
var Hill 	= { type: 'hill', passable: true, buildings: true, label: 'Hills' };
var River 	= { type: 'river', passable: true, buildings: false, label: 'River' };
var Mountain = { type: 'mountain', passable: false, buildings: false, label: 'Mountains' };
var LowGrass = { type: 'low_grass', passable: true, buildings: true, label: 'Savannah' };
var Concrete = { type: 'concrete', passable: true, buildings: true };
var Dirt 	= { type: 'dirt', passable: true, buildings: true };
var Lake 	= { type: 'lake', passable: false, buildings: false, label: 'Lake' };
var Floor 	= { type: 'floor', passable: true, buildings: true };
var Sea 	= { type: 'sea', passable: false, buildings: false };

var TerrainLabels = [];
var TerrainAdj = ['Great', 'Horrid', 'Lonely', 'Dark', 'Spiteful', 'Pitiful', 'Screaming', 'Haunted', 'Broken', 'Hateful', 'Hellish', 'Bright', 'Cursed', 'Cold', 'Freezing', 'Blazing', 'Creeping', 'Shimmering'];

var generateTerrainLabels = function(range, limit){
	for(i=0; i<Squares.length; i++){
		var sq = Squares[i];

		// Find the most prominent feature in range
		var adj = sq.lookAround(range);
		var ftype;
		var greatest=0;
		var makeFeature=[];

		for(pz=0; pz<adj.length; pz++){
			if(adj[pz].isFeature == false){
				var mycount = 0;
				var temp=[];
				for(qz=0; qz<adj.length; qz++){
					if(
						adj[pz].t != undefined &&
						adj[qz].t != undefined &&
						adj[qz].isFeature == false && 
						adj[pz].t.type == adj[qz].t.type &&
						adj[pz].t.label != undefined)
					{
						mycount++;
						// Add the matching element to the list of sq to mark
						temp.push(adj[qz]);
					}
				}
				if(mycount > greatest){
					// And add the original matcher as well!
					temp.push(adj[pz]);
					greatest = mycount;
					ftype =adj[pz].t.label;
					makeFeature = temp;
				}
			}
		}
		
		// If there is a prominent feature, label the area and mark the squares so they aren't counted again
		if(greatest >= limit){
			for(n=0; n<makeFeature.length; n++){
				makeFeature[n].isFeature = true;
			}
			do{
				var ta = TerrainAdj[getRandom(TerrainAdj.length)];
				var the_label = "The " + ta + "<br/>" + ftype;
			}
			while($.inArray(the_label, TerrainLabels) > 0) // make sure name is unique
			TerrainLabels.push(the_label);
			
			addMapLabel(sq, the_label);
		}
	}
}