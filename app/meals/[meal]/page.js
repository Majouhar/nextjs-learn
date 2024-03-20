import React from "react";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({ params: { meal } }) {
  const mealValue = getMeal(meal);
  return {
    title: mealValue?.title ?? "Not Found",
    description: mealValue?.summary ?? "Page not Found",
  };
}

function MealItem({ params: { meal } }) {
  const mealValue = getMeal(meal);
  if (!mealValue) {
    notFound();
  }
  const { image, title, summary, instructions, creator_email, creator } =
    mealValue;

  const mealInstructions = instructions.replace(/\n/g, "<br/>");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image fill src={image} alt="Image" />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: mealInstructions }}
        ></p>
      </main>
    </>
  );
}

export default MealItem;
