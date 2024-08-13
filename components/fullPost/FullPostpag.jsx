import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate'; 

const LogViewer = ({ logText }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1); 
  };


  const logLines = logText.split(/(\r?\n|<br\/>)/);
  const totalPages = Math.ceil(logLines.length / pageSize);

  const getLogLinesForPage = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(currentPage * pageSize, logLines.length);
    return logLines.slice(startIndex, endIndex);
  };

  const currentLogLines = getLogLinesForPage();

  return (

    <div className="page-wrapper">

      <div className="log-content">
        {currentLogLines.map((line) => (
          <p key={line} dangerouslySetInnerHTML={{ __html: line }}></p>
        ))}
      </div>
      
      <ReactPaginate
        previousLabel={'previous'} // Customize labels if needed
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={totalPages} // Total number of pages
        marginPagesDisplayed={2} // Number of page links displayed before/after current page
        pageRangeDisplayed={5} // Total page links displayed in the pagination bar
        onPageChange={handlePageClick}
        containerClassName={'pagination-wrapper'} // Apply custom CSS classes
        activeClassName={'active'} // Apply CSS class to active page button
      />
      
    </div>

  );
};

export default LogViewer;
