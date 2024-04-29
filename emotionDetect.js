// Diese Datei erzeugt ein Video, legt ein Canvas darüber und lädt aus der face-api.min.js die Daten, die durch die Kameras analysiert werden,
// und erfasst daraus, welche Emotionen man hat
const video = document.getElementById('video'); // Das Video-Element im HTML-Dokument wird ausgewählt und referenziert
let canvas; // Die Variable zum Speichern des Canvas-Elements wird deklariert
let detectedEmotions = []; // Ein leeres Array wird erstellt, um die erkannten Emotionen zu speichern
let isDrawingEnabled = true;
let resizedDetections;
let expression;


// Funktion zum Aktualisieren der erkannten Emotionen
function updateDetectedEmotions(expressions) {
  detectedEmotions = expressions; // Die erkannten Emotionen werden in der globalen Variablen gespeichert
}

// Die Modelle für die Gesichtserkennung und Emotionserkennung werden geladen, und nachdem sie geladen sind, wird die Funktion startVideo aufgerufen
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo).catch(err => console.error(err)); // Wenn ein Fehler auftritt, wird er in der Konsole ausgegeben

// Funktion zum Starten des Videos und der Gesichtserkennung
function startVideo() {
  // Überprüfung, ob die Funktion getUserMedia unterstützt wird
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getUserMedia is not supported'); // Wenn nicht, wird eine Fehlermeldung in der Konsole ausgegeben
    return;
  }

  // Zugriff auf die Kamera des Geräts und Starten des Video-Streams
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream; // Der Video-Stream wird dem Video-Element zugewiesen
      video.onloadedmetadata = () => {
        const displaySize = { width: video.videoWidth, height: video.videoHeight }; // Die Größe des Video-Displays wird erfasst
        canvas = document.getElementById('canvas'); // Das Canvas-Element im HTML-Dokument wird ausgewählt und referenziert
        faceapi.matchDimensions(canvas, displaySize); // Die Abmessungen des Canvas werden an die des Videos angepasst

        // In einem festgelegten Intervall wird die Gesichtserkennung durchgeführt und die Emotionen erfasst
        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions(); // Die Gesichter im Video werden erkannt und die Emotionen werden erfasst
          const resizedDetections = faceapi.resizeResults(detections, displaySize); // Die Ergebnisse werden an die Größe des Displays angepasst
          const context = canvas.getContext('2d'); // Der 2D-Kontext des Canvas wird abgerufen
          context.clearRect(0, 0, canvas.width, canvas.height); // Der Canvas wird geleert

          // Die erkannten Gesichter, Gesichtslandmarken und Emotionen werden im Canvas gezeichnet^

          // Funktion zum Umschalten des Zeichnens

            
          

          // Für jedes erkannte Gesicht werden die Emotionen extrahiert und an die Funktion updateEmotionChart übergeben
          resizedDetections.forEach(result => {
            const expressions = result.expressions; // Die erkannten Emotionen eines Gesichts werden gespeichert
        
            // Die Emotionen und Wahrscheinlichkeiten werden aus deSm Objekt extrahiert
            // Extrahiere die Emotionen und Wahrscheinlichkeiten aus dem Objekt 'expressions'.
            
            // 'Object.keys' gibt ein Array zurück, das die Schlüssel (Emotionen) des Objekts enthält.
            // 'Object.values' gibt ein Array zurück, das die Werte (Wahrscheinlichkeiten) des Objekts enthält.
            const emotions = Object.keys(expressions); // Array mit den Emotionen
            const probabilities = Object.values(expressions); // Array mit den Wahrscheinlichkeiten

            
               // Zeichnen aktivieren
                    function drawFaceExpressions() {
                      // Überprüfen, ob resizedDetections vorhanden ist und ob es Gesichtserkennungsergebnisse gibt
                      if (resizedDetections && resizedDetections.length > 0) {
                          // Zeichne Gesichtsausdrücke, Erkennungen und Gesichtslandmarken
                          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                          faceapi.draw.drawDetections(canvas, resizedDetections);
                          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
                      } else {
                          console.error('No face detection results available.'); // Fehlermeldung ausgeben, wenn keine Gesichtserkennungsergebnisse vorliegen
                      }
                  }
            // Die Funktion updateEmotionChart wird aufgerufen, um das Diagramm zu aktualisieren
            updateEmotionChart(emotions, probabilities);
        
            // console.log(expressions); // Die erkannten Emotionen werden in der Konsole ausgegeben
          });
        }, 100); // Die Gesichtserkennung wird alle 100 Millisekunden durchgeführt
        
      };
    })
    .catch(err => console.error(err)); // Wenn ein Fehler auftritt, wird er in der Konsole ausgegeben
  }





   

