'use strict';

////MAPS
function initialize() {
    //set up google map
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        center: new google.maps.LatLng(-33.904150, 151.165190),
        zoom: 13,
        draggable: false,
        disableDefaultUI:true,
        disableDoubleClickZoom:true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
    //Marrickville
    setMarker(map, -33.911130, 151.157594);
    setMarker(map, -33.907035, 151.152830);
    setMarker(map, -33.914941, 151.145792);
    setMarker(map, -33.906287, 151.152100);
    setMarker(map, -33.915796, 151.156993);
    setMarker(map, -33.904292, 151.156949);
    setMarker(map, -33.901799, 151.150727);
    setMarker(map, -33.902799, 151.150727);
    //Newton
    setMarker(map, -33.904142, 151.173634);
    setMarker(map, -33.902005, 151.175178);
    setMarker(map, -33.905816, 151.174406);
    setMarker(map, -33.907098, 151.176509);
    setMarker(map, -33.905852, 151.179985);
    setMarker(map, -33.902147, 151.178698);
    setMarker(map, -33.903323, 151.176380);
    setMarker(map, -33.900438, 151.174835);
};

function getCurrent() {
    //get current position
    var latitude;
    var longitude;
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });
    }
    return [latitude, logitude]; /// return ARRAY
};

function getDistance(lat, lng) {
    //code for getting distance of fixed object to current position
    var distance;
    navigator.geolocation.getCurrentPosition(function (position) {
        var latLngA = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var latLngB = new google.maps.LatLng(lat, lng);
        distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
    });

    return distance;
};

function getLatLng(address) {
    //address to lat long
    var geocoder = new google.maps.Geocoder();
    var lat, lng;
    geocoder.geocode({ 'address': address.value }, function (results, status) {

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

$(window).load(function () {
    initialize();
});