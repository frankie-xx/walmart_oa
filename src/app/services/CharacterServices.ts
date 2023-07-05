"use client";

const API_URL: string = "https://rickandmortyapi.com/api/character/?page=";

const fetchCharacters: any = async (page: number) => {
  try {
    const targetUrl: string = API_URL + page;
    const res: Response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch character information");
    }
    const resData: any = await res.json();
    return resData;
  } catch (error) {
    console.log(error);
  }
};

export { fetchCharacters };
