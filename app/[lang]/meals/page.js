import React, { Suspense } from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealGrid from "@/components/meals/meal-grid";
import { getMeals } from "@/lib/meals";
import LoadingOut from "./loading-out";
import { getDictionary } from "@/lib/dictionary";

async function MealsLoading() {
  const meals = await getMeals();
  return <MealGrid meals={meals} />;
}
export const metadata = {
  title: "All Meals",
  description: "Delicious meals, shared by a food-loving community.",
};
async function Meals({ params }) {
  const dict = await getDictionary(params.lang);
  const lang = dict.meals;
  return (
    <>
      <header className={classes.header}>
        <h1>
          {lang["head"]}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favourite recipe and cook it yourself, It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<LoadingOut />}>
          <MealsLoading />
        </Suspense>
      </main>
    </>
  );
}

export default Meals;
