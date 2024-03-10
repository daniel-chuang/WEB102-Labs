// Imports
import React, { Component, useState } from "react";
import RecipeChoices from "./RecipeChoices";
import drinksJson from "./drinks.json";

// BaristaForm Component
const BaristaForm = () => {
  // State
  // Just a list of the different types of ingredients possible
  const ingredients = {
    temperature: ["hot", "lukewarm", "cold"],
    syrup: ["mocha", "vanilla", "toffee", "maple", "caramel", "other", "none"],
    milk: ["cow", "oat", "goat", "almond", "none"],
    blended: ["yes", "turbo", "no"],
  };

  // Controls the input fields that the user has selected
  const [inputs, setInputs] = useState({
    temperature: "",
    milk: "",
    syrup: "",
    blended: "",
  });

  // Randomly select a drink from the drinks.json file to start
  let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);

  // Set the current drink and its true recipe
  const [currentDrink, setCurrentDrink] = useState(
    drinksJson.drinks[randomDrinkIndex].name
  );
  const [trueRecipe, setTrueRecipe] = useState(
    drinksJson.drinks[randomDrinkIndex].ingredients
  );

  // State for checking answers
  const [correct_temp, setCheckedTemperature] = useState("");
  const [correct_syrup, setCheckedSyrup] = useState("");
  const [correct_milk, setCheckedMilk] = useState("");
  const [correct_blended, setCheckedBlended] = useState("");

  // Checking if the answer selected by the user is correct or not
  const onCheckAnswer = (event) => {
    event.preventDefault();

    if (trueRecipe.temp != inputs["temperature"]) {
      setCheckedTemperature("wrong");
    } else {
      setCheckedTemperature("correct");
    }

    if (trueRecipe.syrup != inputs["syrup"]) {
      setCheckedSyrup("wrong");
    } else {
      setCheckedSyrup("correct");
    }

    if (trueRecipe.milk != inputs["milk"]) {
      setCheckedMilk("wrong");
    } else {
      setCheckedMilk("correct");
    }

    if (trueRecipe.blended != inputs["blended"]) {
      setCheckedBlended("wrong");
    } else {
      setCheckedBlended("correct");
    }
  };

  // Set the correct answer for each ingredient in an array for iteration
  console.log(correct_temp);
  const corrects = [correct_temp, correct_syrup, correct_milk, correct_blended];
  console.log(corrects);

  // When pressed, reset options and load in new drink info
  const onNewDrink = () => {
    setInputs({
      temperature: "",
      milk: "",
      syrup: "",
      blended: "",
    });
    getNextDrink();

    setCheckedTemperature("");
    setCheckedSyrup("");
    setCheckedMilk("");
    setCheckedBlended("");
  };

  // Selecting a new drink to try
  const getNextDrink = () => {
    let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
    setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
    setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
  };

  return (
    <div>
      <h2>Hi, I'd like to order a:</h2>
      <div className="drink-container">
        <h2 className="mini-header">{currentDrink}</h2>
        <button
          type="new-drink-button"
          className="button newdrink"
          onClick={onNewDrink}
        >
          🔄
        </button>
      </div>
      <form className="container">
        {Object.entries(ingredients).map(
          ([ingredient, lst], index) => (
            console.log(corrects),
            (
              <div className="mini-container">
                <h3>{ingredient[0].toUpperCase() + ingredient.slice(1)}</h3>
                <div className="answer-space" id={corrects[index]}>
                  {inputs[ingredient]}
                </div>
                <RecipeChoices
                  handleChange={(e) => {
                    setInputs(
                      (prevState) => (
                        console.log(e.target),
                        {
                          ...prevState,
                          [e.target.name]: e.target.value,
                        }
                      )
                    );
                  }}
                  label={ingredient}
                  choices={lst}
                  checked={inputs[ingredient]}
                />
              </div>
            )
          )
        )}
      </form>
      <button type="submit" className="button submit" onClick={onCheckAnswer}>
        Check Answers
      </button>
      <button
        type="new-drink-button"
        className="button submit"
        onClick={onNewDrink}
      >
        New Drink
      </button>
    </div>
  );
};

export default BaristaForm;
