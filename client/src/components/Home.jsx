import React from "react";

import {  useState, useEffect } from "react";
//useState

import { useDispatch, useSelector } from "react-redux";

// import { Link } from "react-router-dom";

//COMPONENTES
import NavBar from "./NavBar";
import Cards from "./Cards";
import Paginado from "./Paginate";

//ACTIONS
import { sortBy, filterBySource, getTemperaments, filterByTemps, getAllDogs } from "../redux/actions";


//Defino el componente
export default function Home() {

  const dispatch = useDispatch();

  const temps = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.dogs);

  //PARA EL PAGINADO:
const [currentPage, setCurrentPage] = useState(1);
const [dogPerPage, setDogPerPage] = useState(8);
const lastDog = currentPage * dogPerPage
const firstDog = lastDog - dogPerPage
const currentDog = allDogs.slice(firstDog, lastDog)

const paginate = (pgNumber) => {
    setCurrentPage(pgNumber)
}



    const [orderDog, setOrderDog] = useState("");// esto es solo un estado local vacío para que me renderize el ordenamiento A-Z
  // const [orden, setOrden] = useState("");// esto es solo un estado local vacío para que me renderize el ordenamiento A-Z
     //
 
  useEffect (() => {//lo mismo que component did mount
    dispatch(getTemperaments())   
}, [dispatch]);
 

  //defino las funciones para los eventos:
  function handleSort(e) {
   e.preventDefault()
   dispatch(sortBy(e.target.value)); 
   setOrderDog(e.target.value); //seteo el estado para que me haga el render en el estado
   console.log("SOY EL ESTADO LOCAL: ", setOrderDog)
  }
  
//   function handleWeight(e) {
//     e.preventDefault();
//     dispatch(sortByweight(e.target.value));
//   setOrderDog((e.target.value))
// }

  function handleSource(e) {
    e.preventDefault();
    dispatch(filterBySource(e.target.value));

    // if (e.target.value === "Source"){
    //   dispatch(getAllDogs())
    // } else {
    // }
  }

  function handleTemp(e){
    e.preventDefault();
    // if (e.target.value === "Temperaments"){
    //   dispatch(getTemperaments())
    // } else {
    dispatch(filterByTemps(e.target.value));
  // }
}

  return (
    <div>
      <NavBar />
      <div>
        <select  value="Order By" onChange={(e) => {handleSort(e)}} >
          <option>Order by</option>
          <optgroup label="Name">
          <option value="ASC">From A to Z</option>
          <option value="DES">From Z to A</option>
          </optgroup>
          <optgroup label="Weight" >
          <option value="max">Big</option>
          <option value="min">Small</option> 
          </optgroup>
        </select>

        <select onChange={(e) => {handleSource(e);}}>
          <option value="Source">Source</option>
          <option value="ALL">All Dogs</option>
          <option value="DB">Your Dogs</option>
        </select>

        <select onChange={(e) => {handleTemp(e);}} >
          <option value="Temperaments">Temperaments</option>
          {temps?.map((temp) => (
             <option key={temp} value={temp}> {temp} </option>
          ))}
        </select>
      </div>
      <Cards />
    </div>
  );
}


