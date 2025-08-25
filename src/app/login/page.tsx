import { SignInButton } from "@/components/SignInButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Login</h1>
      <SignInButton />
    </div>
  );
}
