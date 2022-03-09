import {
  GET_ALL_DOGS,
  GET_DOG_NAME,
  POST_DOG,
  GET_TEMPERAMENTS,
  GET_DOG_DETAIL,
  SORT_BY,
  // SORT_BY_WEIGHT,
  FILTER_BY_SOURCE,
  FILTER_BY_TEMPS,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [], //estado que siempre va a tener todos los vg para los filtros. Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
  dogDetail: [],
  temperaments: [],
  // allDogs2: [],
  // orderDogs:, 
  // orderWeights:
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS: 
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload, //RESPUESTO
        allDogs2: action.payload
      };
    case GET_DOG_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_DOG_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case POST_DOG:
      return {
        ...state,                
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_SOURCE:
      let dogSource = state.allDogs;
      let source 
      // action.payload === "DB"
          // ? dogSource.filter((d) => d.createdAt)
          // : dogSource.filter((d) => !d.createdAt);
          // console.log(source)
        if (action.payload === "ALL") {
          source = dogSource.filter((d) => typeof(d.id) === "number")
        } else if (action.payload === "DB") {
            source = dogSource.filter((d) => d.id.length > 10)
          } else {
            source = state.allDogs
          }
      return {
        ...state,
        dogs: source, 
        //aDogs: source     
      };
      case FILTER_BY_TEMPS :        
       const allDogs = state.allDogs;//estado dogs, no repuesto 
       const filteredDogs = 
       allDogs.filter((el) =>
       el.temperament?.includes(action.payload)       
       );
       return {
           ...state,
           dogs: filteredDogs,                 
       }



      //  case FILTER_BY_TEMPERAMENT:
      //   let aux = []
      //     if(action.payload) {
      //     aux = state.dogs.filter(e => {
      //     if(e.temperament === undefined) {
      //     return e.temperament }
      //     else { return e.temperament.includes(action.payload)
      //     }})
      //     } else {
      //     aux=[...state.dogs]
      //     }
  
      //     return {
      //     ...state,
      //     allDogs: aux
      //   };




      // case FILTER_BY_SOURCE:
      //   let getVg = state.videogames;
      //   let filtrado = []

      //   switch(action.payload) {
            
      //       case 'api': filtrado = getVg.filter(el => typeof (el.id) === 'number'); break;
      //       case 'created': filtrado = getVg.filter(el => isNaN(el.id)); break;
      //       default: filtrado = getVg; break;
      //   }
      //   return {
      //       ...state,
      //       allVideogames: filtrado
      //   };




      // if (action.payload === "ALL"){
      //   source = Number(id) ===
      // }


      // if (action.payload === "ALL") {
      //   source = dogSource.filter((d) => d.id.length < 5)
      // } else if (action.payload === "DB") {
      //     source = dogSource.filter((d) => d.id.length > 10)
      //   } else {
      //     source = dogSource
      //   }

// if (action.payload === "DB") {
//   dogSource = dogSource.filter((d) => d.createdAt)
  
//   //d.id.includes("-"))
//   //createdAt)
// } 
// if ( action.payload === "ALL" ){
//   dogSource = dogSource.filter((d) => !d.createdAt);
// }
    case SORT_BY:
  let  orderDogs 
    //pregunto si el action.payload === "ASC"
  if (action.payload === "ASC") {
    //si es asi le digo que vaya a mi estado allDogs que es el que se esta renderizando
    orderDogs = state.dogs.sort(function (d1, d2) {//d1 y d1 son nombres que va comparando uno al lado del otro
      //Si "a" debe ir ordenado antes que "b", entonces devolvemos un número menor que 0. (menor a mayor, A-Z)
      if (d1.name.toLowerCase() < d2.name.toLowerCase()) {return -1; }
    //Si "a" debe ir ordenado después que "b", entonces devolvemos un número mayor que 0 (que seria una posicion b, porque seria 1 que es la segunda posicion en un arreglo). (mayor a menor, Z-A)
    if (d1.name.toLowerCase() > d2.name.toLowerCase()) { return 1; }
                  return 0;//si los elementos son iguales devuelvo 0
     }) 
  } else if (action.payload === "DES"){
    orderDogs = state.dogs.sort(function (d1, d2) {
   if (d1.name.toLowerCase() > d2.name.toLowerCase()) { return -1;}
   if (d1.name.toLowerCase() < d2.name.toLowerCase()) { return 1; }
       return 0;
    });
  } else if (action.payload === "min")  {
    orderDogs = state.allDogs.sort(function (d1, d2) {
//numeros.sort(function(a, b){return a - b}); // --> 3, 12, 23

return d1.weight_min - d2.weight_min
//if (d2.weight_min - d1.weight_min) { return 1; }
//numeros.sort(function(a, b){return b - a}); 
}) 
} else if (action.payload === "max") {
  orderDogs = state.allDogs.sort(function (d1, d2) {//desc
   return d2.weight_max - d1.weight_max
 });
} else {
  orderDogs = state.allDogs
}
return {
  ...state,
  dogs: orderDogs,
};
   default:
   return state;
  }
}

export default rootReducer;
