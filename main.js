img="" ;
status="" ;
objects=[] ;




function setup() {
    canvas = createCanvas(380,380) ;
    canvas.center() ;
    video= createCapture(VIDEO) ;
    video.size(380,380) ;
    video.hide() ;
    objectDetector= ml5.objectDetector('cocossd', modelLoaded) ;
    document.getElementById("status").innerHTML="Status : Detecting Object" ;
}

function draw(){
    image(video,0,0,380,380) ;
    if (status!="") {
        r= random(255) ;
        g= random(255) ;
        b= random(255) ;
        objectDetector.detect(video, gotResult) ;
        document.getElementById("status").innerHTML = "Status: Object Detected" ;
        document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are "+ objects.length ;
        for (i =0 ; i<objects.length ; i++) {
            fill(r,g,b) ;
            percent = floor(objects[i].confidence*100) ;
            text(objects[i].label + " " + percent + "%" ,objects[i].x +15 , objects[i].y + 15 ) ;
            noFill() ;
            stroke(r,g,b) ;
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height) ;
        }
    }
    /*fill("#FF0000") ;
    text("Dog",55,55) ;
    noFill() ;
    stroke("#FF0000") ;
    rect(45,40,270,350) ;
    fill('#FF0000') ;
    text("Cat",320,130) ;
    noFill() ;
    stroke("#FF0000") ;
    rect(290,100,300,300) ; */
}

function modelLoaded() {
    console.log("model is loaded") ;
    status=true ;
    }

function gotResult(error,results) {
    if (error) {
        console.log(error) ;
    } else {
        console.log(results) ;
        objects=results ;
    }
}