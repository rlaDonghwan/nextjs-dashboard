import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import React from "react";
import SideNav from "./ui/dashboard/sidenav";

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
