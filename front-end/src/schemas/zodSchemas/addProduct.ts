import { z } from "zod";
export const addProductSchema = z.object({
  weight: z.coerce
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight must be a number",
    })
    .gte(0.1)
    .positive({ message: "Number has to be positive" }),
});
