import axios from "axios";

export const fetchWeather = async (query = null, lat = null, lon = null) => {
  try {
    const params =
      lat && lon
        ? {
            lat: lat,
            lon: lon,
            units: "metric",
            APPID: "f33a484cf794d08d0148764789aaba32",
          }
        : {
            q: query,
            units: "metric",
            APPID: "f33a484cf794d08d0148764789aaba32",
          };
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    return new Error("Error in fetching weather data!");
  }
};
