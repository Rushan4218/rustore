import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  sku: z.string().min(1, "SKU is required."),
  slug: z.string().min(1, "Slug is required."),
  price: z.number().refine((val) => Number.isFinite(val), {
    message: "Price must be a valid number",
  }),
  categoryId: z.number().int(),
});

export const productUpdateSchema = productCreateSchema.partial();
