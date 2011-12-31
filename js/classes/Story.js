var Story = function(){
	var _this = this;
	
	_this.path;
	_this.settings;
	_this.title;
	_this.intro;
	_this.events;
	_this.setup;
	_this.startTime;
	_this.currentTime;
	
	// Load intro screen
	this.load = function(s){
		// Create the story file path
		_this.path = 'stories/'+s+'/';
		
		// Load the introduction
		$.ajax({
			url: _this.path + 'settings.js',
			dataType: 'json',
			success: function(data){
				_this.settings = data;
				_this.title = data.title;
				_this.intro = contextReplace(data.intro);
				_this.events = data.events;
				_this.setup = data.setup;
				var buttons = {
					"Start!": function(){
						$(this).dialog('close');
						_this.loadSetup();
					}
				}
				input.M_Dialog('standard', _this.intro, _this.title, buttons);
			},
			error: function(){
				alert('Unable to load introduction');
			}
		});
	};
	
	// Load story setup data
	this.loadSetup = function(){
		// Set the date
		var sd = _this.setup.startDate;
		var t = new Date(sd);
		//Dec 29, 1934 00:15:00
		_this.startTime = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), 0);
		_this.currentTime = _this.startTime;
		statuss.updateTime(_this.startTime);
		// Show status boxes
		statuss.showAll();
		statuss.whereami();
		statuss.show(contextReplace(_this.setup.startStatus));
	};
	
	this.updateTime = function(iT){
		var tf;
		// If in transition from loc to loc...
		if(iT) { tf = (4-me.location.depth)*10; }
		// Otherwise...
		else {
			switch(me.location.depth){
				case 1: tf = 1800; break;
				case 2: tf = 300; break;
				case 3: tf = 30; break;
				default: break;
			}
		}
		var cs = Story.currentTime.getSeconds();
		cs += tf;
		Story.currentTime.setSeconds(cs);
		statuss.updateTime(Story.currentTime);
		
		// Check time events
		_this.checkTimeEvents();
	};
	
	this.checkTimeEvents = function(){
		// Show one event at a time...fire next event on dialog closing if dialog used
		$.each(_this.events.time, function(key, value){
			var t = new Date(key);
			if(_this.currentTime >= t){
				if(value.fired != true){
					// For each event
					$.each(value, function(key, value){
						switch(key){
							/* Show Dialog */
							case "dialog":
								// Create buttons for event dialogs & attach functions
								var buttons={};
								if(!$.isEmptyObject(value.buttons)){
									// For each button
									$.each(value.buttons, function(key, value){
										var btnFx = new Function(value);
										buttons[key]=function(){
											btnFx();
											_this.checkTimeEvents();
										};
									});
								}
								else {
									buttons = {
										"Ok": function(){
											$(this).dialog('close');
											_this.checkTimeEvents();
										}
									};
								}
								// Show the Dialog
								input.M_Dialog('standard', contextReplace(value.content), contextReplace(value.title), buttons);
								break;
							/* Update Status Line */
							case "status":
								statuss.show(value);
								break;
							default: break;
						}
					});
					value.fired = true;
					return false;
				}
			}
		});
	};
	
	this.checkActionEvents = function(){
		$.each(_this.events.action, function(key, value){
		});
	};
}