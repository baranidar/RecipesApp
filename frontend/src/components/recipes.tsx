import React from "react";
import styles from "../styles/Recipe.module.css";
import { Card } from "react-bootstrap"
import { Recipe as RecipeModel } from "../models/recipe"
import { formatDate } from "../utils/formatDate";

interface RecipeProps {
    recipe: RecipeModel,
    className?: string,
}

const Recipe = ({recipe, className}: RecipeProps) => {
    const {
        title,
        category,
        cuisine,
        total_reviews,
        average_rating,     
        createdAt,
        updatedAt,
    } = recipe;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }      

    return (
        <Card className={`${styles.recipeCard} ${className}`}> 
            <Card.Body className={styles.cardBody}>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text className={styles.recipeText}>
                    Category: <b>{category} </b> <br /> 
                    Cuisine: <b>{cuisine} </b> <br />
                    Total Reviews: <b>{total_reviews} </b> <br />
                    Average Rating:<b> {average_rating} </b> <br />
                </Card.Text>
                <Card.Footer className="text-muted">
                    Last Created/Updated At: <b>{createdUpdatedText} </b> <br />
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default Recipe