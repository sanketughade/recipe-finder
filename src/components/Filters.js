import './../styles/Filters.css';

function Filters({ categories, ingredients, areas, handleFilterChange }) {
  return (
    <div className="filters">
      <select
        name="category"
        onChange={handleFilterChange}
        className="filter-dropdown"
      >
        <option value="">All Categories</option>
        {categories &&
          categories.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
      </select>
      <select
        name="ingredient"
        onChange={handleFilterChange}
        className="filter-dropdown"
      >
        <option value="">All Ingredients</option>
        {ingredients &&
          ingredients.map((ingredient) => (
            <option
              key={ingredient.strIngredient}
              value={ingredient.strIngredient}
            >
              {ingredient.strIngredient}
            </option>
          ))}
      </select>
      <select
        name="area"
        onChange={handleFilterChange}
        className="filter-dropdown"
      >
        <option value="">All Areas</option>
        {areas &&
          areas.map((area) => (
            <option key={area.strArea} value={area.strArea}>
              {area.strArea} {getCountryFlag(area.strArea)}
            </option>
          ))}
      </select>
    </div>
  );
}

// Helper function to get the country flag emoji based on the area name
function getCountryFlag(areaName) {
  // Map area names to country codes
  const areaToCountry = {
    American: '🇺🇸',
    British: '🇬🇧',
    Canadian: '🇨🇦',
    Chinese: '🇨🇳',
    Croatian: '🇭🇷',
    Dutch: '🇳🇱',
    Egyptian: '🇪🇬',
    Filipino: '🇵🇭',
    French: '🇫🇷',
    Greek: '🇬🇷',
    Indian: '🇮🇳',
    Irish: '🇮🇪',
    Italian: '🇮🇹',
    Jamaican: '🇯🇲',
    Japanese: '🇯🇵',
    Kenyan: '🇰🇪',
    Malaysian: '🇲🇾',
    Mexican: '🇲🇽',
    Moroccan: '🇲🇦',
    Polish: '🇵🇱',
    Portuguese: '🇵🇹',
    Russian: '🇷🇺',
    Spanish: '🇪🇸',
    Thai: '🇹🇭',
    Tunisian: '🇹🇳',
    Turkish: '🇹🇷',
    Unknown: '',
    Vietnamese: '🇻🇳',
  };

  // Return flag emoji if area name exists in the mapping, otherwise return empty string
  return areaToCountry[areaName] || '';
}

export default Filters;
