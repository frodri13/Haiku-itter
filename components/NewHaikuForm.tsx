'use client'
import { prisma } from "@/lib/prisma";
import Comments from "./Comments";
import { ChangeEvent, FormEvent, useState } from "react";
import { createNewHaiku } from "@/lib/api";
import { SimpleButton } from "./Buttons";

export default  function NewHaikuForm() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    await createNewHaiku(content)
    console.log(content)
  }
  return(
  <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
    <div className="flex gap-4">
      {/* profile image */}
      <label>
        <textarea
        placeholder="What are you thinking?"
        value={content} onChange={(e) => setContent(e.target.value)}
        className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" />
      </label>
    </div>
  <SimpleButton className="self-end">Haiku That Post!</SimpleButton>
  </form>)
}