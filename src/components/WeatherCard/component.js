import React from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

import Location from "./Location";
import Condition from "./Condition";
import Icon from "./Icon";

//Hot temp: 12C < 40C => (R,G,B) = (255,variable,0)
// T: 12 => 40
// G: 255 => 0
//Transfer Function => G = (1 - (T-12)/28) * 255

//Cold temp: -20 < 12 => (R,G,B) = (0,variable,255)
// T: -20 => 12
// G: 255 => 0
//Transfer Function => G = (1 - (T+20)/32) * 255

const WeatherCard = ({ temp, condition, city, country, getWeather }) => {
  let highColor = 0;
  let lowColor = 0;
  let bg = null;
  if (temp > 12) {
    //Hot Weather
    highColor = (1 - (temp - 12) / 28) * 255;
    lowColor = highColor - 200;
    bg = `linear-gradient(to top,
        rgb(255, ${highColor}, 0),
        rgb(255, ${Math.abs(lowColor)}, 0));`;
  } else if (temp <= 12) {
    //Cold Weather
    highColor = (1 - (temp + 20) / 32) * 255;
    lowColor = highColor - 200;
    bg = `linear-gradient(to top,
        rgb(0, ${highColor}, 255),
        rgb(0, ${Math.abs(lowColor)}, 255));`;
  }

  const Card = styled.div`
    margin: 0 auto;
    background: ${bg};
    width: 200px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
  `;

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
      <Card>
        <Location city={city} country={country} getWeather={getWeather} />
        <Icon condition={condition} />
        <Condition temp={temp} condition={condition} />
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
