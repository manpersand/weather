import React from "react";

import WeatherEngine from "./components/WeatherEngine";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="header">weather</h1>
      <div className="weather-box">
        <WeatherEngine startLocation="Edmonton" />
        <WeatherEngine startLocation="Sydney" />
        <WeatherEngine startLocation="Vancouver" />
        <WeatherEngine startLocation="London" />
      </div>
      <h3 className="footer">by manpreet sandhu</h3>
    </div>
  );
}

export default App;
