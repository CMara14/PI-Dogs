import {
  GET_ALL_DOGS,
  GET_DOG_NAME,
  POST_DOG,
  GET_TEMPERAMENTS,
  GET_DOG_DETAIL,
  SORT_BY,
  FILTER_BY_SOURCE,
  FILTER_BY_TEMPS,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [], //estado que siempre va a tener todos los vg para los filtros. Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
  dogDetail: [],
  temperaments: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS: 
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
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
      };
      case FILTER_BY_TEMPS :   
       const allDogs = state.allDogs;
       let filteredDogs
       if (action.payload === "Temperaments") {
         filteredDogs = allDogs
       } else {
         filteredDogs = 
        allDogs.filter((d) =>
        d.temperament?.includes(action.payload)       
        );
       } 
       return {
           ...state,
           dogs: filteredDogs,                 
       }


    case SORT_BY:
  let  orderDogs 
  if (action.payload === "ASC") {
      orderDogs = state.dogs.sort(function (d1, d2) {
      if (d1.name.toLowerCase() < d2.name.toLowerCase()) {return -1; }
       if (d1.name.toLowerCase() > d2.name.toLowerCase()) { return 1; }
                  return 0;
     }) 
  } else if (action.payload === "DES"){
    orderDogs = state.dogs.sort(function (d1, d2) {
   if (d1.name.toLowerCase() > d2.name.toLowerCase()) { return -1;}
   if (d1.name.toLowerCase() < d2.name.toLowerCase()) { return 1; }
       return 0;
    });
  } else if (action.payload === "min")  {
    orderDogs = state.allDogs.sort(function (d1, d2) {
return d1.weight_min - d2.weight_min
}) 
} else if (action.payload === "max") {
  orderDogs = state.allDogs.sort(function (d1, d2) {
   return d2.weight_max - d1.weight_max
 });
} else if ( action.payload ==="alturamin") {
  orderDogs = state.allDogs.sort(function (d1, d2){
    return d1.height_min - d2.height_max
  });
}
  else if(action.payload === "alturamax") {
    orderDogs = state.allDogs.sort(function(d1, d2){
      return d2.height_max - d1.height_min
    }
    )
  }
  else {
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
