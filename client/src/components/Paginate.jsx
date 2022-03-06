import React from "react";

export default function Paginado ({dogsPerPage, allDogs, paginate}) {//me traigo estas propiedades del otro componente home
const pageNumbers = []//me creo un arreglo vacio, por el momento no tengo paginas


/*Recorro un arreglo donde voy a tomar el numero redondo que resulta de:
dividir todos los vg / el numero de vg por pagina que YO QUIERO 
Eso me da como resultado un arreglo de numeros que con el metodo  Math.ceil redondeo todos los personajes por los que quiero por pagina */
for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);//pusheo lo que se genera en mi arreglo de numeros de pagina resultando un arreglo de numeros
  }

//   const paginate = (pgNumber) => {//esta constante va setear la pagina con el n° que yo le estoy dando click
//     setCurrentPage(pgNumber)//cambio el estado local de la pagina con el n° de esa pagina
// }

/*ESTE COMPONENTE RENDERIZA LOS NUMEROS, por lo tanto lo envuelvo en un nav:
1) En primer lugar, pregunto si mi arreglo tiene algo, si tiene algo mapeo y por cada NUMERO 
2)le paso un boton para que cuando le haga click le voy a pasar mi paginado (la constante que declare en el componente home) a la cual le paso el numero de mi pagina 
Luego solo renderizo ese numero es decir por separado.
 */
return (
    <nav>
        <div>     
                             
            { pageNumbers && pageNumbers.map((number) => (//pregunto si existe ese arreglo, entonces lo mapeo y devuelvo por acada uno de esos numeros que me duelva el paginao
            <span  key={number} > 
            <button onClick={() => paginate(number)} >  {number}  </button>
            </span>
             ))}                   
        </div>
    </nav>
    );
};

// {/* /*
//   {

//   return (
//     <nav>
//       <div>
//         {p.map((num) => (
//           <button onClick={() => paginate(num)}>{num}</button>
//         ))}
//       </div>
//     </nav>
//   );
// }
//  */}


