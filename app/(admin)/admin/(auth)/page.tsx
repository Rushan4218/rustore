"use client";

import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminSignInPage = () => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    }); 

    if (res?.error) {
      // bad login
      console.log("Login failed:", res.error);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 h-full section"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="text-3xl font-semibold text-primary">Sign in</h1>
        <p className="text-neutral-darker">Unlock the admin panel.</p>
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
    </form>
  );
};

export default AdminSignInPage;
