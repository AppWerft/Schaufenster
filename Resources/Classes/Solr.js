var $ = function(opts) {
	this.query = "*:*";
	this.endpoint = "https://openscience.hamburg.de/solrQuery/";
	this.querystring = ['fl=internal_institution,url,title,creatorName,creatorNameURI,publicationYear,language,abstract,collection','q=' + this.query,'rows=150', 'facet=true', 'facet.sort=count'];
	;

};

$.prototype.addFacetField = function(f) {
	this.querystring.push('facet.field=' + f);
};

$.prototype.startQuery = function(q, cb) {
	var querystring = this.querystring.join('&');

	if (!Ti.Network.online) {
		cb({
			success : false
		});
		return;
	}
	function sendBack(payload) {
		var facets = payload['facet_counts']['facet_fields'];
		var facetObj = {};
		Object.keys(facets).forEach(function(key) {
			facetObj[key] = sortFacets(facets[key]);
		});
		cb({
			success : true,
			docs : payload.response.docs,
			facets : facetObj
		});
	}

	if (Ti.App.Properties.hasProperty(querystring)) {
		sendBack(JSON.parse(Ti.App.Properties.getString(querystring)));
	}
	var xhr = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.App.Properties.setString(querystring, this.responseData);
			sendBack(JSON.parse(this.responseData));
		},
		onerror : function(E) {
			cb({
				success : false
			});
		},
		timeout : 5000,
	});

	// don't forget the trailing /!
	xhr.open("POST", this.endpoint);
	xhr.setRequestHeader("SolrCoreName", "HOS");
	xhr.send(querystring);
	Log(this.endpoint + '?'+ querystring);
};
$.prototype.setQuery = function(q) {
	this.query = q;
};
$.prototype.resetQuery = function(q) {
	this.query = "*:*";
};
$.prototype.addFacet = function(f) {
	this.querystring.push("fq=" + f);
	
};

$.prototype.hasFacet = function(f) {
	return this.querystring.indexOf("fq=" + f)==-1 ? false :true;
};

$.prototype.toggleFacet = function(f) {
	const found = this.querystring.indexOf("fq=" + f);
	if (found == -1) { // not yet filtered => add
		this.querystring.push("fq=" + f);
	} else {      // filtered => remove
		this.querystring = this.querystring.filter(function(q) {
			return q != "fq=" + f;
		});
	}
};

$.prototype.removeFacet = function(f) {
	this.querystring = this.querystring.filter(function(q) {
		return q != "fq=" + f;
	});
};
$.prototype.removeAllFacets = function(f) {
	this.querystring = this.querystring.filter(function(q) {
		return q.substr(0, 3) != "fq=";
	});
};

function sortFacets(foo) {
	var bar = [];
	foo.forEach(function(f, i) {
		if (i % 2 == 0) {
			bar[i / 2] = {
				k : f.substr(0, 1).toUpperCase() + f.substr(1),
				v : foo[i + 1]
			};
		}
	});
	return bar.filter(function(item) {
		return item.k == 'Null' ? false : true;
	});
}

Array.prototype.max = function() {
	return Math.max.apply(null, this);
};

Array.prototype.min = function() {
	return Math.min.apply(null, this);
};

module.exports = $;
