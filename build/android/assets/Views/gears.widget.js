
module.exports = function () {
  const $ = Ti.UI.createView({
    backgroundColor: '#88000000',
    zIndex: 999 });

  $.add(require("ti.animation").createAnimationView({
    file: '/assets/gears.json',
    loop: true,
    autoStart: true,
    transform: Ti.UI.create2DMatrix({
      scale: 3.0 }) }));


  Log(">>>>>  gears created");
  return $;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlYXJzLndpZGdldC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiJCIsIlRpIiwiVUkiLCJjcmVhdGVWaWV3IiwiYmFja2dyb3VuZENvbG9yIiwiekluZGV4IiwiYWRkIiwicmVxdWlyZSIsImNyZWF0ZUFuaW1hdGlvblZpZXciLCJmaWxlIiwibG9vcCIsImF1dG9TdGFydCIsInRyYW5zZm9ybSIsImNyZWF0ZTJETWF0cml4Iiwic2NhbGUiLCJMb2ciXSwibWFwcGluZ3MiOiI7QUFDQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFlBQVc7QUFDM0IsUUFBTUMsQ0FBQyxHQUFHQyxFQUFFLENBQUNDLEVBQUgsQ0FBTUMsVUFBTixDQUFpQjtBQUMxQkMsSUFBQUEsZUFBZSxFQUFHLFdBRFE7QUFFMUJDLElBQUFBLE1BQU0sRUFBQyxHQUZtQixFQUFqQixDQUFWOztBQUlBTCxFQUFBQSxDQUFDLENBQUNNLEdBQUYsQ0FBTUMsT0FBTyxDQUFDLGNBQUQsQ0FBUCxDQUF3QkMsbUJBQXhCLENBQTRDO0FBQ2pEQyxJQUFBQSxJQUFJLEVBQUcsb0JBRDBDO0FBRWpEQyxJQUFBQSxJQUFJLEVBQUcsSUFGMEM7QUFHakRDLElBQUFBLFNBQVMsRUFBRyxJQUhxQztBQUlqREMsSUFBQUEsU0FBUyxFQUFHWCxFQUFFLENBQUNDLEVBQUgsQ0FBTVcsY0FBTixDQUFxQjtBQUNoQ0MsTUFBQUEsS0FBSyxFQUFHLEdBRHdCLEVBQXJCLENBSnFDLEVBQTVDLENBQU47OztBQVFBQyxFQUFBQSxHQUFHLENBQUMsc0JBQUQsQ0FBSDtBQUNBLFNBQU9mLENBQVA7QUFDQSxDQWZEIiwic291cmNlc0NvbnRlbnQiOlsiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHRjb25zdCAkID0gVGkuVUkuY3JlYXRlVmlldyh7XG5cdFx0YmFja2dyb3VuZENvbG9yIDogJyM4ODAwMDAwMCcsXG5cdFx0ekluZGV4Ojk5OVxuXHR9KTtcblx0JC5hZGQocmVxdWlyZShcInRpLmFuaW1hdGlvblwiKS5jcmVhdGVBbmltYXRpb25WaWV3KHtcblx0XHRmaWxlIDogJy9hc3NldHMvZ2VhcnMuanNvbicsXG5cdFx0bG9vcCA6IHRydWUsXG5cdFx0YXV0b1N0YXJ0IDogdHJ1ZSxcblx0XHR0cmFuc2Zvcm0gOiBUaS5VSS5jcmVhdGUyRE1hdHJpeCh7XG5cdFx0XHRzY2FsZSA6IDMuMFxuXHRcdH0pXG5cdH0pKTtcblx0TG9nKFwiPj4+Pj4gIGdlYXJzIGNyZWF0ZWRcIik7XG5cdHJldHVybiAkO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL1VzZXJzL2Z1ZXJzdC9Eb2N1bWVudHMvTUxlYXJuaW5nL1NjaGF1ZmVuc3Rlci9SZXNvdXJjZXMvVmlld3MifQ==
