import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { SimpleButton } from "./Buttons";

export default async function NewForm() {
   const session = await getServerSession(authOptions);
   const currentUserEmail = session?.user?.email!;
   const user = await prisma.user
    .findUnique({where: {email: currentUserEmail}, select: { id: true } })

   const userImage = session?.user?.image;

  

    async function upHaiku(formData: FormData) {
        "use server"

        await prisma.post.create({
            data: {
                 body: JSON.stringify(formData.get("body")),
                 owner: {connect: {id: user?.id}},
                 userImage: userImage,
              }
           })
    }

    return(
        <form action={upHaiku}>
            <textarea title="body" />
            <SimpleButton className="self-end">send</SimpleButton>
        </form>
    )
}


  
   