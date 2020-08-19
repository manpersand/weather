import React, { useState, useEffect } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import WeatherCard from "./WeatherCard/component";

const config = require("../config.json"); //import the config.json file which stores the api key
const WeatherEngine = ({ startLocation }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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

  if (error) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <Card>
          <Label>
            City not found
            <CancelButton onClick={() => setError(false)}>X</CancelButton>
          </Label>
        </Card>
      </motion.div>
    );
  }

  if (loading) {
    return (
      <Card>
        <PulseLoader size={15} color="darkgray" />
      </Card>
    );
  }

  return (
    <div>
      <WeatherCard
        temp={weather.temp}
        condition={weather.condition}
        city={weather.city}
        country={weather.country}
        getWeather={getWeather}
      />
    </div>
  );
};

export default WeatherEngine;

const Label = styled.label`
  font-family: "Fira Sans", sans-serif;
  font-weight: 200;
  border-radius: 10px;
  width: 200px;
  height: 50px;
  color: white;
  background: #394e70;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
`;

const CancelButton = styled.span`
  position: absolute;
  background: #557fc2;
  cursor: pointer;
  width: 17px;
  height: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 0.8rem;
  top: -8px;
  right: -8px;
  box-shadow: 1px 0px 2px rgba(0, 0, 0, 0.4);
`;

const Card = styled.div`
  margin: 0 auto;
  background: transparent;
  width: 200px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;
