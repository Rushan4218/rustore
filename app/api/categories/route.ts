import { checkPermission } from "@/lib/checkPermission";
import { prisma } from "@/lib/prisma";
import { categoryCreateSchema } from "@/schemas/categorySchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(
      {
        message: "Successfully retrieved categories.",
        categories,
      },
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
          message: "Forbidden - You don't have permission.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const result = categoryCreateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }
    const { name, description } = result.data;
    const categoryExists = await prisma.category.findUnique({
      where: { name },
    });
    if (categoryExists) {
      return NextResponse.json(
        {
          message: "Category already exists.",
          erro_code: "ALREADY_EXISTS",
        },
        { status: 409 }
      );
    }

    const category = await prisma.category.create({
      data: { name, description },
    });
    return NextResponse.json(
      {
        message: "Successfully created category.",
        category,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
