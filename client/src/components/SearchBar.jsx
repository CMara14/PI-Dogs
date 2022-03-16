import React from 'react'
import {useState} from "react";//

//No me traigo useSelector porque no voy a usar ningun estado de redux
import {useDispatch} from "react-redux";//Voy a despachar una accion 

import { getDogName } from '../redux/actions';//me importo la accion para buscar por query que es lo que necesito para este componente
import "../styles/SearchBar.css"
import icon from "../assets/huellasinfondo.png" 


export default function SearchBar() {      
const dispatch = useDispatch();
const [name, setName] = useState("")

//FUNCIONES DE LOS EVENTOS:
//En el input, acumulo la info que me aporta el usuario, para cambiar el estado con lo que reciba del evento
const handleInputChange = (e) => {
e.preventDefault();
setName(e.target.value)//seteo mi estado de name con lo que el usuario ingrese en el input
console.log(name)
}

const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 1) {
      dispatch(getDogName(name))//despacho la accion que me cree para obtener el juego por nombre que me pasan por payload y por parametro le paso el estado, que va a contener lo que escribio el usario gracias a la funcion anterior handleInputChange
      setName("")//vuelvo a setear el estado name para que se limpie el input una vez que se envia la info del formulario
    } else {
      alert("Please enter a valid name")
    }
  };

/* Si yo quisiera, que se me renderizara cada personaje, cada vez que lo busco tendria que dispachar la funcion donde los busco por nombre "getNameVg(name)" en esa misma funcion handleInputChange. no es esperaria al boton */

// //En el formulario:
// const handleSubmit = (e) => {
//     e.preventDefault();
//     search(e.target[0].value);
//   };
 
  return (
   <div className='searchBar'>
       <form onSubmit={(e) => handleSubmit (e)} className="searchBox">
        <input
            className='inputSearch'
             type="text" 
             placeholder="Find your favorite dog..."
             onChange={(e) => handleInputChange(e)} 
             value={name} 
        />
        <button 
            className='searchButton'
            type="submit"            
        >         
        <img className='iconSearch' src={icon} alt="" />   
        </button> 
        </form>                      
   </div>
  )
}

