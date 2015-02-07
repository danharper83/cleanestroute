//Initialise Map
$.ajaxSetup({
   async: false
});

var apiKey = "fd7810c3ea440045";
var start = "";
var end = "";
var csJourney = "http://www.cyclestreets.net/api/journey.json?";
var map = L.map('map').setView([53.7997, -1.5492], 13);
var coordinates = null;

getRoute("-1.533845,53.796644,'ODI Leeds' | -1.598654,53.820739, '40 Woodbridge Green'");
drawMap();
addPoints();
//addRoute();
checkRoute();

function getRoute(itinerayPoints){
  $.getJSON( csJourney, {
    format: "geojson",
    key: apiKey,
    plan: "quietest",
    itinerarypoints: itinerayPoints,
  })
    .done(function( data ) {
    coordinates = data['features'][0]['geometry']['coordinates'];
  });
}

function drawMap(){
  L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'examples.map-i875mjb7'
    }).addTo(map);
}

function addRoute(){
  var myLines = [{
  "type": "LineString",
  "coordinates": coordinates
    },];

  var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
  };

  L.geoJson(myLines, {
    style: myStyle
  }).addTo(map);
}

function addPoints(){
  var circle = L.circle([53.796226, -1.5406106], 300, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);

  var circle1 = L.circle([53.819933, -1.5763362], 190, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);

  var circle2 = L.circle([53.782624, -1.5350983], 220, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);

  var circle3 = L.circle([53.798769, -1.5266759], 230, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);

  var circle4 = L.circle([53.796226, -1.5406106], 200, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);

  var circle5 = L.circle([53.79422, -1.54302], 210, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);

  var circle6 = L.circle([53.8166282, -1.6018125], 160, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);

  var circle7 = L.circle([53.7845642, -1.4655827], 100, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
  }).addTo(map);
}

function checkRoute(){
  var waypoints = "-1.533845,53.796644,'ODI Leeds'| ";
  for (i = 0; i < coordinates.length; i++){
    var clash = ifClashSuggestWayPoint(coordinates[i][0], coordinates[i][1], "-1.6018125", "53.8166282", 160);
    if(clash){
      waypoints += clash+", '" + i + "'|";
      }
    }
    waypoints += "-1.598654,53.820739, '40 Woodbridge Green'";
    getRoute(waypoints);
    addRoute();
}

function ifClashSuggestWayPoint(lat1, lon1, lat2, lon2, clashDistanceInMetres) {
  // lat2 and lon2 is the pollution spot
  // clashDistance is some function of pollution
  var R = 6371000; // metres
  var phi1 = lat1 * Math.PI / 180;
  var phi2 = lat2 * Math.PI / 180;
  var deltaphi = (lat2 - lat1) * Math.PI / 180;
  var deltalambda = (lon2 - lon1) * Math.PI / 180;
  var a = Math.sin(deltaphi / 2) * Math.sin(deltaphi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltalambda / 2) * Math.sin(deltalambda / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var distance = R * c;

  if (distance < clashDistanceInMetres) {
    // there's a clash, suggest a waypoint
    // step away
    latDifference = lat2 - lat1;
    longDifference = lon2 - lon1;
    wayPointLat = lat1 - latDifference;
    wayPointLong = lon1 - longDifference;
    return(wayPointLat + "," + wayPointLong);
  }
  else {
    return false;
  }
}
