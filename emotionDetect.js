// Diese Datei erzeugt ein Video, legt ein Canvas drüber und lädt aus der face-api.min.js die Daten die durch die Kameras, anlysiert diese 
// und erfasst daraus welche Emotion man hat
const video = document.getElementById('video');
let canvas;



Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo).catch(err => console.error(err));

function startVideo() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getUserMedia is not supported');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        const displaySize = { width: video.videoWidth, height: video.videoHeight };
        canvas = document.getElementById('canvas');
        faceapi.matchDimensions(canvas, displaySize);
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          const context = canvas.getContext('2d');
          context.clearRect(0, 0, canvas.width, canvas.height);

// Hier werden die einzelnen Punkte, Objekte im Video gezeichnet
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);


          //erstellt neues leeres Array
          const emotionArray = [];

          resizedDetections.forEach(result => {
            const expressions = result.expressions;           
            // Fügt die erkannten Emotionen für jedes Gesicht dem Array hinzu
            emotionArray.push(expressions); 
          });                         
        }, 100);
        
      };
    })
    .catch(err => console.error(err));
}


export { emotionArray };

