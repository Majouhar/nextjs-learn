import React from "react";
import classes from "./meal-grid.module.css";
import MealItem from "./meal-item";

function MealGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => {
        return <li key={meal.id}>
          <MealItem {...meal} />
        </li>;
      })}
    </ul>
  );
}

export default MealGrid;
