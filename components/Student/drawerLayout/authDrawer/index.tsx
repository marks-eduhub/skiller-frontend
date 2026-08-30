"use client"

import React from "react";
import data from "./data.json"
import Image from "next/image";
import Link from "next/link";


export default function AuthDrawer({pageTo, link}:{pageTo:string, link:string}) {
  return (
    <div className="relative hidden h-screen w-full flex-col items-center justify-center gap-10 bg-primary px-8 text-primary-foreground md:flex">
      <div className="relative h-36 w-72 lg:h-40 lg:w-80">
      <Image
       src={data.logo}
       alt={"logo"}
       fill
      />
      </div>
      <div className="max-w-[24rem] text-center font-display text-3xl font-semibold leading-tight lg:text-4xl">{data.tagline}</div>
      <Link
        href={link}
        className="absolute bottom-8 flex min-h-[52px] w-72 items-center justify-center rounded-full bg-brand px-6 text-lg font-semibold text-brand-foreground transition hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary lg:w-80 lg:text-xl"
      >
      {pageTo}
      </Link>
    </div>
  );
}
