import React from 'react';


const Paging = ({ pageCount, selectedPage, onChangePage }) => {
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(
      <li
        key={`page-${i}`}
        onClick={onChangePage.bind(this, i)}
        className={selectedPage === i ? 'paging__item paging__item-selected' : 'paging__item'}
      >
        {i}
      </li>
    );
  }

  return (
    <ul className="paging">
      {pages}
    </ul>
  );
};

Paging.propTypes = {
  pageCount: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  selectedPage: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  onChangePage: React.PropTypes.func,
};

Paging.defaultProps = {
    selectedPage: 1,
    onChangePage: () => {},
}

export default Paging;
