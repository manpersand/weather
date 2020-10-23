import React from "react";

import WeatherEngine from "./components/WeatherEngine";
import "./App.css";

function App() {
  const year = new Date().getFullYear();
  return (
    <div className="App">
      <h1 className="header">weather</h1>
      <div className="weather-box">
        <WeatherEngine startLocation="Edmonton" />
        <WeatherEngine startLocation="Sydney" />
        <WeatherEngine startLocation="Vancouver" />
        <WeatherEngine startLocation="London" />
      </div>
      <p className="footer">
        © {year} <a href="https://manpreetsandhu.io">Manpreet Sandhu</a>
      </p>
    </div>
  );
}

/*const year = new Date().getFullYear();
  return (
    <Stack paddingBottom="10" justify="center" align="center">
      <Text>
        Powered by{" "}
        <MyLink href="https://exchangeratesapi.io/">exchangeratesapi.io</MyLink>
      </Text>
      <Text>
        © {year}{" "}
        <MyLink /MyLink>{" "}
      </Text>
    </Stack>*/
export default App;
