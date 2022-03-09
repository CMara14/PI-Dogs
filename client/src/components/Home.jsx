import React from "react";

import {  useState, useEffect } from "react";
//useState

import { useDispatch, useSelector } from "react-redux";

// import { Link } from "react-router-dom";

//COMPONENTES
import NavBar from "./NavBar";
import Cards from "./Cards";
import Paginado from "./Paginate";
import Loading from "./Loading";

//ACTIONS
import { sortBy, filterBySource, getTemperaments, filterByTemps, getAllDogs } from "../redux/actions";


//Defino el componente
export default function Home() {

  const dispatch = useDispatch();

  const temps = useSelector((state) => state.temperaments);
  const allDogs = useSelector((state) => state.dogs);

  //PARA EL PAGINADO DEFINO ESTADOS LOCALES PORQUE ES ALGO QUE VA A IR CAMBIANDO:
const [currentPage, setCurrentPage] = useState(1);
//estado local de mi pagina actual y para setear mi pagina actual, seteado en uno porque siempre arranco por la primer pagina

const [dogPerPage, setDogPerPage] = useState(8);
//estado local de cantidad de perros que quiero que se vean por pagina, seteo la cantidad que quiera 

const lastDog = currentPage * dogPerPage
/*la posicion del ultimo perro que me va a aparecer es el resultado de: 
la pagina actual x la cantidad de perros por pagina:
Ej: 1*8 = 8 / 2*8 = 16 */

const firstDog = lastDog - dogPerPage
/* la posicion indice del primer perro nunca va a ser la misma, va a ir cambiando, es el resultado de: 
el ultimo perro - la cantidad de perros por pag
Ej: 8 - 8 = 0 (posicion 0) / 16 - 8 = 8 */

const currentDog = allDogs.slice(firstDog, lastDog)
/* perros que se encuentran en la pagina actual:
me traigo todos los perros en el estado que es un arreglo y voy a tomar una porcion de ese arreglo segun lo que le paso por parametro: Justamente uso el slice porque no me incluye la ultima posicion 
-la posicion del primer perro y la posicion del ultimo
Ej: en este caso me devolveria desde la POSICION DEL ARREGLO 0 - 7 (porque la posicion 8 no la inlcuye) */

const paginate = (pgNumber) => {
    setCurrentPage(pgNumber)
}/*Constante para setear el estado local con el numero de pagina para ayudarme con el renderizado*/

    const [orderDog, setOrderDog] = useState("");// esto es solo un estado local vacío para que me renderize el ordenamiento A-Z
  // const [orden, setOrden] = useState("");// esto es solo un estado local vacío para que me renderize el ordenamiento A-Z
     //
 
  useEffect (() => {//lo mismo que component did mount
    dispatch(getTemperaments())  
    dispatch(getAllDogs()) 
}, [dispatch]);
 

  //defino las funciones para los eventos:
  function handleSort(e) {
   e.preventDefault()
   dispatch(sortBy(e.target.value)); 
   setCurrentPage(1);
   setOrderDog(e.target.value); //seteo el estado para que me haga el render en el estado
   console.log("SOY EL ESTADO LOCAL: ", setOrderDog)
  }
  
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
    <div >
      <NavBar />
      <div >
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
        <div> 
                <Paginado
                dogsPerPage={dogPerPage}
                allDogs= {allDogs.length}
                paginate= {paginate}                    
                />
            </div>
      </div>   
           
             <div >
                <Cards  currentDog= {currentDog}  />
             </div>
            
    </div>
  );
}




/* <Paginado
   dogsPerPage={dogPerPage}//estado que me defini arriba con la cantidad que quiero de perros.

  allDogs= {allDogs.length}//.length porque necesito un caracter numérico, y allDogs contiene todos mis perros 

   paginate= {paginate}//la constante paginate que me defini antes                      
                /> */