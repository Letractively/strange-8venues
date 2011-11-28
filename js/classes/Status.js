var Statuss = function(){
	this.s = oStatus;
	this.show = function(t){
		this.s.html(t);
	};
	this.add = function(t){
		var c = this.s.html();
		var n = c + "<br/>" + t;
		this.s.html(n);
	};
	this.clear = function(){
		this.s.html('');
	};
};