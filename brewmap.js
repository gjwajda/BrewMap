var map; //Global brew map
var map_markers = []; //Array of map markers


//Reads local file to be parsed
// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }



// Create map markers for each brewery in given response data
// Input: response - json file with info on breweries
// Output: None
function markbrewery(response) {
    var brew_data = response["data"]; //Data with brewery info
    var infowindow = new google.maps.InfoWindow; //Initialze info window to be displayed onclick

    //Iterate through every brewery on the page
    var i;
    for (i = 0; i < brew_data.length; i++) {
        //Create map marker using parsed latitude, longitude, and brewery name
        var marker = new google.maps.Marker({
            position: { lat: brew_data[i]["latitude"], lng: brew_data[i]["longitude"] },
            map: map,
            title: brew_data[i]["brewery"]["name"]
        });
        map_markers.push(marker); //push map marker to array

        //Create click event to display,
        //  Brewery name
        //  Address
        //  Phone number
        //  Website url
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



// Sends an asynchronous GET request to given url
// Input: theUrl - the url to send the GET request to
// Output: None
function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            // Use GET response to create map markers  
            markbrewery(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send();
}



// Initialize Google Map API
// Input: None
// Output: None
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

    var curr_page = 1; //Current page of GET response
    var num_pages = 1; //Initialize number of pages response has
    var url = "http://api.brewerydb.com/v2/locations/?p=" + curr_page.toString() + "&region=Illinois&key=481d514448fd7365873ba9501d928e10&format=json"; //URL to get breweries in Illinois

    // Request first page of info
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var response = JSON.parse(xmlHttp.responseText); //Parse json response
            num_pages = response["numberOfPages"]; //Set number of pages response has
            markbrewery(response); //Mark first page of response

            //Request and mark each page of response 
            for (curr_page = 2; curr_page <= num_pages; curr_page++) {
                url = "http://api.brewerydb.com/v2/locations/?p=" + curr_page.toString() + "&region=Illinois&key=481d514448fd7365873ba9501d928e10&format=json";
                httpGetAsync(url);
            }
        }
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send();
}