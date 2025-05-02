import { useMemo } from "react";

const usePagination = (data = [], currentPage = 1, itemsPerPage = 10) => {
    
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    paginatedData,
    totalPages,
  };
};

export default usePagination;
