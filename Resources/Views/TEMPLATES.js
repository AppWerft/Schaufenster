exports.facets = {
	properties : {
		height : 60,
		backgroundColor : "#659BAC",
		layout: 'vertical'
	},
	childTemplates : [{
		type: "Ti.UI.View",
		bindId : "active",
		properties: {
			left:0,
			width:5,
			backgroundColor:"#355055"
		}
	},{
		type : "Ti.UI.Label",
		bindId : "label",
		
		properties : {
			left : 10,
			
			color:'white',
			width : Ti.UI.FILL,
			height : Ti.UI.SIZE,
			font : {
				fontSize : 16,
				fontWeight: 'bold'
			}
		}
	}, {
		type : "Ti.UI.Label",
		bindId : "count",
		properties : {
			right : 5,
			bottom:5,
			width : Ti.UI.FILL,
			textAlign:'right',
			color:'white',
			height : 15,
			font : {
				fontSize : 12
			}
		}
	}]
};

exports.docs = {
	properties : {
		itemId : null,
		height : Ti.UI.SIZE,
		backgroundColor : "white",
	},
	childTemplates : [{
		type : "Ti.UI.View",
		bindId : "logo",
		properties : {
			left : 5,
			top : 10,
			width : 40,
			height : 40
		}
	}, 
	{
		type : "Ti.UI.View",
		bindId : "orcid",
		properties : {
			left : 5,
			top : 60,
			width : 32,
			height : 32,
			backgroundImage: '/assets/images/orcid.png',
			visible:true
		}
	},{
		type : "Ti.UI.View",
		properties : {
			layout : 'vertical',
			left : 60,
			right : 20,
			height : Ti.UI.SIZE,

		},
		childTemplates : [{
			type : 'Ti.UI.Label',
			bindId : 'title',
			properties : {
				top : 5,
				left : 0,
				textAlign : 'left',
				height : Ti.UI.SIZE,
				color : "black",
				font : {
					fontStyle : "italic",
					fontSize : 18
				}
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'snippet',
			properties : {
				top : 5,
				left : 0,
				right : 10,
				height : Ti.UI.SIZE,
				color : "#333",
				font : {
					fontWeight : "bold",
					fontSize : 18
				},
				textAlign : 'left',
			}
		}, {
			type : 'Ti.UI.Label',
			bindId : 'foot',
			properties : {
				top : 5,
				color : '#4E7985',
				left : 0,
				text : '',
				texAlign : 'left',
				font : {
					fontWeight : 'bold'
				},
				height : Ti.UI.SIZE
			}
		}, {
			type : 'Ti.UI.View',
			properties : {
				top : 0,
				height : 10,
			}
		}]
	}]
};
