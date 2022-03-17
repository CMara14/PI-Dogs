import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Card.css"


export default function Card ({image, name, temperament, weight_max, weight_min, id}) {
    return (
      <div className='container'>          
          <div className="dogcard">

            <div className='card'>

            <h3 className='titleName'>{name}</h3>           
          <Link to={`/dogs/${id}`}>
            <img 
              className="cardImage"
              src={image}
              alt={`img of ${name}`}
              // width="400px" height="250px"
              />           
            </Link>
            

         
              <p className='tempCard'>
                <h5 className='subtitle'>Temperament</h5>
                {/* <strong>:</strong> */}            
            <br />
              {temperament
              ? temperament.join(' - ')
              : "No temperaments" }</p>          
            <p className='weightCard'> 
            <h5 className='subtitle'>Weight</h5>                  
              <br />
              {weight_min} Kg - {weight_max} Kg</p>
              </div>
          </div>  
      </div>
    );
}




/* <div className="dogAbout">
        About...
    </div> */