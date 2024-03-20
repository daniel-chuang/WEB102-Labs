// Imports
import { useState } from "react";
import viteLogo from "/vite.svg";
import "../App.css";

// Data that we loop over
const APIForm = ({ inputs, handleChange, onSubmit }) => {
  const inputsInfo = [
    "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
    "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
    "Input true or false if you would like your website screenshot to not contain any ads",
    "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
    "Choose the width of your screenshot (in pixels)",
    "Choose the height of your screenshot (in pixels)",
  ];

  // Form inputs
  return (
    <>
      <h2>Select Your Image Attributes:</h2>
      <form className="form-container">
        {inputs &&
          // Only run if inputs exists from the App, and then map through each category and value
          Object.entries(inputs).map(([category, value], index) => (
            <li className="form" key={index}>
              <h2>{category} </h2>
              <input
                type="text"
                name={category} // name of the parameter
                value={value} // state value of the parameter
                placeholder="Input this attribute..."
                onChange={handleChange} // function for handling change
                className="textbox"
              />
              <br></br>
              <br></br>
              <p> {inputsInfo[index]}</p>
            </li>
          ))}
        <button onClick={onSubmit}>Take that Pic! 🎞</button>
      </form>
    </>
  );
};

export default APIForm;
