import { getWeatherData } from "./api.js";

const searchInput = document.querySelector(".search-city");
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Evitar el comportamiento de envío de formulario predeterminado
    const ciudad = searchInput.value;
    if (!ciudad) return; // No hay nada que buscar? retorna antes. 
    // TODO: Mostrar "cargando" mientras se espera por información.
    const data = await getWeatherData(ciudad);
    // TODO: Dejar de mostrar "cargando".
    printWeatherDataToScreen(data);
});

document.addEventListener('DOMContentLoaded', async () => {
    const initialWeatherData = await getWeatherData('Concepcion');
    console.log(initialWeatherData)
    printWeatherDataToScreen(initialWeatherData);
})


const printWeatherDataToScreen = (weatherData) => {
    // Mostrar datos meteorológicos actuales
    const title = `Tiempo en ${weatherData.location.name}, ${weatherData.location.region}`;
    document.getElementById("nombre-ciudad").textContent = title;
    document.getElementById("temperatura").textContent = weatherData.current.temp_c;
    document.getElementById("condición").textContent = weatherData.current.condition.text;
    document.getElementById("velocidad-viento").textContent = weatherData.current.wind_kph;
    document.getElementById("humedad").textContent = weatherData.current.humidity;

    // UV index tabla
    const uvIndexData = {
        labels: ["UV Index"],
        datasets: [{
            label: "UV Index",
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
            data: [weatherData.current.uv]
        }]
    };

    const uvIndexCtx = document.getElementById("uvIndexChart").getContext("2d");
    const uvIndexChart = new Chart(uvIndexCtx, {
        type: "bar",
        data: uvIndexData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });
}


  var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});