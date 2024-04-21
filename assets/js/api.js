const URL_BASE = "http://api.weatherapi.com/v1/forecast.json";
const API_KEY = "f761f3fa74b24ea7bc250550241704";

export const getWeatherData = async (ciudad) => {
  try {
    const response = await fetch(`${URL_BASE}?`  + new URLSearchParams({
      key: API_KEY,
      q: ciudad,
      days: 7,
      aqi: "yes",
      alerts: "no",
      lang: 'es',
    }));
    const data = await response.json();
    console.log ("esta es la API",data)
    return data;
  } catch (error) {
    console.log("Error: No se pudo obtener datos meteorológicos.");
  }
}

//var air_quality = { co: 310.4, gb-defra-index : 1, no2 : 4.2, o3: 32.5, pm2_5: 3.4, pm10: 5.3, so2 : 1.6, us-epa-index : 1}