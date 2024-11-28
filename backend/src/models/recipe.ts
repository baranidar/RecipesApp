import { InferSchemaType, model, Schema } from "mongoose";

const recipeSchema = new Schema({
    title: { type: String, required: true},
    category: {type: String, required: true},
    cuisine: {type: String, required: true},
    total_reviews: {type: Number},
    average_rating: {type:Number },
}, {timestamps: true});

type Recipe = InferSchemaType<typeof recipeSchema>;

export default model<Recipe>("Recipe", recipeSchema);