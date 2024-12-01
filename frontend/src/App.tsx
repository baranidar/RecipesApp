import React, { useEffect, useState } from 'react';
import { Recipe as RecipeModel } from './models/recipe';
import Recipe from './components/recipes';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./styles/RecipesPage.module.css";
import * as RecipesApi from "./network/recipes_api";

function App() {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const recipes = await RecipesApi.fetchNotes();
        setRecipes(recipes);
      } catch (error) {
        console.log(error);
        alert(error);
      }      
    }
    loadRecipes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className = "g-4">
      {recipes.map(recipe => (
        <Col key={recipe._id}>
        <Recipe recipe={recipe} className={styles.recipe}/>
        </Col>
      ))}
      </Row>
    </Container>
  );
}

export default App;
