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
	open: function(){
		$('#optHideFeatureNames').attr('checked', hideFeatureNames);
	},
	content: "\
		<input id='optHidePlaceNames' type='checkbox' disabled/><label for='optHidePlaceNames' disabled>Hide Place Names</label><br/>\
		<input id='optHideFeatureNames' type='checkbox'/><label for='optHideFeatureNames'>Hide Feature Names</label>\
	",
	buttons: {
		/*"Save": function() {
			$(this).dialog('close');
		},*/
		"Close": function() {
			$(this).dialog('close');
		}
	}
}
// Option settings
var hideFeatureNames = false;
$('#optHideFeatureNames').live('change',function(){
	if($(this).attr('checked')=='checked'){
		hideFeatureNames = 'checked';
		$('.t_label').hide(0);
	}
	else{
		hideFeatureNames = false;
		$('.t_label').show(0);
	}
});

var D_Help = {
	open: function(){},
	content: "Strange Avenues &copy; 2011 Graham Cranfield",
	buttons: {
		"Ok": function() {
			$(this).dialog('close');
		}
	}
}