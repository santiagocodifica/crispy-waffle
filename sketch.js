var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x1 = 5;
var x2 = canvas.width-5;
var y1 = 5;
var y2 = 5;

var off1 = 0;
var off2 = 0;

var move = 0;
var move2 = 100;

var acc = 0;


function drawRect(){
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(x1+move,y1+move2);
    ctx.lineTo(x2+move2,y2+move);
    ctx.lineTo(canvas.width - 20 - move/3,canvas.height);
    ctx.lineTo(0 + 20 + move2/3,canvas.height);
    ctx.closePath();
    ctx.fill();
}


var checkScrollSpeed = (function(settings){
    settings = settings || {};
  
    var lastPos, newPos, timer, delta, 
        delay = settings.delay || 50; // in "ms" (higher means lower fidelity )
  
    function clear() {
      lastPos = null;
      delta = 0;
    }
  
    clear();
    
    return function(){
      newPos = window.scrollY;
      if ( lastPos != null ){ // && newPos < maxScroll 
        delta = newPos -  lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
})();


function update(){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawRect();

    var wave = Math.sin(off1*0.05) * 5;
    var wave2 = Math.sin(off2*0.02) * 5;
    //off1++;
    window.onscroll = function(){
        // console.log( checkScrollSpeed() );
        // dos = checkScrollSpeed();
        // console.log(dos);
        acc = checkScrollSpeed();
        off1+=acc*0.2;
        off2+=acc*0.2;
    };

    move=wave;
    move2=wave2;

    requestAnimationFrame(update);
}

update();
