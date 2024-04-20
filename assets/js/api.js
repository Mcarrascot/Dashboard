const URL_BASE = "http://api.weatherapi.com/v1/forecast.json";
const API_KEY = "f761f3fa74b24ea7bc250550241704";

export const getWeatherData = async (ciudad) => {
  try {
    const response = await fetch(`${URL_BASE}?`  + new URLSearchParams({
      key: API_KEY,
      q: ciudad,
      days: 7,
      aqi: "yes",
      alerts: "no"
    }));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error: No se pudo obtener datos meteorológicos.");
  }
}