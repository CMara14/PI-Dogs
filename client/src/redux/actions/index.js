import axios from "axios";

//Constantes de las actions:
export const GET_ALL_DOGS = "GET_ALL_DOGS"
export const GET_DOG_NAME = "GET_DOG_NAME";
export const POST_DOG = "POST_DOG";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";


//Constantes de ordenamiento:
export const SORT_BY = "SORT_BY";

//Constantes de filtrado:
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const FILTER_BY_TEMPS = "FILTER_BY_TEMPS";



//---------------------RUTA GENERAL-----------------
export const getAllDogs = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/dogs`)
            return dispatch({
                type: "GET_ALL_DOGS",
                payload: data
            })
        } catch(err) {
            console.log(err)
        }
    }
}

//------------------RUTA DE BUSQUEDA query------------------

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
            // console.log(data)
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

    export const filterBySource = (payload) => {
        console.log(payload)
          return ({
                type: "FILTER_BY_SOURCE",
                payload
            })
     }


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

