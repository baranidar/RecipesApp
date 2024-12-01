import { Recipe } from "../models/recipe";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchNotes(): Promise<Recipe[]> {
    const response = await fetchData("/api/recipes", { method: "GET" });
   return response.json();
}

export interface RecipeInput {
    title: string,
    category: string,
    cuisine: string,
    total_reviews: number,
    average_rating: number,     
}

export async function createNote(note: RecipeInput): Promise<Recipe> {
    const response = await fetchData("/api/recipe", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}