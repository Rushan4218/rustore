import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/schemas/authSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const result = signUpSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: result.error.flatten() },
        { status: 400 }
      );
    }
    const { name, email, password } = result.data;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { message: "Email already exists", error_code: "EMAIL_EXISTS" },
        { status: 400 }
      );
    }

    const saltRoundsString = process.env.SALT_ROUNDS;
    if (!saltRoundsString) {
      return NextResponse.json(
        { message: "Environment variables not set" },
        { status: 500 }
      );
    }
    const passwordHash = await bcrypt.hash(
      password,
      parseInt(saltRoundsString)
    );

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });
    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({
      message:
        error instanceof Error
          ? `Failed to create user ${error.message}`
          : "An unexpected error occured while trying to create user.",
    });
  }
};
