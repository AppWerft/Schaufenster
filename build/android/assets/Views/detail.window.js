const Gears = require('Views/gears.widget')();
const ORCID_ACCESS_TOKEN = "2b23b44c-1590-414c-bdb3-37a36b5e5c23";
module.exports = function (payload) {
  var $ = Ti.UI.createWindow({
    title: "HOS-Schaufenster",
    subtitle: payload.collection,
    backgroundColor: 'white' });

  $.container = Ti.UI.createScrollView({
    scrollType: 'vertical',
    right: 0,
    layout: 'vertical' });

  $.add($.container);
  Object.keys(payload).forEach(function (k) {
    console.log("====");
    console.log(k + ":");
    console.log(payload[k]);
  });
  var doi = null;
  if (payload.identifier && payload.identifierType == 'DOI') {
    doi = payload.identifier;
  }
  if (payload.url) {
    var doiurls = payload.url.filter(function (u) {
      return u.indexOf('https://doi.org/') > -1;
    });
    if (doiurls.length) {
      doi = doiurls[0].replace('https://doi.org/', '');
      const Badget = Ti.UI.createImageView({
        right: 5,
        top: 5,
        width: 48,
        height: 48 });

      require("Classes/Altmetrics")({
        view: Badget,
        type: 'doi',
        doi: doi,
        onclick: function (url) {
        } });


      $.add(Badget);
      /*$.add(Ti.UI.createWebView({
                      top : 0,
                      right : 3,
                      width : 80,
                      height : 80,
                      html : "<html><head><script type='text/javascript' src='https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js'></script></head>" + "<body><div style=\"background-color:transparent\" class='altmetric-embed' data-badge-type='donut' data-doi=\"" + doi + "\"></div></body></html>"
                      }));*/
    }
  }
  if (payload.creatorName)
  $.container.add(require("Views/creatornameView")(payload));
  if (payload.title)
  $.container.add(Ti.UI.createLabel({
    top: 5,
    right: 80,
    left: 10,
    textAlign: 'left',
    text: Array.isArray(payload.title) ? payload.title.join(' ') : payload.title,
    height: Ti.UI.SIZE,
    color: "black",
    font: {
      fontWeight: "bold",
      fontSize: 20 } }));



  if (payload.abstract)
  $.container.add(Ti.UI.createLabel({
    top: 10,
    left: 10,

    right: 10,
    text: Array.isArray(payload.abstract) ? payload.abstract.join('\n') : payload.abstract,
    color: 'black' }));


  $.addEventListener("open", require("Views/ondetailopen"));
  $.open();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGFpbC53aW5kb3cuanMiXSwibmFtZXMiOlsiR2VhcnMiLCJyZXF1aXJlIiwiT1JDSURfQUNDRVNTX1RPS0VOIiwibW9kdWxlIiwiZXhwb3J0cyIsInBheWxvYWQiLCIkIiwiVGkiLCJVSSIsImNyZWF0ZVdpbmRvdyIsInRpdGxlIiwic3VidGl0bGUiLCJjb2xsZWN0aW9uIiwiYmFja2dyb3VuZENvbG9yIiwiY29udGFpbmVyIiwiY3JlYXRlU2Nyb2xsVmlldyIsInNjcm9sbFR5cGUiLCJyaWdodCIsImxheW91dCIsImFkZCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiayIsImNvbnNvbGUiLCJsb2ciLCJkb2kiLCJpZGVudGlmaWVyIiwiaWRlbnRpZmllclR5cGUiLCJ1cmwiLCJkb2l1cmxzIiwiZmlsdGVyIiwidSIsImluZGV4T2YiLCJsZW5ndGgiLCJyZXBsYWNlIiwiQmFkZ2V0IiwiY3JlYXRlSW1hZ2VWaWV3IiwidG9wIiwid2lkdGgiLCJoZWlnaHQiLCJ2aWV3IiwidHlwZSIsIm9uY2xpY2siLCJjcmVhdG9yTmFtZSIsImNyZWF0ZUxhYmVsIiwibGVmdCIsInRleHRBbGlnbiIsInRleHQiLCJBcnJheSIsImlzQXJyYXkiLCJqb2luIiwiU0laRSIsImNvbG9yIiwiZm9udCIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImFic3RyYWN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9wZW4iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLG9CQUFELENBQVAsRUFBZDtBQUNBLE1BQU1DLGtCQUFrQixHQUFHLHNDQUEzQjtBQUNBQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIsVUFBU0MsT0FBVCxFQUFrQjtBQUNsQyxNQUFJQyxDQUFDLEdBQUdDLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNQyxZQUFOLENBQW1CO0FBQzFCQyxJQUFBQSxLQUFLLEVBQUcsa0JBRGtCO0FBRTFCQyxJQUFBQSxRQUFRLEVBQUdOLE9BQU8sQ0FBQ08s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SyxLQUFSLENBQWN5QyxJQUFkLENBQW1CLEdBQW5CLENBQS9CLEdBQXlEOUMsT0FBTyxDQUFDSyxLQUx2QztBQU1qQzhCLElBQUFBLE1BQU0sRUFBR2pDLEVBQUUsQ0FBQ0MsRUFBSCxDQUFNNEMsSUFOa0I7QUFPakNDLElBQUFBLEtBQUssRUFBRyxPQVB5QjtBQVFqQ0MsSUFBQUEsSUFBSSxFQUFHO0FBQ05DLE1BQUFBLFVBQVUsRUFBRyxNQURQO0FBRU5DLE1BQUFBLFFBQVEsRUFBRyxFQUZMLEVBUjBCLEVBQWxCLENBQWhCOzs7O0FBY0QsTUFBSW5ELE9BQU8sQ0FBQ29ELFFBQVo7QUFDQ25ELEVBQUFBLENBQUMsQ0FBQ1EsU0FBRixDQUFZSyxHQUFaLENBQWdCWixFQUFFLENBQUNDLEVBQUgsQ0FBTXFDLFdBQU4sQ0FBa0I7QUFDakNQLElBQUFBLEdBQUcsRUFBRyxFQUQyQjtBQUVqQ1EsSUFBQUEsSUFBSSxFQUFHLEVBRjBCOztBQUlqQzdCLElBQUFBLEtBQUssRUFBRyxFQUp5QjtBQUtqQytCLElBQUFBLElBQUksRUFBR0MsS0FBSyxDQUFDQyxPQUFOLENBQWM3QyxPQUFPLENBQUNvRCxRQUF0QixJQUFrQ3BELE9BQU8sQ0FBQ29ELFFBQVIsQ0FBaUJOLElBQWpCLENBQXNCLElBQXRCLENBQWxDLEdBQWdFOUMsT0FBTyxDQUFDb0QsUUFMOUM7QUFNakNKLElBQUFBLEtBQUssRUFBRyxPQU55QixFQUFsQixDQUFoQjs7O0FBU0QvQyxFQUFBQSxDQUFDLENBQUNvRCxnQkFBRixDQUFtQixNQUFuQixFQUEyQnpELE9BQU8sQ0FBQyxvQkFBRCxDQUFsQztBQUNBSyxFQUFBQSxDQUFDLENBQUNxRCxJQUFGO0FBQ0EsQ0FoRkQiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBHZWFycyA9IHJlcXVpcmUoJ1ZpZXdzL2dlYXJzLndpZGdldCcpKCk7XG5jb25zdCBPUkNJRF9BQ0NFU1NfVE9LRU4gPSBcIjJiMjNiNDRjLTE1OTAtNDE0Yy1iZGIzLTM3YTM2YjVlNWMyM1wiO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXlsb2FkKSB7XG5cdHZhciAkID0gVGkuVUkuY3JlYXRlV2luZG93KHtcblx0XHR0aXRsZSA6IFwiSE9TLVNjaGF1ZmVuc3RlclwiLFxuXHRcdHN1YnRpdGxlIDogcGF5bG9hZC5jb2xsZWN0aW9uLFxuXHRcdGJhY2tncm91bmRDb2xvciA6ICd3aGl0ZSdcblx0fSk7XG5cdCQuY29udGFpbmVyID0gVGkuVUkuY3JlYXRlU2Nyb2xsVmlldyh7XG5cdFx0c2Nyb2xsVHlwZSA6ICd2ZXJ0aWNhbCcsXG5cdFx0cmlnaHQgOiAwLFxuXHRcdGxheW91dCA6ICd2ZXJ0aWNhbCdcblx0fSk7XG5cdCQuYWRkKCQuY29udGFpbmVyKTtcblx0T2JqZWN0LmtleXMocGF5bG9hZCkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG5cdFx0Y29uc29sZS5sb2coXCI9PT09XCIpO1xuXHRcdGNvbnNvbGUubG9nKGsgKyBcIjpcIik7XG5cdFx0Y29uc29sZS5sb2cocGF5bG9hZFtrXSk7XG5cdH0pO1xuXHR2YXIgZG9pID0gbnVsbDtcblx0aWYgKHBheWxvYWQuaWRlbnRpZmllciAmJiBwYXlsb2FkLmlkZW50aWZpZXJUeXBlPT0nRE9JJykge1xuXHRcdGRvaSA9IHBheWxvYWQuaWRlbnRpZmllcjtcblx0fVxuXHRpZiAocGF5bG9hZC51cmwpIHtcblx0XHR2YXIgZG9pdXJscyA9IHBheWxvYWQudXJsLmZpbHRlcihmdW5jdGlvbih1KSB7XG5cdFx0XHRyZXR1cm4gdS5pbmRleE9mKCdodHRwczovL2RvaS5vcmcvJykgPiAtMTtcblx0XHR9KTtcblx0XHRpZiAoZG9pdXJscy5sZW5ndGgpIHtcblx0XHRcdGRvaSA9IGRvaXVybHNbMF0ucmVwbGFjZSgnaHR0cHM6Ly9kb2kub3JnLycsJycpO1xuXHRcdFx0Y29uc3QgQmFkZ2V0ID0gVGkuVUkuY3JlYXRlSW1hZ2VWaWV3KHtcblx0XHRcdFx0cmlnaHQgOiA1LFxuXHRcdFx0XHR0b3AgOiA1LFxuXHRcdFx0XHR3aWR0aCA6IDQ4LFxuXHRcdFx0XHRoZWlnaHQgOiA0OFxuXHRcdFx0fSk7XG5cdFx0XHRyZXF1aXJlKFwiQ2xhc3Nlcy9BbHRtZXRyaWNzXCIpKHtcblx0XHRcdFx0dmlldyA6IEJhZGdldCxcblx0XHRcdFx0dHlwZSA6ICdkb2knLFxuXHRcdFx0XHRkb2kgOiBkb2ksXG5cdFx0XHRcdG9uY2xpY2sgOiBmdW5jdGlvbih1cmwpIHtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdCQuYWRkKEJhZGdldCk7XG5cdFx0XHQvKiQuYWRkKFRpLlVJLmNyZWF0ZVdlYlZpZXcoe1xuXHRcdFx0IHRvcCA6IDAsXG5cdFx0XHQgcmlnaHQgOiAzLFxuXHRcdFx0IHdpZHRoIDogODAsXG5cdFx0XHQgaGVpZ2h0IDogODAsXG5cdFx0XHQgaHRtbCA6IFwiPGh0bWw+PGhlYWQ+PHNjcmlwdCB0eXBlPSd0ZXh0L2phdmFzY3JpcHQnIHNyYz0naHR0cHM6Ly9kMWJ4aDh1YXMxbW53Ny5jbG91ZGZyb250Lm5ldC9hc3NldHMvZW1iZWQuanMnPjwvc2NyaXB0PjwvaGVhZD5cIiArIFwiPGJvZHk+PGRpdiBzdHlsZT1cXFwiYmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudFxcXCIgY2xhc3M9J2FsdG1ldHJpYy1lbWJlZCcgZGF0YS1iYWRnZS10eXBlPSdkb251dCcgZGF0YS1kb2k9XFxcIlwiICsgZG9pICsgXCJcXFwiPjwvZGl2PjwvYm9keT48L2h0bWw+XCJcblx0XHRcdCB9KSk7Ki9cblx0XHR9XG5cdH1cblx0aWYgKHBheWxvYWQuY3JlYXRvck5hbWUpXG5cdFx0JC5jb250YWluZXIuYWRkKHJlcXVpcmUoXCJWaWV3cy9jcmVhdG9ybmFtZVZpZXdcIikocGF5bG9hZCkpO1xuXHRpZiAocGF5bG9hZC50aXRsZSlcblx0XHQkLmNvbnRhaW5lci5hZGQoVGkuVUkuY3JlYXRlTGFiZWwoe1xuXHRcdFx0dG9wIDogNSxcblx0XHRcdHJpZ2h0IDogODAsXG5cdFx0XHRsZWZ0IDogMTAsXG5cdFx0XHR0ZXh0QWxpZ24gOiAnbGVmdCcsXG5cdFx0XHR0ZXh0IDogQXJyYXkuaXNBcnJheShwYXlsb2FkLnRpdGxlKSA/IHBheWxvYWQudGl0bGUuam9pbignICcpIDogcGF5bG9hZC50aXRsZSxcblx0XHRcdGhlaWdodCA6IFRpLlVJLlNJWkUsXG5cdFx0XHRjb2xvciA6IFwiYmxhY2tcIixcblx0XHRcdGZvbnQgOiB7XG5cdFx0XHRcdGZvbnRXZWlnaHQgOiBcImJvbGRcIixcblx0XHRcdFx0Zm9udFNpemUgOiAyMFxuXHRcdFx0fVxuXHRcdH0pKTtcblxuXHRpZiAocGF5bG9hZC5hYnN0cmFjdClcblx0XHQkLmNvbnRhaW5lci5hZGQoVGkuVUkuY3JlYXRlTGFiZWwoe1xuXHRcdFx0dG9wIDogMTAsXG5cdFx0XHRsZWZ0IDogMTAsXG5cblx0XHRcdHJpZ2h0IDogMTAsXG5cdFx0XHR0ZXh0IDogQXJyYXkuaXNBcnJheShwYXlsb2FkLmFic3RyYWN0KSA/IHBheWxvYWQuYWJzdHJhY3Quam9pbignXFxuJykgOiBwYXlsb2FkLmFic3RyYWN0LFxuXHRcdFx0Y29sb3IgOiAnYmxhY2snXG5cdFx0fSkpO1xuXG5cdCQuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgcmVxdWlyZShcIlZpZXdzL29uZGV0YWlsb3BlblwiKSk7XG5cdCQub3BlbigpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiL1VzZXJzL2Z1ZXJzdC9Eb2N1bWVudHMvTUxlYXJuaW5nL1NjaGF1ZmVuc3Rlci9SZXNvdXJjZXMvVmlld3MifQ==