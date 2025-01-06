import "dotenv/config";
import recipesRoutes from "./routes/recipes"
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev")); // log request and response details in console

app.use(express.json()); // middleware to accept json body

app.use("/api/recipes", recipesRoutes);  // middleware to accept a route

app.use((req, res, next) => {  // middleware to routes not found. 
    next(createHttpError(404, "Endpoint not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request, res:Response, next:NextFunction) => { // middleware to handle errors
    console.error(error);
    let errorMessage = "An unknown error has happened";
    let statusCode = 500;
    if (isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }    
    res.status(statusCode).json({error:errorMessage})
})

export default app;