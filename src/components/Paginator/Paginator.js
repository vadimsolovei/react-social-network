import React, { useState } from 'react';
import styles from './Paginator.module.css';
import classnames from 'classnames';

let Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChange,
  portionSize = 10,
}) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;
  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}

      {pages
        .filter(
          (el) => el >= leftPortionPageNumber && el <= rightPortionPageNumber
        )
        .map((el) => {
          return (
            <span
              className={classnames(
                {
                  [styles.selectedPage]: currentPage === el,
                },
                styles.pageNumber
              )}
              key={el}
              onClick={(e) => {
                onPageChange(el);
              }}
            >
              {el}
            </span>
          );
        })}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
