"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Home,
  Package,
  ShoppingCart,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "@/redux/features/authSlice";
import { Button } from "../ui/button";

// 🔥 MENU CONFIG (clean & scalable)
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Marchents",
    url: "/marchents",
    icon: Package,
  },
  {
    title: "Orders",
    url: "/brand/orders",
    icon: ShoppingCart,
  },
  {
    title: "Messages",
    url: "/brand/message",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    url: "/brand/profile",
    icon: User,
  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogOut = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <Sidebar {...props}>
      {/* ================= HEADER ================= */}
      <SidebarHeader>
        <div className="px-2 py-4">
          <h1 className="text-lg font-bold">
            <span className="text-yellow-500">Youth</span> Shop
          </h1>
        </div>
      </SidebarHeader>

      {/* ================= MENU ================= */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="data-[active=true]:bg-black data-[active=true]:text-white"
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ================= FOOTER ================= */}
      <SidebarFooter>
        <div className="p-3">
          <Button onClick={handleLogOut} className="w-full flex items-center gap-3 px-3 py-2 bg-red-200/30 rounded-lg text-sm text-red-500 hover:bg-red-50 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
