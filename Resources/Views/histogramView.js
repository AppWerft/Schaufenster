module.exports = function() {
	var W,
	    H;
	var data = [],
	    years = [],
	    counts = [];
	var firstyear = lastyear = 0;
	function onTouchMove(e) {
		if (e.x > 0)
			$.renderCanvas($.getActiveYear(e.x / Ti.Platform.displayCaps.logicalDensityFactor));
	}

	var $ = Ti.UI.createView({
		height : 110,
		bubbleParent : false,
		top : 0
	});
	$.add(require("ti.canvas").createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		top : 0,
		height : 100,
		left : 10,
		bubbleParent : false,
		right : 10,
		backgroundColor :  "#4E7985",
		

	}));

	//$.children[0].addEventListener("touchmove", onTouchMove);

	//$.children[0].addEventListener("touchend", function() {
	//		$.children[1].show();
	//	});

	$.setData = function(publicationYears) {
		const pyears = publicationYears.filter(function(y) {
			return y.v > 15;
		});
		data = pyears.map(function(year) {
			return {
				year : parseInt(year.k),
				count : parseFloat(Math.sqrt(year.v))
			};
		}).sort(function(a, b) {
			return a.year - b.year;
		});
		counts = data.map(function(item) {
			return item.count;
		});
		years = data.map(function(item) {
			return item.year;
		});
		W = parseFloat($.rect.width) || 200;
		H = parseFloat($.rect.height)-10 || 80;
		return true;
	};
	$.getActiveYear = function(xpos) {
		if (xpos == undefined)
			return xpos;
		var selectedYear;
		var yearsTotal = years.max() - years.min();
		var selectedNdx = Math.floor(xpos / W * yearsTotal);
		var y = years.min() + selectedNdx;
		// looking for year:

		var selectedItem;
		data.forEach(function(item) {
			if (item.year == y)
				selectedItem = item;
		});
		return (selectedItem) ? selectedItem : undefined;
	};
	
	$.renderCanvas = function(selectedYear) {
		var barHeight = H - 12;
		$.children[0].clear();
		$.children[0].fillStyle = '#ffffffff';
		if (years.max() == years.min()) return;
		var barWidth = W / (years.max() - years.min());
		$.children[0].beginPath();
		data.forEach(function(item, ndx) {
			$.children[0].fillStyle = (selectedYear != undefined && selectedYear.year == item.year) ? '#ffffffff' : '#ffcccccc';
			var x = parseFloat(item.year - years.min());
			var y = parseFloat(item.count / counts.max());
			if (y > 0) {
				console.log(x);
				console.log(y);
				console.log(barWidth);
				console.log(barHeight);
				
				$.children[0].fillRect(x * barWidth, barHeight - y * barHeight, barWidth - 0.5, y * barHeight);
			}
		});
		
		$.children[0].setTextAlign("left");
		$.children[0].setTextSize(9);
		$.children[0].fillText(years.min(), 0, H - 2);
		$.children[0].setTextAlign("right");
		$.children[0].fillText(years.max(), W - 20, H - 2);

		//
	};
	var Pincher = require('ti.pinchview').createPinchView();
	function onPinch(e) {
		console.log(e.scale);
	}


	Pincher.addEventListener('pinch', onPinch);
	Pincher.addEventListener("click", function(e) {
		$.renderCanvas($.getActiveYear(e.x));
	});
	$.add(Pincher);
	return $;
};
