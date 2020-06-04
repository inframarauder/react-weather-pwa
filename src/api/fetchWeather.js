import axios from "axios";

export const fetchWeather = async (query) => {
  try {
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: query,
          units: "metric",
          APPID: "f33a484cf794d08d0148764789aaba32",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(error);
    return "Error in fetching weather data!";
  }
};
