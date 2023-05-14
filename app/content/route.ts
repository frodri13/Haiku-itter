import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// export async function GET() {
//     const session = await getServerSession(authOptions);
//     return NextResponse.json();
// }

// export async function POST(req, res) {
//    const content = req.body

//    const post = await prisma.post.create({
//     data: {
//         content,

//     }
//    })

}