//Initialise Map

$.ajaxSetup({
   async: false
});

var apiKey = "fd7810c3ea440045";
var start = "";
var end = "";
var csJourney = "http://www.cyclestreets.net/api/journey.json?";
var coordinates = null;

$.getJSON( csJourney, {
  format: "geojson",
  key: apiKey,
  plan: "quietest",
  itinerarypoints: "-1.533845,53.796644,'ODI Leeds' | -1.598654,53.820739, '40 Woodbridge Green'",
})
  .done(function( data ) {
    console.log(data);
    coordinates = data['features'][0]['geometry']['coordinates'];
});



var map = L.map('map').setView([53.7997, -1.5492], 13);

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'examples.map-i875mjb7'
    }).addTo(map);

var myLines = [{
  "type": "LineString",
  "coordinates": coordinates
    },];

var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};

console.log(myLines);
L.geoJson(myLines, {
    style: myStyle
}).addTo(map);

function getRoute(start, end){

}
