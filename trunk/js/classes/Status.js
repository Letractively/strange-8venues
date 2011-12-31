var Statuss = function(){
	var _this = this;
	
	_this.s = oStatus;
	_this.w = oWhereami;
	_this.c = oClock;
	
	/*
		Global functions
	*/
	this.showAll = function(){
		_this.s.css('display', 'block');
		_this.w.css('display', 'block');
		_this.c.css('display', 'block');
	}
	this.hideAll = function(){
		_this.s.css('display', 'none');
		_this.w.css('display', 'none');
		_this.c.css('display', 'none');
	}
	
	/*
		Status Line
	*/
	this.show = function(str){
		_this.s.html(str);
	};
	this.add = function(str){
		var status = _this.s.html();
		var n_status = status + "<br/>" + str;
		_this.s.html(n_status);
	};
	this.clear = function(){
		_this.s.html('');
	};
	
	/*
		Clock
	*/
	this.updateTime = function(t){
		_this.c.find('.y').text(t.getFullYear());
		_this.c.find('.mm').text(Months[t.getMonth()]);
		_this.c.find('.dd').text(t.getDate());
		_this.c.find('.h').text(addLeadingZero(t.getHours(), true));
		_this.c.find('.m').text(addLeadingZero(t.getMinutes(), false));
		_this.c.find('.ampm').html(getAMPM(t.getHours()));
	}
	
	/*
		Where am I?
	*/
		// Set Location Name
	this.setLocationName = function(e){
		input.unbindFromMap();
		_this.w.html('<input type="text" id="new_location_name" value="'+e.data.txt+'" /><input type="button" value="Save" id="btn_save_location_name"/>');
		$('#btn_save_location_name').click(function(){
			var new_name = stripTags($('#new_location_name').val());
			me.location.name = new_name;
			_this.w.html(me.location.name + ' <a href="javascript:void(0);" id="btn_set_location_name">(chg)</a>');
			$('#btn_set_location_name').bind('click', {txt:me.location.name}, _this.setLocationName);
			input.bindToMap();
		});
	};
		// Get Location Name
	this.whereami = function(){
		if(me.location.name != undefined){
			_this.w.html(me.location.name + ' <a href="javascript:void(0);" id="btn_set_location_name">(chg)</a>' );
			$('#btn_set_location_name').bind('click', {txt:me.location.name}, _this.setLocationName);
		} else {
			var name = capIt(me.getLocation());
			_this.w.html('<a href="javascript:void(0);" id="btn_set_location_name">'+ name +'</a>');
			$('#btn_set_location_name').bind('click', {txt:name}, _this.setLocationName);
		}
	}
};