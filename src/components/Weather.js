import React from "react";

const Weather = props => {
  return (
    <div>
      {props.location && <p>Location: {props.location}</p>}
      {props.country && <p>Country: {props.country}</p>}
      {props.temperature && <p>Temperature: {props.temperature}</p>}
      {props.description && <p>Description: {props.description}</p>}
    </div>
  );
};

export default Weather;
