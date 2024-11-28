import "dotenv/config";
import recipesRoutes from "./routes/recipes"
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json()); // middleware to accept json body

app.use("/api/recipes", recipesRoutes);  // middleware to accept a route

app.use((req, res, next) => {  // middleware to routes not found. To-do send 404 insstead of 500
    next(Error("Route not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request, res:Response, next:NextFunction) => { // middleware to handle errorss
    console.error(error);
    let errorMessage = "An unknown error has happened";
    if (error instanceof Error) errorMessage  = error.message;
    res.status(500).json({error:errorMessage})
})

export default app;