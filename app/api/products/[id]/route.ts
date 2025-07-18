import { checkPermission } from "@/lib/checkPermission";
import { prisma } from "@/lib/prisma";
import { productUpdateSchema } from "@/schemas/productSchema";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const hasPermission = await checkPermission(["admin "]);
    if (!hasPermission) {
      return NextResponse.json(
        {
          message: "Forbiden - You don't have permission. ",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { message: "Invalid or missing ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const result = productUpdateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
        },
        { status: 400 }
      );
    }

    const { name, sku, slug, categoryId, price } = result.data;

    const currentProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!currentProduct) {
      return NextResponse.json(
        { message: "Product not found", error_code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      data: { name, sku, slug, categoryId, price },
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Successfully updated prodct", updatedProduct },
      { status: 400 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
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

    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { message: "Invalid or missing ID" },
        { status: 400 }
      );
    }
    const currentProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!currentProduct) {
      return NextResponse.json(
        { message: "Product not found", error_code: "NOT_FOUND" },
        { status: 404 }
      );
    }

    const product = await prisma.product.delete({ where: { id: Number(id) } });

    return NextResponse.json(
      { message: "Successfully deleted product", product },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
