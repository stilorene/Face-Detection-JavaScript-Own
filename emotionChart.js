let emotionChart = null; // Deklariere eine globale Variable, um das Diagramm zu speichern

// Funktion zum Aktualisieren des Emotionsdiagramms
function updateEmotionChart(emotions, probabilities) {
    // Überprüfe, ob ein vorhandenes Diagramm existiert und zerstöre es
    if (emotionChart) {
        emotionChart.destroy(); // Zerstöre das vorhandene Diagramm
    }

    const ctx = document.getElementById('emotionChartCanvas').getContext('2d'); // Hole den 2D-Kontext des Canvas-Elements
    emotionChart = new Chart(ctx, { // Erstelle ein neues Diagramm
        type: 'bar', // Diagrammtyp: Balkendiagramm
        data: {
            labels: emotions, // Emotionen als Beschriftungen auf der x-Achse
            datasets: [{
                label: 'Emotionswahrscheinlichkeiten', // Beschriftung der Datenreihe
                data: probabilities, // Wahrscheinlichkeiten der Emotionen als Daten
                backgroundColor: [ // Hintergrundfarben der Balken
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [ // Randfarben der Balken
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1 // Randbreite der Balken
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true // Die y-Achse beginnt bei Null
                    }
                }]
            }
        }
    });
}
