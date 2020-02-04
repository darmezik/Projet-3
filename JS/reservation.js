document.getElementById("resa").addEventListener('click', function(e){
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let nameStation = document.getElementById("nameStation");
    let status = document.getElementById("status");
    if(status.innerHTML === "FERMÉE"){
        alert("Cette station est fermée pas de réservation possible");
    }else{
        if(firstName.value == "" || lastName.value == ""){
            alert("Veuillez remplir tous les champs !");    
        }else if(nameStation.innerHTML == ""){
            alert("Erreur dans la récupération du nom de station !");
        }else{
            localStorage.setItem("firstName", firstName.value);
            localStorage.setItem("lastName", lastName.value);
            localStorage.setItem("nameStation", nameStation.innerHTML);
            console.log(localStorage);
            document.getElementById("stationI").style.display = "none";
            document.getElementById("canvas").style.display = "block";
            this.canva = new Canvas("canva");
            this.canva.canva.width=300;
            this.canva.canva.height=200;
            document.getElementById("reservationName").style.display = "block";
            document.getElementById("firstNameResult").innerHTML = localStorage.getItem("firstName");
            document.getElementById("lastNameResult").innerHTML = localStorage.getItem("lastName");
        }
    }
})
document.getElementById("check").addEventListener('click', function(){
    document.getElementById("canvas").style.display = "none";
    document.getElementById("map").style.width = "100%";
})
