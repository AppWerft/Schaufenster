const Gears = require('Views/gears.widget')();

module.exports = function() {
	var $ = Ti.UI.createWindow({
		title : "HOS-Schaufenster",
		exitOnClose : true,
		backgroundColor : 'white'
	});
	$.Solr = new (require("Classes/Solr"))();
	//
	$.mainView = Ti.UI.createView({});

	$.containerView = Ti.UI.createScrollableView({
		views : [$.mainView, Ti.UI.createView({
			backgroundColor : 'white',
			visible : false,
			scrollable:false
		})]
	});
	$.containerView.addEventListener("scrollend", function(e) {
		Log("currentPage" + e.currentPage);
		if (e.currentPage == 1 && e.view.visible == false) {
			$.containerView.scrollingEnabled =true;
			e.view.visible = true;
			e.view.add(require("Views/webView")($));
		}
		if (e.currentPage == 0) {
			$.containerView.scrollingEnabled =false;
			
		}
	});

	$.resultView = require("Views/resultlistView")();
	$.filterView = require('Views/filterView')($);
	$.mainView.add($.resultView);
	$.mainView.add($.filterView);
	$.add($.containerView);

	$.filterView.needleView.addEventListener("return", function() {
		const needle = $.filterView.needleView.getValue();
		if (needle.length)
			$.Solr.setQuery('title:' + $.filterView.needleView.value);
		else
			$.Solr.setQuery('*:*');
		$.updateList();
	});
	// add all
	$.resultView.addEventListener('itemclick', function(e) {
		require("Views/detail.window")(JSON.parse(e.itemId));
	});
	$.toggleInput = function() {
		$.filterView.slideToggle();
	};

	$.updateList = function() {
		$.filterView.needleView.blur();
		$.resultView.data = [];
		Log("Start");
		$.add(Gears);
		$.Solr.startQuery({}, onLoad);
	};

	function onLoad(props) {
		Log("onLoad");
		$.remove(Gears);
		if (!props.success) {
			Ti.UI.createNotification({
				message : "Leider kein Internet."
			}).show();
		} else {
			$.resultView.setData(props.docs);
           
			$.filterView.setFacets(props.facets);

			Log("facets rendered");
		}
		Log("Rendered");
	}


	$.addEventListener("open", require("onopen"));
	$.addEventListener("open", $.updateList);
	$.open();
};
