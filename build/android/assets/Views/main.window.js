const Gears = require('Views/gears.widget')();

module.exports = function () {
  var $ = Ti.UI.createWindow({
    title: "HOS-Schaufenster",
    exitOnClose: true,
    backgroundColor: 'white' });

  $.Solr = new (require("Classes/Solr"))();
  //
  $.mainView = Ti.UI.createView({});

  $.containerView = Ti.UI.createScrollableView({
    views: [$.mainView, Ti.UI.createView({
      backgroundColor: 'white',
      visible: false,
      scrollable: false })] });


  $.containerView.addEventListener("scrollend", function (e) {
    Log("currentPage" + e.currentPage);
    if (e.currentPage == 1 && e.view.visible == false) {
      $.containerView.scrollingEnabled = true;
      e.view.visible = true;
      e.view.add(require("Views/webView")($));
    }
    if (e.currentPage == 0) {
      $.containerView.scrollingEnabled = false;

    }
  });

  $.resultView = require("Views/resultlistView")();
  $.filterView = require('Views/filterView')($);
  $.mainView.add($.resultView);
  $.mainView.add($.filterView);
  $.add($.containerView);

  $.filterView.needleView.addEventListener("return", function () {
    const needle = $.filterView.needleView.getValue();
    if (needle.length)
    $.Solr.setQuery('title:' + $.filterView.needleView.value);else

    $.Solr.setQuery('*:*');
    $.updateList();
  });
  // add all
  $.resultView.addEventListener('itemclick', function (e) {
    require("Views/detail.window")(JSON.parse(e.itemId));
  });
  $.toggleInput = function () {
    $.filterView.slideToggle();
  };

  $.updateList = function () {
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
        message: "Leider kein Internet." }).
      show();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4ud2luZG93LmpzIl0sIm5hbWVzIjpbIkdlYXJzIiwicmVxdWlyZSIsIm1vZHVsZSIsImV4cG9ydHMiLCIkIiwiVGkiLCJVSSIsImNyZWF0ZVdpbmRvdyIsInRpdGxlIiwiZXhpdE9uQ2xvc2UiLCJiYWNrZ3JvdW5kQ29sb3IiLCJTb2xyIiwibWFpblZpZXciLCJjcmVhdGVWaWV3IiwiY29udGFpbmVyVmlldyIsImNyZWF0ZVNjcm9sbGFibGVWaWV3Iiwidmlld3MiLCJ2aXNpYmxlIiwic2Nyb2xsYWJsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiTG9nIiwiY3VycmVudFBhZ2UiLCJ2aWV3Iiwic2Nyb2xsaW5nRW5hYmxlZCIsImFkZCIsInJlc3VsdFZpZXciLCJmaWx0ZXJWaWV3IiwibmVlZGxlVmlldyIsIm5lZWRsZSIsImdldFZhbHVlIiwibGVuZ3RoIiwic2V0UXVlcnkiLCJ2YWx1ZSIsInVwZGF0ZUxpc3QiLCJKU09OIiwicGFyc2UiLCJpdGVtSWQiLCJ0b2dnbGVJbnB1dCIsInNsaWRlVG9nZ2xlIiwiYmx1ciIsImRhdGEiLCJzdGFydFF1ZXJ5Iiwib25Mb2FkIiwicHJvcHMiLCJyZW1vdmUiLCJzdWNjZXNzIiwiY3JlYXRlTm90aWZpY2F0aW9uIiwibWVzc2FnZSIsInNob3ciLCJzZXREYXRhIiwiZG9jcyIsInNldEZhY2V0cyIsImZhY2V0cyIsIm9wZW4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLG9CQUFELENBQVAsRUFBZDs7QUFFQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVc7QUFDM0IsTUFBSUMsQ0FBQyxHQUFHQyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsWUFBTixDQUFtQjtBQUMxQkMsSUFBQUEsS0FBSyxFQUFHLGtCQURrQjtBQUUxQkMsSUFBQUEsV0FBVyxFQUFHLElBRlk7QUFHMUJDLElBQUFBLGVBQWUsRUFBRyxPQUhRLEVBQW5CLENBQVI7O0FBS0FOLEVBQUFBLENBQUMsQ0FB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QUYsQ0FBbUIsTUFBbkIsRUFBMkJsQixPQUFPLENBQUMsUUFBRCxDQUFsQztBQUNBRyxFQUFBQSxDQUFDLENBQUNlLGdCQUFGLENBQW1CLE1BQW5CLEVBQTJCZixDQUFDLENBQUM4QixVQUE3QjtBQUNBOUIsRUFBQUEsQ0FBQyxDQUFDa0QsSUFBRjtBQUNBLENBakZEIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgR2VhcnMgPSByZXF1aXJlKCdWaWV3cy9nZWFycy53aWRnZXQnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgJCA9IFRpLlVJLmNyZWF0ZVdpbmRvdyh7XG5cdFx0dGl0bGUgOiBcIkhPUy1TY2hhdWZlbnN0ZXJcIixcblx0XHRleGl0T25DbG9zZSA6IHRydWUsXG5cdFx0YmFja2dyb3VuZENvbG9yIDogJ3doaXRlJ1xuXHR9KTtcblx0JC5Tb2xyID0gbmV3IChyZXF1aXJlKFwiQ2xhc3Nlcy9Tb2xyXCIpKSgpO1xuXHQvL1xuXHQkLm1haW5WaWV3ID0gVGkuVUkuY3JlYXRlVmlldyh7fSk7XG5cblx0JC5jb250YWluZXJWaWV3ID0gVGkuVUkuY3JlYXRlU2Nyb2xsYWJsZVZpZXcoe1xuXHRcdHZpZXdzIDogWyQubWFpblZpZXcsIFRpLlVJLmNyZWF0ZVZpZXcoe1xuXHRcdFx0YmFja2dyb3VuZENvbG9yIDogJ3doaXRlJyxcblx0XHRcdHZpc2libGUgOiBmYWxzZSxcblx0XHRcdHNjcm9sbGFibGU6ZmFsc2Vcblx0XHR9KV1cblx0fSk7XG5cdCQuY29udGFpbmVyVmlldy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsZW5kXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRMb2coXCJjdXJyZW50UGFnZVwiICsgZS5jdXJyZW50UGFnZSk7XG5cdFx0aWYgKGUuY3VycmVudFBhZ2UgPT0gMSAmJiBlLnZpZXcudmlzaWJsZSA9PSBmYWxzZSkge1xuXHRcdFx0JC5jb250YWluZXJWaWV3LnNjcm9sbGluZ0VuYWJsZWQgPXRydWU7XG5cdFx0XHRlLnZpZXcudmlzaWJsZSA9IHRydWU7XG5cdFx0XHRlLnZpZXcuYWRkKHJlcXVpcmUoXCJWaWV3cy93ZWJWaWV3XCIpKCQpKTtcblx0XHR9XG5cdFx0aWYgKGUuY3VycmVudFBhZ2UgPT0gMCkge1xuXHRcdFx0JC5jb250YWluZXJWaWV3LnNjcm9sbGluZ0VuYWJsZWQgPWZhbHNlO1xuXHRcdFx0XG5cdFx0fVxuXHR9KTtcblxuXHQkLnJlc3VsdFZpZXcgPSByZXF1aXJlKFwiVmlld3MvcmVzdWx0bGlzdFZpZXdcIikoKTtcblx0JC5maWx0ZXJWaWV3ID0gcmVxdWlyZSgnVmlld3MvZmlsdGVyVmlldycpKCQpO1xuXHQkLm1haW5WaWV3LmFkZCgkLnJlc3VsdFZpZXcpO1xuXHQkLm1haW5WaWV3LmFkZCgkLmZpbHRlclZpZXcpO1xuXHQkLmFkZCgkLmNvbnRhaW5lclZpZXcpO1xuXG5cdCQuZmlsdGVyVmlldy5uZWVkbGVWaWV3LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXR1cm5cIiwgZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgbmVlZGxlID0gJC5maWx0ZXJWaWV3Lm5lZWRsZVZpZXcuZ2V0VmFsdWUoKTtcblx0XHRpZiAobmVlZGxlLmxlbmd0aClcblx0XHRcdCQuU29sci5zZXRRdWVyeSgndGl0bGU6JyArICQuZmlsdGVyVmlldy5uZWVkbGVWaWV3LnZhbHVlKTtcblx0XHRlbHNlXG5cdFx0XHQkLlNvbHIuc2V0UXVlcnkoJyo6KicpO1xuXHRcdCQudXBkYXRlTGlzdCgpO1xuXHR9KTtcblx0Ly8gYWRkIGFsbFxuXHQkLnJlc3VsdFZpZXcuYWRkRXZlbnRMaXN0ZW5lcignaXRlbWNsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdHJlcXVpcmUoXCJWaWV3cy9kZXRhaWwud2luZG93XCIpKEpTT04ucGFyc2UoZS5pdGVtSWQpKTtcblx0fSk7XG5cdCQudG9nZ2xlSW5wdXQgPSBmdW5jdGlvbigpIHtcblx0XHQkLmZpbHRlclZpZXcuc2xpZGVUb2dnbGUoKTtcblx0fTtcblxuXHQkLnVwZGF0ZUxpc3QgPSBmdW5jdGlvbigpIHtcblx0XHQkLmZpbHRlclZpZXcubmVlZGxlVmlldy5ibHVyKCk7XG5cdFx0JC5yZXN1bHRWaWV3LmRhdGEgPSBbXTtcblx0XHRMb2coXCJTdGFydFwiKTtcblx0XHQkLmFkZChHZWFycyk7XG5cdFx0JC5Tb2xyLnN0YXJ0UXVlcnkoe30sIG9uTG9hZCk7XG5cdH07XG5cblx0ZnVuY3Rpb24gb25Mb2FkKHByb3BzKSB7XG5cdFx0TG9nKFwib25Mb2FkXCIpO1xuXHRcdCQucmVtb3ZlKEdlYXJzKTtcblx0XHRpZiAoIXByb3BzLnN1Y2Nlc3MpIHtcblx0XHRcdFRpLlVJLmNyZWF0ZU5vdGlmaWNhdGlvbih7XG5cdFx0XHRcdG1lc3NhZ2UgOiBcIkxlaWRlciBrZWluIEludGVybmV0LlwiXG5cdFx0XHR9KS5zaG93KCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQucmVzdWx0Vmlldy5zZXREYXRhKHByb3BzLmRvY3MpO1xuICAgICAgICAgICBcblx0XHRcdCQuZmlsdGVyVmlldy5zZXRGYWNldHMocHJvcHMuZmFjZXRzKTtcblxuXHRcdFx0TG9nKFwiZmFjZXRzIHJlbmRlcmVkXCIpO1xuXHRcdH1cblx0XHRMb2coXCJSZW5kZXJlZFwiKTtcblx0fVxuXG5cblx0JC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCByZXF1aXJlKFwib25vcGVuXCIpKTtcblx0JC5hZGRFdmVudExpc3RlbmVyKFwib3BlblwiLCAkLnVwZGF0ZUxpc3QpO1xuXHQkLm9wZW4oKTtcbn07XG4iXSwic291cmNlUm9vdCI6Ii9Vc2Vycy9mdWVyc3QvRG9jdW1lbnRzL01MZWFybmluZy9TY2hhdWZlbnN0ZXIvUmVzb3VyY2VzL1ZpZXdzIn0=
