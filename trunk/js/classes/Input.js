var Input = function(){
	/*
		Functions to bind to
	*/
		// Capture mobile tap
		this.doMapClick = function(e){
			e.preventDefault();
			e.stopPropagation();
			var oe = e.originalEvent;
			if(oe.targetTouches){
				oe = oe.changedTouches[0]; // changedTouches to capture touchend
			}
			myPos = Squares[me.currentSquare].onMap.offset();
			offX = Math.abs(oe.pageX-myPos.left);
			offY = Math.abs(oe.pageY-myPos.top);
			if(offX > offY){
				if(oe.pageX > myPos.left) { me.move('right'); }
				else { me.move('left'); }
				} else {
				if(oe.pageY > myPos.top) { me.move('down'); }
				else { me.move('up'); }
			}
		};
		
		// Bind actions to map
		this.unbindFromMap = function(){
			doc.unbind('keyup');
			mapContainerCell.unbind('touchend');
		};
		
		this.bindToMap = function(){
			doc.bind('keyup', this.doKeyUp);
			mapContainerCell.bind('touchend', this.doMapClick);
		};
		
		// Wait
		var wait = function(){};
		
		// Leave locations
		this.leaveLoc = function(){
			if(activeMap.type != "overland") {
				this.unbindFromMap();
				var msg = 'Leave ' + getLocation() + '?';
				oDialog.html(msg);
				oDialog.dialog({
					close: function(){
						input.bindToMap();
					},
					buttons: { 
						"Y": function() {
							Map.saveMe(activeMap);
							if(previousMaps.length > 0) {
								var justPreviousMap = previousMaps.pop();
								Map.loadMe(justPreviousMap, 'exit');
							}
							else {
								Map.createContainer(activeMap);
							}
							$(this).dialog('close');
							statuss.whereami();
							Story.updateTime(true);
						},
						"N": function() {
							$(this).dialog('close');
						}
					},
					title: capIt(getLocation()),
					modal: true,
                    zIndex: 5000
				});
			}
		};
		
		// Enter location
		this.enterLoc = function(){
			var sq = Squares[me.currentSquare];
			if(sq.b != undefined){
				previousMaps.push(activeMap);
				Map.saveMe(activeMap);
				LoadMap(sq);
				statuss.whereami();
				Story.updateTime(true);
			}
		};
		
		// Key press functions
		this.doKeyUp = function(k) {
			// Capture key
			k.preventDefault();
			k.stopPropagation();
			switch (k.which) {
				// return
				case 13: wait(); break;
				// spacebar (enter bldg)
				case 32: input.enterLoc(); break;
				// left
				case 37: moveLeft(); break;
				// up
				case 38: moveUp(); break;
				// right
				case 39: moveRight(); break;
				// down
				case 40: moveDown(); break;
				default: break;
			}
		};
	/*
		Dialogs (type, [content, title, buttons])
	*/
		this.M_Dialog = function(type, content, title, buttons) {
			var M_D;
			var M_D_title;
			var M_D_buttons;
                        var M_D_height;
			input.unbindFromMap();
			switch(type){
				case "inventory" 	: M_D = D_Inventory; break;
				case "notes" 		: M_D = D_Notes; break;
				case "options" 		: M_D = D_Options; break;
				case "help" 		: M_D = D_Help; break;
				case "welcome" 		: M_D = D_Welcome; break;
				case "standard"		: M_D = D_Standard; break;
				default: break;
			}
			if(type=="standard"){
				oDialog.html(content);
				M_D_title = title;
				if(buttons) {
					M_D_buttons = buttons;
				} else {
					M_D_buttons = {
						"Ok": function() {
							$(this).dialog('close');
						}
					}
				}
			} else {
				oDialog.html(M_D.content);
				M_D_title = M_D.title;
				M_D_buttons = M_D.buttons;
			}
                        if(M_D.height != undefined){ M_D_height = M_D.height; }
                        else { M_D_height = "auto"; }
			oDialog.dialog({
				open: M_D.open,
				close: function(){
					input.bindToMap();
				},
                                height: M_D_height,
				buttons: M_D_buttons,
				title: M_D_title,
				modal: true,
                zIndex: 5000
			});
		}
	/*
		Bindings and such
	*/
		// High-level connectors
		var moveUp = function(){ me.move('up'); };
		var moveRight = function(){ me.move('right'); };
		var moveDown = function(){ me.move('down'); };
		var moveLeft = function(){ me.move('left'); };
		
		// Action Buttons
		btnInventory.button({
			icons: {primary:'ui-icon-suitcase',secondary:''},
			disabled: true,
			text: false
		});
		btnNotes.button({
			icons: {primary:'ui-icon-note',secondary:''},
			disabled: false,
			text: false
		});
		btnEnter.button({ 
			icons: {primary:'ui-icon-home',secondary:''},
			disabled: true,
			text: false
		});
		btnOpts.button({ 
			icons: {primary:'ui-icon-wrench',secondary:''},
			disabled: false,
			text: false
		});
		btnHelp.button({ 
			icons: {primary:'ui-icon-lightbulb',secondary:''},
			disabled: false,
			text: false
		});
		
		// Touch events
		btnInventory.bind('click touchend', function(e){e.preventDefault(); input.M_Dialog('inventory');});
		btnNotes.bind('click touchend', function(e){e.preventDefault(); input.M_Dialog('notes');});
		btnEnter.bind('click touchend', function(e){e.preventDefault(); input.enterLoc();});
		btnOpts.bind('click touchend', function(e){e.preventDefault(); input.M_Dialog('options');});
		btnHelp.bind('click touchend', function(e){e.preventDefault(); input.M_Dialog('help');});
	
		// Update Action Buttons
		var updateBtnState = function(b, val){
			b.button( "option", "disabled", val );
		};
		this.updateActionButtons = function(s){
			s.b != undefined ? updateBtnState(btnEnter, false) : updateBtnState(btnEnter, true)
		};
	/*
		Map Drag (touch)
	*/
		this.mapTouchDrag = function(mg){
			mg.bind('touchstart', function(e){
				e.preventDefault();
                                e.stopPropagation();
				var oe = e.originalEvent;
                if(oe.targetTouches.length != 1){
					return false;
				}
				var touch = oe.targetTouches[0];
				var startX = mg.position().left;
				var startY = mg.position().top;
				var tStartX = touch.pageX;
				var tStartY = touch.pageY;
				mg.bind('touchmove', function(e){
					e.preventDefault();
					var oe = e.originalEvent;
					var touch = oe.targetTouches[0];
					mg.css('left', startX + (touch.pageX - tStartX));
					mg.css('top', startY + (touch.pageY - tStartY));
					return false;
				});
				mg.bind('touchend', function(e){
					e.preventDefault();
					if(Math.abs(mg.position().left - startX)<10 && Math.abs(mg.position().top - startY) <10){
							input.doMapClick(e); // do a map click if the movement is incidental
					}
					mg.unbind('touchmove touchend');
                                        return false;
				});
				return false;
			});
		};
	
	/*
		Window
	*/
		// Do window bindings
		$(window).bind('touchmove', function(e) { 
			// Tell Safari not to move the window. 
			e.preventDefault(); 
		});
		// Re-center on window resize
		$(window).resize(function(){
			centerOn(me);
			oDialog.dialog('option', 'position', 'center');
		});
		// Make everything unselectable
		$('.m_grid td.lit .quad').bind('selectstart', function(){return false;});
	/*
		Init
	*/
		// Bind starting actions to map
		this.bindToMap();
};
