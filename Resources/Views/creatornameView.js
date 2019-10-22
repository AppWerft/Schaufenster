module.exports = function(payload) {
	const $ = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : 10,
		layout : 'vertical'
	});

	payload.creatorName.forEach(function(cn, i) {
		const row = Ti.UI.createView({
			height : 30,
			top : 0
		});
		var orcid = null;
		if (payload.creatorNameURI && payload.creatorNameURI[i]) {
			orcid = payload.creatorNameURI[i].replace('https://orcid.org/', '');
			var orcidView = Ti.UI.createView({
				left : 10,
				width : 32,
				height : 32,
				orcidId:  orcid,
				visible : false,
				backgroundImage : '/assets/images/orcid.png'
			});
			const Orcid = new (require('Classes/Orcid'))();
			Orcid.startQuery(orcid, function(res) {
				orcidView.visible = true;
				orcidView.itemId = res.text;
			});
			row.add(orcidView);
			orcidView.addEventListener('click',require('Views/orcid.window'));
		}
		row.add(Ti.UI.createLabel({
			left : 50,
			textAlign : 'left',
			itemId : orcid ? orcid : undefined,
			text : cn,
			height : Ti.UI.SIZE,
			color : "black",
			font : {
				fontStyle : "italic",
				fontSize : 18
			}
		}));
		$.add(row);
	});
	return $;
};
