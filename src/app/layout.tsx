import { auth } from "@/auth";
import { Navbar } from "@/components/Navbar"
import "./globals.css"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();
  const status = session ? "signedIn" : "signedOut";
  const image = session?.user?.image || ""
  return (
    <html lang="en">
        <body>
          <Navbar status={status} image={image} />
            {children}
        </body>
    </html>
  )
}