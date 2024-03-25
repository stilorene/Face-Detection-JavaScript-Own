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

          // gibt die einzelnen Emotionen in der Konsole aus
          detections.forEach(detection => {
            const expressions = detection.expressions;
            // expressions is an object containing probabilities for different emotions (e.g., 'neutral', 'happy', 'sad', etc.)
            const mostLikelyEmotion = Object.keys(expressions).reduce((emotion, key) => expressions[key] > expressions[emotion] ? key : emotion);
            console.log("Most likely emotion:", mostLikelyEmotion);
          });

        }, 100);
      };
    })
    .catch(err => console.error(err));
}
