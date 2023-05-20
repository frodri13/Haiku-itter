import { SimpleButton } from "./Buttons";
import { ProfileImage } from "./ProfileImageProps";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath, revalidateTag } from "next/cache";



async function createHaiku(formData: FormData) {
  'use server'
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user
   .findUnique({where: {email: currentUserEmail}, select: { id: true } })

  const userImage = session?.user?.image;
 
  await prisma.post.create({
   data: {
        body: JSON.stringify(formData.get("body")),
        owner: {connect: {id: user?.id}},
        userImage: userImage,
     }
  })
  revalidatePath('/')
}

export default async function NewHaikuForm(){
  const session = await getServerSession(authOptions);
  const placeHolder = 'What are you thinking?'
  const buttonText = 'Haiku it!'

  return(
    <form className="flex flex-col gap-2 border-b px-4 py-2" action={createHaiku}>
    <div className="flex gap-4">
      <ProfileImage src={session?.user?.image} />
      <label>
        <textarea
        style={{height: 0}}
        name="body"
        placeholder={placeHolder}
        className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" />
      </label>
    </div>
  <SimpleButton className="self-end">{buttonText}</SimpleButton>
  </form>
  )
}