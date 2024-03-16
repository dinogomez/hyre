import { getUser } from "@/lib/auth";
import React from "react";
import SignIn from "./auth.signin";
import SignUp from "./auth.signup";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth.actions";
import DashboardButton from "./auth.dashboard-button";

async function AuthSign() {
  const { user } = await getUser();

  return (
    <div className="flex space-x-12 items-center text-white">
      {user ? (
        <>
          <DashboardButton />
          <form action={signOut}>
            <Button>Sign Out</Button>
          </form>
        </>
      ) : (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </div>
  );
}

export default AuthSign;
