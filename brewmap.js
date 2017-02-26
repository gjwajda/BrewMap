var map;
var map_markers = [];
// var info_markers = [];

//Reads local file to be parsed
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//Mark the breweries on the map
function markbrewery(response) {
    var brew_data = response["data"];
    var i;

    var infowindow = new google.maps.InfoWindow;
    for (i = 0; i < brew_data.length; i++) {
        var marker = new google.maps.Marker({
            position: { lat: brew_data[i]["latitude"], lng: brew_data[i]["longitude"] },
            map: map,
            title: brew_data[i]["brewery"]["name"]
        });
        map_markers.push(marker);
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent("<p>" + brew_data[i]["brewery"]["name"] + "<br />" +
                    brew_data[i]["streetAddress"] + "<br />" +
                    brew_data[i]["locality"] + ", " + brew_data[i]["region"] + " " + brew_data[i]["postalCode"] +
                    "<br /><br />" +
                    "Phone: " + brew_data[i]["phone"] + "<br />" +
                    "Website: " + brew_data[i]["brewery"]["website"] + "<br />" +
                    "</p>");
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            markbrewery(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}

//Initialize Google Map API
function initMap() {
    // Styles a map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.878, lng: -87.629 },
        zoom: 8,
        styles: [{
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#523735"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#c9b2a6"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#dcd2be"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#ae9e90"
                }]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#93817c"
                }]
            },
            {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#a5b076"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#447530"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f1e6"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#fdfcf8"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f8c967"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#e9bc62"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e98d58"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#db8555"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#806b63"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#8f7d77"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ebe3cd"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dfd2ae"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#b9d3c2"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#92998d"
                }]
            }
        ]
    });
    var curr_page = 1;
    var num_pages = 1;
    var url = "http://api.brewerydb.com/v2/locations/?p=" + curr_page.toString() + "&region=Illinois&key=481d514448fd7365873ba9501d928e10&format=json";

    // Request first page of info
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var response = JSON.parse(xmlHttp.responseText);
            num_pages = response["numberOfPages"];
            markbrewery(response);

            for (curr_page = 2; curr_page <= num_pages; curr_page++) {
                url = "http://api.brewerydb.com/v2/locations/?p=" + curr_page.toString() + "&region=Illinois&key=481d514448fd7365873ba9501d928e10&format=json";
                httpGetAsync(url);
            }
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send();
}


// function geocodeAddress(geocoder, resultsMap) {
//     var address = "1800 N Clybourn Ave, Chicago, IL";
//     geocoder.geocode({ 'address': address }, function(results, status) {
//         if (status === 'OK') {
//             var marker = new google.maps.Marker({
//                 map: resultsMap,
//                 position: results[0].geometry.location
//             });

//             marker.addListener('click', function() {
//                 map.setZoom(8);
//                 map.setCenter(marker.getPosition());
//             });
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }