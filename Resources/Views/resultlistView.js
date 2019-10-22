module.exports = function(docs) {
	var $ = Ti.UI.createListView({
		top : 0,
		backgroundImage : "/assets/bg.jpg",
		templates : {
			'docs' : require("Views/TEMPLATES").docs
		},
		defaultItemTemplate : 'docs',
		sections : [Ti.UI.createListSection()],
	});
	$.setData = function(docs) {
		if (docs && Array.isArray(docs)) {
			function getItem(item) {
				//	Log(item);
				var image = "";
				if (item.collection.match(/UKE/))
					image = "/assets/collections/uke.png";
				if (item.collection.match(/TUHH/))
					image = "/assets/collections/tuhh.png";
				if (item.collection.match(/ UHH/))
					image = "/assets/collections/uhh.png";
				if (item.collection.match(/ HAW/))
					image = "/assets/collections/haw.png";
				if (item.collection.match(/ HCU/))
					image = "/assets/collections/hcu.png";
				if (item.collection.match(/ HSU/))
					image = "/assets/collections/hsu.png";
				if (item.collection.match(/DKRZ/))
					image = "/assets/collections/dkrz.png";
				var creatorname ="";	
				if 	(Array.isArray(item.creatorName)) {
					if (item.creatorName.length>7) {
						creatorname =item.creatorName.slice(0,7).join('; ') + ' …';
					}
					else creatorname = item.creatorName.join('; ');
				} else creatorname = item.creatorName;
				return {
					properties : {
						accessoryType : Ti.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
						itemId : JSON.stringify(item),
					},
					snippet : {
						text : item.title[0]
					},
					title : {
						text : creatorname
					},
					logo : {
						backgroundImage : image
					},
					foot : {
						text : item.publicationYear  +", " +item.internal_institution 
					},
					orcid: {
						visible : (item.creatorNameURI)?true:false
					}
				};
			}


			$.sections[0].setItems(docs.map(getItem));
		} else
			Log("docs is not an array");
	};
	if (docs)
		$.setData(docs);
	Log(">>>> resultlistview created");	
	return $;
};

