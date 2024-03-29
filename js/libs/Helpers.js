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

// Get Location
var getLocation = function(){
	if(me.location.name != undefined){
		return me.location.name;
	} else {
		return me.location.type;
	}
};

// Light up squares	
var lightUpLoc = function(loc){
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

// Grid helpers
var newGrid = function(){
	return '<table id="'+ident+'_grid" cellspacing="0" cellpadding="0" class="m_grid '+me.location.type+'_grid"></table>';
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

// Centering things
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
	ident =  me.location.type + '_' + i;
};

// Capitalize first letter
var capIt = function(s){
	s = s.replace('_', ' ');
	return s.charAt(0).toUpperCase() + s.slice(1);
};

// Remove any html tags
var stripTags = function(s){
 	return s.replace(/<\/?[^>]+(>|$)/g, "");
}

// Reattach square references when loading a map
var rebindSquares = function(){
	var sq = activeMap.squares;
	for(i=0; i<sq.length; i++){
		sq[i].onMap = getMapSq([sq[i].x,sq[i].y]);
		bindMapLabel(sq[i]);
	}
};
var bindMapLabel = function(s){
	s.onMap.find('.t_label .l_minmax').click(function(){
		var labelText = $(this).parent().find('.l_text');
		if($(this).hasClass('off')){
			labelText.removeClass('off');
			$(this).removeClass('off');
		} else {
			labelText.addClass('off');
			$(this).addClass('off');
		}
	});
};

// Add a label to the map at a particular square
var addMapLabel = function(s){
	var sID = s.id;
	var l = s.label;
	s.onMap.append(mapLabel);
	s.onMap.find('.t_label').prop('id', 't_label_'+sID);
	var labelID = $('#t_label_'+sID);
	var l_content = '<div class="l_text">' + l + "</div><a href='javascript:void(0);' class='l_minmax'>&nbsp;</a>";
	labelID.html(l_content);
	labelID.fadeTo(0, '.6');
	labelID.css({
		'z-index': i+3000,
		'margin-top': -s.onMap.height() + ((s.onMap.height()-labelID.height())/2)-3,
		'margin-left': ((s.onMap.width()-labelID.width())/2)-3
	});
	bindMapLabel(s);
};

// Context replace strings for name and such
var contextReplace = function(s){
	var sr = s.replace('{name}', me.name);
	return sr;
}

// Date & Time
var Days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var Months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var addLeadingZero = function(num, isHours){
		if(isHours){
			if(num == 0){ num = 12; }
			if(num > 12){ num -= 12; }
		}
		return ( num < 10 ? "0" : "" ) + num;  
};
var getAMPM = function(h){
	return h > 11 ? "P<br/>M" : "A<br/>M";
}