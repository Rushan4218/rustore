import { Role } from "@/app/generated/prisma";
import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().min(1, "Email is required").email("Invalid email format."),
  password: z.string().min(8, "Password must be atleast 8 characters long."),
  role: z.nativeEnum(Role),
});

export const userUpdateSchema = userCreateSchema.partial();
