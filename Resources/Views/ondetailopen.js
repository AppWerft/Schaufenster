module.exports = function(_event) {
	if (Ti.Platform.osname == "android") {
		var AB = require("com.alcoapps.actionbarextras");
		AB.title = "HOS-Schaufenster";
		AB.subtitle = _event.source.subtitle;
		AB.backgroundColor = "#4E7985";
		AB.statusbarColor = "#4E7985";
		var activity = _event.source.getActivity();
		if (activity) {
			activity.onCreateOptionsMenu = function(_menuevent) {
				_menuevent.menu.clear();
				if (!_event.source.noinfo) {
					
				}

			};
			activity.actionBar.displayHomeAsUp = true;
			activity.actionBar.onHomeIconItemSelected = function() {
				_event.source.close();
			};
			activity.invalidateOptionsMenu();
		}
	}
};
