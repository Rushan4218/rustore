import { checkPermission } from "@/lib/checkPermission";
import { prisma } from "@/lib/prisma";
import { userUpdateSchema } from "@/schemas/userSchema";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
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

    const currentUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!currentUser) {
      return NextResponse.json(
        {
          message: `User with id ${id} doesn't exist`,
          error_code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    const body = await req.json();

    const result = userUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: result.data.name,
        email: result.data.name,
        role: result.data.role,
      },
    });
    return NextResponse.json(
      { message: "Successfully updated user.", updatedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};

export const DELETE = async (
  req: NextRequest,
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
    const currentUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!currentUser) {
      return NextResponse.json(
        {
          message: `User with id ${id} doesn't exist`,
          error_code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }
    const deletedUser = await prisma.user.delete({ where: { id: Number(id) } });
    return NextResponse.json(
      { message: "Successfully deleted user", deletedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
