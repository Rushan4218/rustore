import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(1, "Category name is required."),
  description: z.string().optional(),
});

export const categoryUpdateSChema = categoryCreateSchema.partial();
