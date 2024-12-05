"use client"
import { Headphones } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const pathname = usePathname()

  const Navigation = () => (
    <nav className="sticky flex items-center justify-between border-b border-[#E2E4E9] bg-white px-11 py-6">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/assets/logos/nipex-logo.svg" alt="NipeX Logo" width={125} height={40} />
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <button className="flex items-center text-[#737373] hover:text-gray-600">Need help?</button>
        <button className="bg-white-500 flex h-10 items-center gap-2 whitespace-nowrap rounded-md border border-[#D4D4D4] px-4 py-2 hover:border-gray-400">
          <Headphones width={16} height={16} />
          <p className="text-sm">Contact us</p>
        </button>
      </div>
    </nav>
  )
  const LandingNav = () => (
    <nav className="sticky flex items-center justify-between bg-[#F2FFF2] px-11 py-6">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/assets/logos/nipex-logo.svg" alt="NipeX Logo" width={125} height={40} />
        </Link>
      </div>
      <div className="flex items-center space-x-3">
        <button className="bg-white-500 flex h-10 items-center gap-2 whitespace-nowrap rounded-md border border-[#D4D4D4] px-4 py-2 hover:border-gray-400">
          <Link className="text-sm" href="/login">
            Login
          </Link>
        </button>
        <button className="flex items-center rounded bg-[#067806] p-2 px-4 text-white">
          <Link className="text-sm" href="/vendor/registration/start">
            Sign-up as a vendor
          </Link>
        </button>
      </div>
    </nav>
  )
  if (pathname.includes("dashboard")) {
    return <></>
  }
  return pathname == "/" ? <LandingNav /> : <Navigation />
}
