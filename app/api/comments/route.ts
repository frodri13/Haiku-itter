import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
// import { revalidateTag } from 'next/cache';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    const comments = await prisma.comment.findMany();
    
    return NextResponse.json(comments);
}

export async function POST(req: Request) {
    const {content, postID} = await req.json();
    const session = await getServerSession(authOptions);
    const currentUserEmail = session?.user?.email!;
    const user = await prisma.user
    .findUnique({where: {email: currentUserEmail}, select: { id: true } })

    const userImage = session?.user?.image;

    await prisma.comment.create({
        data: {
            body: JSON.stringify(content),
            owner: {connect: {id: user?.id}},
            userImage: userImage,
            post: {
                connect: { id: postID },
              },
        }
    })
    // revalidateTag('comments')
}
