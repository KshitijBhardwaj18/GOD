import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { Jwt } from "jsonwebtoken";



export async function POST(req: Request) {

  
  
  try {
   
    const body = await req.json();
    const { email, password } = body;
    const failed = "failed";
   

    const user = await prismadb.user.findFirst({
        where: {
          email: email,
          password:password,
        },
      });

      


    if (user && user.password === password) {
       
    } 
  } catch (error) {
    console.log("reached here")
    console.log(error);
    return new NextResponse(`Internal error ${error}`, { status: 400 });
  }
}
