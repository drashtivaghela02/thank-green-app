import { useCallback, useState } from 'react';

const usePagination = ({ fetchFunction, totalPages, initialPage }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleEndReached = useCallback(() => {
    setCurrentPage((prevPage) => {
      if (prevPage < totalPages) {
        const nextPage = prevPage + 1;
        fetchFunction(nextPage);
        return nextPage;
      }
      return prevPage; // No change if the end is reached
    });
  }, [fetchFunction, totalPages]);

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return { currentPage, handleEndReached, resetPagination };
};

export default usePagination;
