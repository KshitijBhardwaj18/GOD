import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
   

    const user = await prismadb.user.findFirst({
      where: {
        email: email,
        
      },
    });

    if (user && user.password === password) {
      NextResponse.json(user);
    }
  } catch (error) {
    console.log("reached here");
    console.log(error);
    return new NextResponse(`Internal error ${error}`, { status: 400 });
  }
}
