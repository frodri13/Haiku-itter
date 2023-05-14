import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

const posts = [
    {
      title: 'Lorem Ipsum',
      slug: 'lorem-ipsum',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    },
  ];

export async function GET() {
    const session = await getServerSession(authOptions);
    return NextResponse.json(posts);
}

export async function POST(req : Request) {
    console.log('stj')
   const content = await req.json()
   console.log('content: ', content)

   const post = await prisma.post.create({
    data: {
         body: JSON.stringify(content)
      }
   })
    return NextResponse.json(content);
}