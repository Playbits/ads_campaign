import React from "react"

import CardLayout from "./CardLayout"

export type FormLayoutProps = {
  children: React.ReactNode
  title: string
  description?: string
}

export default function FormLayout(props: FormLayoutProps) {
  return <CardLayout {...props} imageSrc="/assets/icons/card-layout-profile.svg" />
}
