/*class Resa{
    constructor(){
        this.canva = new Canvas("canva");
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.nameStation = document.getElementById("nameStation");
        this.status = document.getElementById("status");
        this.resar = document.getElementById("resa");
        this.timer = new Timer("timer");
    }
    recovery(){
        let firstName = this.firstName;
        let lastName = this.lastName;
        let nameStation = this.nameStation;
        let status = this.status;
        this.resar.addEventListener('click', function(e){
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
                    this.canva.canva.width=300;
                    this.canva.canva.height=200;
                    document.getElementById("reservationName").style.display = "block";
                    document.getElementById("firstNameResult").innerHTML = localStorage.getItem("firstName");
                    document.getElementById("lastNameResult").innerHTML = localStorage.getItem("lastName");
                    timer.startTimer(Date.now() + 1000*1200);
                }
            }
        })
        document.getElementById("check").addEventListener('click', function(){
            document.getElementById("canvas").style.display = "none";
            document.getElementById("map").style.width = "100%";
        })
    }
}
let resa = new Resa();*/

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
            document.getElementById("stationI").style.display = "none";
            document.getElementById("canvas").style.display = "block";
            this.canva = new Canvas("canva");
            this.canva.canva.width=300;
            this.canva.canva.height=200;
            document.getElementById("check").addEventListener('click', function(){
                localStorage.setItem("firstName", firstName.value);
                localStorage.setItem("lastName", lastName.value);
                localStorage.setItem("nameStation", nameStation.innerHTML);
                document.getElementById("canvas").style.display = "none";
                document.getElementById("map").style.width = "100%";
                document.getElementById("reservationName").style.display = "block";
                document.getElementById("firstNameResult").innerHTML = localStorage.getItem("firstName");
                document.getElementById("lastNameResult").innerHTML = localStorage.getItem("lastName");
                let timer = new Timer("timer");
                timer.startTimer(Date.now() + 1000*1200);
            })            
        }
    }
})
if(!sessionStorage.timer.endTimer){

}else{
    let timer = new Timer("timer");
    document.getElementById("reservationName").style.display = "block";
    document.getElementById("firstNameResult").innerHTML = localStorage.getItem("firstName");
    document.getElementById("lastNameResult").innerHTML = localStorage.getItem("lastName");
}
