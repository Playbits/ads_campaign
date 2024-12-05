import React from "react"
import Footer from "./Footer"

export type LoginLayoutProps = {
  children: React.ReactNode
  showRegisterMessage?: boolean
}

export default function LoginLayout({ children, showRegisterMessage = false }: LoginLayoutProps) {
  return (
    <div className="flex h-[calc(100vh-91px)]">
      <div className="relative h-full w-1/2 bg-image-login bg-cover bg-center md:block">
        {/* <div className="absolute h-full w-full mix-blend-multiply bg-gray-300"></div> */}
        {showRegisterMessage && (
          <div className="ml-20 flex h-full items-end pb-8">
            <div>
              <h1 className="font-['TripSans'] text-3xl font-bold text-white">Register with NipeX</h1>
              <p className="mt-2 font-['Geist'] text-base font-normal text-white">
                Enrol your business with NipeX as a contractor
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col md:w-1/2">
        <div className="mt-8 flex items-center justify-center overflow-y-auto">{children}</div>
        <Footer />
      </div>
    </div>
  )
}
