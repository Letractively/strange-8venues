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
				var msg = 'Leave the ' + me.location + '?';
				oDialog.html(msg);
				oDialog.dialog({
					close: function(){
						input.bindToMap();
					},
					buttons: { 
						"Y": function() {
							Map.saveMe(activeMap);
							var justPreviousMap = previousMaps.pop();
							Map.loadMe(justPreviousMap, 'exit');
							$(this).dialog('close');
						},
						"N": function() {
							$(this).dialog('close');
						}
					},
					title: capIt(me.location),
					modal: true
				});
			}
		};
		
		// Enter location
		var enterLoc = function(){
			var sq = Squares[me.currentSquare];
			if(sq.b != undefined){
				previousMaps.push(activeMap);
				Map.saveMe(activeMap);
				LoadMap(sq.b.obj, sq.b.group);
			}
		};
		
		// Key press functions
		this.doKeyUp = function(k) {
			// Capture key
			k.preventDefault();
			switch (k.which) {
				// return
				case 13: wait(); break;
				// spacebar (enter bldg)
				case 32: enterLoc(); break;
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
		Bindings and such
	*/
		// Action Buttons
		btnInventory.button({
			icons: {primary:'ui-icon-suitcase',secondary:''},
			disabled: true,
                        text: false
		});
		btnEnter.button({ 
			icons: {primary:'ui-icon-home',secondary:''},
			disabled: true,
                        text: false
		});
		
		// High-level connectors
		var moveUp = function(){ me.move('up'); };
		var moveRight = function(){ me.move('right'); };
		var moveDown = function(){ me.move('down'); };
		var moveLeft = function(){ me.move('left'); };
		
		// Touch events
		btnEnter.bind('touchend', function(e){e.preventDefault(); enterLoc();});
	
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
		});
		// Make everything unselectable
		$('body *').bind('selectstart', function(){return false;});
	
	/*
		Init
	*/
		// Bind starting actions to map
		this.bindToMap();
};