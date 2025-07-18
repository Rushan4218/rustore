"use client";

import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import image from "@/public/auth_image.jpg";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const res = await signIn("credentials", {
      redirect: false, // important: stops auto-redirect
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      // bad login
      console.log("Login failed:", res.error);
    } else {
      // login good
      router.push("/");
    }
  };

  return (
    <div className="section flex items-center gap-8 overflow-clip border border-primary">
      <form
        className="flex flex-1 flex-col gap-4 h-full "
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-3xl font-semibold text-primary">Sign in</h1>
          <p className="text-neutral-darker">Unlock the colors of tradition.</p>
        </div>
        <div className="label-input-group group">
          <label htmlFor="email" className="label-text">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            id="email"
            type="text"
            className="input-field"
            placeholder="eg: johndoe@gmail.com"
          />
          {errors.email && (
            <p className="text-sm text-error">{`${errors.email.message}`}</p>
          )}
        </div>
        <div className="label-input-group group">
          <label htmlFor="password" className="label-text">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            id="password"
            type="password"
            className="input-field"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-sm text-error">{`${errors.password.message}`}</p>
          )}
        </div>
        <button type="submit" className="btn-primary">
          {isSubmitting ? "Signing in ..." : "Sign in"}
        </button>
        <span className="text-sm text-neutral-darker flex items-center gap-2">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-primary cursor-pointer hover:text-primary-hover active:scale-95 transition-all duration-300"
          >
            Sign up
          </Link>
        </span>
      </form>
      <div className="flex-1 overflow-clip max-h-full max-w-96 rounded-md">
        <Image
          src={image}
          alt="Kalachakra Mandala — intricate Tibetan Buddhist geometric artwork representing cycles of time and cosmos"
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
