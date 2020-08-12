import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "@emotion/styled";

import WeatherCard from "./WeatherCard/component";

const config = require("../config.json"); //import the config.json file which stores the api key
const WeatherEngine = ({ startLocation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    country: null,
    condition: null,
  });

  const getWeather = async (q) => {
    setLoading(true);
    try {
      const apiResp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=${config["apiKey"]}`
      );
      const respJSON = await apiResp.json();
      setWeather({
        temp: respJSON.main.temp,
        city: respJSON.name,
        country: respJSON.sys.country,
        condition: respJSON.weather[0].main,
      });
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getWeather(startLocation);
  }, [startLocation]);

  return (
    <div>
      {!loading && !error ? (
        <div>
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
            getWeather={getWeather}
          />
        </div>
      ) : loading ? (
        <div
          style={{
            display: "flex",
            width: "200px",
            height: "280px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PulseLoader size={15} color="darkgrey" />
        </div>
      ) : !loading && error ? (
        <div
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Invalid city! <br />{" "}
          <Button onClick={() => setError(false)}>Reset</Button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;

const Button = styled.button`
  font-family: "Fira Sans", sans-serif;
  font-weight: 200;
  border-radius: 10px;
  width: 45%;
`;
