import './../styles/Search.css';

function Search({ search, setSearch, handleSearch }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
}

export default Search;
