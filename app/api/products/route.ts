import { PrismaClient } from "@/app/generated/prisma";
import { checkPermission } from "@/lib/checkPermission";
import { prisma } from "@/lib/prisma";
import { productCreateSchema } from "@/schemas/productSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(
      { message: "Successfully retrieved products.", products },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const hasPermission = await checkPermission(["admin"]);
    if (!hasPermission) {
      return NextResponse.json(
        {
          message: "Forbiden - You don't have permission.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = productCreateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
        },
        { status: 400 }
      );
    }

    const { name, sku, slug, categoryId, price } = result.data;

    const productExists = await prisma.product.findUnique({ where: { name } });

    if (productExists) {
      return NextResponse.json(
        {
          message: `A product with name ${name} already exists`,
          error_code: "ALREADY_EXISTS",
        },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: { name, sku, slug, categoryId, price },
    });

    return NextResponse.json(
      { message: "Successfully created product.", product },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
