// Imports
import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import APIForm from "./Components/APIForm";
import Gallery from "./Components/Gallery";

function App() {
  // STATES AND DATA //
  const [currentImage, setCurrentImage] = useState(null); // State variable to hold our image
  const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY; // Access key to our API
  const [prevImages, setPrevImages] = useState([]);
  const [inputs, setInputs] = useState({
    // Input form data
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  // HELPER FUNCTIONS //
  // Dealing with the form submission
  const submitForm = (e) => {
    console.log("Form submitted");
    e.preventDefault();
    let defaultValues = {
      // default values of the form submissions
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
    }
    // If the url input is empty, insert defaults
    else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "") {
          inputs[key] = defaultValues[key];
        }
      }
      // After inserting defaults, make the query
      makeQuery();
    }
  };

  // Deal with parameters that we don't want our user to be stressed about
  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL =
      inputs.url.slice(0, 4) == "http" ? inputs.url : url_starter + inputs.url;
    // let fullURL = url_starter + inputs.url;

    // Make query given our variables now
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  };

  // Using the API. Note that this runs in parallel, but the items within the function run chronologically
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    if (response.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setPrevImages((images) => [...images, json.url]);
      setCurrentImage(json.url);
    }
  };

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  // Main page
  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>

      <APIForm
        inputs={inputs}
        handleChange={(e) => {
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }));
        }}
        onSubmit={submitForm}
      />
      {
        // Conditional rendering, shows image if it exists in our state
        currentImage ? (
          <img
            className="screenshot"
            src={currentImage}
            alt="Screenshot returned"
          />
        ) : (
          <div> </div>
        )
      }
      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
          <br></br>
          &url={inputs.url} <br></br>
          &format={inputs.format} <br></br>
          &width={inputs.width}
          <br></br>
          &height={inputs.height}
          <br></br>
          &no_cookie_banners={inputs.no_cookie_banners}
          <br></br>
          &no_ads={inputs.no_ads}
          <br></br>
        </p>
      </div>

      <div className="container">
        <Gallery images={prevImages} />
      </div>

      <br></br>
      <br></br>
    </div>
  );
}

export default App;
