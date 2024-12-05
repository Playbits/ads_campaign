import React from "react"
import Image from "next/image"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export type CardLayoutProps = {
  imageSrc: string
  title: string
  description?: string
  children?: React.ReactNode
}

export default function CardLayout({ title, description, imageSrc, children }: CardLayoutProps) {
  return (
    <Card className="w-[310px] border-none shadow-none sm:w-[330px] lg:w-[370px]">
      <CardHeader className="p-0 pb-2 pt-6">
        <Image className="mx-auto" src={imageSrc} width={88} height={88} alt={title} />
        <CardTitle className="text-center font-['TripSans'] text-2xl font-medium tracking-tight text-[#171717]">
          {title}
        </CardTitle>
        <CardDescription className="text-center font-['Geist'] text-base font-normal text-[#404040]">
          {description}
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  )
}
