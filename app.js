// Set constraints for the video stream
var constraints = { video: { facingMode: "user",frameRate: 30 }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraCanvas = document.querySelector("#camera--canvas"),
    cameraTrigger = document.querySelector("#camera--start"),
    cameraStop = document.querySelector("#camera--stop"),
    cameraFeedback = document.querySelector("#camera--feedback")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;


        var myVar = setInterval(ImStream, ((1/30)*1000));


        function ImStream(){
            var w = 300;
            var h = 250;

            var context = cameraCanvas.getContext('2d');
            context.drawImage(cameraView,0,0,w,h);
        

            var canvasColor = context.getImageData(0, 0, w, h);
            var pixels = canvasColor.data;
            var r = pixels[0];
            console.log(r);

            if (pixels[(0*4)+1] > 40 && pixels[((w-1)*4)+1] > 50){
                cameraFeedback.innerHTML = "Place Finger Over Camera";
            }
            else if (pixels[1] < 40 && pixels[2] < 50){
            
                if (pixels[(22500*4)] < 70){
                cameraFeedback.innerHTML = "Room Is Too Dark";
                }
                else {
                cameraFeedback.innerHTML = "";
                }

            }
        };


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
