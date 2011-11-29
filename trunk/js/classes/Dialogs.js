var D_Inventory = {
	open: function(){},
	content: "Inventory goes here",
	buttons: {
		"Close": function() {
			$(this).dialog('close');
		}
	}
}

var Data_Notes;
var D_Notes = {
	open: function(){
		$('#notes').val(Data_Notes);
	},
	content: "<textarea id='notes'></textarea>",
	buttons: {
		"Save": function() {
			Data_Notes = $('#notes').val();
		},
		"Close": function() {
			$(this).dialog('close');
		}
	}
}

var D_Options = {
	open: function(){},
	content: "\
		<input id='optShowPlaceNames' type='checkbox' disabled/><label for='optShowPlaceName' disabled>Show Place Names</label><br/>\
		<input id='optShowFeatureNames' type='checkbox' disabled/><label for='optShowPlaceName' disabled>Show Feature Names</label>\
	",
	buttons: {
		"Save": function() {
			$(this).dialog('close');
		},
		"Close": function() {
			$(this).dialog('close');
		}
	}
}

var D_Help = {
	open: function(){},
	content: "Strange Avenues &copy; 2011 Graham Cranfield",
	buttons: {
		"Ok": function() {
			$(this).dialog('close');
		}
	}
}