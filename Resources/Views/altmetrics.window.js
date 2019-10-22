
module.exports = function(url) {
	var $ = Ti.UI.createWindow({
		title : "HOS-Schaufenster",
		subtitle: 'Altmetrics',
		backgroundColor : 'white'
	});
	$.add(Ti.UI.createWebView({
		url:url
	}));

	$.addEventListener("open", require("Views/ondetailopen"));
	$.open();
};
