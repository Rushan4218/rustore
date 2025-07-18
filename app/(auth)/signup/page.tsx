"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import image from "@/public/auth_image.jpg";
import Image from "next/image";
import Link from "next/link";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    try {
      await axios.post("/api/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/signin");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (
          error.response?.status === 400 &&
          error.response?.data.error_code === "EMAIL_EXISTS"
        ) {
          console.error("Email already exists.");
        }
      }
    }
  };

  const password = watch("password");

  return (
    <div className="section flex items-center gap-8 overflow-clip border border-primary">
      <div className="flex-1  overflow-clip rounded-md">
        <Image
          src={image}
          alt="Kalachakra Mandala — intricate Tibetan Buddhist geometric artwork representing cycles of time and cosmos"
          className="h-[500] object-cover"
          height={540}
          width={480}
        />
      </div>
      <form
        className="flex flex-1 flex-col gap-4 h-full"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-3xl font-semibold text-primary">Sign up</h1>
          <p className="text-neutral-darker">
            Begin your spiritual journey with us.
          </p>
        </div>

        <div className="label-input-group group">
          <label htmlFor="name" className="label-text">
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            id="name"
            type="text"
            className="input-field"
            placeholder="eg: John Doe"
          />
          {errors.name && (
            <p className="text-sm text-error">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div className="label-input-group group">
          <label htmlFor="email" className="label-text">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            id="email"
            type="email"
            className="input-field"
            placeholder="eg: johndoe@gmail.com"
          />
          {errors.email && (
            <p className="text-sm text-error">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="label-input-group group">
          <label htmlFor="password" className="label-text">
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            id="password"
            type="password"
            className="input-field"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-sm text-error">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <div className="label-input-group group">
          <label htmlFor="confirmPassword" className="label-text">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            id="confirmPassword"
            type="password"
            className="input-field"
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-error">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary">
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>

        <span className="text-sm text-neutral-darker flex items-center gap-2">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary cursor-pointer hover:text-primary-hover active:scale-95 transition-all duration-300"
          >
            Sign in
          </Link>
        </span>
      </form>
    </div>
  );
};

export default SignUpPage;
