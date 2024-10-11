"use client";

import Welcome_Page from "../welcome/page.jsx";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import DashboardLayout from "../dashboard/layout.jsx";

import { UserProvider } from "@/context/UserContext.js";

export default function Home() {
  return (
    <>
      <UserProvider>
        <SignedOut>
          <Welcome_Page />
        </SignedOut>
        <SignedIn>
          <DashboardLayout />
        </SignedIn>
      </UserProvider>
    </>
  );
}
