function RecipeDetails({ setView, selectedRecipe }) {
  return (
    <div>
      <h1>Recipe Details for Recipe {selectedRecipe}</h1>
      <button onClick={() => setView('home')}>Back to Home</button>
    </div>
  );
}
export default RecipeDetails;
