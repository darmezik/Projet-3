var map = L.map('map').setView([45.7578137, 4.8320114], 11);
L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',{
    maxZoom: 19,
    apikey: 'choisirgeoportail',
	format: 'image/jpeg',
	style: 'normal'
}).addTo(map);
var greenIcon = new L.Icon({
    iconUrl: 'public/images/markerGreen.png',
    iconSize: [20, 40]
});
var yellowIcon = new L.Icon({
    iconUrl: 'public/images/markerYellow.png',
    iconSize: [20,40]
});
var redIcon = new L.Icon({
    iconUrl: 'public/images/markerRed.png',
    iconSize: [20,40]
});
$.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=17a48063730caa425f3a988c52e168ce3bf63007", function( data ){
    var stations = [];
    $.each(data, function(key, station){
        stations.push(station);
        if(station.available_bikes > 2){
            var marker = L.marker([station.position.lat, station.position.lng], {icon: greenIcon}).openPopup().addTo(map);
            marker.on("click", function(e){
                document.getElementById("stationI").style.display = "block";
                document.getElementById("stationAdress").innerHTML = station.address;
                document.getElementById("bikesStand").innerHTML = station.bike_stands;
                document.getElementById("availableBikes").innerHTML = station.available_bikes;
            })
        }else if(station.available_bikes > 0){
            var marker = L.marker([station.position.lat, station.position.lng], {icon: yellowIcon}).openPopup().addTo(map);
            marker.on("click", function(e){
                document.getElementById("stationI").style.display = "block";
                document.getElementById("stationAdress").innerHTML = station.address;
                document.getElementById("bikesStand").innerHTML = station.bike_stands;
                document.getElementById("availableBikes").innerHTML = station.available_bikes;
            })
        }else{
            var marker = L.marker([station.position.lat, station.position.lng], {icon: redIcon}).openPopup().addTo(map);
            marker.on("click", function(e){
                document.getElementById("stationI").style.display = "block";
                document.getElementById("stationAdress").innerHTML = station.address;
                document.getElementById("bikesStand").innerHTML = station.bike_stands;
                document.getElementById("availableBikes").innerHTML = station.available_bikes;
            })
        }
        
    });
});

/* class App {
    constructor(mapId, mapCenter){
        this.map = this.setMap(mapId, mapCenter)
    }
    setMap(mapId, mapCenter){
        var map = L.map(mapId).setView(mapCenter, 10);
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 20
        }).addTo(map);
        return map
    }
    async setMarkersFromApi(url){
        const parsedResults = await this.retrieveContent(url);
        console.log("parsedResults", parsedResults);
        for(const accessPoint of parsedResults){
            L.marker(accessPoint.position.lat.lng).addTo(this.map)
                .bindPopup(accessPoint.name)
                .openPopup();
        }
    }
    async retrieveContent(url){
        const response = await fetch(url);
        return response.json();
    }
} */