import { prisma } from "@/lib/prisma";
import Comments from "./Comments";

export default async function Posts() {
    const posts = await prisma.post.findMany();

    return(
        <div>
          {posts.map((post) => {
            return post.body
          })}
        </div>
    )
}