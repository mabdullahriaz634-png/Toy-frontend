function Pagination({ currentPage, totalPages, filters, setFilters }) {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => setFilters({ ...filters, page: index + 1 })}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
