module.exports = function(opts) {
	const view = opts.view;
	const type = opts.type;
	const doi = opts.doi;
	const onclick = opts.onclick;
	const endpoint = "https://api.altmetric.com/v1/";
	const xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			const image = JSON.parse(this.responseText).images.large;
			const link = JSON.parse(this.responseText).details_url;
			const subxhr = Ti.Network.createHTTPClient({
				onload : function() {
					view.link = link;
					view.image = this.responseData;
				}
			});
			subxhr.open("GET", image);
			subxhr.send();
			view.addEventListener('click', function() {
				require('Views/altmetrics.window')(link);
			});
		},

		timeout : 5000,
	});
	const url = endpoint + type + '/' + doi;

	xhr.open("GET", url);
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send();

};

