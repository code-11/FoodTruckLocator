function initMap() {
var the_map= new GoogleMap();
the_map.initialize();
}

function GoogleMap(){
	this.initialize = function(){
		var map = showMap();
	}
	 
	var showMap = function(){
		var mapOptions = {
			center: {lat: 40.8, lng: -73.9},
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		 
		return map;
	}
}