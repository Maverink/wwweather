import React from "react";

import "./App.css";

import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  ImageryLayer,
  CameraFlyTo,
  Camera,
  Scene,
  Globe,
  CesiumMatch
} from "resium";

import {
  ArcGisMapServerImageryProvider,
  Cartesian3,
  createWorldTerrain,
  Cesium
} from "cesium";

// import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";

const terrainProvider = createWorldTerrain();

const position = Cartesian3.fromDegrees(-8.41955, 40.20564);

const pointGraphics = { pixelSize: 10 };

class App extends React.Component {
  state = {
    location: undefined,
    country: undefined,

    lat: undefined,
    lon: undefined,
    cartesian: undefined,
    temperature: undefined,
    description: undefined
  };

  getWeather = async e => {
    const api_key = "8bbb1f936dda2b4a50c4de430521e75c";
    const api_url =
      "http://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +
      api_key +
      "&q=";
    e.preventDefault();

    const locationInput = e.target.elements.location.value;
    const api_call = await fetch(api_url + locationInput);

    const weather_api_data = await api_call.json();
    console.log(weather_api_data);

    if (locationInput) {
      this.setState({
        location: weather_api_data.name,
        country: weather_api_data.sys.country,

        lat: weather_api_data.coord.lat,
        lon: weather_api_data.coord.lon,
        cartesian: undefined,
        temperature: weather_api_data.main.temp,
        description: weather_api_data.weather[0].description
      });
    } else {
      this.setState({
        location: undefined,
        country: undefined,

        lat: undefined,
        lon: undefined,
        cartesian: undefined,
        temperature: undefined,
        description: undefined
      });
    }
  };
  render() {
    return (
      <div className="App">
        <div className="weather-container">
          <Title location={this.state.location}></Title>
          <Form getWeather={this.getWeather}></Form>
          <Weather
            location={this.state.location}
            country={this.state.country}
            temperature={this.state.temperature}
            description={this.state.description}
          ></Weather>
        </div>

        {this.state.location && (
          <Viewer className="viewer-cesium">
            <Scene />
            <Globe />
            <Camera />
            <CameraFlyTo
              duration={1}
              destination={Cartesian3.fromDegrees(
                this.state.lon,
                this.state.lat,
                800
              )}
              orientation={{
                heading: 10 * (Math.PI / 180),
                pitch: -20 * (Math.PI / 180),
                roll: 0
              }}
            />
            <Entity />
          </Viewer>
        )}
      </div>
    );
  }
}

export default App;
