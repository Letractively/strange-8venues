var D_Standard = {}

var D_Loading = function(){
	this.openMe = function(t,s){
		input.unbindFromMap();
		oDialog.html(s);
		oDialog.dialog({
			close: function(){
				input.bindToMap();
			},
			title: t,
			modal: true,
			zIndex: 5000
		});
	};
	this.updateMe = function(s){
		oDialog.html(s);
	};
	this.closeMe = function(){
		oDialog.dialog('close');
	};
}

var D_Welcome = {
	title: 'Strange Avenues',
	height: 200,
	width: 300,
	buttons: {
		"Do you accept...cash?": function() {
			$(this).dialog('close');
			var story = $('#pick_a_case option:selected').val();
			Story.load(story);
		}
	}
}

var D_Inventory = {
	title: 'Inventory',
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
	title: 'Case Notes',
	open: function(){
		$('#notes').val(Data_Notes);
	},
	height: 400,
	width: 400,
	content: "<textarea id='notes'></textarea>",
	buttons: {
		"Save": function() {
			Data_Notes = $('#notes').val();
			$(this).dialog('close');
		}/*,
		"Close": function() {
			$(this).dialog('close');
		}*/
	}
}

var D_Options = {
	title: 'Game Options',
	open: function(){
		$('#optHideFeatureNames').attr('checked', hideFeatureNames);
	},
	height: 200,
	width: 200,
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

var help_content;
var D_Help;
$.ajax({
	url: 'help.html',
	dataType: 'html',
	success: function(data){
		D_Help = {
			title: 'Help &amp; About',
			open: function(){},
			content: data,
			height: 400,
			width: 400,
			buttons: {
				"Ok": function() {
					$(this).dialog('close');
				}
			}
		}
	},
	error: function(){
		alert("Unable to load help data");
	}
});