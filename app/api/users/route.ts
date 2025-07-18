import { checkPermission } from "@/lib/checkPermission";
import { prisma } from "@/lib/prisma";
import { userCreateSchema } from "@/schemas/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
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
    const users = await prisma.user.findMany();
    return NextResponse.json(
      { message: "Successfully retrieved users.", users },
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
    const result = userCreateSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, email, password, role } = result.data;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return NextResponse.json(
        {
          message: "Email already exists",
          error_code: "ALREADY_EXISTS",
        },
        { status: 409 }
      );
    }

    const saltRoundString = process.env.SALT_ROUNDS;
    if (!saltRoundString) {
      return NextResponse.json(
        {
          message: "Environment variables not",
        },
        { status: 500 }
      );
    }

    const passwordHash = await bcrypt.hash(password, parseInt(saltRoundString));

    const user = await prisma.user.create({
      data: { name, email, passwordHash, role },
    });

    return NextResponse.json(
      {
        messsage: "User created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message: error instanceof Error ? error.message : "Unexpected error",
    });
  }
};
