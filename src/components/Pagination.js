import './../styles/Pagination.css';

function Pagination({
  recipesPerPage,
  totalRecipes,
  paginate,
  currentPage,
  handlePerPageChange,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <nav className="pagination-nav">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? 'active' : ''}`}
            >
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="records-per-page">
        <label htmlFor="perPage">Records per Page: </label>
        <select
          id="perPage"
          value={recipesPerPage}
          onChange={handlePerPageChange}
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="18">18</option>
          <option value="24">24</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
