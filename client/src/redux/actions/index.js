import axios from "axios";

//Constantes de las actions:
export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_NAME = "GET_DOG_NAME";
export const POST_DOG = "POST_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";


//Constantes de ordenamiento:
export const SORT_BY = "SORT_BY";
// export const SORT_BY_WEIGHT = "SORT_BY_WEIGHT";

//Constantes de filtrado:
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS";



//---------------------RUTA GENERAL-----------------
export const getAllDogs = () => {//defino mi action
    return async (dispatch) => {//despacho mi accion
        try {
            const { data } = await axios.get(`http://localhost:3001/dogs`)//hago el pedido al back
            return dispatch({
                type: "GET_ALL_DOGS",//defino el tipo para que lo lea el reducer
                payload: data//le paso la data que me llega del back
            })
        } catch(err) {
            console.log(err)
        }
    }
}

//------------------RUTA DE BUSQUEDA query------------------
/* Le indico la ruta que cree para el query en mi back y despues del = tome el valor que me llega por payload. 
El payload me lo da la ruta, (data) ya que una vez que asigno un valor por name */
export const getDogName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: "GET_DOG_NAME",
                payload: data
            })
        } catch(err) {
            dispatch({
                type: "GET_DOG_NAME",
                payload: []
            })
            /* le digo que me traiga un arreglo vacio  */
            console.log(err)
        }
    }
}



//---------------------RUTA BUSQUEDA ID-----------------
export const getDogDetail = (id) => {
    return async (dispatch) => {
       try {
            const { data } = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
               type: "GET_DOG_DETAIL",
                payload: data
            })
       } catch(err) {
           console.log(err)
       }
   }
}


//---------------------RUTA TEMPERAMENTS-----------------
export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/temperament`)
            return dispatch({
                type: "GET_TEMPERAMENTS",
                payload: data
            })
        } catch(err) {
            console.log(err)
        }
    }
}


//---------------------RUTA POST-----------------
export const postDog = (newDog) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`http://localhost:3001/dog`, newDog)
            console.log(data)
            return dispatch({
                type: "POST_DOG",
                payload: data
            })
        } catch(err) {
            console.log(err)
        }
    }
}




//-----------------ORDENAMIENTOS------------------
export function sortBy(payload) {
    console.log(payload)
            return {
            type: "SORT_BY",
            payload
        }
 }

//___________________POR PESO
//  export function sortByweight(payload) {
//     console.log(payload)
//           return {
//             type: "SORT_BY_WEIGHT",
//             payload
//         }
//      }




 //------------------FILTRADOS-----------------
//POR TEMPERAMENTOS

export const filterByTemps = (payload) => {
    console.log(payload)
                  return ({
                type: "FILTER_BY_TEMPS",
                payload
            })
           }


//POR ORIGEN
//lo que le llega como payload es lo que le mando del componente
    export const filterBySource = (payload) => {
        console.log(payload)
          return ({
                type: "FILTER_BY_SOURCE",
                payload
            })
     }

//ORDENAMIENTO:
//ALFABETICAMENTE

//POR PESO


//FILTRADO:
//BASE DE DATOS

//TEMPERAMENTOS


     //PUT

     //DELETE
// export const deleteDog = (id) => {
//     return async (dispatch) => {
// try {
//     const {data} =
// } catch (error) {
    
// }

//         type: "DELETE_DOG"
//         payload:  
//     }
// }



     //BUSCAR ALGO QUE NO ES EN LA RUTA