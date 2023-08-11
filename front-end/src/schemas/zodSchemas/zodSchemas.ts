import { z } from "zod";
export const addProductSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title should be at least 3 characters" }),
  calories: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({
        required_error: "Calories is required",
        invalid_type_error: "Calories must be a number",
      })
      .positive({ message: "Number has to be positive" })
      .min(1, { message: "Minimum is 1" })
  ),

  protein: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({
        required_error: "Protein is required",
        invalid_type_error: "Protein must be a number",
      })
      .positive({ message: "Number has to be positive" })
      .min(1, { message: "Minimum is 1" })
  ),
  carbs: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z
      .number({
        required_error: "Carbs is required",
        invalid_type_error: "Carbs must be a number",
      })
      .positive({ message: "Number has to be positive" })
      .min(1, { message: "Minimum is 1" })
  ),
  food_cateogry_id: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number({
      required_error: "Category is required",
      invalid_type_error: "Category must be a number",
    })
  ),
});
