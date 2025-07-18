"use client";

import { Spinner } from "@/components/general/Spinner";
import { fetchUsers } from "@/lib/api/user";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const UsersPage = () => {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery<User[]>({ queryKey: ["users"], queryFn: fetchUsers });

  if (usersLoading) {
    return <Spinner />;
  }

  if (usersError) {
    return <p className="error-text">Failed to load users</p>;
  }

  return (
    <div>
      <h1 className="page-title">Users Management</h1>
    </div>
  );
};

export default UsersPage;
