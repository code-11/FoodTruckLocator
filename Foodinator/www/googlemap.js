function onSuccess(position,marker) {
	var loc=position;
	var to_screen=loc.coords.latitude+","+loc.coords.longitude;
	var loc_p=document.getElementById("loc");
	var maps_version=google.maps.version;
	loc_p.innerHTML=to_screen;
	marker.setPosition(
		{lat:loc.coords.latitude, lng:loc.coords.longitude}
	);
}
// setPosition

function onError(error){
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
}

function initMap() {
	var the_map= new GoogleMap();
	the_map.initialize();
}

function GoogleMap(){
	this.initialize = function(){
		var map = showMap();
		var marker = new google.maps.Marker({
			position: {lat: 40.8, lng: -73.9},
			map: map,
			title: 'Hello World!'
		});
        watchID = navigator.geolocation.watchPosition(
        	function(position){onSuccess(position,marker)}, 
        	onError, 
        	{timeout: 30000}
        );
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