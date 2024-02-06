"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

export default function Home() {

  const router = useRouter();

  return (
    <div className="flex flex-col h-full w-full">

    <Navbar/>
    <div className="items-center justify-center h-full ">
      <p className="text-4xl font-bold justify-center p-[30vh]">Just Ask For It</p>
    </div>
    </div>
  );
}
