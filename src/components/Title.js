import React from "react";

const Title = props => {
  return (
    <div>
      <h1>WWWelcome to WWWeather</h1>

      {props.location && <h2>this is the WWWeather for {props.location}</h2>}
    </div>
  );
};

export default Title;
