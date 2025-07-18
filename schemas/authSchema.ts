import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name cannot be empty."),
  email: z.string().email("Invalid email format."),
  password: z.string().min(8, "Password must be atleast 8 characters long."),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(1, "Password cannot be empty."),
});
