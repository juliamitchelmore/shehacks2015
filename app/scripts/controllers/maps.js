'use strict';

////MAPS
function initialize() {
	//set up google map
	var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
      center: new google.maps.LatLng(-25.363882,131.044922),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);

    setMarker(map, -25.363882,131.044922);
  };

function getCurrent() {
	//get current position
	var latitude;
    var longitude;
	if("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude  = position.coords.latitude;
    		longitude = position.coords.longitude;
		});
	}
	return [latitude, logitude]; /// return ARRAY
};

function getDistance(lat, lng) {
	//code for getting distance of fixed object to current position
	var distance;
  	navigator.geolocation.getCurrentPosition(function(position) {
        var latLngA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        var latLngB = new google.maps.LatLng(lat, lng);
        distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
    });

    return distance;
};

function getLatLng(address) {
	//address to lat long
	var geocoder = new google.maps.Geocoder();
	var lat, lng;
	geocoder.geocode( { 'address': address}, function(results, status) {

	  if (status == google.maps.GeocoderStatus.OK) {
	    lat = results[0].geometry.location.lat();
	    lng = results[0].geometry.location.lng();
	  } 
	}); 
	return [lat, lng]; ////returning ARRAY????
};

function setMarker(map, lat, lng) {
	var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      title: ''
  });
}

$(window).load(function()
{
	initialize();
});