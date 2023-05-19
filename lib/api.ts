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
  };

  export const getAllHaikus = async(address: string) => {
    return fetcher({
      url: `/api/${address}`,
      method: "GET",
      json: true,
    });
  }
  
