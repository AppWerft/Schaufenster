
module.exports = function() {
	const $ = Ti.UI.createView({
		backgroundColor : '#88000000',
		zIndex:999
	});
	$.add(require("ti.animation").createAnimationView({
		file : '/assets/gears.json',
		loop : true,
		autoStart : true,
		transform : Ti.UI.create2DMatrix({
			scale : 3.0
		})
	}));
	Log(">>>>>  gears created");
	return $;
};
