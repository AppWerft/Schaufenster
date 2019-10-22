var $ = function (opts) {
  this.endpoint = "https://pub.orcid.org/v2.1/";
};


$.prototype.startQuery = function (orcid, cb) {

  if (!Ti.Network.online) {
    cb({
      success: false });

    return;
  }
  function sendBack(text) {
    cb({
      success: true,
      text: text });

  }
  const xhr = Ti.Network.createHTTPClient({
    onload: function (e) {
      console.log(this.responseText);
      sendBack(JSON.parse(this.responseText));
    },
    onerror: function (E) {
      cb({
        success: false });

    },
    timeout: 5000 });

  xhr.open("GET", this.endpoint + orcid + '/person');
  xhr.setRequestHeader("Authorization type", "Bearer");
  xhr.setRequestHeader("Access token", "2b23b44c-1590-414c-bdb3-37a36b5e5c23");
  //xhr.setRequestHeader("Content-type","application/json");
  xhr.setRequestHeader("Accept", "application/json");

  xhr.send();
};



module.exports = $;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9yY2lkLmpzIl0sIm5hbWVzIjpbIiQiLCJvcHRzIiwiZW5kcG9pbnQiLCJwcm90b3R5cGUiLCJzdGFydFF1ZXJ5Iiwib3JjaWQiLCJjYiIsIlRpIiwiTmV0d29yayIsIm9ubGluZSIsInN1Y2Nlc3MiLCJzZW5kQmFjayIsInRleHQiLCJ4aHIiLCJjcmVhdGVIVFRQQ2xpZW50Iiwib25sb2FkIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25zZVRleHQiLCJKU09OIiwicGFyc2UiLCJvbmVycm9yIiwiRSIsInRpbWVvdXQiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxDQUFDLEdBQUcsVUFBU0MsSUFBVCxFQUFlO0FBQ3RCLE9BQUtDLFFBQUwsR0FBZ0IsNkJBQWhCO0FBQ0EsQ0FGRDs7O0FBS0FGLENBQUMsQ0FBQ0csU0FBRixDQUFZQyxVQUFaLEdBQXlCLFVBQVNDLEtBQVQsRUFBZ0JDLEVBQWhCLEVBQW9COztBQUU1QyxNQUFJLENBQUNDLEVBQUUsQ0FBQ0MsT0FBSCxDQUFXQyxNQUFoQixFQUF3QjtBQUN2QkgsSUFBQUEsRUFBRSxDQUFDO0FBQ0ZJLE1BQUFBLE9BQU8sRUFBRyxLQURSLEVBQUQsQ0FBRjs7QUFHQTtBQUNBO0FBQ0QsV0FBU0MsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0I7QUFDdkJOLElBQUFBLEVBQUUsQ0FBQztBQUNGSSxNQUFBQSxPQUFPLEVBQUcsSUFEUjtBQUVGRSxNQUFBQSxJQUFJLEVBQUdBLElBRkwsRUFBRCxDQUFGOztBQUlBO0FBQ0QsUUFBTUMsR0FBRyxHQUFHTixFQUFFLENBQUNDLE9BQUgsQ0FBV00sZ0JBQVgsQ0FBNEI7QUFDdkNDLElBQUFBLE1BQU0sRUFBRyxVQUFTQyxDQUFULEVBQVk7QUFDcEJDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtDLFlBQWpCO0FBQ0FSLE1BQUFBLFFBQVEsQ0FBQ1MsSUFBSSxDQUFDQyxLQUFMLENBQVcsS0FBS0YsWUFBaEIsQ0FBRCxDQUFSO0FBQ0EsS0FKc0M7QUFLdkNHLElBQUFBLE9BQU8sRUFBRyxVQUFTQyxDQUFULEVBQVk7QUFDckJqQixNQUFBQSxFQUFFLENBQUM7QUFDRkksUUFBQUEsT0FBTyxFQUFHLEtBRFIsRUFBRCxDQUFGOztBQUdBLEtBVHNDO0FBVXZDYyxJQUFBQSxPQUFPLEVBQUcsSUFWNkIsRUFBNUIsQ0FBWjs7QUFZQVgsRUFBQUEsR0FBRyxDQUFDWSxJQUFKLENBQVMsS0FBVCxFQUFnQixLQUFLdkIsUUFBTCxHQUFnQkcsS0FBaEIsR0FBc0IsU0FBdEM7QUFDQVEsRUFBQUEsR0FBRyxDQUFDYSxnQkFBSixDQUFxQixvQkFBckIsRUFBMkMsUUFBM0M7QUFDQWIsRUFBQUEsR0FBRyxDQUFDYSxnQkFBSixDQUFxQixjQUFyQixFQUFxQyxzQ0FBckM7QUFDQTtBQUNBYixFQUFBQSxHQUFHLENBQUNhLGdCQUFKLENBQXFCLFFBQXJCLEVBQThCLGtCQUE5Qjs7QUFFQWIsRUFBQUEsR0FBRyxDQUFDYyxJQUFKO0FBQ0EsQ0FqQ0Q7Ozs7QUFxQ0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjdCLENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsidmFyICQgPSBmdW5jdGlvbihvcHRzKSB7XG5cdHRoaXMuZW5kcG9pbnQgPSBcImh0dHBzOi8vcHViLm9yY2lkLm9yZy92Mi4xL1wiO1xufTtcblxuXG4kLnByb3RvdHlwZS5zdGFydFF1ZXJ5ID0gZnVuY3Rpb24ob3JjaWQsIGNiKSB7XG5cdFxuXHRpZiAoIVRpLk5ldHdvcmsub25saW5lKSB7XG5cdFx0Y2Ioe1xuXHRcdFx0c3VjY2VzcyA6IGZhbHNlXG5cdFx0fSk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZ1bmN0aW9uIHNlbmRCYWNrKHRleHQpIHtcblx0XHRjYih7XG5cdFx0XHRzdWNjZXNzIDogdHJ1ZSxcblx0XHRcdHRleHQgOiB0ZXh0LFxuXHRcdH0pO1xuXHR9XG5cdGNvbnN0IHhociA9IFRpLk5ldHdvcmsuY3JlYXRlSFRUUENsaWVudCh7XG5cdFx0b25sb2FkIDogZnVuY3Rpb24oZSkge1xuXHRcdFx0Y29uc29sZS5sb2codGhpcy5yZXNwb25zZVRleHQpO1xuXHRcdFx0c2VuZEJhY2soSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCkpO1xuXHRcdH0sXG5cdFx0b25lcnJvciA6IGZ1bmN0aW9uKEUpIHtcblx0XHRcdGNiKHtcblx0XHRcdFx0c3VjY2VzcyA6IGZhbHNlXG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHRpbWVvdXQgOiA1MDAwLFxuXHR9KTtcblx0eGhyLm9wZW4oXCJHRVRcIiwgdGhpcy5lbmRwb2ludCArIG9yY2lkKycvcGVyc29uJyk7XG5cdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQXV0aG9yaXphdGlvbiB0eXBlXCIsIFwiQmVhcmVyXCIpO1xuXHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VzcyB0b2tlblwiLCBcIjJiMjNiNDRjLTE1OTAtNDE0Yy1iZGIzLTM3YTM2YjVlNWMyM1wiKTtcblx0Ly94aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLFwiYXBwbGljYXRpb24vanNvblwiKTtcblx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIixcImFwcGxpY2F0aW9uL2pzb25cIik7IFxuXHRcblx0eGhyLnNlbmQoKTtcbn07XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9ICQ7XG4iXSwic291cmNlUm9vdCI6Ii9Vc2Vycy9mdWVyc3QvRG9jdW1lbnRzL01MZWFybmluZy9TY2hhdWZlbnN0ZXIvUmVzb3VyY2VzL0NsYXNzZXMifQ==