class Canvas {
    constructor(elementId){
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastX = -1;
        this.lastY = -1;
        this.mouseactive = false;
        this.ctx = null;
        this.canva = document.getElementById(elementId);
        this.addEventListener();
        this.init();
    }
    init(){
        this.ctx = canva.getContext('2d');
        this.calibrate(canva);
        this.canva.width = canva.clientWidth;
        this.canva.height = canva.clientHeight;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineCap = 'round';
    }
    getMousePos(e){
        if (e.offsetX) {
            this.mouseX = e.offsetX;
            this.mouseY = e.offsetY;
        }else if (e.layerX){
            this.mouseX = e.layerX;
            this.mouseY = e.layerY;
        }
    }
    getTouchPos(e){
        if (e.touches) {
            if (e.touches.length == 1) {
                const touch = e.touches[0];
                this.touchX = touch.pageX - touch.target.offsetLeft;
                this.touchY = touch.pageY - touch.target.offsetTop;
            }
        }
    }
    calibrate(can){
        can.width = can.clientWidth;
        can.height = can.clientHeight;
        window.addEventListener('resize', (e) =>{ 
            this.calibrate(canva) 
        });
    }
    addEventListener(){
        this.canva.addEventListener("mousedown", (e) =>{
            this.mouseDown = true;
            this.getMousePos(e);
            this.drawLine(this.mouseX, this.mouseY);
        }, false);
        this.canva.addEventListener('mousemove', (e) =>{
            this.getMousePos(e);
            if (this.mouseDown === true){
                this.drawLine(this.mouseX, this.mouseY);
            }
        },false);
        window.addEventListener('mouseup',  () =>{
            this.mouseDown = false; 
            this.lastX = -1;
            this.lastY = -1;
        }, false);
        this.canva.addEventListener('touchstart',  (e) =>{
            this.getTouchPos(e);
            this.drawLine(this.touchX, this.touchY);
            e.preventDefault();
        }, false);
        this.canva.addEventListener('touchmove',  (e) =>{
            this.getTouchPos(e);
            this.drawLine(this.touchX, this.touchY);
            e.preventDefault(); 
        }, false);
        this.canva.addEventListener('touchend',  (e) =>{
            this.lastX = -1;
            this.lastY = -1;
        }, false);
        $('#clear').on('click',  () =>{
            this.ctx.clearRect(0, 0, this.canva.width, this.canva.height);
        });
    }
    drawLine(x, y){
        if (this.lastX == -1){
            this.lastX = x;
            this.lastY = y;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x,y);
        this.lastX = x;
        this.lastY = y;
        this.ctx.stroke();
        $("#check").show(0);
        $("#clear").show(0);
    }
}
