module.exports = function(e) {
	var $ = Ti.UI.createWindow({
		title : "HOS-Schaufenster",
		subtitle: 'ORCID',
		backgroundColor : 'white'
	});
	console.log(e.source.itemId);
	
	$.add(Ti.UI.createWebView({
		url : 'https://orcid.org/' +e.source.orcidId
	}));
	$.addEventListener("open", require("Views/ondetailopen"));
	$.open();
};
