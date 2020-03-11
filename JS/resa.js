class Resa{
    constructor(){
        this.firstName = document.getElementById("firstName");
        this.lastName = document.getElementById("lastName");
        this.nameStation = document.getElementById("nameStation");
        this.status = document.getElementById("status");
        this.canva = new Canvas("canva");
        this.timer = new Timer("timer");
        this.recovery();
        this.displayReservation();
    }
    recovery(){
        let firstName = this.firstName;
        let lastName = this.lastName;
        let nameStation = this.nameStation;
        let status = this.status;
        document.getElementById("resa").addEventListener('click', (e) => {
            if(status.innerHTML === "FERMÉE"){
                alert("Cette station est fermée pas de réservation possible");
            }else{
                if(firstName.value == "" || lastName.value == ""){
                    alert("Veuillez remplir tous les champs !");    
                }else if(nameStation.innerHTML == ""){
                    alert("Erreur dans la récupération du nom de station !");
                }else{
                    this.setLocal(firstName.value, lastName.value, nameStation.innerHTML);
                    this.displayCanva(); 
                }
            }
        })
        document.getElementById("check").addEventListener('click', () => {
            if(this.timer.eltChrono.textContent === "Pas de réservation en cours"){
                this.confirmReservation();
            }else{
                if(confirm("Une réservation est en cours voulez-vous l'écraser ?")){
                    this.confirmReservation();
                }else{
                    document.getElementById("canvas").style.display = "none";
                    document.getElementById("map").style.width = "100%";
                }
            }
        })
    }
    setLocal(firstName, lastName, station){
        localStorage.setItem("firstName", firstName);
        localStorage.setItem("lastName", lastName);
        sessionStorage.setItem("nameStation", station);
    }
    displayCanva(){
        document.getElementById("stationI").style.display = "none";
        document.getElementById("canvas").style.display = "block";
        this.canva.canva.width=300;
        this.canva.canva.height=200;
    }
    confirmReservation(){
        document.getElementById("canvas").style.display = "none";
        document.getElementById("map").style.width = "100%";
        document.getElementById("reservationName").style.display = "block";
        document.getElementById("firstNameResult").innerHTML = localStorage.getItem("firstName");
        document.getElementById("lastNameResult").innerHTML = localStorage.getItem("lastName");
        document.getElementById("stationResult").innerHTML = sessionStorage.getItem("nameStation");
        document.getElementById("imageSign").style.display = "block";
        this.timer.startTimer(Date.now() + 1000*1200);
    }
    displayReservation(){
        if(this.timer.eltChrono.textContent === "Pas de réservation en cours"){
            document.getElementById("reservationName").style.display = "none";
            document.getElementById("imageSign").style.display = "none";
        }else{
            document.getElementById("reservationName").style.display = "block";
            document.getElementById("firstNameResult").innerHTML = localStorage.getItem("firstName");
            document.getElementById("lastNameResult").innerHTML = localStorage.getItem("lastName");
            document.getElementById("stationResult").innerHTML = sessionStorage.getItem("nameStation");
            document.getElementById("imageSign").src = sessionStorage.getItem("image");
        }
    }
}


/*document.getElementById("resa").addEventListener('click', function(e){
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
                sessionStorage.setItem("nameStation", nameStation.innerHTML);
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
let time = new Timer("timer");
document.getElementById("reservationName").style.display = "block";
document.getElementById("firstNameResult").innerHTML = localStorage.getItem("firstName");
document.getElementById("lastNameResult").innerHTML = localStorage.getItem("lastName");*/

