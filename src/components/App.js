import { useState } from 'react';
import Home from './Home';
import RecipeDetails from './RecipeDetails';

function App() {
  const [view, setView] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <div className="App">
      {view === 'home' && (
        <Home setView={setView} setSelectedRecipe={setSelectedRecipe} />
      )}
      {view === 'details' && (
        <RecipeDetails setView={setView} selectedRecipe={selectedRecipe} />
      )}
    </div>
  );
}

export default App;
