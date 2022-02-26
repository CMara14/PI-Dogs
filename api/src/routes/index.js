const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//PARA USAR LOS OPERADORES DE Sequelize
const {Op} = require("sequelize")

//MI API KEY COMO VARIABLE
const {API_KEY}= process.env

//COMO VOY A OBTENER LA INFO DE LA API
const axios = require("axios");

//REQUIERO MIS MODELOS DE LA BASE DE DATOS 
const { Dog, Temperaments } = require("../db")

//----------------------RUTA DE PRUEBA------------------------------------
    // router.get("/dogs", (req, res, next) => {
    //         res.send("soy el get de /dogs")            
    // })


/* 
- Tendriamos que primero OBTENER TODA LA INFO DE LA API,
- Asegurarnos que no nos traiga algo vacio 
- y mandarlo al front


URL: https://api.thedogapi.com/v1/breeds?key=161f728c-b548-4bb1-9b4e-d94f27297e36

ACCION CONTROLADORA: 
*/

const getDataApi = async()=> {
    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`);//me traigo TODA la info de la api
    console.log("ESTO ME TRAE LA API: ", data)
//Ahora filtro lo que necesito
    const dogsApi = await data.map(d => {

//TENGO QUE CONVERTIR EL STRING QUE ME LLEGA PARA PESO Y ALTURA EN DOS PROPIEDADES: PESO MAXIMO Y PESO MINIMO PARA QUE EL USUARIO PUEDA ELEGIR ENTRE AMBOS

//PRIMERO CONVIERTO EN ARREGLO EL STRING QUE ME LLEGA, SEPARANDO LOS DOS ELEMENTOS CON GUION
    d.arrWeight = d.weight.metric.split("-")// [3, 6]

//PREGUNTO SI JUSTAMENTE ME LLEGARON DOS ELEMENTOS
    if(d.arrWeight.length === 2){
    
/*SI ES ASI, 
CREO NUEVAS PROPIEDADES (UNA PARA EL MAX Y OTRA PARA EL MIN): d.weight_min, d.weight_max
PREGUNTO SI LO QUE ESTA EN LA POSICION DEL ARREGLO NO ES UN NUMERO, EN ESE CASO LO PARSEO Y LO CONVIERTO A NUMERO A LO QUE TENGA EN AMBAS POSICIONES */
        d.weight_min = isNaN(d.arrWeight[0]) ? 0 : parseInt(d.arrWeight[0])
        d.weight_max = isNaN(d.arrWeight[1]) ? 0 : parseInt(d.arrWeight[1])

/*SI MI ARREGLO NO TIENE DOS ELEMENTOS, ES DECIR ME LLEGA UN SOLO VALOR:
PREGUNTO SI ES UN NUMERO EL QUE ME LLEGA EN d.weight.metric, 
CREO NUEVAS PROPIEDADES (UNA PARA EL MAX Y OTRA PARA EL MIN) 
PREGUNTANDO SI ES UN NUMERO. */
    } else if (!isNaN(d.weight.metric)) {
        // d.weight_min = d.weight.metric
        // d.weight_max = d.weight.metric
         d.weight_min = parseInt(d.weight.metric)
         d.weight_max = parseInt(d.weight.metric)
    }

    d.arrayAltura = d.height.metric.split("-")// [3, 6]
    if(d.arrayAltura.length === 2){
        d.height_min = isNaN(d.arrayAltura[0]) ? 0 : parseInt(d.arrayAltura[0])
        d.height_max = isNaN(d.arrayAltura[1]) ? 0 : parseInt(d.arrayAltura[1])
    } else if (!isNaN(d.height.metric)) {
        // d.height_min = parseInt(d.height.metric)
        // d.height_max = parseInt(d.height.metric)
        d.height_min = parseInt(d.height.metric)
        d.height_max = parseInt(d.height.metric)
    }

return {
    id: d.id,
    name: d.name,
    image: d.image.url,
    height_min: d.height_min,
    height_max: d.height_max,
    weight_min: d.weight_min,
    weight_max: d.weight_max,
    life_span: d.life_span,
    breed_group: d.breed_group,
    temperament: d.temperament?d.temperament.split(","):[]//separar array
        };
    });
   return dogsApi;
};


//split(',')
//me traigo la data de mi BD
const getDataDB = async () => {
       const dogDB = await Dog.findAll({
            include:{
                model: Temperaments,//indico que me traiga el modelo temperaments
                attributes: ["name"],//le indico que atributos me tiene que traer de ese modelo
                through:{//comprobacion que va siempre
                    attributes: []
                }
            }
        })
        return dogDB;
    }

//por ultimo tengo que unir estas dos funciones y devolverlas para obtener la info de la tabla y de la DB
const getAllData = async () => {
const apiData= await getDataApi();
const dbData = await getDataDB();
//con el metodo concat uno mis dos constantes que contienen toda la info en una sola constante 
const dataTotal = apiData.concat(dbData);
return dataTotal;
}

//----------------------RUTA DE GENERAL + 
//----------------------RUTA DE QUERY--------------
router.get("/dogs", async (req, res) => {
    const {name} = req.query
    let allDogs = await getAllData();
  console.log("ESTO ME TRAE el get de /dogs:" , allDogs)
  
      if (name) {
      try {
      //ME CREO UNA CONSTANTE PARA FILTRAR TODAAA LA INFO (TANTO DE LA DB COMO DE LA API), POR CADA ELEMENTO PREGUNTO SI EL NOMBRE DE CADA ELEMENTO, CONTIENE EL NOMBRE QUE ME PASARON POR QUERY
      const dogName = await allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
      //AGREGO EL METODO TOLOWER CASE PORQUE DE LA API ME VIENE EL NOMBRE EN MAYUSCULA PERO EL USUARIO PUEDE BUSCARLO CON MINUSUCLA
         if (dogName.length) return  res.status(200).send(dogName)
          return res.send("No existe ninguna raza de perro con ese nombre")       
      } catch (error) {
      console.log(error)
      }
  } else {
      res.send (allDogs)
  }          
  })


//----------------------RUTA DE ID--------------

router.get("/dogs/:idBreed", async (req, res) => {
    const {idBreed} = req.params
    let allData = await getAllData();


if (idBreed) {
    try {
        const dogId = await allData.filter(d => d.id == idBreed)
        if (dogId) {
            return  res.status(200).send(dogId)
       console.log(dogId)
        } else {
         return res.send("El id ingresado no coincide con ninguna raza de perro")       
        }
    } catch (error) {
        console.log(error)
    }
} else {
    res.send("Faltan datos")
}
})



//       try {
//       //ME CREO UNA CONSTANTE PARA FILTRAR TODAAA LA INFO (TANTO DE LA DB COMO DE LA API), POR CADA ELEMENTO PREGUNTO SI EL ID DE CADA ELEMENTO, CONTIENE EL ID QUE ME PASARON POR PARAMS
//       const dogId = await allData.filter(d => d.id == idBreed); /*El id me llega como string y en la API, la base de datos es un numero por eso uso el metodo NUMBER para parsear el dato: (d => d.id === Number(idBreed)); */
//          if (dogId) {
//              return  res.status(200).send(dogId)
//         console.log(dogId)
//          } else {
//           return res.send("El id ingresado no coincide con ninguna raza de perro")       
//          }
//       } catch (error) {
//       console.log(error)
//       }         
//   })


//----------------------RUTA DEL POST--------------

// router.post("/dog", async (req, res) => {
//     try {
//         //POR BODY ME LLEGA UN OBJETO CON LA DATA QUE EL USUARIO LLENA EN EL FORMULARIO PARA CREAR EL NUEVO VIDEOJUEGO, ASI QUE HAGO UN DESTRUCTURING DE ESAS PROPIEDADES
//         const {name, height_min, height_max, weight_min, weight_max, breed_group, temperament} = req.body
// //CON EL METODO CREATE LO CREO EN MI BASE DE DATOS PASANDOLE TODAS LAS PROPS QUE ME LLEGARON POR BODY
// const newDog = await Dog.create({
//     name,
//     breed_group,
//     temperament,
//     height_min,
//     height_max,
//     weight_min,
//     weight_max
// })
// res.status(200).send("Perro creado con éxito");

//     } catch (error) {
//         console.log(error)
//     }
// })


        // //genres no se lo puedo pasar, TOMO EL QUE ME ENVIARON POR BODY Y debo crear una relacion con los que YA tengo guardados en mi base de datos:
        // let genreDB = await Genres.findAll({//tengo que encontrar en mi modelo de generos (que ya tengo) todas las que coincidan con el nombre que me llega por body
        //     where: {name : genres}//como condicion debo tener el mismo nombre del que me llega por body
        // }) 
        // newVideogame.addGenres(genreDB);//ACA ES DONDE ESTABLEZCO LA RELACION CON LOS GENEROS
        // // const relacion = await newVideogame.addGenres(genreDB);
        // res.status(200).send("Videogame creado con éxito");









//----------------------RUTA DE TEMPERAMENT--------------
router.get("/temperament", async (req, res) => {
   //SI EFECITVAMENTE NO HAY NADA EN MI DB HAGO UN PEDIDO A LA API Y ME TRAIGO LOS GENEROS  
 const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`);//me traigo TODA la info de la api
//  console.log(data)
//Ahora filtro lo que necesito
 const apiTemperaments = await data.map(d =>  d.temperament?d.temperament.split(", "):[])//separar array
 
// res.send (apiTemperaments)
// console.log(apiTemperaments)
// })
const singleTemp = apiTemperaments.flat();
// res.send(singleTemp)
// })  

// const singleTemp = apiTemperaments.map(t => {
// //     res.send(t)
// // })

// const singleTemp = apiTemperaments.map(t => {
//     for (let i = 0; i < t.length; i++) {
//         return t[i];} })
//         console.log(singleTemp)
//         res.send(singleTemp);
//         const result = singleTemp.reduce((t, i) => {
//             if (!t.includes(i)){
//                 t.push(i);
//             }
//             return t;
//         }, [])
//       console.log(result)
// res.send(result);

    singleTemp?.forEach(async t => {
       await Temperaments.findOrCreate({
            where: {name: t}
        })
    });
const allTemperaments = await Temperaments.findAll();
     res.send(allTemperaments);
 });





// const getTemperaments = async () => {
//     //ME GUARDO EN UNA CONSTANTE TODOS LOS GENEROS QUE TENGO EN MI TABLA "Temperamen" DE BASE DE DATOS CON EL METODO findAll
//   const tempDB = await Temperaments.findAll({
//     //EXCLUYO DOS ATRIBUTOS QUE NO QUIERO MOSTRAR
//       attributes: {
//           exclude: ["createdAt", "updatedAt"],
//       }        
//       });
//   //A CONTINUACION PREGUNTO: SI NO HAY ALGO EN MI BASE DE DATOS, SI ES ASI QUE SIGA DE LARGO, SINO:
//       if(!tempDB.length){
//           try { 
//             //SI EFECITVAMENTE NO HAY NADA EN MI DB HAGO UN PEDIDO A LA API Y ME TRAIGO LOS GENEROS  
//             const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`);//me traigo TODA la info de la api
//     console.log(data)
// //Ahora filtro lo que necesito
//     const apiTemperaments = await data.map(d => {
// return {
//     temperament: d.temperament?d.temperament.split(","):[]//separar array
//         };
//     });
//    return dogsApi;    
            
            




//             const apiTemperaments = await axios.get(`https://api.rawg.io/api/Temperaments?key=${API_KEY}`)
          
//             //ME GUARDO EN UNA CONSTANTE ESE RESULTADO QUE ME LLEGA COMO UN ARREGLO DE OBJETOS DE DONDE YO SOLO QUIERO EL NOMBRE DE CADA GENERO
//             const allTemp = await apiTemperaments.data.results.map(g => g.name);
//             //MAPEO ESA CONSTANTE PARA CREARLOS EN MI BASE DE DATOS
//               allTemperaments.map( async(element) => await Temperaments.findOrCreate(
//               {//de ese arreglo lo recorro con async await porque no se cuanto se va a demorar, y que por cada elemento (que seria el genero) lo busque o lo creo cumpliendo la condicion de que cada nombre sea como el elemento que me pasan en mi tabla Genre
//                       where: {
//                           name: element
//                       }
//                   }
//                   )
//               );
//               return(allTemperaments)
//            } catch (error) {
//               console.log(error)
//           }
//       } else{
//         //SI ESTAN DENTRO DE MI BASE DE DATOS DIRECTAMENTE MAPEO LO QUE TENGO AHI POR NOMBRE.
//      return tempDB.map(g => g.name)
//     }
//   }






module.exports = router;
