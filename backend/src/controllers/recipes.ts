import { RequestHandler } from "express";
import RecipeModel from "../models/recipe";
import createHttpError from "http-errors";
import mongoose from "mongoose";

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
    if (!mongoose.isValidObjectId(recipeId)){
        throw createHttpError(400,"Invalid Recipe Id")
    }
    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe){
        throw createHttpError(404, "Recipe not found")
    }

    res.status(200).json(recipe);
    }
    catch(error){
        next(error)
    }
};

interface CreateRecipeBody {
    title?: string,
    category?: string,
    cuisine?: string,
    total_reviews?: number,
    average_rating?: number,    
};

export const createRecipe: RequestHandler<unknown, unknown, CreateRecipeBody, unknown> = async(req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const cuisine = req.body.cuisine;
    const total_reviews = req.body.total_reviews;
    const average_rating = req.body.average_rating;
    
    try{

        if (!title) {
            throw createHttpError(400, "Recipe must have a title")
        }

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

interface UpdateRecipeParams {
    recipeId: string
};

interface UpdateRecipeBody {
    title?: string,
    category?: string,
    cuisine?: string,
    total_reviews?: number,
    average_rating?: number,   
};

export const updateRecipe: RequestHandler<UpdateRecipeParams, unknown, UpdateRecipeBody, unknown> = async(req, res, next) => {
    const recipeId = req.params.recipeId;
    const new_title = req.body.title;
    const new_category = req.body.category;
    const new_cuisine = req.body.cuisine;
    const new_total_reviews = req.body.total_reviews;
    const new_average_rating = req.body.average_rating;

    try{
        if (!mongoose.isValidObjectId(recipeId)){
            throw createHttpError(400,"Invalid recipe Id")
        };

        if (!new_title) {
            throw createHttpError(400, "Recipe must have a title")
        };

        if (!new_category) {
            throw createHttpError(400, "Recipe must have a title")
        };

        if (!new_cuisine) {
            throw createHttpError(400, "Recipe must have a title")
        };

        const recipe = await RecipeModel.findById(recipeId).exec();
        if (!recipe){
            throw createHttpError(404, "Recipe not found")
        };

        recipe.title = new_title;
        recipe.category = new_category;
        recipe.cuisine = new_cuisine;
        recipe.total_reviews = new_total_reviews;
        recipe.average_rating = new_average_rating;
        
        const updatedRecipe = await recipe.save();

        res.status(200).json(updatedRecipe);
    }
    catch(error){
        next(error);
    }
};

export const deleteRecipe: RequestHandler = async (req, res, next) => {
    const recipeId = req.params.recipeId;

    try {

        if (!mongoose.isValidObjectId(recipeId)) {
            throw createHttpError(400, "Invalid recipe id");
        }

        const recipe = await RecipeModel.findById(recipeId).exec();

        if (!recipe) {
            throw createHttpError(404, "Recipe not found");
        }

        await recipe.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};