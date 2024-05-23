import axios from "axios";
import { useState } from "react";
// import clearIcon from "./assets/Wicons/clear.png";
// import cloudIcon from "./assets/Wicons/cloud.png";
// import drizzleIcon from "./assets/Wicons/drizzle.png";
// import rainIcon from "./assets/Wicons/rain.png";
// import snowIcon from "./assets/Wicons/snow.png";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [weatherIcon, setWeatherIcon] = useState(cloudIcon);

  // Set Api Key

  // Fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${
          import.meta.env.VITE_KEY
        }`
      );
      setWeatherData(response.data);

      // Set weather icon based on weather data
      // const iconCode = response.data.weather[0].icon;
      // if (iconCode === "01d" || iconCode === "01n") {
      //   setWeatherIcon(clearIcon);
      // } else if (
      //   iconCode === "02d" ||
      //   iconCode === "02n" ||
      //   iconCode === "03d" ||
      //   iconCode === "03n"
      // ) {
      //   setWeatherIcon(cloudIcon);
      // } else if (iconCode === "04d" || iconCode === "04n") {
      //   setWeatherIcon(drizzleIcon);
      // } else if (
      //   iconCode === "09d" ||
      //   iconCode === "09n" ||
      //   iconCode === "10d" ||
      //   iconCode === "10n"
      // ) {
      //   setWeatherIcon(rainIcon);
      // } else if (iconCode === "13d" || iconCode === "13n") {
      //   setWeatherIcon(snowIcon);
      // } else {
      //   setWeatherIcon(clearIcon);
      // }
    } catch (error) {
      setError(error.response.data.message);
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    fetchWeatherData();
  };

  // Handle input change
  const handleChange = (e) => {
    const data = e.target.value;
    setCity(data);
  };

  return (
    <div className="flex justify-center">
      <div className="rounded-lg artboard artboard-horizontal phone-2 bg-gradient-to-b from-[#228be6] to-[#3bc9db]">
        <form onSubmit={handleSubmit} className="flex justify-center">
          <label className="flex items-center w-1/2 gap-2 mt-5 input input-bordered">
            <input
              onChange={handleChange}
              type="text"
              className="grow"
              placeholder="Enter Your City Name"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-5 h-5 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </form>
        {loading && (
          <span className="text-white loading loading-dots loading-lg"></span>
        )}
        {error && (
          <p className="text-4xl font-bold text-center uppercase mt-28">
            {error}
          </p>
        )}
        {weatherData && !error && (
          <div className="flex flex-col items-center justify-center ">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt=""
            />
            <h2 className="text-5xl font-bold text-white">
              {weatherData.name}
            </h2>
            <p className="mt-2 text-xl font-bold text-white">
              Temperature: {weatherData.main.temp}°C
            </p>
            <p className="font-bold text-white">
              Weather: {weatherData.weather[0].description}
            </p>
            <p className="font-bold text-white">
              Wind: {weatherData.wind.speed} Km/h
            </p>
            <p className="font-bold text-white">
              Humidity: {weatherData.main.humidity}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
