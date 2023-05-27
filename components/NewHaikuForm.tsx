import { SimpleButton } from "./Buttons";
import { ProfileImage } from "./ProfileImageProps";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath, revalidateTag } from "next/cache";
import ClientForm from "./ClientForm";



async function createHaiku(formData: FormData) {
  'use server'
  const session = await getServerSession(authOptions);
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user
   .findUnique({where: {email: currentUserEmail}, select: { id: true } })

  const userImage = session?.user?.image;
  console.log(formData)

  const postID = formData.get("postID") as string;

  const commentTrue = formData.get("comment") as string | null;

 const body = formData.get("body");

  if(commentTrue !== "true") {
    await prisma.post.create({
      data: {
           body: JSON.stringify(formData.get("body")),
           owner: {connect: {id: user?.id}},
           userImage: userImage,
        }
     })
     revalidatePath('/')
  } else if(commentTrue === "true"){

     await prisma.comment.create({
      data: {
        body: JSON.stringify(formData.get("body")),
        owner: {connect: {id: user?.id}},
        userImage: userImage,
        post: { connect: { id: postID } },
      }
    })
    revalidatePath('/')
  }
  } 

type NewHaikuFormProps = {
  comment: string, 
  postID?: string
}
 
export default async function NewHaikuForm({comment, postID}: NewHaikuFormProps){
  const session = await getServerSession(authOptions);
  const image = session?.user?.image!;



  return(
    <ClientForm image={image} comment={comment} postID={postID} action={createHaiku} />
  //   <form className="flex flex-col gap-2 border-b px-4 py-2" action={createHaiku}>
  //   <div className="flex gap-4">
  //     <ProfileImage src={session?.user?.image} />
  //     <label>
  //       <textarea
  //       style={{height: 0}}
  //       name="body"  
  //       placeholder={placeHolder}
  //       className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" />
  //       <input type="hidden" name="postID" value={postID}/>
  //       <input type="hidden" name="comment" value={comment}/>

  //     </label>
  //   </div>
  // <SimpleButton className="self-end">{buttonText}</SimpleButton>
  // </form>
  )
}