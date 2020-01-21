class Timer {
    constructor(id){
        this.id = id;
        this.min = 0;
        this.sec = 0;
        this.timeout = 0;
        this.endTime = 0;
        this.eltTimer = document.getElementById(id);
        this.eltChrono = this.eltTimer.querySelector(".timerChrono");
        this.eltStart = this.eltTimer.querySelector(".timerStart");
        this.eltStart.addEventListener('click', e => this.startTimer(Date.now() + 1000*1200));
        this.endTime = localStorage.getItem(this.id + "endTime")
        if(this.endTime) this.startTimer(this.endTime);
    }
    startTimer(date){
        this.endTime = date;
        this.endTimer();
        this.updateTimer();
        localStorage.setItem(this.id + "endTime", this.endTime);
        this.timeout = setTimeout(e => this.tic(), 1000);
    }
    updateTimer(){
        let time = new Date(this.endTime - Date.now())
        this.min = time.getMinutes();
        this.sec = time.getSeconds();
        let s = this.sec;
        let m = this.min;
        if (m < 10) m = '0' + m;
        if (s < 10) s = '0' + s;    
        this.eltChrono.textContent = m + ":" + s;
    }
    endTimer(){
        clearTimeout(this.timeout);
        this.eltChrono.textContent = "Fin du temp !";
        localStorage.removeItem(this.id + "endTime");
    }
    tic(){
        this.updateTimer();
        if (this.sec == 0 && this.min == 0) this.endTimer()
        else this.timeout = setTimeout(e => this.tic(), 1000);
    }
}
let timer = new Timer("timer");