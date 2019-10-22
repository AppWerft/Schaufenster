module.exports = function(_$) {

	const $ = _$;
	var active = false;
	function getHeaderView(label) {
		const v = Ti.UI.createView({
			top : 0,
			height : 20,
			zIndex : 999,
			backgroundColor : 'grey'
		});
		v.add(Ti.UI.createLabel({
			textAlign : 'left',
			text : label,
			color : "white",
			font : {
				fontSize : 12.5	,
				fontWeight : 'bold'
			},
			left : 5,
			width : Ti.UI.FILL
		}));
		return v;
	};
	const View = Ti.UI.createView({
		right : -240,
		width : 240,
		backgroundColor : "#4E7985",
		active : false,
		layout : "vertical"
	});
	View.needleView = Ti.UI.createTextField({
		width : Ti.UI.FILL,
		top : 0,
		height : 45,
		hintText : "Suchbegriff",
		value : "",
		backgroundColor : '#659BAC',
		height : 45
	});
	View.add(View.needleView);
	View.slideIn = function() {
		View.animate({
			right : 0
		}, function() {
			View.active = true;
		});

	};
	View.slideOut = function() {
		View.animate({
			right : -500
		}, function() {
			View.active = false;
		});
	};
	View.slideToggle = function() {
		if (View.active === false)
			View.slideIn();
		else
			View.slideOut();
	};
	const Facets = [{
		name : "collection",
		title : "Sammlung",
		display : true
	}, {
		name : "language",
		title : "Sprache",
		display : true
	}, {
		name : "creatorName_facet",
		title : "Autor/in",
		display : true
	}];

	Facets.forEach(function(f) {
		$.Solr.addFacetField(f.name);
	});
	$.Solr.addFacetField("publicationYear");
	$.Solr.addFacetField("identifier");
	$.Solr.addFacetField("identifierType");
	const FacetsForList = Facets.filter(function(f) {
		return f.display;
	});

	// Histogramm
	View.histo = require("Views/histogramView")();

	// Facetten:
	View.tv = Ti.UI.createListView({
		top : 0,
		templates : {
			'facets' : require("Views/TEMPLATES").facets
		},
		defaultItemTemplate : 'facets',
		sections : Facets.map(function(f,i) {
			return Ti.UI.createListSection({
				headerView : (i>0)?getHeaderView(f.title):undefined,
				name : f.name
			});
		})
	});
	View.add(getHeaderView("Erscheinungsjahr"));
	var stickyHeaderView = getHeaderView(Facets[0].title);
	View.add(View.histo);
	View.add(stickyHeaderView);
	View.add(View.tv);

	View.tv.addEventListener("scrollend", function(e) {
		stickyHeaderView.children[0].setText(Facets[e.firstVisibleSectionIndex].title);
	});
	View.tv.addEventListener('itemclick', function(e) {
		//var item = e.section.getItemAt(e.itemIndex);
		$.Solr.toggleFacet(e.section.name + ':"' + e.itemId + '"');
		$.updateList();
	});
	function getLang(foo) {
		switch (foo) {
		case "de":
			return "🇩🇪 Deutsch";
		case "en" :
			return "🇬🇧 Englisch";
		case "fr" :
			return "🇫🇷 Französisch";
		case "es" :
			return "🇪🇸 Kastillisch";
		case "ru" :
			return "🇷🇺 Russisch";
		case "it" :
			return "🇮🇹 Italienisch";
		case "pl" :
			return "🇵🇱 Polnisch";
		case "pt" :
			return "🇵🇹 Portugisisch";
		case "nl" :
			return "🇳🇱 Niederländisch";
		case "zh" :
			return "🇨🇳 Mandarin";
		case "el" :
			return "🇬🇷 Griechisch";
		case "tk" :
			return "🇹🇷 Türkisch";
		case "no" :
			return "🇳🇴 Norwegisch";
		case "fin" :
			return "🇫🇮 Finnisch";
		case "ja" :
			return "🇯🇵 Japanisch";
		case "por" :
			return "🇵🇹 Portugiesisch";
		default :
			return foo;
		}

	}


	View.setFacets = function(facetdata) {
		View.histo.setData(facetdata.publicationYear);
		View.histo.renderCanvas();

		Facets.forEach(function(f, i) {
			const items = [];
			facetdata[f.name].forEach(function(val) {
				if (f.name == "language")
					val.k = val.k.toLowerCase();
				if (val.v)
					items.push({
						properties : {
							itemId : val.k,
							active : false
						},
						label : {
							text : (f.name == 'language') ? getLang(val.k) : val.k
						},
						count : {
							text : val.v
						},
						active : {
							visible : $.Solr.hasFacet(val.k)
						}
					});
			});
			View.tv.sections[i].setItems(items);
		});
	};
	return View;
};
