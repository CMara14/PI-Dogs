import React from 'react'
import {useState} from "react";//

//No me traigo useSelector porque no voy a usar ningun estado de redux
import {useDispatch} from "react-redux";//Voy a despachar una accion 

import { getDogName } from '../redux/actions';//me importo la accion para buscar por query que es lo que necesito para este componente

//[ ] Input de búsqueda para encontrar videojuegos por nombre
export default function SearchBar() {
        // me guardo la ejecucion del useDispatch
const dispatch = useDispatch();

//Estado local para setear el nombre con los valores que ingrese el ususario, por eso lo defino como un string vacio al comienzo 
const [name, setName] = useState("")


//FUNCIONES DE LOS EVENTOS:
//En el input, acumulo la info que me aporta el usuario, para cambiar el estado con lo que reciba del evento
const handleInputChange = (e) => {
e.preventDefault();
setName(e.target.value)//seteo mi estado de name con lo que el usuario ingrese en el input
console.log(name)//para verlo en consola 
}
//En el formulario, cuando el usuario de click al boton: 
const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getDogName(name))//despacho la accion que me cree para obtener el juego por nombre que me pasan por payload y por parametro le paso el estado, que va a contener lo que escribio el usario gracias a la funcion anterior handleInputChange
    setName("")//vuelvo a setear el estado name para que se limpie el input una vez que se envia la info del formulario
  };

/* Si yo quisiera, que se me renderizara cada personaje, cada vez que lo busco tendria que dispachar la funcion donde los busco por nombre "getNameVg(name)" en esa misma funcion handleInputChange. no es esperaria al boton */

// //En el formulario:
// const handleSubmit = (e) => {
//     e.preventDefault();
//     search(e.target[0].value);
//   };

 
  return (
   <div>
       <form onSubmit={handleSubmit}>
        <input
             type="text" 
             placeholder="Find your favorite dog..."
             onChange={(e) => handleInputChange(e)} 
             value={name} 
        />
        <button 
            type="submit"
             onClick={(e) => handleSubmit(e)}
        >
          Search
        </button> 
        </form>                      
   </div>
  )
}


/* ANOTACIONES AL MARGEN
-No funciona sin la etiqueta </form>
-
 */