

let drawFaceExpressions = true;
let drawDetections = true;
let drawFaceLandmarks = true;

// Funktion zum Zeichnen basierend auf den Zuständen der Schalter
function drawBasedOnSwitches(canvas, resizedDetections) {
  if (drawFaceExpressions) {
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }
  if (drawDetections) {
    faceapi.draw.drawDetections(canvas, resizedDetections);
  }
  if (drawFaceLandmarks) {
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
  }
}

// Funktionen zum Umschalten der Schalter
function toggleFaceExpressions() {
  drawFaceExpressions = !drawFaceExpressions;
}

function toggleDetections() {
  drawDetections = !drawDetections;
}

function toggleFaceLandmarks() {
  drawFaceLandmarks = !drawFaceLandmarks;
}

// Event-Listener für die Buttons hinzufügen
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('faceExpressionButton').addEventListener('click', toggleFaceExpressions);
  document.getElementById('detectionsButton').addEventListener('click', toggleDetections);
  document.getElementById('faceLandmarksButton').addEventListener('click', toggleFaceLandmarks);
});
