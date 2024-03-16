import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function Dashboard() {
  const { user } = await getUser();
  if (!user) {
    return redirect("/");
  }
  return <div>dashboard</div>;
}

export default Dashboard;
