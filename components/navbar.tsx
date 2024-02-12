"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface navbarProps {}

const Navbar: React.FC<navbarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-2 justify-between p-2">
      <p className="font-bold text-xl">GOD</p>
      <div className="flex flex-row gap-2">
        <button
          className={cn("flex p-2 items-center justify-center border-black border rounded-3xl w-[6rem]", pathname === "/auth" ? "flex" : "hidden")}
          type="button"
          onClick={() => router.push("/auth")}
        >
          sign-in
        </button>
        <button
          className="flex p-2 items-center justify-center border-black border rounded-3xl w-[6rem]"
          type="button"
          onClick={() => router.push("/auth")}
        >
          sign-up
        </button>
      </div>
    </div>
  );
};

export default Navbar;
