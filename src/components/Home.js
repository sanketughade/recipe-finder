import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import './../styles/Home.css';

function Home({ setView, setSelectedRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);

  useEffect(function () {
    async function fetchRecipes() {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/search.php?s='
        );
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.error('Error fetching the recipes:', error);
      }
    }
    fetchRecipes();
  }, []);

  // Get current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleRecipeClick(recipeId) {
    setSelectedRecipe(recipeId);
    setView('details');
  }

  return (
    <div className="home">
      <h1>Welcome to Recipe Finder</h1>
      <div className="recipe-list">
        {currentRecipes &&
          currentRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onClick={handleRecipeClick}
            />
          ))}
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Home;
