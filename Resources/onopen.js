module.exports = function(_event) {
	if (Ti.Platform.osname == "android") {
		var AB = require("com.alcoapps.actionbarextras");
		AB.title = "HOS-Schaufenster";
		AB.subtitle = "Suchen und Entdecken";
		AB.backgroundColor = "#4E7985";
		AB.statusbarColor = "#4E7985";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.onCreateOptionsMenu = function(_menuevent) {
				_menuevent.menu.clear();
				if (!_event.source.noinfo) {
					var netItem = _menuevent.menu.add({
						title : 'Visualisierung',
						showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
						icon : "/assets/images/net.png"
					});
					var item = _menuevent.menu.add({
						title : 'Filter',
						showAsAction : Ti.Android.SHOW_AS_ACTION_IF_ROOM,
						icon : "/assets/images/filter.png"
						// Ti.App.Android.R.drawable.Ti.API.info('')
					});

					item.addEventListener("click", _event.source.toggleInput);
					netItem.addEventListener("click", function() { 
						_event.source.containerView.scrollToView(1);
					});
				}

			};
			activity.actionBar.displayHomeAsUp = false;
			activity.actionBar.onHomeIconItemSelected = function() {
				_event.source.close();
			};
			activity.invalidateOptionsMenu();
		}
	}
};
