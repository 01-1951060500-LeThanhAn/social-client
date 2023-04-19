import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonWeather from "../Skeleton/SkeletonWeather";

export default function Sidebar() {
  const [city, setCity] = useState("hanoi");
  const [weather, setWeather] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchWeather = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ff1daa2ba2b4f616d47559a5bfa80101&units=metric`
      );

      setWeather(res.data);
      setLoading(true);
    };

    const timing = setTimeout(() => {
      fetchWeather();
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timing);
  }, [city]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      {loading ? (
        <div className=" fixed lg:w-[300px] 2xl:w-[380px] mt-5 lg:mx-5 2xl:mx-8 h-[600px] rounded-lg shadow-md bg-white ">
          <div className="header">
            <div className="text-center mt-6 ">
              <input
                value={city}
                className="bg-slate-200 outline-none px-4 py-2 rounded-3xl w-64"
                onChange={handleCityChange}
                type="text"
                placeholder="Search city"
                autoFocus
              />
            </div>

            <div className="mt-8">
              {weather && city.length > 0 && (
                <div className="text-center">
                  <h2 className="text-3xl">
                    {weather.name} (<span>{weather.sys.country}</span>)
                  </h2>
                  <p className="mt-3">
                    {weather.weather[0].description.charAt(0).toUpperCase() +
                      weather.weather[0].description.slice(1)}
                  </p>
                  <div className=" flex justify-center">
                    <div className="">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt=""
                        className="w-32 h-32 object-cover bg-blue-500 rounded-full mt-4"
                      />
                    </div>
                  </div>
                  <p className="text-6xl mt-5 font-semibold">
                    {" "}
                    {weather.main.temp}°C
                  </p>
                  <div className="grid grid-cols-2 mt-8 gap-y-6">
                    <p>
                      <span className="text-xl font-semibold"> Humidity</span>
                      <br /> {weather.main.humidity}%
                    </p>
                    <p>
                      <span className="text-xl font-semibold"> Wind speed</span>{" "}
                      <br /> {weather.wind.speed} km/h
                    </p>
                    <p>
                      <span className="text-xl font-semibold">Feel likes</span>{" "}
                      <br /> {weather.main.feels_like} km/h
                    </p>
                    <p>
                      <span className="text-xl font-semibold">Wind gust</span>{" "}
                      <br /> {weather.wind.gust} km/h
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <SkeletonWeather />
      )}
    </>
  );
}
