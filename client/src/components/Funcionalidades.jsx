import React from 'react'
import { useSelector } from "react-redux";


export default function Funcionalidades({handleSort, handleSource, handleTemp}) {
  const temps = useSelector((state) => state.temperaments);
  
  return (
    <div>
       <div className="containerSelect">

            <select
              defaultValue={""}
              onChange={(e) => {
                handleSort(e);
              }}
              className="homeSelect"
            >
              <option value={""}>
                Order by
              </option>
              <optgroup label="Name">
                <option value="ASC">From A to Z</option>
                <option value="DES">From Z to A</option>
              </optgroup>
              <optgroup label="Weight">
                <option value="max">Big</option>
                <option value="min">Small</option>
              </optgroup>
            </select>




            <select
              onChange={(e) => {
                handleTemp(e);
              }}
              className="homeSelect"
            >
              <option value="Temperaments">Temperaments</option>
              {temps?.map((temp) => (
                <option key={temp} value={temp}>
                  {" "}
                  {temp}{" "}
                </option>
              ))}
            </select>

              <select
                onChange={(e) => {
                  handleSource(e);
                }}
                className="homeSelect"
              >
                <option value="Source">Source</option>
                <option value="ALL">API Dogs</option>
                <option value="DB">Your Dogs</option>
              </select>
  
         </div>
    </div>
  )
}
