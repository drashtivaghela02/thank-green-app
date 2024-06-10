import { useCallback, useState } from 'react';

const usePagination = ({ fetchFunction, totalPages, initialPage }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handleEndReached = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchFunction(nextPage);
        return nextPage;
      });
    }
  }, [currentPage, fetchFunction, totalPages]);

  return { currentPage, handleEndReached };
};

export default usePagination;
