// components/PaginatedList.jsx
import React, { useState, useMemo, useEffect } from "react";


const PaginatedList = ({
  items,
  itemsPerPageOptions = [10, 20, 50],
  defaultItemsPerPage = 14,
  children
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  const totalPages = useMemo(() =>
    Math.ceil(items.length / itemsPerPage), [items, itemsPerPage]);

  const paginatedItems = useMemo(() =>
    items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ), [items, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return (
    <div>
      <div className="pagination-controls">
        <label htmlFor="items-per-page">Items per page: </label>
        <select id="items-per-page" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {itemsPerPageOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {children(paginatedItems)}

      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default PaginatedList;
