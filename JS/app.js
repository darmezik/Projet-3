class App {
    constructor(mapId, mapCenter){
        this.map = this.setMap(mapId, mapCenter)
        this.initIcon();
    }
    setMap(mapId, mapCenter){
        var map = L.map(mapId).setView(mapCenter, 10);
        L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
            maxZoom: 19,
            apikey: 'choisirgeoportail',
	        format: 'image/jpeg',
	        style: 'normal'
        }).addTo(map);
        return map
    }
    initIcon(){
        var Icon = L.Icon.extend({
            options:{
                iconSize: [20,40]
            }
        });
        var greenIcon = new Icon ({ iconUrl: 'public/images/markerGreen.png'});
        var yellowIcon = new Icon ({ iconUrl: 'public/images/markerYellow.png'});
        var redIcon = new Icon ({ iconUrl: 'public/images/markerRed.png'});
        $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=17a48063730caa425f3a988c52e168ce3bf63007", function( data ){
            var stations = [];
            $.each(data, function(key, station){
                stations.push(station);
                if(station.available_bikes > 2){
                    var icon = greenIcon;
                }else if(station.available_bikes > 0){
                    var icon = yellowIcon;
                }else{
                    var icon = redIcon;
                }
                var marker = L.marker([station.position.lat, station.position.lng], {icon: icon}).openPopup().addTo(this.map)
                marker.on("click", function(e){
                    document.getElementById("stationI").style.display = "block";
                    document.getElementById("stationAdress").innerHTML = station.address;
                    document.getElementById("bikesStand").innerHTML = station.bike_stands;
                    document.getElementById("availableBikes").innerHTML = station.available_bikes;
                })
            }.bind(this))
        }.bind(this));
    }
}
/*var map = L.map('map').setView([45.7578137, 4.8320114], 11);
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
});*/

