// const { axios } = require("axios");

// const { Dog, Temperament } = require("../db")

// const {API_KEY}= process.env


// //ACCION CONTROLADORA: 


// const getDataApi = async()=> {
//     const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`);
//     const dogsApi = await data.map(d => {

//     d.arrWeight = d.weight.metric.split("-")// ["3", "6"]

// /* Algunos perros llegan DE LA API con un peso NAN, en vez de string entonces lo que hago es preguntar:
//  si es nan, me lo transforme a 0 para no inventarle un valor, si es un strig que me lo pase a numero directamente. 
//  Si directamente tiene un solo valor string que lo pase a numero*/
//     if(d.arrWeight.length === 2){    
//         d.weight_min = isNaN(d.arrWeight[0]) ? 0 : parseInt(d.arrWeight[0])
//         d.weight_max = isNaN(d.arrWeight[1]) ? 0 : parseInt(d.arrWeight[1])
//     } else if (!isNaN(d.weight.metric)) {
//          d.weight_min = parseInt(d.weight.metric)
//          d.weight_max = parseInt(d.weight.metric)
//     }

//     d.arrHeight = d.height.metric.split("-")// ["3" - "6"]
//     if(d.arrHeight.length === 2){       
//         d.height_min = isNaN(d.arrHeight[0]) ? 0 : parseInt(d.arrHeight[0])
//         d.height_max = isNaN(d.arrHeight[1]) ? 0 : parseInt(d.arrHeight[1])     
//     } else if (!isNaN(d.height.metric)) {
//         d.height_min = parseInt(d.height.metric)
//         d.height_max = parseInt(d.height.metric)
//     }


//     // d.arrHeight = d.height.metric.split("-")// ["3" - "6"]
//     // if(d.arrHeight.length === 2){       
//     //     d.height_min = isNaN(d.arrHeight[0]) ? 0 : parseInt(d.arrHeight[0])
//     //     d.height_max = isNaN(d.arrHeight[1]) ? 0 : parseInt(d.arrHeight[1])     
//     // } else if (!isNaN(d.height.metric)) {
//     //     d.height_min = parseInt(d.height.metric)
//     //     d.height_max = parseInt(d.height.metric)
//     // }

// return {
//     id: d.id,
//     name: d.name,
//     image: d.image.url,
//     height_min: d.height_min,
//     height_max: d.height_max,
//     weight_min: d.weight_min,
//     weight_max: d.weight_max,
//     life_span: d.life_span,
//     //
//     breed_group: d.breed_group,
//     temperament: d.temperament?.split(", ")
//         };
//     });
// return dogsApi;
// };
// //me traigo la data de mi BD
// const getDataDB = async () => {
// const dogDB = await Dog.findAll({
//             include:{
//                 model: Temperament,
//                 attributes: ["name"],
//                 through:{
//                     attributes: []
//                 }
//             }
//         })
//         //return dogDB;
//         const arrDogDb = await dogDB.map((d) => {
//             return {
//                 id: d.id,
//                 name: d.name,
//                 image: d.image,
//                 height_min: d.height_min,
//                 height_max: d.height_max,
//                 weight_min: d.weight_min,
//                 weight_max: d.weight_max,
//                 life_span: d.life_span,
//                 breed_group: d.breed_group,
//                 temperament: d.temperaments?.map(t=> t.name)
//                 //["feliz", "triste", "contento"]
//             };
// });
// return arrDogDb;
//     }



// //por ultimo tengo que unir estas dos funciones y devolverlas para obtener la info de la tabla y de la DB
// const getAllData = async () => {
// const dbData = await getDataDB();
// const apiData= await getDataApi();
// // const dataTotal = apiData.concat(dbData);
// const dataTotal = dbData.concat(apiData);
// return dataTotal;
// }

// module.exports = {getAllData}