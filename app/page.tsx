"use client";

import { DashboardPage } from "@/components/dashboard-page";
import { fetchUser } from "@/lib/fetchUser";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetchUser();
  }, []);
  return <DashboardPage />;
}