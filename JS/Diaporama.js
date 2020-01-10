console.clear();
class Slideshow{
    constructor(id, imgs){
        this.idSlide = id;
        this.imgs = imgs;
        this.domSlide = document.getElementById(this.idSlide);
        this.domImg = this.domSlide.querySelector('img');
        this.domPrev = this.domSlide.querySelector('div .prevBtn');
        this.domPlay = this.domSlide.querySelector('div .playBtn');
        this.domPause = this.domSlide.querySelector('div .pauseBtn');
        this.domNext = this.domSlide.querySelector('div .nextBtn');
        this.timer = null;
        this.imgNumber = 0;
        document.addEventListener('keydown', this.keyboard.bind(this));
        this.domPrev.addEventListener('click', this.prevImage.bind(this));
        this.domPlay.addEventListener('click', this.play.bind(this));
        this.domPause.addEventListener('click', this.pause.bind(this));
        this.domNext.addEventListener('click', this.nextImage.bind(this));
        this.pause();
        this.play();
    }
    nextImage(){ // Button next
        this.imgNumber++;
        if(this.imgNumber > (this.imgs.length - 1)){
            this.imgNumber = 0;
        }
        this.domImg.src = this.imgs[this.imgNumber];
    }
    prevImage(){ // Button prev
        this.imgNumber--;
        if(this.imgNumber < 0){
            this.imgNumber = this.imgs.length - 1;
        }
        this.domImg.src = this.imgs[this.imgNumber];
    }
    play(){
        this.timer = setInterval(this.nextImage.bind(this), 5000);
        this.domPlay.className = "playBtn";
    }
    pause(){
        clearInterval(this.timer);
        this.timer = null;
        this.domPause.className = "pauseBtn";
    }
    keyboard(e){ // Arrow Keyboard Left, right and space
        switch(e.keyCode){
            case 37:
                this.nextImage();
                break;
            case 39:
                this.prevImage();
                break;
            case 32:
                this.playPause();
                break;
        }
    }
}
const path = "public/images/"
var slide = new Slideshow('slideshow',[
    path+"test1.jpg",
    path+"test2.jpg",
    path+"test3.jpg",
    path+"test4.jpg",
    path+"test5.jpg"
]);