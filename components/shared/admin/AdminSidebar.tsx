"use client";

import { LayoutDashboard, Package, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SideBarItem = {
  name: string;
  route: string;
  icon: React.ReactNode;
};

const sideBarItems: SideBarItem[] = [
  {
    name: "Dashboard",
    route: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Users",
    route: "/admin/users",
    icon: <User size={18} />,
  },
  {
    name: "Products",
    route: "/admin/products",
    icon: <Package size={18} />,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="z-10 h-screen w-64 p-4 bg-neutral-light shadow-neutral-dark shadow-xl">
      <h1 className="text-3xl font-semibold text-primary">RUSTORE</h1>
      <hr className="my-4 " />
      <div className="flex flex-col">
        {sideBarItems.map((item, index) => {
          const isActive = pathname === item.route;
          return (
            <Link
              key={index}
              href={item.route}
              className={`flex items-center gap-2  p-4 rounded-md ${
                isActive
                  ? "bg-primary/20 border-r-2 border-primary"
                  : "hover:bg-neutral"
              } transition-all duration-300`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export { AdminSidebar };
