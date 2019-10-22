const Gears = require('Views/gears.widget')();
const ORCID_ACCESS_TOKEN = "2b23b44c-1590-414c-bdb3-37a36b5e5c23";
module.exports = function(payload) {
	var $ = Ti.UI.createWindow({
		title : "HOS-Schaufenster",
		subtitle : payload.collection,
		backgroundColor : 'white'
	});
	$.container = Ti.UI.createScrollView({
		scrollType : 'vertical',
		right : 0,
		layout : 'vertical'
	});
	$.add($.container);
	Object.keys(payload).forEach(function(k) {
		console.log("====");
		console.log(k + ":");
		console.log(payload[k]);
	});
	var doi = null;
	if (payload.identifier && payload.identifierType=='DOI') {
		doi = payload.identifier;
	}
	if (payload.url) {
		var doiurls = payload.url.filter(function(u) {
			return u.indexOf('https://doi.org/') > -1;
		});
		if (doiurls.length) {
			doi = doiurls[0].replace('https://doi.org/','');
			const Badget = Ti.UI.createImageView({
				right : 5,
				top : 5,
				width : 48,
				height : 48
			});
			require("Classes/Altmetrics")({
				view : Badget,
				type : 'doi',
				doi : doi,
				onclick : function(url) {
				}
			});

			$.add(Badget);
			/*$.add(Ti.UI.createWebView({
			 top : 0,
			 right : 3,
			 width : 80,
			 height : 80,
			 html : "<html><head><script type='text/javascript' src='https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js'></script></head>" + "<body><div style=\"background-color:transparent\" class='altmetric-embed' data-badge-type='donut' data-doi=\"" + doi + "\"></div></body></html>"
			 }));*/
		}
	}
	if (payload.creatorName)
		$.container.add(require("Views/creatornameView")(payload));
	if (payload.title)
		$.container.add(Ti.UI.createLabel({
			top : 5,
			right : 80,
			left : 10,
			textAlign : 'left',
			text : Array.isArray(payload.title) ? payload.title.join(' ') : payload.title,
			height : Ti.UI.SIZE,
			color : "black",
			font : {
				fontWeight : "bold",
				fontSize : 20
			}
		}));

	if (payload.abstract)
		$.container.add(Ti.UI.createLabel({
			top : 10,
			left : 10,

			right : 10,
			text : Array.isArray(payload.abstract) ? payload.abstract.join('\n') : payload.abstract,
			color : 'black'
		}));

	$.addEventListener("open", require("Views/ondetailopen"));
	$.open();
};
