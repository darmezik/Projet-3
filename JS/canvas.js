var checkSignature = false;
class Canvas {
    constructor(elementId){
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastX = -1;
        this.lastY = -1;
        this.mouseactive = false;
        this.ctx = null;
        this.canva = document.getElementById(elementId); 
        this.init = () =>{
            this.ctx = canva.getContext('2d');
            this.calibrate(canva);
            this.canva.addEventListener('click', (e) =>{ 
                this.draw(e.offsetX, e.offsetY); 
                this.draw(canva.clientWidth /2, canva.clientHeight /2)
                }); 
            this.canva.width = canva.clientWidth;
            this.canva.height = canva.clientHeight;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineCap = 'round';
            this.draw();
            this.erase();
        };
        this.calibrate = (can) =>{
            can.width = can.clientWidth;
            can.height = can.clientHeight;
        }
        window.addEventListener('resize', (e) =>{ 
            this.calibrate(canva) 
        });
        this.getMousePos = (e) =>{
            if (e.offsetX) {
                this.mouseX = e.offsetX;
                this.mouseY = e.offsetY;
            }else if (e.layerX){
                this.mouseX = e.layerX;
                this.mouseY = e.layerY;
            }
        }
        this.getTouchPos = (e) =>{
            if (e.touches) {
                if (e.touches.length == 1) {
                    const touch = e.touches[0];
                    this.touchX = touch.pageX - touch.target;
                    this.touchY = touch.pageY - touch.target;
                }
            }
        }
        this.drauwLine = (x, y) =>{
            if (this.lastX == -1){
                this.lastX = x;
                this.lastY = y;
            }
            checkSignature = true;
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x,y);
            this.lastX = x;
            this.lastY = y;
            this.ctx.stroke();
            $("#check").show(0);
            $("#clear").show(0);
        }
        this.draw = () =>{
            this.canva.addEventListener("mousedown", (e) =>{
                this.mouseDown = true;
                this.getMousePos(e);
                this.drauwLine(this.mouseX, this.mouseY);
            }, false);
        }
        this.canva.addEventListener('mousemove', (e) =>{
            this.getMousePos(e);
            if (this.mouseDown === true){
                this.drauwLine(this.mouseX, this.mouseY);
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
        this.erase = () =>{ 
            $('#clear').on('click',  () =>{
                this.ctx.clearRect(0, 0, canva.width, canva.height);
                checkSignature = false;
            });
        }
        this.init();
    }
}
canva = new Canvas("canva");