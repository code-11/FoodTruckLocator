function sendLocation(lat,lon){
	var url = "https://foodinator.herokuapp.com/";
	var params = "lon="+lat+"&lat="+lon;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(params);
	xhr.send(params);
	xhr.send(params);
}

function onSuccess(position,marker) {
	var loc=position;
	var latit=loc.coords.latitude;
	var longit=loc.coords.longitude;

	var to_screen=latit+","+longit;
	var loc_p=document.getElementById("loc");
	var maps_version=google.maps.version;
	loc_p.innerHTML=to_screen;

	sendLocation(latit,longit);

	marker.setPosition(
		{lat:latit, lng:longit}
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
			center: {lat: 40.77, lng: -73.96},
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		return map;
	}
}