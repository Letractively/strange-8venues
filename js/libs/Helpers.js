//
// Helper Vars
//

// Template for all map squares
var SquareTemplate = '<div class="sq"><div class="quad b">&nbsp;</div><div class="quad t">&nbsp;</div><div class="quad i">&nbsp;</div><div class="quad p">&nbsp;</div></div>';

// 
// Helper Functions
//

// Return a random number
var getRandom = function(r){
	var temp = Math.floor(Math.random()*r);
	return temp;
};

// Get exact map square id from coords
var getMapSq = function(c){
	return $('#c_'+c[0]+'_'+c[1]+'_'+ident);
};
// Get square ID
var getSquare = function(c){
		var s = Squares[$('#c_'+c[0]+'_'+c[1]+'_'+ident).attr('data-sID')];
		if(s != undefined){
			return s;
		} else { return false; }
	};
var getSquareId = function(c){
	var s = $('#c_'+c[0]+'_'+c[1]+'_'+ident).attr('data-sID');
	if(s != undefined){
			return s;
		} else { return false; }
}

// Grid helpers
var newGrid = function(){
	return '<table id="'+ident+'_grid" cellspacing="0" cellpadding="0" class="m_grid '+me.location+'_grid"></table>';
};
var getGrid = function(){
	return $('#'+ident+'_grid');
};

// Row helpers
var newRow = function(r){
	return '<tr id="'+ident+'_row_'+r+'"></tr>';
};
var getRow = function(r){
	return  $('#'+ident+'_row_'+r);
};

// Center m within mapContainer
var centerIt = function(m){
	m.css({
		'top': (mapContainerCell.height()/2)-(m.height()/2),
		'left': (mapContainerCell.width()/2)-(m.width()/2)
	});
};

var centerOn = function(i){
	var sq = getMapSq(i.coords);
	var pageCenterX = mapContainerCell.width()/2;
	var pageCenterY = mapContainerCell.height()/2;
	var mapX = activeMap.mg.offset().left;
	var mapY = activeMap.mg.offset().top;
	var xDiff = new Number(pageCenterX - sq.offset().left);
	var yDiff = new Number(pageCenterY - sq.offset().top);
	activeMap.mg.css('top', (mapY+yDiff)-22);
	activeMap.mg.css('left', (mapX+xDiff)-22);
};

// sq-> Square.onMap, q -> quadrant of square, i-> class to add/remove
var findAndAdd = function(sq, q, i){
	sq.find(q).addClass(i);
};
var findAndRemove = function(sq, q, i){
	sq.find(q).removeClass(i);
};

// Update global ident var
var setIdent = function(i){
	ident =  me.location + '_' + i;
};

// Capitalize first letter
var capIt = function(s){
	return s.charAt(0).toUpperCase() + s.slice(1);
};