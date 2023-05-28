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
    const lines = countLines(str);
    
    if(lines != 3) {
        alert(`This is not a Lune Haiku.\n
        It only has ${lines} lines when it should have 3!`);
        return false;
    } else{
        const [line1, line2, line3] = str.split("\n")

        if(countWords(line1) == 3 && countWords(line2) == 5 && countWords(line3) == 3) {
            
            return true;
        } else {
            alert(`This is not a Lune Haiku.\n
            The first line should have 3 words, while yours has ${countWords(line1)}\n
            The second line should have 5 words, while yours has ${countWords(line2)}\n
            The third line should have 3 words, while yours has ${countWords(line3)}.`)
            return false
        }  
    }
}

function countLines(text: string): number {
    const lines = text.split("\n");
    const count = lines.length;
    return count;
}

function countWords(text: string): number {
    const words = text.split(" ");
    const count = words.length
    return count;
}
export default function ClientForm({image, action, postID, comment}: ClientFormProps) {
    const placeHolder = 'Haiku your thoughts away...'
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

        if(!isItHaiku(text)) {
            e.preventDefault()
        } else {
            setText("")
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