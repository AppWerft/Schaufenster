var $ = function(opts) {
	this.endpoint = "https://pub.orcid.org/v2.1/";
};


$.prototype.startQuery = function(orcid, cb) {
	
	if (!Ti.Network.online) {
		cb({
			success : false
		});
		return;
	}
	function sendBack(text) {
		cb({
			success : true,
			text : text,
		});
	}
	const xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			console.log(this.responseText);
			sendBack(JSON.parse(this.responseText));
		},
		onerror : function(E) {
			cb({
				success : false
			});
		},
		timeout : 5000,
	});
	xhr.open("GET", this.endpoint + orcid+'/person');
	xhr.setRequestHeader("Authorization type", "Bearer");
	xhr.setRequestHeader("Access token", "2b23b44c-1590-414c-bdb3-37a36b5e5c23");
	//xhr.setRequestHeader("Content-type","application/json");
	xhr.setRequestHeader("Accept","application/json"); 
	
	xhr.send();
};



module.exports = $;
