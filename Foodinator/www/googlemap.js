var MARKERS=[];

function sendLocation(lat,lon,callback){
	var url = /*"https://foodinator.herokuapp.com/";*/ "http://localhost:8080";
	var USER_ID= document.getElementById("CLIENTID").innerHTML;
	var params = {"lat":lat,"lon":lon,"userid":USER_ID};
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);

	//Send as text/plain so no preflight OPTIONS bullshit
	xhr.setRequestHeader("Content-type", "text/plain");
	xhr.send(JSON.stringify(params));
	xhr.onreadystatechange=function(){
		if (xhr.readyState ==4){
			if (xhr.status=200){
				callback(xhr.response);
			}else{
				console.log(xhr.status);
			}
		}
	}
}

function markLocations(latit,longit,res,map){
	var marker = new google.maps.Marker({
		position: {lat:40.77, lng:-73.96},
		map: map,
		icon: getPin("009933")
	});
	MARKERS.push(marker);
	var res=JSON.parse(res);
	document.getElementById("num").innerHTML=res.length;
	for(var i=0;i<res.length;i+=1){
		var el=res[i];
		el_lat=parseFloat(el.lat);
		el_lon=parseFloat(el.lon);

		MARKERS.push(new google.maps.Marker({
			position: {lat:el_lat, lng:el_lon},
			map: map,
			icon: getPin("009933")
		}));
		// google.maps.event.trigger(map, 'resize');
		//MARKERS.push(marker);
		// console.log("Dropping at: "+el_lat+","+el_lon);

		if (el_lon==longit && el_lat==latit){
			marker.setIcon(getPin("0000FF"));
		}
	}
}

function onSuccess(position,map) {
	var loc=position;
	var latit=loc.coords.latitude;
	var longit=loc.coords.longitude;

	var to_screen=latit+","+longit;
	var loc_p=document.getElementById("loc").innerHTML=to_screen;
	var maps_version=google.maps.version;

	sendLocation(latit,longit,function(res){
		markLocations(latit,longit,res,map);
	});


}

function getPin(color){
	var pinColor = color;
	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
	    new google.maps.Size(21, 34),
	    new google.maps.Point(0,0),
	    new google.maps.Point(10, 34));
	return pinImage;
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
        watchID = navigator.geolocation.watchPosition(
        	function(position){onSuccess(position,map)}, 
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