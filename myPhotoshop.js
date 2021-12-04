var canvas = document.getElementById("cnv1");
var ctx = canvas.getContext("2d");
var img = null;


function loadImg(file){
    img = new SimpleImage(file);
    img.drawTo(canvas);
}

function clrCanvas(){
    if (canvas != null){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
}

function makeGray(){
    var gImg = new SimpleImage(img);
    for (var px of gImg.values()){
        var avg = (px.getRed() + px.getGreen() + px.getBlue())/3;
        px.setRed(avg);
        px.setGreen(avg);
        px.setBlue(avg);
    }
    clrCanvas();
    gImg.drawTo(canvas);
}

function makeRed(){
    var rImg = new SimpleImage(img);
    for (var px of rImg.values()){
        var avg = (px.getRed() + px.getGreen() + px.getBlue())/3;
        if (avg < 128){
            px.setRed(2*avg);
        }
        else{
            px.setRed(255);
            px.setGreen(2*avg - 255);
            px.setBlue(2*avg - 255);
        }
    }
    clrCanvas();
    rImg.drawTo(canvas);
}



function makeRbow(){
    var rbow = new SimpleImage(img);
    var height = rbow.height;
    for (var px of rbow.values()){
        let x = px.getX();
        let y = px.getY();
        var red = px.getRed();
        var green = px.getGreen();
        var blue = px.getBlue();
        var avg = (red + green + blue)/3;
        if (y < height/7){
            if (avg < 128){
                px.setRed(avg*2);
            }
            else{
                px.setRed(255);
                px.setGreen(2*avg - 255);
                px.setBlue(2*avg - 255);
            }
        }else if(y < 2*height/7){
            if (avg < 128){
                px.setRed(avg*2);
                px.setGreen(0.8*avg);
            }
            else{
                px.setRed(255);
                px.setGreen(1.2*avg - 51);
                px.setBlue(2*avg - 255);
        
            }    
        }else if(y < 3*height/7){
            if (avg < 128){
                px.setRed(avg*2);
                px.setGreen(2*avg);
            }
            else{
                px.setRed(255);
                px.setGreen(255);
                px.setBlue(2*avg - 255);
        
            }
        }else if(y < 4*height/7){
            if (avg < 128){
                px.setGreen(2*avg);
            }
            else{
                px.setRed(2*avg - 255);
                px.setGreen(255);
                px.setBlue(2*avg - 255);
        
            }
        }else if(y < 5*height/7){
            if (avg < 128){
                px.setBlue(2*avg);
            }
            else{
                px.setRed(2*avg - 255);
                px.setGreen(2*avg - 255);
                px.setBlue(255);
        
            }
        }else if(y < 6*height/7){
            if (avg < 128){
                px.setRed(avg*0.8);
                px.setBlue(2*avg);
            }
            else{
                px.setRed(1.2*avg - 51);
                px.setGreen(2*avg - 255);
                px.setBlue(255);
        
            }
        }else if(y < height){
            if (avg < 128){
                px.setRed(avg*1.6);
                px.setBlue(1.6*avg);
            }
            else{
                px.setRed(0.4*avg + 153);
                px.setGreen(2*avg - 255);
                px.setBlue(0.4*avg + 153);
        
            }
        }    
    }
    rbow.drawTo(canvas);
}

function makeSrk(){
    var srkImg = new SimpleImage(img);
    for (var px of srkImg.values()){
        var avg = (px.getRed() + px.getGreen() + px.getBlue())/3;
        let x = px.getX();
        let y = px.getY();
        let sinx = Math.sin(x+50);
        if (y > sinx){
            px.setRed(0);
            px.setGreen(255);
            px.setBlue(255);
        }
        else{
            if (avg<128){
                px.setBlue(2*avg);
            }
            else{
                px.setRed(2*avg - 255);
                px.setBlue(255);
                px.setGreen(2*avg - 255);
            }
        }
        
    }
    srkImg.drawTo(canvas);
}

function makeBlur(){
    if (!img.complete() || img==null){
        alert("Image is not loaded, load the an image first!");
        return;
    }
    var blurImg = new SimpleImage(img.width, img.height);
    for (var px of blurImg.values()){
        var randNum = Math.random();
        if (randNum < 0.5){
            var imgPx = img.getPixel(px.getX(), px.getY());
            blurImg.setPixel(px.getX(), px.getY(), imgPx);
        }
        else{
            var x = px.getX();
            var y = px.getY();
            var randX = returnRandomNum(-10, 10) ;
            var randY = returnRandomNum(-10, 10);
            var newX = randX + x;
            var newY = randY + y;
            if (newX < 0){
                newX = 0;
            }
            if (newY < 0){
                newY = 0;
            }
            if (newX >= blurImg.width){
                newX = blurImg.width - 1;
            }
            if (newY >= blurImg.height){
                newY = blurImg.height - 1;
            }
            var imgPx = img.getPixel(newX, newY);
            blurImg.setPixel(px.getX(), px.getY(), imgPx);
        }
    }
    blurImg.drawTo(canvas);

    
}

function download(){
    var url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function makeBg(){
    var url = canvas.toDataURL();
    document.body.style.backgroundImage = 'url(' + url + ')';
    document.getElementById("div1").style.visibility = 'hidden';
    document.getElementById("div0").style.visibility = 'visible';
}

function displayOn(){
    document.getElementById("div1").style.visibility = 'visible';
    document.getElementById("div0").style.visibility = 'hidden';
    document.body.style.backgroundImage = 'none';

}

function returnRandomNum(min = 0, max = 1){
    var rand = Math.floor((Math.random() * (max - min + 1)) + min);
    return rand;
}

function reset(){
    clrCanvas();
    img.drawTo(canvas);
}

