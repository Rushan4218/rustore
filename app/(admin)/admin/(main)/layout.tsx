import { AdminHeader } from "@/components/shared/admin/AdminHeader";
import { AdminSidebar } from "@/components/shared/admin/AdminSidebar";
import React from "react";

const AdminMainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminMainLayout;
