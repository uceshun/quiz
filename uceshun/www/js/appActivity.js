//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////// This code is refer to Claire's GitHub code in file called cegeg077-week5app /////////////
///////////Most of the code are from practical that i will reference specfically at below/////////////
// Link: https://github.com/claireellul/cegeg077-week5app/blob/master/ucfscde/www/js/appActivity.js///
//////////////////////////////////////////////////////////////////////////////////////////////////////

// a global variable to hold the http request
var client;
// store the map
var mymap;

// Using Custom Icon (from week2)
var testMarkerRed = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'red'
});

var testMarkerPink = L.AwesomeMarkers.icon({
	icon: 'play',
	markerColor: 'pink'
});


// this is the code that runs when the App starts
	loadMap();
//WHYYYYYYYYYYYYYYYYYYYYYYYYYYY
	tracklocation();
//WHYYYYYYYYYYYYYYYYYYYYYYYYYYY
	GeoJSONlayer();
				
// ***********************************
// the functions

// Adding Basic Leaflet Map (Week 2/ provide by Claire's GitHub in cegeg077-week5app also)
// This script is to load the map, set default view & zoom as well as loading basemap tiles
function loadMap(){
	mymap = L.map('mapid').setView([51.505, -0.09], 13);


	// load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
	}).addTo(mymap);

}

// Track Location (week 1)
function trackLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
		alert("geolocation is not supported by this browser");
		document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
		navigator.geolocation.watchPosition(getDistanceFromPoint);
	}

// Show user location
function showPosition(position) {
	document.getElementById('showLocation').innerHTML = "Latitude: " + position.coords.latitude +
	"<br>Longitude: " + position.coords.longitude;
	// draw a point on the map
	L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
		.bindPopup("<b>You are at "+ position.coords.latitude + " "+position.coords.longitude+"!</b>");
	// draw circle surrounded the point
	L.circle([position.coords.latitude, position.coords.longitude], 100, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap);
	
// Show Warrent Street Location
L.marker([51.524616, -0.138180], {icon:testMarkerRed}).addTo(mymap).bindPopup("<b>Warrent St. Station</b>").openPopup();
// Show Question Points Location
L.marker([51.522944, -0.128], {icon:testMarkerPink}).addTo(mymap).bindPopup("<b>IOE</b>").openPopup();
L.marker([51.524239, -0.134378], {icon:testMarkerPink}).addTo(mymap).bindPopup("<b>Chadwick Building</b>").openPopup();
L.marker([51.524753, -0.133506], {icon:testMarkerPink}).addTo(mymap).bindPopup("<b>Main Library</b>").openPopup();
L.marker([51.523409, -0.132747], {icon:testMarkerPink}).addTo(mymap).bindPopup("<b>Science Library</b>").openPopup();
// 	mymap.setView([position.coords.latitude, position.coords.longitude], 13);
}
		

// the variables
// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on 
var GeoJSONlayer;

// call the server (week6)
// create code to get ____ data using XMLHttpRequest
function getGeoJSONlayer() {
   // set up the request
   client = new XMLHttpRequest();
   // make the request to _____ data (week2)
   client.open('GET','http://developer.cege.ucl.ac.uk:30298/uploadData');
   // tell the request what method to run that will listen for the response
   client.onreadystatechange = uploadDataResponse;  // uploadData is the database that store list of question set-up by QSA earlier
   // activate the request
   client.send();
}

// receive the response (week6)
function uploadDataResponse() {
  // wait for a response - if readyState is not 4 then keep waiting 
  if (client.readyState == 4) {
    // get the data from the response
    var earthquakedata = client.responseText;
    // call a function that does something with the data
    loadGeoJSONlayer(earthquakedata);
  }
}
function loadGeoJSONlayer(earthquakedata) {
      // convert the text received from the server to JSON 
      var earthquakejson = JSON.parse(earthquakedata );

      // load the geoJSON layer
      var GeoJSONlayer = L.geoJson(earthquakejson,
        {
            // use point to layer to create the points
            pointToLayer: function (feature, latlng)
            {
              // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
              // also include a pop-up that shows the place value of the earthquakes
              if (feature.properties.mag > 1.75) {
                 return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place +"</b>");
              }
              else {
                // magnitude is 1.75 or less
                return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place +"</b>");;
              }
            },
        }).addTo(mymap); 
    mymap.fitBounds(earthquakelayer.getBounds());
}


//*************************
// functions to change the DIV content using AJAX - week 5

// var  xhr;  // define the global variable to process the AJAX request
// function callDivChange() {
// 
// 	 xhr = new XMLHttpRequest();
// 
// 	 // use an HTTP request here as Edge doesn't work with HTTPS over express
// 	 xhr.open('GET', 'http://developer.cege.ucl.ac.uk:30261/dir1/dir2/objectTest5.html');
// 	 xhr.onreadystatechange = processDivChange;
// 	xhr.send();
// }  
// function processDivChange() {
// if (xhr.readyState < 4)    {}                     // while waiting response from server
//         //document.getElementById('ajaxtest').innerHTML = "Loading...";
// 
//     else {
// 		if (xhr.readyState === 4) {               // 4 = Response from server has been completely loaded.
//             document.getElementById('ajaxtest').innerHTML = xhr.responseText;
//     }
// }
// }

function getDistanceFromPoint(position) {
// find the coordinates of a point using this website:
//var geoJSON = JSON.parse(geoJSONString);
//alert(geoJSON[0].features[1].geometry.coordinates[1]);

//for(var i = 0; i < geoJSON[0].features.length; i++) {
//var feature = geoJSON[0].features[i];
 //   for (component in feature){
	   // if (component =="geometry"){
		   // for (geometry in feature[component]){
	var lng=-0.145;
	var lat=51.569;
	 
//alert(lng);
// return the distance in kilometers
    var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
    document.getElementById('showDistance').innerHTML = "Distance: " + distance;
    if (distance<0.5){
	L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).on('click', onclick).bindPopup("<b>ClickMe!</b>").openPopup();}
 }
 
 // code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-inyour-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
 var radlat1 = Math.PI * lat1/180;
 var radlat2 = Math.PI * lat2/180;
 var radlon1 = Math.PI * lon1/180;
 var radlon2 = Math.PI * lon2/180;
 var theta = lon1-lon2;
 var radtheta = Math.PI * theta/180;
 var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
 subAngle = Math.acos(subAngle);
 subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
 dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
// where radius of the earth is 3956 miles
 if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
 if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
 return dist;
 }

// This code is provided by Claire in week 6 appendix, which is
// used to calculate current distance between chosen points 
// this is the GeoJSON that comes out of the formdata table
var geoJSONString= getGeoJSONlayer('http://developer.cege.ucl.ac.uk:30298/getGeoJSON/postgresql/geom');
function processGeoJSON() {
// convert the string of downloaded data to JSON
var geoJSON = JSON.parse(geoJSONString);
alert(geoJSON[0].type);
for(var i = 0; i < geoJSON[0].features.length; i++) {
var feature = geoJSON[0].features[i];
for ( component in feature){
if (component == "geometry") { // this is the geometry
for (geometry in feature[component]){
attribute = "geometry " +
feature[component][geometry];
document.getElementById("loopresults").innerHTML =
document.getElementById("loopresults").innerHTML + " || " +attribute;
}
}
if (component == "properties") { // these are the attributes
for (property in feature[component]) {
attribute = "property " +
feature[component][property];
document.getElementById("loopresults").innerHTML =
document.getElementById("loopresults").innerHTML + " || " +attribute;
}
}
document.getElementById("loopresults").innerHTML =
document.getElementById("loopresults").innerHTML + " <br> ";
}
}
}






