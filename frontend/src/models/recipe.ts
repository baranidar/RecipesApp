export interface Recipe {
    _id: string,
    title: string,
    category: string,
    cuisine: string,
    total_reviews: number,
    average_rating: number,     
    createdAt: string,
    updatedAt: string
}