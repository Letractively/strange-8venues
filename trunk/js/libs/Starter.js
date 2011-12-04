// Assign document
var doc = $(document);

// Assign main
var main = $('#main');
main.append('\
	<table id="game_table" cellspacing="5" cellpadding="0">\
		<tr><td id="map_container_cell">\
			<div id="map_container"></div>\
		</td></tr>\
		<tr><td id="left_column">\
                    <div id="bottom_cell"></div>\
                </td></tr>\
	</table>\
');

// Create status
main.append('<div id="status"></div>');
var oStatus = $('#status');

// Create left column
var LeftColumn = $('#bottom_cell');
	// Add title
	//LeftColumn.append('<div id="title">Strange @venues</div>');
	// Create direction buttons container
LeftColumn.append('<div id="button_container"></div>');
var ButtonContainer = $('#button_container');
	// Add buttons to container
	ButtonContainer.append('<div id="btn_inventory" class="button action">Inventory</div>');
	ButtonContainer.append('<div id="btn_notes" class="button action">Notes</div>');
	ButtonContainer.append('<div id="btn_enter" class="button action">Enter</div>');
	ButtonContainer.append('<div id="btn_opts" class="button action">Options</div>');
	ButtonContainer.append('<div id="btn_help" class="button action">Help</div>');
	var btnInventory = $('#btn_inventory');
	var btnNotes = $('#btn_notes');
	var btnEnter = $('#btn_enter');
	var btnOpts = $('#btn_opts');
	var btnHelp = $('#btn_help');

// Create map container
var mapContainerCell = $('#map_container_cell');
var mapContainer = $('#map_container');

// Create dialog
main.append('<div id="dialog"></div>');
var oDialog = $('#dialog');

// Create map label
var mapLabel = "<div class='t_label'></div>";