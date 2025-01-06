import React, { useEffect, useState } from 'react';
import { Recipe as RecipeModel } from './models/recipe';
import Recipe from './components/recipes';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./styles/RecipesPage.module.css";
import * as RecipesApi from "./network/recipes_api";
import AddRecipeDialog from './components/AddRecipeDialog';

function App() {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);

  const [showAddRecipeDialog, setShowAddRecipeDialog] = useState(true);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const recipes = await RecipesApi.fetchRecipes();
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
      {showAddRecipeDialog &&
        <AddRecipeDialog />
      }

    </Container>
  );
}

export default App;
