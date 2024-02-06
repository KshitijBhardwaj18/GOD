import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const user = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      const user = await prismadb.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return NextResponse.json(user);
    } else {
      return new NextResponse("USer already Present", { status: 400 });
    }
  } catch (error) {
    console.log("[USER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
