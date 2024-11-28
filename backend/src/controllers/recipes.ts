import { RequestHandler } from "express";
import RecipeModel from "../models/recipe";

export const getRecipes: RequestHandler = async(req, res, next) => {
    try{
    // throw Error("Bazinga");
    const recipes = await RecipeModel.find().exec();
    res.status(200).json(recipes);
    }
    catch(error){
        next(error)
    }
};

export const getRecipe: RequestHandler = async(req, res, next) => {
    const recipeId =  req.params.recipeId;
    try{
    const recipe = await RecipeModel.findById(recipeId).exec();
    res.status(200).json(recipe);
    }
    catch(error){
        next(error)
    }
};

export const createRecipes: RequestHandler = async(req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const cuisine = req.body.cuisine;
    const total_reviews = req.body.total_reviews;
    const average_rating = req.body.average_rating;
    
    try{
        const newRecipe = await RecipeModel.create({
            title: title,
            category: category,
            cuisine: cuisine,
            total_reviews: total_reviews,
            average_rating: average_rating, 

        });

        res.status(201).json(newRecipe);
    }
    catch(error){
        next(error)
    }
};