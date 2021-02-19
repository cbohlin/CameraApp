// Set constraints for the video stream
var constraints = { video: { facingMode: "user",frameRate: 30 }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--start"),
    cameraStop = document.querySelector("#camera--stop"),
    cameraSave = document.querySelector("#camera--disp")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    


        let mediaRecorder = new MediaRecorder(stream);
        let vidSave = document.getElementById('camera--disp');
        let chunks = [];

        cameraTrigger.addEventListener('click', (ev)=>{
            mediaRecorder.start();
            console.log('Start');
            console.log(mediaRecorder.state);
        })

        cameraStop.addEventListener('click', (ev)=>{
            mediaRecorder.stop();
            console.log('Stop');
            console.log(mediaRecorder.state);
        });

        mediaRecorder.ondataavailable = function(ev){
            chunks.push(ev.data);
            console.log('Gooing');
        }

        mediaRecorder.onstop = (ev)=>{
            let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
            chunks = [];
            let videoURL = window.URL.createObjectURL(blob);
            vidSave.src = videoURL;
        }





    })
    .catch(function(error) {
        console.error("Error", error);
    });



    
    
}


// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

