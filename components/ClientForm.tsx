import { SimpleButton } from "./Buttons";
import { ProfileImage } from "./ProfileImageProps";

type ClientFormProps ={
    image: string,
    comment: string,
    postID: string | undefined,
    action: (formData: FormData) => {}
  
}

export default function ClientForm({image, action, postID, comment}: ClientFormProps) {
    const placeHolder = 'What are you thinking?'
    const buttonText = 'Haiku it!'

    return(
        <form className="flex flex-col gap-2 border-b px-4 py-2" action={action}>
         <div className="flex gap-4">
        <ProfileImage src={image} />
        <label>
             <textarea
                 style={{height: 0}}
                 name="body"  
                placeholder={placeHolder}
                className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" />
             <input type="hidden" name="postID" value={postID}/>
            <input type="hidden" name="comment" value={comment}/>
      </label>
    </div>
  <SimpleButton className="self-end">{buttonText}</SimpleButton>
  </form>
    )
}