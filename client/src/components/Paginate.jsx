import React from "react";
import "../styles/Paginate.css"

//componente que solo me renderiza los numeros en la pantalla
export default function Paginado ({dogsPerPage, allDogs, paginate}) {//me traigo las constantes de home
const pageNumbers = []//me creo un arreglo vacio, por el momento no tengo paginas

/*Recorro un arreglo donde voy a tomar el numero redondeado que resulta de:
dividir todos los dogs / el numero de dogs por pagina que YO QUIERO 
(Ej: 264 / 8 = )
Eso me da como resultado un arreglo de numeros que con el metodo  Math.ceil redondeo todos los personajes, por los que quiero por pagina */
for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);//pusheo lo que se genera en mi arreglo de numeros de pagina resultando un arreglo de numeros
  }

//   const paginate = (pgNumber) => {//esta constante va setear la pagina con el n° que yo le estoy dando click
//     setCurrentPage(pgNumber)//cambio el estado local de la pagina con el n° de esa pagina
// }

/*ESTE COMPONENTE RENDERIZA LOS NUMEROS, por lo tanto lo envuelvo en un nav:
1) En primer lugar, pregunto si mi arreglo de paginas tiene algo, si tiene algo mapeo y por cada NUMERO 
2)le paso un boton para que cuando le haga click le voy a pasar mi paginado (la constante que declare en home) a la cual le paso el numero de mi pagina 
Luego solo renderizo ese numero es decir por separado.
 */
// return (
//     <nav >
//         <ul className="paginado"  >                              
//             { pageNumbers && pageNumbers
//             .map((number) => (
//             <li className="number" key={number} > 
//             <button onClick={() => paginate(number)} >  {number}</button>
//             </li>
//              ))}                   
//         </ul>
//     </nav>
//     );
// };

return (
   
        <div className="paginado"  >                              
            { pageNumbers && pageNumbers
            .map((number) => (
                
            //  <div className="number" key={number} > 
            <button className="numberButton" onClick={() => paginate(number)} >  {number}  </button>
             // </div> 
             ))}                   
        </div>
    
    );
};

// {/* /*
//   {



