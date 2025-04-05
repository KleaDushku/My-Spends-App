import React from "react";
import Image from "next/image";
import {
  LayoutGrid,
  ReceiptText,
  CircleDollarSign,
  Wallet,
  Settings,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: Wallet,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  const path = usePathname();

  return (
    <div className="h-screen p-1 border-r border-gray-200 bg-gray-50 shadow-sm w-64">
      <div className="flex flex-row items-center gap-2 mb-4">
        <Image src={"/logo.svg"} alt="logo" width={180} height={40} />
      </div>

      <div className="space-y-1">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  path === menu.path
                    ? "bg-white text-purple-600 shadow-sm border border-gray-200"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <menu.icon className="w-5 h-5" />
              <span className="font-medium">{menu.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6 left-5 right-5">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-8 h-8",
              }
            }}
          />
          <span className="text-sm font-medium text-gray-700">Profile</span>
        </div>
      </div>
    </div>
  );
}

export default SideNav;