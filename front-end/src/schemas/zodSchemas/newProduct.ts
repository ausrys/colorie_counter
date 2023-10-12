import { z } from "zod";
export const newProductScheema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title is required" })
    .min(3, { message: "Title should be at least 3 characters" }),
  calories: z.coerce
    .number({
      required_error: "Calories is required",
      invalid_type_error: "Calories must be a number",
    })
    .nonnegative({ message: "Number has to be positive" }),
  protein: z.coerce
    .number({
      required_error: "Protein is required",
      invalid_type_error: "Protein must be a number",
    })
    .nonnegative({ message: "Number has to be positive" }),
  carbs: z.coerce
    .number({
      required_error: "Carbs is required",
      invalid_type_error: "Carbs must be a number",
    })
    .nonnegative({ message: "Number has to be positive" }),
  food_category_id: z.coerce.number({
    required_error: "Cateogory is required",
    invalid_type_error: "Cateogory must be a number",
  }),
});
