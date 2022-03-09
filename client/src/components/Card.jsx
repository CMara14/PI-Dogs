import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Card.css"


export default function Card ({image, name, temperament, weight_max, weight_min, id}) {
    return (
      <div className="container-dogCard">
        
          <div>
            <img 
              className="card"
              src={image }
              alt={`img of ${name}`}
              width="400px" height="250px"
            />
          </div>
        <div>
          <div>
            <h1>{name}</h1>
          </div>
          <div>
            <span>Temperament: {temperament?.join(' - ') }</span>
          </div>
          <div>
            <span>Weight: </span>
            <p> {weight_min} Kg</p>
            <p>{weight_max} Kg</p>
          </div>
          </div>
        <Link to={`/dogs/${id}`}>About...</Link>
      </div>
    );
}





