import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'Master - Material Data',
  description: 'Generated by create next app',
}

export default function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode
}) {

  return (
      children
  )
}
