"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <div className="flex flex-row gap-2 justify-between p-2">
      <p className="font-bold text-xl">GOD</p>
      <div className="flex flex-row gap-2">
      <button className="flex p-2 items-center justify-center border-black border rounded-3xl w-[6rem]" type="button" onClick={() => router.push("/sign-in")} >sign-in</button>
      <button className="flex p-2 items-center justify-center border-black border rounded-3xl w-[6rem]" type="button" onClick={() => router.push("/sign-up")} >sign-up</button>
      </div>
    </div>
  );
}
