// Set constraints for the video stream
var constraints = { video: { facingMode: "user",frameRate: 30 }, audio: false };
var prevRed = 0;
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraCanvas = document.querySelector("#camera--canvas"),
    cameraTrigger = document.querySelector("#camera--start"),
    cameraStop = document.querySelector("#camera--stop"),
    cameraFeedback = document.querySelector("#camera--feedback")
//


// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;


        var myVar = setInterval(ImStream, ((1/30)*1000));

        
        function ImStream(){
            var wWidth = window.innerWidth;
            var wHeight = window.innerHeight;

            if (wWidth > wHeight){
                cameraCanvas.height = (wHeight)*0.95;
                cameraCanvas.width = ((wHeight)*0.95)/(4/3);
            }
            else{
                cameraCanvas.width = (wWidth)*0.95;
                cameraCanvas.height = ((wWidth)*0.95)/(4/3);
            }
            
            //var w = 490;
            //var h = w/1.5;
            const w = cameraCanvas.clientWidth;
            const h = cameraCanvas.clientHeight;
        

            
            const center = ((w*h)/2)-1;
            const UL = 0;
            const UR = (w-1);
            const BL = (w*(h-1))-1;
            const BR = (w*(h))-1;

            const FT = 40;
    

            
            
             

            var context = cameraCanvas.getContext('2d');
            context.drawImage(cameraView,0,0,w,h);
        

            var canvasColor = context.getImageData(0, 0, w, h);
            var pixels = canvasColor.data;
            var rcent = pixels[(4*center)];
            var rgCent = pixels[(4*center)]/pixels[(4*center)+1];
            var rbCent = pixels[(4*center)]/pixels[(4*center)+2];

        

            var redCornMax = Math.max(pixels[(4*UL)],pixels[(4*UR)],pixels[(4*BL)],pixels[(4*BR)]);
            var greenCornMax = Math.max(pixels[(4*UL)+1],pixels[(4*UR)+1],pixels[(4*BL)+1],pixels[(4*BR)+1]);
            var redCornMin = Math.min(pixels[(4*UL)],pixels[(4*UR)],pixels[(4*BL)],pixels[(4*BR)]);
            var greenCornMin = Math.min(pixels[(4*UL)+1],pixels[(4*UR)+1],pixels[(4*BL)+1],pixels[(4*BR)+1]);
            var rgCornMax = redCornMax/greenCornMax;
            var rgCornMin = redCornMin/greenCornMin;
            var rgCorn = rgCornMax/rgCornMin
            var Red = 0;
            var Green = 0;

            for (i = 0; i < pixels.length-1; i = i + 4){
                Red = Red + pixels[i];
            }
            Red = Red/pixels.length*4;
            for (i = 1; i < pixels.length-1; i = i + 4){
                Green = Green + pixels[i];
            }
            Green = Green/pixels.length*4;
            console.log(Red/Green);
           

            //(pixels[(0*4)+1] < FT || pixels[((w-1)*4)+1] < FT || pixels[((BL-1)*4)+1] < FT || pixels[((BR-1)*4)+1] < FT)
            if (rgCent < 7 && rbCent < 7){
                
                cameraFeedback.innerHTML = "Place Finger Over Camera"
                
            }
                    

            else if (rgCent > 7 && rbCent > 7){

                if (rcent< 50){
                    cameraFeedback.innerHTML = "Too Dark"
                }
                else{
                cameraFeedback.innerHTML = "";
                }
                
            }


        };

        setTimeout(cameraStart, 30/1000)
    })
    .catch(function(error) {
        console.error("Error", error);
    });
    
    
}


// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

cameraTrigger.onclick = function(){
    document.getElementById("camera--feedback").innerHTML = "Place Finger Over Camera";
    //cameraFeedback.innerHTML = 'STOP';
}

cameraStop.onclick = function(){
    document.getElementById("camera--feedback").innerHTML = "STOP";
    //cameraFeedback.innerHTML = 'STOP';
}
