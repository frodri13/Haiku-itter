'use client'
import { FormEvent, useLayoutEffect, useState, useRef, useCallback } from "react";
import { createNewHaiku } from "@/lib/api";
import { SimpleButton } from "./Buttons";
import { ProfileImage } from "./ProfileImageProps";
import { useSession } from "next-auth/react";
import { updateTextAreaSize } from "@/lib/functionHelpers";

type NewHaikuFormProps = {
  buttonText: string,
  placeHolder: string,
}

export default  function NewHaikuForm({buttonText, placeHolder}: NewHaikuFormProps) {
  const {data: session, status } = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, [])

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  if(status !== 'authenticated') return;

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    await createNewHaiku(inputValue)
  }
  return(
  <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
    <div className="flex gap-4">
      <ProfileImage src={session?.user?.image} />
      <label>
        <textarea
        ref={inputRef}
        style={{height: 0}}
        value={inputValue}
        placeholder={placeHolder}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" />
      </label>
    </div>
  <SimpleButton className="self-end">{buttonText}</SimpleButton>
  </form>)
}