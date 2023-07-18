import { useEffect, useState } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());

  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    console.log(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData.daily);
  } catch (err) {
    console.err(err);
  }
}

export default function App() {
  const [location, setLocation] = useState("Kenya");
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [displayLocation, setDisplayLocation] = useState({});

  useEffect(
    function () {
      async function fetchWeather() {
        // if (location.length < 2) return setWeather({});
        try {
          // 1) Getting location (geocoding)
          setIsLoading(true);
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
          );
          const geoData = await geoRes.json();
          console.log(geoData);

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);
          // this.setState({
          //   displayLocation: `${name} ${convertToFlag(country_code)}`,
          // });

          setDisplayLocation(`${name} ${convertToFlag(country_code)}`);
          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
          );
          const weatherData = await weatherRes.json();
          // this.setState({ weather: weatherData.daily });
          setWeather(weatherData.daily);
        } catch (err) {
          console.error(err);
        } finally {
          // this.setState({ isLoading: false });
          setIsLoading(false);
        }
      }
      fetchWeather();
    },
    [location]
  );

  function handleSetLocation(location) {
    setLocation(location);
  }

  useEffect(function () {
    setLocation(localStorage.getItem("location") || "");
  }, []);

  useEffect(
    function () {
      localStorage.setItem("location", location);
    },
    [location]
  );
  // componentDidMount() {
  //   this.setState({ location: localStorage.getItem("location") || "" });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.location !== prevState.location) {
  //     this.fetchWeather();

  //     localStorage.setItem("location", this.state.location);
  //   }
  // }
  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <div>
        <Input location={location} onSetLocation={handleSetLocation} />
      </div>

      {isLoading && <p className="loader">Loading...</p>}
      {weather.weathercode && <Weather weather={weather} location={location} />}
    </div>
  );
}

function Input({ location, onSetLocation }) {
  console.log(location);
  return (
    <input
      type="text"
      placeholder="Search for location"
      value={location}
      onChange={(e) => onSetLocation(e.target.value)}
    />
  );
}

function Weather({ weather, location }) {
  // componentWillUnmount() {
  //   console.log("Weather will unmount");
  // }

  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ date, max, min, code, isToday }) {
  // const { date, max, min, code, isToday } = this.props;
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; {Math.ceil(max)}&deg;
      </p>
    </li>
  );
}
