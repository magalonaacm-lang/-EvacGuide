https://unpkg.com/leaflet/dist/leaflet.js

var map = L.map('map').setView([14.3294, 121.0897], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

  attribution: '© OpenStreetMap contributors'

}).addTo(map);

var centers = [

  {name: "Evac Center A", lat: 14.3350, lng: 121.0950},

  {name: "Evac Center B", lat: 14.3200, lng: 121.0850}

];

centers.forEach(function(center){

  L.marker([center.lat, center.lng])

    .addTo(map)

    .bindPopup(center.name);

});

var userLocation = null;

function flagHome() {

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      var lat = position.coords.latitude;

      var lng = position.coords.longitude;

      userLocation = {lat: lat, lng: lng};

      L.marker([lat, lng])

        .addTo(map)

        .bindPopup("🚨 Household Flagged!")

        .openPopup();

      var alertBox = document.createElement("div");

      alertBox.className = "alert";

      alertBox.innerHTML = "New flagged household at: " + lat.toFixed(4) + ", " + lng.toFixed(4);

      document.getElementById("alerts").appendChild(alertBox);

    });

  }

}

function findNearest() {

  if (!userLocation) {

    alert("Flag your home first.");

    return;

  }

  var nearest = centers[0];

  var shortestDistance = Infinity;

  centers.forEach(function(center) {

    var distance = Math.sqrt(

      Math.pow(userLocation.lat - center.lat, 2) +

      Math.pow(userLocation.lng - center.lng, 2)

    );

    if (distance < shortestDistance) {

      shortestDistance = distance;

      nearest = center;

    }

  });

  L.polyline([

    [userLocation.lat, userLocation.lng],

    [nearest.lat, nearest.lng]

  ], {color: 'blue'}).addTo(map);

  alert("Nearest Evacuation Center: " + nearest.name);

}

function scrollToMap() {

  document.getElementById("map-section").scrollIntoView({

    behavior: "smooth"

  });

}