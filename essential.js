// JavaScript Document


//extend 'Object'
if (typeof Object.create !== 'function') {
	Object.create = function (o) {
	var F = function () {};
	F.prototype = o;
	return new F();
}else{
	alert('essential extention of object failed');
};


//extend 'Function'
Function.prototype.method = function (name, func) {
	if (!this.prototype[name]) {
		this.prototype[name] = func;
		return this;
	}else{
		alert('essential extention of object failed');
	};
};




var myCat = Object.create(myMammal);
	myCat.name = 'Henrietta';
	myCat.saying = 'meow';
	myCat.purr = function (n) {

	var i, s = '';

	for (i = 0; i < n; i += 1) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	
	return s;
};
