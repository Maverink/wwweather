import React from "react";

const Form = props => {
  return (
    <form onSubmit={props.getWeather}>
      <input
        type="text"
        placeholder="type location name"
        name="location"
      ></input>

      <button>Find WWWeather!</button>
    </form>
  );
};

export default Form;
