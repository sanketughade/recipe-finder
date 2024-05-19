import './../styles/RecipeCard.css';

function RecipeCard({ recipe, onClick }) {
  return (
    <div className="recipe-card" onClick={() => onClick(recipe.idMeal)}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-card-image"
      />
      <div className="recipe-card-content">
        <h3>{recipe.strMeal}</h3>
      </div>
    </div>
  );
}

export default RecipeCard;
