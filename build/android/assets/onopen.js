module.exports = function (_event) {
  if (Ti.Platform.osname == "android") {
    var AB = require("com.alcoapps.actionbarextras");
    AB.title = "HOS-Schaufenster";
    AB.subtitle = "Suchen und Entdecken";
    AB.backgroundColor = "#4E7985";
    AB.statusbarColor = "#4E7985";
    var activity = _event.source.getActivity();
    if (activity) {
      activity.onCreateOptionsMenu = function (_menuevent) {
        _menuevent.menu.clear();
        if (!_event.source.noinfo) {
          var netItem = _menuevent.menu.add({
            title: 'Visualisierung',
            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
            icon: "/assets/images/net.png" });

          var item = _menuevent.menu.add({
            title: 'Filter',
            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
            icon: "/assets/images/filter.png"
            // Ti.App.Android.R.drawable.Ti.API.info('')
          });

          item.addEventListener("click", _event.source.toggleInput);
          netItem.addEventListener("click", function () {
            _event.source.containerView.scrollToView(1);
          });
        }

      };
      activity.actionBar.displayHomeAsUp = false;
      activity.actionBar.onHomeIconItemSelected = function () {
        _event.source.close();
      };
      activity.invalidateOptionsMenu();
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9ub3Blbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiX2V2ZW50IiwiVGkiLCJQbGF0Zm9ybSIsIm9zbmFtZSIsIkFCIiwicmVxdWlyZSIsInRpdGxlIiwic3VidGl0bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzdGF0dXNiYXJDb2xvciIsImFjdGl2aXR5Iiwic291cmNlIiwiZ2V0QWN0aXZpdHkiLCJvbkNyZWF0ZU9wdGlvbnNNZW51IiwiX21lbnVldmVudCIsIm1lbnUiLCJjbGVhciIsIm5vaW5mbyIsIm5ldEl0ZW0iLCJhZGQiLCJzaG93QXNBY3Rpb24iLCJBbmRyb2lkIiwiU0hPV19BU19BQ1RJT05fSUZfUk9PTSIsImljb24iLCJpdGVtIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvZ2dsZUlucHV0IiwiY29udGFpbmVyVmlldyIsInNjcm9sbFRvVmlldyIsImFjdGlvbkJhciIsImRpc3BsYXlIb21lQXNVcCIsIm9uSG9tZUljb25JdGVtU2VsZWN0ZWQiLCJjbG9zZSIsImludmFsaWRhdGVPcHRpb25zTWVudSJdLCJtYXBwaW5ncyI6IkFBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixVQUFTQyxNQUFULEVBQWlCO0FBQ2pDLE1BQUlDLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxNQUFaLElBQXNCLFNBQTFCLEVBQXFDO0FBQ3BDLFFBQUlDLEVBQUUsR0FBR0MsT0FBTyxDQUFDLDhCQUFELENBQWhCO0FBQ0FELElBQUFBLEVBQUUsQ0FBQ0UsS0FBSCxHQUFXLGtCQUFYO0FBQ0FGLElBQUFBLEVBQUUsQ0FBQ0csUUFBSCxHQUFjLHNCQUFkO0FBQ0FILElBQUFBLEVBQUUsQ0FBQ0ksZUFBSCxHQUFxQixTQUFyQjtBQUNBSixJQUFBQSxFQUFFLENBQUNLLGNBQUgsR0FBb0IsU0FBcEI7QUFDQSxRQUFJQyxRQUFRLEdBQUdWLE1BQU0sQ0FBQ1csTUFBUCxDQUFjQyxXQUFkLEVBQWY7QUFDQSxRQUFJRixRQUFKLEVBQWM7QUFDYkEsTUFBQUEsUUFBUSxDQUFDRyxtQkFBVCxHQUErQixVQUFTQyxVQUFULEVBQXFCO0FBQ25EQSxRQUFBQSxVQUFVLENBQUNDLElBQVgsQ0FBZ0JDLEtBQWhCO0FBQ0EsWUFBSSxDQUFDaEIsTUFBTSxDQUFDVyxNQUFQLENBQWNNLE1BQW5CLEVBQTJCO0FBQzFCLGNBQUlDLE9BQU8sR0FBR0osVUFBVSxDQUFDQyxJQUFYLENBQWdCSSxHQUFoQixDQUFvQjtBQUNqQ2IsWUFBQUEsS0FBSyxFQUFHLGdCQUR5QjtBQUVqQ2MsWUFBQUEsWUFBWSxFQUFHbkIsRUFBRSxDQUFDb0IsT0FBSCxDQUFXQyxzQkFGTztBQUdqQ0MsWUFBQUEsSUFBSSxFQUFHLHdCQUgwQixFQUFwQixDQUFkOztBQUtBLGNBQUlDLElBQUksR0FBR1YsVUFBVSxDQUFDQyxJQUFYLENBQWdCSSxHQUFoQixDQUFvQjtBQUM5QmIsWUFBQUEsS0FBSyxFQUFHLFFBRHNCO0FBRTlCYyxZQUFBQSxZQUFZLEVBQUduQixFQUFFLENBQUNvQixPQUFILENBQVdDLHNCQUZJO0FBRzlCQyxZQUFBQSxJQUFJLEVBQUc7QUFDUDtBQUo4QixXQUFwQixDQUFYOztBQU9BQyxVQUFBQSxJQUFJLENBQUNDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCekIsTUFBTSxDQUFDVyxNQUFQLENBQWNlLFdBQTdDO0FBQ0FSLFVBQUFBLE9BQU8sQ0FBQ08sZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsWUFBVztBQUM1Q3pCLFlBQUFBLE1BQU0sQ0FBQ1csTUFBUCxDQUFjZ0IsYUFBZCxDQUE0QkMsWUFBNUIsQ0FBeUMsQ0FBekM7QUFDQSxXQUZEO0FBR0E7O0FBRUQsT0FyQkQ7QUFzQkFsQixNQUFBQSxRQUFRLENBQUNtQixTQUFULENBQW1CQyxlQUFuQixHQUFxQyxLQUFyQztBQUNBcEIsTUFBQUEsUUFBUSxDQUFDbUIsU0FBVCxDQUFtQkUsc0JBQW5CLEdBQTRDLFlBQVc7QUFDdEQvQixRQUFBQSxNQUFNLENBQUNXLE1BQVAsQ0FBY3FCLEtBQWQ7QUFDQSxPQUZEO0FBR0F0QixNQUFBQSxRQUFRLENBQUN1QixxQkFBVDtBQUNBO0FBQ0Q7QUFDRCxDQXRDRCIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oX2V2ZW50KSB7XG5cdGlmIChUaS5QbGF0Zm9ybS5vc25hbWUgPT0gXCJhbmRyb2lkXCIpIHtcblx0XHR2YXIgQUIgPSByZXF1aXJlKFwiY29tLmFsY29hcHBzLmFjdGlvbmJhcmV4dHJhc1wiKTtcblx0XHRBQi50aXRsZSA9IFwiSE9TLVNjaGF1ZmVuc3RlclwiO1xuXHRcdEFCLnN1YnRpdGxlID0gXCJTdWNoZW4gdW5kIEVudGRlY2tlblwiO1xuXHRcdEFCLmJhY2tncm91bmRDb2xvciA9IFwiIzRFNzk4NVwiO1xuXHRcdEFCLnN0YXR1c2JhckNvbG9yID0gXCIjNEU3OTg1XCI7XG5cdFx0dmFyIGFjdGl2aXR5ID0gX2V2ZW50LnNvdXJjZS5nZXRBY3Rpdml0eSgpO1xuXHRcdGlmIChhY3Rpdml0eSkge1xuXHRcdFx0YWN0aXZpdHkub25DcmVhdGVPcHRpb25zTWVudSA9IGZ1bmN0aW9uKF9tZW51ZXZlbnQpIHtcblx0XHRcdFx0X21lbnVldmVudC5tZW51LmNsZWFyKCk7XG5cdFx0XHRcdGlmICghX2V2ZW50LnNvdXJjZS5ub2luZm8pIHtcblx0XHRcdFx0XHR2YXIgbmV0SXRlbSA9IF9tZW51ZXZlbnQubWVudS5hZGQoe1xuXHRcdFx0XHRcdFx0dGl0bGUgOiAnVmlzdWFsaXNpZXJ1bmcnLFxuXHRcdFx0XHRcdFx0c2hvd0FzQWN0aW9uIDogVGkuQW5kcm9pZC5TSE9XX0FTX0FDVElPTl9JRl9ST09NLFxuXHRcdFx0XHRcdFx0aWNvbiA6IFwiL2Fzc2V0cy9pbWFnZXMvbmV0LnBuZ1wiXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dmFyIGl0ZW0gPSBfbWVudWV2ZW50Lm1lbnUuYWRkKHtcblx0XHRcdFx0XHRcdHRpdGxlIDogJ0ZpbHRlcicsXG5cdFx0XHRcdFx0XHRzaG93QXNBY3Rpb24gOiBUaS5BbmRyb2lkLlNIT1dfQVNfQUNUSU9OX0lGX1JPT00sXG5cdFx0XHRcdFx0XHRpY29uIDogXCIvYXNzZXRzL2ltYWdlcy9maWx0ZXIucG5nXCJcblx0XHRcdFx0XHRcdC8vIFRpLkFwcC5BbmRyb2lkLlIuZHJhd2FibGUuVGkuQVBJLmluZm8oJycpXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBfZXZlbnQuc291cmNlLnRvZ2dsZUlucHV0KTtcblx0XHRcdFx0XHRuZXRJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHsgXG5cdFx0XHRcdFx0XHRfZXZlbnQuc291cmNlLmNvbnRhaW5lclZpZXcuc2Nyb2xsVG9WaWV3KDEpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cblx0XHRcdH07XG5cdFx0XHRhY3Rpdml0eS5hY3Rpb25CYXIuZGlzcGxheUhvbWVBc1VwID0gZmFsc2U7XG5cdFx0XHRhY3Rpdml0eS5hY3Rpb25CYXIub25Ib21lSWNvbkl0ZW1TZWxlY3RlZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfZXZlbnQuc291cmNlLmNsb3NlKCk7XG5cdFx0XHR9O1xuXHRcdFx0YWN0aXZpdHkuaW52YWxpZGF0ZU9wdGlvbnNNZW51KCk7XG5cdFx0fVxuXHR9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvVXNlcnMvZnVlcnN0L0RvY3VtZW50cy9NTGVhcm5pbmcvU2NoYXVmZW5zdGVyL1Jlc291cmNlcyJ9
