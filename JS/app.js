class App {
    constructor(mapId, mapCenter, mapUrl, apiUrl){
        this.map = this.setMap(mapId, mapCenter, mapUrl)
        this.initIcon(apiUrl);
        this.resa = new Resa();
    }
    setMap(mapId, mapCenter, mapUrl){
        let map = L.map(mapId).setView(mapCenter, 11);
        L.tileLayer(mapUrl, {
            maxZoom: 19,
            apikey: 'choisirgeoportail',
	        format: 'image/jpeg',
	        style: 'normal'
        }).addTo(map);
        return map
    }
    initIcon(apiUrl){
        let Icon = L.Icon.extend({options:{iconSize: [20,40]}});
        let greenIcon = new Icon ({iconUrl: 'public/images/markerGreen.png'});
        let yellowIcon = new Icon ({iconUrl: 'public/images/markerYellow.png'});
        let redIcon = new Icon ({iconUrl: 'public/images/markerRed.png'});
        let greyIcon = new Icon ({iconUrl: 'public/images/markerGrey.png'});
        $.getJSON(apiUrl, function(data){
            let stations = [];
            let icon;
            $.each(data, function(key, station){
                stations.push(station);
                if(station.available_bikes > 2){
                    icon = greenIcon;
                }else if(station.available_bikes > 0){
                    icon = yellowIcon;
                }else if(station.available_bikes <= 0 && station.status === "OPEN"){
                    icon = redIcon;
                }else if(station.status === "CLOSED"){
                    icon = greyIcon;
                }else{
                    console.error("Une erreur est survenu");
                }
                let marker = L.marker([station.position.lat, station.position.lng], {icon: icon}).openPopup().addTo(this.map)
                let status;
                marker.on("click", function(e){
                    if(station.status === "OPEN"){
                        status = "OUVERTE";
                        document.getElementById("status").innerHTML = status;
                        document.getElementById("status").style.color = "green";
                        document.getElementById("form").style.display = "block";
                        document.getElementById("firstName").value = localStorage.getItem("firstName");
                        document.getElementById("lastName").value = localStorage.getItem("lastName");
                        document.getElementById("resa").style.display = "block";
                    }else{
                        status = "FERMÉE";
                        document.getElementById("status").innerHTML = status;
                        document.getElementById("status").style.color = "red";
                        document.getElementById("form").style.display = "none";
                        document.getElementById("resa").style.display = "none";
                    }
                    document.getElementById("canvas").style.display = "none";
                    document.getElementById("stationI").style.display = "block";
                    if(document.body.clientWidth > 768){
                        document.getElementById("map").style.width = "70%";
                    }else{
                        window.location.href="#stationI";
                    }
                    document.getElementById("nameStation").innerHTML = station.name;
                    document.getElementById("stationAdress").innerHTML = station.address;
                    document.getElementById("bikesStand").innerHTML = station.bike_stands;
                    document.getElementById("availableBikes").innerHTML = station.available_bikes;
                })
                let close = document.getElementById("close");
                close.addEventListener("click", function(){
                    if(document.body.clientWidth < 768){
                        document.getElementById("stationI").style.display = "none";
                        document.getElementById("map").style.width = "90%";
                        window.location.href="#map";
                    }else{
                        document.getElementById("stationI").style.display = "none";
                        document.getElementById("map").style.width = "100%";
                    }
                })
            }.bind(this))
        }.bind(this));
    }
}