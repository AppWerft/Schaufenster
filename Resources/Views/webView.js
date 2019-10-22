module.exports = function() {
	const $ = Ti.UI.createWebView({
		enableZoomControls: true,
		scalesPageToFit:true,
		disableBounce: true,
		url : 'index.html'
	});
	console.log("Webview added");
	return $;
};
