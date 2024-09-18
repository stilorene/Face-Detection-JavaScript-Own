let emotionChart = null; // Globale Variable, um das Diagramm zu speichern
let chartType = 'bar'

// Funktion zum Aktualisieren des Emotionsdiagramms
function updateEmotionChart(emotions, probabilities) {
    const ctx = document.getElementById('emotionChartCanvas').getContext('2d');


    if (!emotionChart) {
        // Wenn emotionChart noch nicht initialisiert wurde, erstelle ein neues Diagramm
        emotionChart = new Chart(ctx, {
            type: chartType, // Verwende den übergebenen chartType, um den Diagrammtyp festzulegen
            data: {
                labels: emotions, // Emotionen als Beschriftungen auf der x-Achse
                datasets: [{
                    label: 'Emotionswahrscheinlichkeiten', // Beschriftung der Datenreihe
                    data: probabilities, // Wahrscheinlichkeiten der Emotionen als Daten
                    backgroundColor: [ // Hintergrundfarben der Balken
                        'rgba(159,29,53)',
                        'rgba(0,204,255)',
                        'rgba(0,117,94)',
                        'rgba(255,239,213)',
                        'rgba(255,196,12)',
                        'rgba(0,168,107)',
                        'rgba(201,160,220)',
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
    } else {
        // Wenn bereits ein Diagramm vorhanden ist, aktualisiere es

        // Addiere die neuen Wahrscheinlichkeiten zu den bereits vorhandenen
        for (let i = 0; i < probabilities.length; i++) {
            emotionChart.data.datasets[0].data[i] += probabilities[i];
        }


        emotionChart.config.type = chartType; // Hier wird der neue Diagrammtyp festgelegt. Dabei gehen keine Daten verloren, weil hierbei
        //nur die Daten des Objekts EmotionChart geändert werden, nicht des Canvas (also nur ein Teil,
        //hierbei type = chartType oben festgelegt als Bar, mit dem Button geändert zu polarArea) 

        // Aktualisiere das Diagramm
        emotionChart.update();
    }
}



// Wähle den Button aus dem DOM
const button = document.getElementById('changeChartTypeButton');

button.addEventListener('click', function () {
    if (chartType === 'bar') {
        chartType = 'polarArea'; // Setze chartType auf 'polarArea' beim Klicken des Buttons
    }
    else{
        chartType = 'bar';
    }

});



