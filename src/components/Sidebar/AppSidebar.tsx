"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function AppSidebar(
  props: React.ComponentProps<typeof Sidebar>
) {
  const pathname = usePathname();

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
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}