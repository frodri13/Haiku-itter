import { revalidateTag } from "next/cache";

export const fetcher = async ({ url, method, body, json = true }: any) => {
    let requestBody;
    if (typeof body === "function") {
      requestBody = body();
    } else if (body) {
      requestBody = JSON.stringify(body);
    }
  
    const res = await fetch(url, {
      method,
      body: requestBody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("API error");
    }
  
    if (json) {
      const data = await res.json();
      return data.data;
    }
  };
  
  export const createNewHaiku = async (content: string, address: string, postID?: string) => {
    return fetcher({
      url: `/api/${address}`,
      method: "POST",
      body: { content, postID },
      json: true,
    });
    revalidateTag('posts')
    
    // address == 'content' ? revalidateTag('posts') : revalidateTag('comments')
  };

  export const getAllHaikus = async(address: string) => {
    return fetcher({
      url: `/api/${address}`,
      method: "GET",
      json: true,
    });
  }

  export async function createNewHaiku2(content: string, postID?: string) {
    const res = await fetch("http://localhost:3000/api/content", {
      method: "POST",
      body: JSON.stringify({ content, postID }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag('posts');
  }
