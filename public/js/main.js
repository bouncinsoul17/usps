L.mapbox.accessToken = 'pk.eyJ1IjoiYmFuZGVyb24iLCJhIjoiN19SUEVLVSJ9.QuPrCIx7yMAXfiOYNxvjAQ';
var map = L.mapbox.map('map', 'banderon.lc8pkf9f').setView([34.27, -119.19], 14);

//use the WGS84 value for the outSR value to get lat/lng values from the response
var restUrl = "https://gis.usps.com/arcgis/rest/services/EDDM/selectZIP/GPServer/routes/execute?f=json&env%3AoutSR=4326&Rte_Box=R&UserName=EDDM&ZIP=93003";
$.getJSON( restUrl, function( data ) {
    var resultFeatures = data['results'][0]['value']['features'],
        paths = [],
        linepoints = [],
        lineoptions = {color: 'red'},
        polyline;
    for (var i = 0, il = resultFeatures.length; i < il; i++) {
        paths = resultFeatures[i]['geometry']['paths'];
        for (var j = 0, jl = paths.length; j < jl; j++) {
            //reverse the values so that the lat/lng are in the correct order for the mapbox
            linepoints = [paths[j][0].reverse(), paths[j][1].reverse()];
            polyline = L.polyline(linepoints, lineoptions).addTo(map);
        }
    }
});