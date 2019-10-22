module.exports = function () {
  var W,
  H;
  var data = [],
  years = [],
  counts = [];
  var firstyear = lastyear = 0;
  function onTouchMove(e) {
    if (e.x > 0)
    $.renderCanvas($.getActiveYear(e.x / Ti.Platform.displayCaps.logicalDensityFactor));
  }

  var $ = Ti.UI.createView({
    height: 110,
    bubbleParent: false,
    top: 0 });

  $.add(require("ti.canvas").createView({
    width: Ti.UI.FILL,
    height: Ti.UI.FILL,
    top: 0,
    height: 100,
    left: 10,
    bubbleParent: false,
    right: 10,
    backgroundColor: "#4E7985" }));




  //$.children[0].addEventListener("touchmove", onTouchMove);

  //$.children[0].addEventListener("touchend", function() {
  //		$.children[1].show();
  //	});

  $.setData = function (publicationYears) {
    const pyears = publicationYears.filter(function (y) {
      return y.v > 15;
    });
    data = pyears.map(function (year) {
      return {
        year: parseInt(year.k),
        count: parseFloat(Math.sqrt(year.v)) };

    }).sort(function (a, b) {
      return a.year - b.year;
    });
    counts = data.map(function (item) {
      return item.count;
    });
    years = data.map(function (item) {
      return item.year;
    });
    W = parseFloat($.rect.width) || 200;
    H = parseFloat($.rect.height) - 10 || 80;
    return true;
  };
  $.getActiveYear = function (xpos) {
    if (xpos == undefined)
    return xpos;
    var selectedYear;
    var yearsTotal = years.max() - years.min();
    var selectedNdx = Math.floor(xpos / W * yearsTotal);
    var y = years.min() + selectedNdx;
    // looking for year:

    var selectedItem;
    data.forEach(function (item) {
      if (item.year == y)
      selectedItem = item;
    });
    return selectedItem ? selectedItem : undefined;
  };

  $.renderCanvas = function (selectedYear) {
    var barHeight = H - 12;
    $.children[0].clear();
    $.children[0].fillStyle = '#ffffffff';
    if (years.max() == years.min()) return;
    var barWidth = W / (years.max() - years.min());
    $.children[0].beginPath();
    data.forEach(function (item, ndx) {
      $.children[0].fillStyle = selectedYear != undefined && selectedYear.year == item.year ? '#ffffffff' : '#ffcccccc';
      var x = parseFloat(item.year - years.min());
      var y = parseFloat(item.count / counts.max());
      if (y > 0) {
        console.log(x);
        console.log(y);
        console.log(barWidth);
        console.log(barHeight);

        $.children[0].fillRect(x * barWidth, barHeight - y * barHeight, barWidth - 0.5, y * barHeight);
      }
    });

    $.children[0].setTextAlign("left");
    $.children[0].setTextSize(9);
    $.children[0].fillText(years.min(), 0, H - 2);
    $.children[0].setTextAlign("right");
    $.children[0].fillText(years.max(), W - 20, H - 2);

    //
  };
  var Pincher = require('ti.pinchview').createPinchView();
  function onPinch(e) {
    console.log(e.scale);
  }


  Pincher.addEventListener('pinch', onPinch);
  Pincher.addEventListener("click", function (e) {
    $.renderCanvas($.getActiveYear(e.x));
  });
  $.add(Pincher);
  return $;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhpc3RvZ3JhbVZpZXcuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIlciLCJIIiwiZGF0YSIsInllYXJzIiwiY291bnRzIiwiZmlyc3R5ZWFyIiwibGFzdHllYXIiLCJvblRvdWNoTW92ZSIsImUiLCJ4IiwiJCIsInJlbmRlckNhbnZhcyIsImdldEFjdGl2ZVllYXIiLCJUaSIsIlBsYXRmb3JtIiwiZGlzcGxheUNhcHMiLCJsb2dpY2FsRGVuc2l0eUZhY3RvciIsIlVJIiwiY3JlYXRlVmlldyIsImhlaWdodCIsImJ1YmJsZVBhcmVudCIsInRvcCIsImFkZCIsInJlcXVpcmUiLCJ3aWR0aCIsIkZJTEwiLCJsZWZ0IiwicmlnaHQiLCJiYWNrZ3JvdW5kQ29sb3IiLCJzZXREYXRhIiwicHVibGljYXRpb25ZZWFycyIsInB5ZWFycyIsImZpbHRlciIsInkiLCJ2IiwibWFwIiwieWVhciIsInBhcnNlSW50IiwiayIsImNvdW50IiwicGFyc2VGbG9hdCIsIk1hdGgiLCJzcXJ0Iiwic29ydCIsImEiLCJiIiwiaXRlbSIsInJlY3QiLCJ4cG9zIiwidW5kZWZpbmVkIiwic2VsZWN0ZWRZZWFyIiwieWVhcnNUb3RhbCIsIm1heCIsIm1pbiIsInNlbGVjdGVkTmR4IiwiZmxvb3IiLCJzZWxlY3RlZEl0ZW0iLCJmb3JFYWNoIiwiYmFySGVpZ2h0IiwiY2hpbGRyZW4iLCJjbGVhciIsImZpbGxTdHlsZSIsImJhcldpZHRoIiwiYmVnaW5QYXRoIiwibmR4IiwiY29uc29sZSIsImxvZyIsImZpbGxSZWN0Iiwic2V0VGV4dEFsaWduIiwic2V0VGV4dFNpemUiLCJmaWxsVGV4dCIsIlBpbmNoZXIiLCJjcmVhdGVQaW5jaFZpZXciLCJvblBpbmNoIiwic2NhbGUiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiQUFBQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVc7QUFDM0IsTUFBSUMsQ0FBSjtBQUNJQyxFQUFBQSxDQURKO0FBRUEsTUFBSUMsSUFBSSxHQUFHLEVBQVg7QUFDSUMsRUFBQUEsS0FBSyxHQUFHLEVBRFo7QUFFSUMsRUFBQUEsTUFBTSxHQUFHLEVBRmI7QUFHQSxNQUFJQyxTQUFTLEdBQUdDLFFBQVEsR0FBRyxDQUEzQjtBQUNBLFdBQVNDLFdBQVQsQ0FBcUJDLENBQXJCLEVBQXdCO0FBQ3ZCLFFBQUlBLENBQUMsQ0FBQ0MsQ0FBRixHQUFNLENBQVY7QUFDQ0MsSUFBQUEsQ0FBQyxDQUFDQyxZQUFGLENBQWVELENBQUMsQ0FBQ0UsYUFBRixDQUFnQkosQ0FBQyxDQUFDQyxDQUFGLEdBQU1JLEVBQUUsQ0FBQ0MsUUFBSCxDQUFZQyxXQUFaLENBQXdCQyxvQkFBOUMsQ0FBZjtBQUNEOztBQUVELE1BQUlOLENBQUMsR0FBR0csRUFBRSxDQUFDSSxFQUFILENBQU1DLFVBQU4sQ0FBaUI7QUFDeEJDLElBQUFBLE1BQU0sRUFBRyxHQURlO0FBRXhCQyxJQUFBQSxZQUFZLEVBQUcsS0FGUztBQUd4QkMsSUFBQUEsR0FBRyxFQUFHLENBSGtCLEVBQWpCLENBQVI7O0FBS0FYLEVBQUFBLENBQUMsQ0FBQ1ksR0FBRixDQUFNQyxPQUFPLENBQUMsV0FBRCxDQUFQLENBQXFCTCxVQUFyQixDQUFnQztBQUNyQ00sSUFBQUEsS0FBSyxFQUFHWCxFQUFFLENBQUNJLEVBQUgsQ0FBTVEsSUFEdUI7QUFFckNOLElBQUFBLE1BQU0sRUFBR04sRUFBRSxDQUFDSSxFQUFILENBQU1RLElBRnNCO0FBR3JDSixJQUFBQSxHQUFHLEVBQUcsQ0FIK0I7QUFJckNGLElBQUFBLE1BQU0sRUFBRyxHQUo0QjtBQUtyQ08sSUFBQUEsSUFBSSxFQUFHLEVBTDhCO0FBTXJDTixJQUFBQSxZQUFZLEVBQUcsS0FOc0I7QUFPckNPLElBQUFBLEtBQUssRUFBRyxFQVA2QjtBQVFyQ0MsSUFBQUEsZUFBZSxFQUFJLFNBUmtCLEVBQWhDLENBQU47Ozs7O0FBYUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBbEIsRUFBQUEsQ0FBQyxDQUFDbUIsT0FBRixHQUFZLFVBQVNDLGdCQUFULEVBQTJCO0FBQ3RDLFVBQU1DLE1BQU0sR0FBR0QsZ0JBQWdCLENBQUNFLE1BQWpCLENBQXdCLFVBQVNDLENBQVQsRUFBWTtBQUNsRCxhQUFPQSxDQUFDLENBQUNDLENBQUYsR0FBTSxFQUFiO0FBQ0EsS0FGYyxDQUFmO0FBR0FoQyxJQUFBQSxJQUFJLEdBQUc2QixNQUFNLENBQUNJLEdBQVAsQ0FBVyxVQUFTQyxJQUFULEVBQWU7QUFDaEMsYUFBTztBQUNOQSxRQUFBQSxJQUFJLEVBQUdDLFFBQVEsQ0FBQ0QsSUFBSSxDQUFDRSxDQUFOLENBRFQ7QUFFTkMsUUFBQUEsS0FBSyxFQUFHQyxVQUFVLENBQUNDLElBQUksQ0FBQ0MsSUFBTCxDQUFVTixJQUFJLENBQUNGLENBQWYsQ0FBRCxDQUZaLEVBQVA7O0FBSUEsS0FMTSxFQUtKUyxJQUxJLENBS0MsVUFBU0MsQ0FBVCxFQUFZQyxDQUFaLEVBQWU7QUFDdEIsYUFBT0QsQ0FBQyxDQUFDUixJQUFGLEdBQVNTLENBQUMsQ0FBQ1QsSUFBbEI7QUFDQSxLQVBNLENBQVA7QUFRQWhDLElBQUFBLE1BQU0sR0FBR0YsSUFBSSxDQUFDaUMsR0FBTCxDQUFTLFVBQVNXLElBQVQsRUFBZTtBQUNoQyxhQUFPQSxJQUFJLENBQUNQLEtBQVo7QUFDQSxLQUZRLENBQVQ7QUFHQXBDLElBQUFBLEtBQUssR0FBR0QsSUFBSSxDQUFDaUMsR0FBTCxDQUFTLFVBQVNXLElBQVQsRUFBZTtBQUMvQixhQUFPQSxJQUFJLENBQUNWLElBQVo7QUFDQSxLQUZPLENBQVI7QUFHQXBDLElBQUFBLENBQUMsR0FBR3dDLFVBQVUsQ0FBQzlCLENBQUMsQ0FBQ3FDLElBQUYsQ0FBT3ZCLEtBQVIsQ0FBVixJQUE0QixHQUFoQztBQUNBdkIsSUFBQUEsQ0FBQyxHQUFHdUMsVUFBVSxDQUFDOUIsQ0FBQyxDQUFDcUMsSUFBRixDQUFPNUIsTUFBUixDQUFWLEdBQTBCLEVBQTFCLElBQWdDLEVBQXBDO0FBQ0EsV0FBTyxJQUFQO0FBQ0EsR0FyQkQ7QUFzQkFULEVBQUFBLENBQUMsQ0FBQ0UsYUFBRixHQUFrQixVQUFTb0MsSUFBVCxFQUFlO0FBQ2hDLFFBQUlBLElBQUksSUFBSUMsU0FBWjtBQUNDLFdBQU9ELElBQVA7QUFDRCxRQUFJRSxZQUFKO0FBQ0EsUUFBSUMsVUFBVSxHQUFHaEQsS0FBSyxDQUFDaUQsR0FBTixLQUFjakQsS0FBSyxDQUFDa0QsR0FBTixFQUEvQjtBQUNBLFFBQUlDLFdBQVcsR0FBR2IsSUFBSSxDQUFDYyxLQUFMLENBQVdQLElBQUksR0FBR2hELENBQVAsR0FBV21ELFVBQXRCLENBQWxCO0FBQ0EsUUFBSWxCLENBQUMsR0FBRzlCLEtBQUssQ0FBQ2tELEdBQU4sS0FBY0MsV0FBdEI7QUFDQTs7QUFFQSxRQUFJRSxZQUFKO0FBQ0F0RCxJQUFBQSxJQUFJLENBQUN1RCxPQUFMLENBQWEsVUFBU1gsSUFBVCxFQUFlO0FBQzNCLFVBQUlBLElBQUksQ0FBQ1YsSUFBTCxJQUFhSCxDQUFqQjtBQUNDdUIsTUFBQUEsWUFBWSxHQUFHVixJQUFmO0FBQ0QsS0FIRDtBQUlBLFdBQVFVLFlBQUQsR0FBaUJBLFlBQWpCLEdBQWdDUCxTQUF2QztBQUNBLEdBZkQ7O0FBaUJBdkMsRUFBQUEsQ0FBQyxDQUFDQyxZQUFGLEdBQWlCLFVBQVN1QyxZQUFULEVBQXVCO0FBQ3ZDLFFBQUlRLFNBQVMsR0FBR3pELENBQUMsR0FBRyxFQUFwQjtBQUNBUyxJQUFBQSxDQUFDLENBQUNpRCxRQUFGLENBQVcsQ0FBWCxFQUFjQyxLQUFkO0FBQ0FsRCxJQUFBQSxDQUFDLENBQUNpRCxRQUFGLENBQVcsQ0FBWCxFQUFjRSxTQUFkLEdBQTBCLFdBQTFCO0FBQ0EsUUFBSTFELEtBQUssQ0FBQ2lELEdBQU4sTUFBZWpELEtBQUssQ0FBQ2tELEdBQU4sRUFBbkIsRUFBZ0M7QUFDaEMsUUFBSVMsUUFBUSxHQUFHOUQsQ0FBQyxJQUFJRyxLQUFLLENBQUNpRCxHQUFOLEtBQWNqRCxLQUFLLENBQUNrRCxHQUFOLEVBQWxCLENBQWhCO0FBQ0EzQyxJQUFBQSxDQUFDLENBQUNpRCxRQUFGLENBQVcsQ0FBWCxFQUFjSSxTQUFkO0FBQ0E3RCxJQUFBQSxJQUFJLENBQUN1RCxPQUFMLENBQWEsVUFBU1gsSUFBVCxFQUFla0IsR0FBZixFQUFvQjtBQUNoQ3RELE1BQUFBLENBQUMsQ0FBQ2lELFFBQUYsQ0FBVyxDQUFYLEVBQWNFLFNBQWQsR0FBMkJYLFlBQVksSUFBSUQsU0FBaEIsSUFBNkJDLFlBQVksQ0FBQ2QsSUFBYixJQUFxQlUsSUFBSSxDQUFDVixJQUF4RCxHQUFnRSxXQUFoRSxHQUE4RSxXQUF4RztBQUNBLFVBQUkzQixDQUFDLEdBQUcrQixVQUFVLENBQUNNLElBQUksQ0FBQ1YsSUFBTCxHQUFZakMsS0FBSyxDQUFDa0QsR0FBTixFQUFiLENBQWxCO0FBQ0EsVUFBSXBCLENBQUMsR0FBR08sVUFBVSxDQUFDTSxJQUFJLENBQUNQLEtBQUwsR0FBYW5DLE1BQU0sQ0FBQ2dELEdBQVAsRUFBZCxDQUFsQjtBQUNBLFVBQUluQixDQUFDLEdBQUcsQ0FBUixFQUFXO0FBQ1ZnQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWXpELENBQVo7QUFDQXdELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZakMsQ0FBWjtBQUNBZ0MsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlKLFFBQVo7QUFDQUcsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlSLFNBQVo7O0FBRUFoRCxRQUFBQSxDQUFDLENBQUNpRCxRQUFGLENBQVcsQ0FBWCxFQUFjUSxRQUFkLENBQXVCMUQsQ0FBQyxHQUFHcUQsUUFBM0IsRUFBcUNKLFNBQVMsR0FBR3pCLENBQUMsR0FBR3lCLFNBQXJELEVBQWdFSSxRQUFRLEdBQUcsR0FBM0UsRUFBZ0Y3QixDQUFDLEdBQUd5QixTQUFwRjtBQUNBO0FBQ0QsS0FaRDs7QUFjQWhELElBQUFBLENBQUMsQ0FBQ2lELFFBQUYsQ0FBVyxDQUFYLEVBQWNTLFlBQWQsQ0FBMkIsTUFBM0I7QUFDQTFELElBQUFBLENBQUMsQ0FBQ2lELFFBQUYsQ0FBVyxDQUFYLEVBQWNVLFdBQWQsQ0FBMEIsQ0FBMUI7QUFDQTNELElBQUFBLENBQUMsQ0FBQ2lELFFBQUYsQ0FBVyxDQUFYLEVBQWNXLFFBQWQsQ0FBdUJuRSxLQUFLLENBQUNrRCxHQUFOLEVBQXZCLEVBQW9DLENBQXBDLEVBQXVDcEQsQ0FBQyxHQUFHLENBQTNDO0FBQ0FTLElBQUFBLENBQUMsQ0FBQ2lELFFBQUYsQ0FBVyxDQUFYLEVBQWNTLFlBQWQsQ0FBMkIsT0FBM0I7QUFDQTFELElBQUFBLENBQUMsQ0FBQ2lELFFBQUYsQ0FBVyxDQUFYLEVBQWNXLFFBQWQsQ0FBdUJuRSxLQUFLLENBQUNpRCxHQUFOLEVBQXZCLEVBQW9DcEQsQ0FBQyxHQUFHLEVBQXhDLEVBQTRDQyxDQUFDLEdBQUcsQ0FBaEQ7O0FBRUE7QUFDQSxHQTVCRDtBQTZCQSxNQUFJc0UsT0FBTyxHQUFHaEQsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QmlELGVBQXhCLEVBQWQ7QUFDQSxXQUFTQyxPQUFULENBQWlCakUsQ0FBakIsRUFBb0I7QUFDbkJ5RCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTFELENBQUMsQ0FBQ2tFLEtBQWQ7QUFDQTs7O0FBR0RILEVBQUFBLE9BQU8sQ0FBQ0ksZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0NGLE9BQWxDO0FBQ0FGLEVBQUFBLE9BQU8sQ0FBQ0ksZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsVUFBU25FLENBQVQsRUFBWTtBQUM3Q0UsSUFBQUEsQ0FBQyxDQUFDQyxZQUFGLENBQWVELENBQUMsQ0FBQ0UsYUFBRixDQUFnQkosQ0FBQyxDQUFDQyxDQUFsQixDQUFmO0FBQ0EsR0FGRDtBQUdBQyxFQUFBQSxDQUFDLENBQUNZLEdBQUYsQ0FBTWlELE9BQU47QUFDQSxTQUFPN0QsQ0FBUDtBQUNBLENBcEhEIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIFcsXG5cdCAgICBIO1xuXHR2YXIgZGF0YSA9IFtdLFxuXHQgICAgeWVhcnMgPSBbXSxcblx0ICAgIGNvdW50cyA9IFtdO1xuXHR2YXIgZmlyc3R5ZWFyID0gbGFzdHllYXIgPSAwO1xuXHRmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG5cdFx0aWYgKGUueCA+IDApXG5cdFx0XHQkLnJlbmRlckNhbnZhcygkLmdldEFjdGl2ZVllYXIoZS54IC8gVGkuUGxhdGZvcm0uZGlzcGxheUNhcHMubG9naWNhbERlbnNpdHlGYWN0b3IpKTtcblx0fVxuXG5cdHZhciAkID0gVGkuVUkuY3JlYXRlVmlldyh7XG5cdFx0aGVpZ2h0IDogMTEwLFxuXHRcdGJ1YmJsZVBhcmVudCA6IGZhbHNlLFxuXHRcdHRvcCA6IDBcblx0fSk7XG5cdCQuYWRkKHJlcXVpcmUoXCJ0aS5jYW52YXNcIikuY3JlYXRlVmlldyh7XG5cdFx0d2lkdGggOiBUaS5VSS5GSUxMLFxuXHRcdGhlaWdodCA6IFRpLlVJLkZJTEwsXG5cdFx0dG9wIDogMCxcblx0XHRoZWlnaHQgOiAxMDAsXG5cdFx0bGVmdCA6IDEwLFxuXHRcdGJ1YmJsZVBhcmVudCA6IGZhbHNlLFxuXHRcdHJpZ2h0IDogMTAsXG5cdFx0YmFja2dyb3VuZENvbG9yIDogIFwiIzRFNzk4NVwiLFxuXHRcdFxuXG5cdH0pKTtcblxuXHQvLyQuY2hpbGRyZW5bMF0uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSk7XG5cblx0Ly8kLmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBmdW5jdGlvbigpIHtcblx0Ly9cdFx0JC5jaGlsZHJlblsxXS5zaG93KCk7XG5cdC8vXHR9KTtcblxuXHQkLnNldERhdGEgPSBmdW5jdGlvbihwdWJsaWNhdGlvblllYXJzKSB7XG5cdFx0Y29uc3QgcHllYXJzID0gcHVibGljYXRpb25ZZWFycy5maWx0ZXIoZnVuY3Rpb24oeSkge1xuXHRcdFx0cmV0dXJuIHkudiA+IDE1O1xuXHRcdH0pO1xuXHRcdGRhdGEgPSBweWVhcnMubWFwKGZ1bmN0aW9uKHllYXIpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHllYXIgOiBwYXJzZUludCh5ZWFyLmspLFxuXHRcdFx0XHRjb3VudCA6IHBhcnNlRmxvYXQoTWF0aC5zcXJ0KHllYXIudikpXG5cdFx0XHR9O1xuXHRcdH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0cmV0dXJuIGEueWVhciAtIGIueWVhcjtcblx0XHR9KTtcblx0XHRjb3VudHMgPSBkYXRhLm1hcChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRyZXR1cm4gaXRlbS5jb3VudDtcblx0XHR9KTtcblx0XHR5ZWFycyA9IGRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRcdHJldHVybiBpdGVtLnllYXI7XG5cdFx0fSk7XG5cdFx0VyA9IHBhcnNlRmxvYXQoJC5yZWN0LndpZHRoKSB8fCAyMDA7XG5cdFx0SCA9IHBhcnNlRmxvYXQoJC5yZWN0LmhlaWdodCktMTAgfHwgODA7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cdCQuZ2V0QWN0aXZlWWVhciA9IGZ1bmN0aW9uKHhwb3MpIHtcblx0XHRpZiAoeHBvcyA9PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4geHBvcztcblx0XHR2YXIgc2VsZWN0ZWRZZWFyO1xuXHRcdHZhciB5ZWFyc1RvdGFsID0geWVhcnMubWF4KCkgLSB5ZWFycy5taW4oKTtcblx0XHR2YXIgc2VsZWN0ZWROZHggPSBNYXRoLmZsb29yKHhwb3MgLyBXICogeWVhcnNUb3RhbCk7XG5cdFx0dmFyIHkgPSB5ZWFycy5taW4oKSArIHNlbGVjdGVkTmR4O1xuXHRcdC8vIGxvb2tpbmcgZm9yIHllYXI6XG5cblx0XHR2YXIgc2VsZWN0ZWRJdGVtO1xuXHRcdGRhdGEuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRpZiAoaXRlbS55ZWFyID09IHkpXG5cdFx0XHRcdHNlbGVjdGVkSXRlbSA9IGl0ZW07XG5cdFx0fSk7XG5cdFx0cmV0dXJuIChzZWxlY3RlZEl0ZW0pID8gc2VsZWN0ZWRJdGVtIDogdW5kZWZpbmVkO1xuXHR9O1xuXHRcblx0JC5yZW5kZXJDYW52YXMgPSBmdW5jdGlvbihzZWxlY3RlZFllYXIpIHtcblx0XHR2YXIgYmFySGVpZ2h0ID0gSCAtIDEyO1xuXHRcdCQuY2hpbGRyZW5bMF0uY2xlYXIoKTtcblx0XHQkLmNoaWxkcmVuWzBdLmZpbGxTdHlsZSA9ICcjZmZmZmZmZmYnO1xuXHRcdGlmICh5ZWFycy5tYXgoKSA9PSB5ZWFycy5taW4oKSkgcmV0dXJuO1xuXHRcdHZhciBiYXJXaWR0aCA9IFcgLyAoeWVhcnMubWF4KCkgLSB5ZWFycy5taW4oKSk7XG5cdFx0JC5jaGlsZHJlblswXS5iZWdpblBhdGgoKTtcblx0XHRkYXRhLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgbmR4KSB7XG5cdFx0XHQkLmNoaWxkcmVuWzBdLmZpbGxTdHlsZSA9IChzZWxlY3RlZFllYXIgIT0gdW5kZWZpbmVkICYmIHNlbGVjdGVkWWVhci55ZWFyID09IGl0ZW0ueWVhcikgPyAnI2ZmZmZmZmZmJyA6ICcjZmZjY2NjY2MnO1xuXHRcdFx0dmFyIHggPSBwYXJzZUZsb2F0KGl0ZW0ueWVhciAtIHllYXJzLm1pbigpKTtcblx0XHRcdHZhciB5ID0gcGFyc2VGbG9hdChpdGVtLmNvdW50IC8gY291bnRzLm1heCgpKTtcblx0XHRcdGlmICh5ID4gMCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyh4KTtcblx0XHRcdFx0Y29uc29sZS5sb2coeSk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGJhcldpZHRoKTtcblx0XHRcdFx0Y29uc29sZS5sb2coYmFySGVpZ2h0KTtcblx0XHRcdFx0XG5cdFx0XHRcdCQuY2hpbGRyZW5bMF0uZmlsbFJlY3QoeCAqIGJhcldpZHRoLCBiYXJIZWlnaHQgLSB5ICogYmFySGVpZ2h0LCBiYXJXaWR0aCAtIDAuNSwgeSAqIGJhckhlaWdodCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0XG5cdFx0JC5jaGlsZHJlblswXS5zZXRUZXh0QWxpZ24oXCJsZWZ0XCIpO1xuXHRcdCQuY2hpbGRyZW5bMF0uc2V0VGV4dFNpemUoOSk7XG5cdFx0JC5jaGlsZHJlblswXS5maWxsVGV4dCh5ZWFycy5taW4oKSwgMCwgSCAtIDIpO1xuXHRcdCQuY2hpbGRyZW5bMF0uc2V0VGV4dEFsaWduKFwicmlnaHRcIik7XG5cdFx0JC5jaGlsZHJlblswXS5maWxsVGV4dCh5ZWFycy5tYXgoKSwgVyAtIDIwLCBIIC0gMik7XG5cblx0XHQvL1xuXHR9O1xuXHR2YXIgUGluY2hlciA9IHJlcXVpcmUoJ3RpLnBpbmNodmlldycpLmNyZWF0ZVBpbmNoVmlldygpO1xuXHRmdW5jdGlvbiBvblBpbmNoKGUpIHtcblx0XHRjb25zb2xlLmxvZyhlLnNjYWxlKTtcblx0fVxuXG5cblx0UGluY2hlci5hZGRFdmVudExpc3RlbmVyKCdwaW5jaCcsIG9uUGluY2gpO1xuXHRQaW5jaGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0JC5yZW5kZXJDYW52YXMoJC5nZXRBY3RpdmVZZWFyKGUueCkpO1xuXHR9KTtcblx0JC5hZGQoUGluY2hlcik7XG5cdHJldHVybiAkO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL1VzZXJzL2Z1ZXJzdC9Eb2N1bWVudHMvTUxlYXJuaW5nL1NjaGF1ZmVuc3Rlci9SZXNvdXJjZXMvVmlld3MifQ==