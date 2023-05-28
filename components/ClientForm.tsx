'use client'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SimpleButton } from "./Buttons";
import { ProfileImage } from "./ProfileImageProps";

type ClientFormProps ={
    image: string,
    comment: string,
    postID: string | undefined,
    action: (formData: FormData) => {}
}

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
    if(textArea == null) return;
    textArea.style.height = "0";
    textArea.style.height = `${textArea.scrollHeight}px`
}

function isItHaiku(str: string) {
    if(str != "string") {
        alert("This is not a Haiku");
        return false;
    } else {
        return true;
    }
}

export default function ClientForm({image, action, postID, comment}: ClientFormProps) {
    const placeHolder = 'What are you thinking?'
    const buttonText = 'Haiku it!'
    const [text, setText] = useState("");
    // isItHaiku(text)
    const textAreaRef = useRef<HTMLTextAreaElement>();
    const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
        updateTextAreaSize(textArea);
        textAreaRef.current = textArea
    }, [])
    useLayoutEffect(()=> {
        updateTextAreaSize(textAreaRef.current);
    }, [text])
   
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        isItHaiku(text)
        if(!isItHaiku(text)) {
            e.preventDefault()
        }
    }
    return(
        <form className="flex flex-col gap-2 border-b px-4 py-2" action={action}
        onSubmit={handleSubmit}>
         <div className="flex gap-4">
        <ProfileImage src={image} />
        <label>
             <textarea
                ref={inputRef}
                style={{height: 0}}
                value={text}
                name="body"  
                onChange={(e)=> setText(e.target.value)}
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