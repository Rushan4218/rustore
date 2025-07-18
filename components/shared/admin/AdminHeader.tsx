"use client";
import { MenuModal } from "@/components/modals/MenuModal";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const AdminHeader = () => {
  const { data: session } = useSession();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const toggleRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !toggleRef.current?.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await signOut({ redirectTo: "/" });
  };

  return (
    <header className="h-20 bg-neutral-light shadow-neutral-dark shadow-lg flex items-center justify-between px-4">
      <h1 className="text-2xl font-medium">Admin Panel</h1>
      <div className="relative">
        <div
          ref={toggleRef}
          onClick={() => setShowMenu((prev) => !prev)}
          className="flex  items-center cursor-pointer group hover:bg-neutral-darkest/10 p-2 rounded-md transition-all duration-300"
        >
          <div className="p-2 text-primary rounded-full">
            <User size={20} />
          </div>
          <div className="p-2">
            <span className="font-medium">{session?.user.name}</span>
          </div>
        </div>
        <MenuModal
          ref={menuRef}
          isOpen={showMenu}
          className="absolute top-full right-0 max-w-full mt-6 bg-neutral-light rounded-md shadow-md p-2"
        >
          <span
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-neutral-darkest/10 transition-colors duration-300 cursor-pointer"
          >
            <LogOut size={18} /> Logout
          </span>
        </MenuModal>
      </div>
    </header>
  );
};

export { AdminHeader };
