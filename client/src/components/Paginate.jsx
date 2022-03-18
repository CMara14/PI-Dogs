import React from "react";
import "../styles/Paginate.css";

export default function Paginado({ dogsPerPage, allDogs, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container paginado">
      <div className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div className="number" key={number}>
              <button className="numberButton" onClick={() => paginate(number)}>
                {" "}
                {number}{" "}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
