
var t = new Date().getTime();
function Log(foo) {
	if ( typeof foo == 'object')
		foo = JSON.stringify(foo);
	console.log((new Date().getTime() - t) + '   ' + foo);
	t = new Date().getTime();
}

(function() {
	require('Views/main.window')();
})();
