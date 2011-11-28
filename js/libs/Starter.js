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
	ButtonContainer.append('<div id="btn_dir_n" class="button directional"></div>');
	ButtonContainer.append('<div id="btn_dir_w" class="button directional"></div>');
	ButtonContainer.append('<div id="btn_dir_e" class="button directional"></div>');
	ButtonContainer.append('<div id="btn_dir_s" class="button directional"></div>');
	
	var btnDirN = $('#btn_dir_n'); var iconN = 'ui-icon-arrowthick-1-n'; var iconNstop = 'ui-icon-arrowthickstop-1-n';
	var btnDirE = $('#btn_dir_e'); var iconE = 'ui-icon-arrowthick-1-e'; var iconEstop = 'ui-icon-arrowthickstop-1-e';
	var btnDirS = $('#btn_dir_s'); var iconS = 'ui-icon-arrowthick-1-s'; var iconSstop = 'ui-icon-arrowthickstop-1-s';
	var btnDirW = $('#btn_dir_w'); var iconW = 'ui-icon-arrowthick-1-w'; var iconWstop = 'ui-icon-arrowthickstop-1-w';

	// Add buttons to container
	ButtonContainer.append('<div id="btn_inventory" class="button action">Inventory</div>');
	ButtonContainer.append('<div id="btn_enter" class="button action">Enter</div>');
	var btnInventory = $('#btn_inventory');
	var btnEnter = $('#btn_enter');

// Create map container
var mapContainerCell = $('#map_container_cell');
var mapContainer = $('#map_container');

// Create dialog
main.append('<div id="dialog"></div>');
var oDialog = $('#dialog');