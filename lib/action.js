"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMeal(prevState, formData) {
  const isInvalid = (text) => !text || !text.trim() === "";
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  if (isInvalid(meal.title)) {
    return {
      message: "Invalid Input Field",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
