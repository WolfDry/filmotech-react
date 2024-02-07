import React from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onChangePage }) => {
  const displayedPages = () => {
    const pages = [];
    const pageToShow = 7;
    const halfPageToShow = Math.floor(pageToShow / 2);

    if (totalPages <= pageToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= halfPageToShow) {
      for (let i = 1; i <= pageToShow; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - halfPageToShow) {
      for (let i = totalPages - pageToShow + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - halfPageToShow; i <= currentPage + halfPageToShow; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <nav className="flex mt-3 w-full items-center justify-between  px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <div
          onClick={() => onChangePage(currentPage - 1)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-200 hover:border-yellow-300 hover:text-yellow-300"
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5" aria-hidden="true" />
          Précédent
        </div>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {displayedPages().map((number) => (
          <div
            onClick={() => onChangePage(number)}
            key={number}
            className={`inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium ${
              number === currentPage
                ? 'text-yellow-200 hover:border-yellow-300 hover:text-yellow-300'
                : 'text-gray-500 hover:border-yellow-300 hover:text-yellow-300'
            }`}
          >
            {number}
          </div>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <div
          onClick={() => onChangePage(currentPage + 1)}
          className="inline-flex cursor-pointer items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-200 hover:border-yellow-300 hover:text-yellow-300"
        >
          Suivant
          <ArrowLongRightIcon className="ml-3 h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
