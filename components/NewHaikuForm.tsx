'use client'
import { prisma } from "@/lib/prisma";
import Comments from "./Comments";
import { ChangeEvent, FormEvent, useState } from "react";

export default async function NewHaikuForm() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();

    const res = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({content}),  
    }) 
    const data = await res.json();

    console.log(data)
  }
  return(
  <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-b px-4 py-2">
    <div className="flex gap-4">
      <label>
        <textarea
        value={content} onChange={(e) => setContent(e.target.value)}
        className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none" />
      </label>
    </div>
    <button>this button</button>
  </form>)
}