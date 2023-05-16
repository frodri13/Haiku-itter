import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function GET() {
    const session = await getServerSession(authOptions);
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
}

export async function POST(req : Request) {
   const content = await req.json()

   const post = await prisma.post.create({
    data: {
         body: JSON.stringify(content)
      }
   })
    return NextResponse.json(content);
}