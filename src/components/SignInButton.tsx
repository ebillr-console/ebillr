"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl:
            new URLSearchParams(window.location.search).get("callbackUrl") ||
            "/dashboard",
        })
      }
    >
      Sign In
    </Button>
  );
};
