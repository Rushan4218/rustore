import { checkPermission } from "@/lib/checkPermission";
import { prisma } from "@/lib/prisma";
import { categoryUpdateSChema } from "@/schemas/categorySchema";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const hasPermission = await checkPermission(["admin"]);
  if (!hasPermission) {
    return NextResponse.json(
      {
        message: "Forbidden - You don't have permission.",
      },
      { status: 403 }
    );
  }

  const { id } = await params;
  if (!id || isNaN(Number(id))) {
    return NextResponse.json(
      {
        message: "Invalid or missing ID",
      },
      { status: 400 }
    );
  }

  const currentCategory = await prisma.category.findUnique({
    where: { id: Number(id) },
  });
  if (!currentCategory) {
    return NextResponse.json(
      { message: `Category with id ${id} not found`, error_code: "NOT_FOUND" },
      { status: 404 }
    );
  }

  const body = await req.json();

  const result = categoryUpdateSChema.safeParse(body);

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

  const updatedCategory = await prisma.category.update({
    where: { id: Number(id) },
    data: { name, description },
  });

  return NextResponse.json(
    { message: "Successfully updated category", updatedCategory },
    { status: 200 }
  );
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
          message: "Forbidden - You don't have permission.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        {
          message: "Invalid or missing ID",
        },
        { status: 400 }
      );
    }

    const currentCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    if (!currentCategory) {
      return NextResponse.json(
        {
          message: `Category with id ${id} not found`,
          error_code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }
    const deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(
      { message: "Successfully deleted category.", deletedCategory },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
