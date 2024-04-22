import { getWeatherData } from "./api.js";
import { obtenerFechaFormateada, obtenerHoraFormateada } from "./date.js";

const buscarInput = document.querySelector(".search-city");
const buscarButton = document.querySelector(".search-button");
const cargandoOverlay = document.querySelector(".cargando-overlay");

const mostrarLoader = () => cargandoOverlay.classList.add("mostrar");
const esconderLoader = () => cargandoOverlay.classList.remove("mostrar");

const loadData = async (city) => {
    try {
        mostrarLoader();
        const data = await getWeatherData(city);
        printWeatherDataToScreen(data);
    } catch (error) {
        console.error("Error fetching initial weather data:", error);
    } finally {
        esconderLoader();
    }
}

const handleSearch = async (event) => {
    event.preventDefault();
    const city = buscarInput.value;
    if (city) loadData(city);
}

const printWeatherDataToScreen = (weatherData) => {
    const { current, location, forecast } = weatherData;
    updateLocationInfo(location);
    updateCurrentWeather(current);
    renderWeatherTable(forecast);
    renderTemperatureChart(forecast);
}

const updateLocationInfo = (location) => {
    const formattedDate = obtenerFechaFormateada(location.localtime_epoch);
    const time = obtenerHoraFormateada(location.localtime);
    document.getElementById("nombre-ciudad").textContent = `${location.name},`;
    document.getElementById("nombre-country").textContent = location.country;
    document.getElementById("date").textContent = formattedDate;
    document.getElementById("time").textContent = time;
}

const updateCurrentWeather = (current) => {
    document.getElementById("temperatura").textContent = `${current.temp_c} °C`;
    document.getElementById("condición-image").src = current.condition.icon;
    document.getElementById("condición-text").textContent = current.condition.text;
    document.getElementById("velocidad-viento").textContent = current.wind_kph;
    document.getElementById("humedad").textContent = current.humidity;
    document.getElementById("uvIndex").textContent = 4;
}

const renderWeatherTable = (forecast) => {
    const tableBody = document.getElementById("weatherTableBody");
    tableBody.innerHTML = '';
    forecast.forecastday.forEach(data => {
        const date = new Date(data.date);
        const dayOfWeek = date.toLocaleDateString("es-ES", { weekday: "long" });
        const iconUrl = data.day.condition.icon.replace(/^http:\/\//i, "https://");
        const weatherConditions = data.day.condition.text;
        const row = document.createElement("tr");
        const dateCell = document.createElement("td");
        dateCell.textContent = dayOfWeek;
        dateCell.class = "day-of-week";
        const dayCell = document.createElement("td");
        dayCell.textContent = weatherConditions;
        const weatherCell = document.createElement("td");
        const weatherIcon = document.createElement("img");
        weatherIcon.src = iconUrl;
        weatherIcon.alt = weatherConditions;
        weatherCell.appendChild(weatherIcon);
        row.appendChild(dateCell);
        row.appendChild(weatherCell);
        row.appendChild(dayCell);
        tableBody.appendChild(row);
    });
}

const renderTemperatureChart = (forecast) => {
    const { dates, temperaturasMáxima, temperaturasMínima } = extractForecastData(forecast);
    const ctx = document.getElementById("forecastChart").getContext("2d");
    const forecastChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: dates,
            datasets: [{
                label: "Temperatura Máxima (°C)",
                borderColor: "rgba(54, 162, 235, 1)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                data: temperaturasMáxima
            }, {
                label: "Temperatura mínima (°C)",
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                data: temperaturasMínima
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

const extractForecastData = (forecast) => {
    const dates = [];
    const temperaturasMáxima = [];
    const temperaturasMínima = [];
    forecast.forecastday.forEach(curr => {
        dates.push(curr.date);
        temperaturasMáxima.push(curr.day.maxtemp_c);
        temperaturasMínima.push(curr.day.mintemp_c);
    });
    return { dates, temperaturasMáxima, temperaturasMínima };
}


// Event Listeners
buscarButton.addEventListener("click", handleSearch);

document.addEventListener('DOMContentLoaded', () => {
    loadData('Concepcion');
});