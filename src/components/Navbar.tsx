import { SignOutButton } from "@/components/SignOutButton";
import { SignInButton } from "@/components/SignInButton";
import Image, { StaticImageData } from "next/image";

interface NavbarProps {
  status: "signedIn" | "signedOut";
  user?: string;
  email?: string;
  image?: string | StaticImageData;
}

export const Navbar = ({status, user, image}: NavbarProps) => {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold w-fit">Business</h1>
      <div className="flex items-center gap-2">
        {status === "signedIn" && (
          <Image src={image || ""} alt={user || ""} width={32} height={32} className="rounded-full" />
        )}
        {status === "signedIn" ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
  );
};