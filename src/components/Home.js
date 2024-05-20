import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import Pagination from './Pagination';
import Search from './Search';
import Filters from './Filters';
import './../styles/Home.css';

function Home({ setView, setSelectedRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(6);
  const [filter, setFilter] = useState({
    category: '',
    ingredient: '',
    area: '',
  });

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

    async function fetchCategories() {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        );
        const data = await response.json();
        setCategories(data.meals);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    async function fetchIngredients() {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
        );
        const data = await response.json();
        setIngredients(data.meals);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }

    async function fetchAreas() {
      try {
        const response = await fetch(
          'https://www.themealdb.com/api/json/v1/1/list.php?a=list'
        );
        const data = await response.json();
        setAreas(data.meals);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    }

    fetchRecipes();
    fetchCategories();
    fetchIngredients();
    fetchAreas();
  }, []);

  // Get current recipes
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Change page
  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  // Update records per page
  function handlePerPageChange(e) {
    setRecipesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing records per page
  }

  async function handleSearch() {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      const data = await response.json();
      setRecipes(data.meals);
    } catch (error) {
      console.error('Error fetching the recipes', error);
    }
  }

  async function handleFilterChange(e) {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));

    // Construct the URL based on the filter state
    let baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
    const { category, ingredient, area } = { ...filter, [name]: value };
    let url = baseUrl;

    if (category) {
      url += `c=${category}&`;
    }
    if (ingredient) {
      url += `i=${ingredient}&`;
    }
    if (area) {
      url += `a=${area}&`;
    }

    // Remove the trainling '&' or '?' from the URL
    url = url.slice(0, -1);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching the recipes:', error);
    }
  }

  function handleRecipeClick(recipeId) {
    setSelectedRecipe(recipeId);
    setView('details');
  }

  return (
    <div className="home">
      <h1>Welcome to Recipe Finder</h1>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <Filters
        categories={categories}
        ingredients={ingredients}
        areas={areas}
        handleFilterChange={handleFilterChange}
      />
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
        handlePerPageChange={handlePerPageChange}
      />
    </div>
  );
}

export default Home;
