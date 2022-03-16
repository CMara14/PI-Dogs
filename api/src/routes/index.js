const { Router } = require("express");
const router = Router();

// //ME IMPORTO LAS RUTAS
// // Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
// const dogRoute = require("./Dog")
// const TemperamentRoute = require("./Temperament")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//ME CREO LOS MIDDLEWARES PARA LAS RUTAS
// router.use("/dog", dogRoute)
// router.use("/temperament", TemperamentRoute)

//PARA USAR LOS OPERADORES DE Sequelize
const { Op } = require("sequelize");

//MI API KEY COMO VARIABLE
const { API_KEY } = process.env;

//COMO VOY A OBTENER LA INFO DE LA API ---------estudiar
const axios = require("axios");

//REQUIERO MIS MODELOS DE LA BASE DE DATOS
const { Dog, Temperament } = require("../db");

//----------------------RUTA DE PRUEBA------------------------------------
// router.get("/dogs", (req, res, next) => {
//         res.send("soy el get de /dogs")
// })

/* 

URL: https://api.thedogapi.com/v1/breeds?key=161f728c-b548-4bb1-9b4e-d94f27297e36


ACCION CONTROLADORA: 
*/

const getDataApi = async () => {
  const { data } = await axios.get(
    `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
  );
  const dogsApi = await data.map((d) => {
    d.arrWeight = d.weight.metric.split("-"); // ["3", "6"]

    /* Algunos perros llegan DE LA API con un peso NAN, en vez de string entonces lo que hago es preguntar:
 si es nan, me lo transforme a 0 para no inventarle un valor, si es un strig que me lo pase a numero directamente. 
 Si directamente tiene un solo valor string que lo pase a numero*/
    if (d.arrWeight.length === 2) {
      d.weight_min = isNaN(d.arrWeight[0]) ? 0 : parseInt(d.arrWeight[0]);
      d.weight_max = isNaN(d.arrWeight[1]) ? 0 : parseInt(d.arrWeight[1]);
    } else if (!isNaN(d.weight.metric)) {
      d.weight_min = parseInt(d.weight.metric);
      d.weight_max = parseInt(d.weight.metric);
    }

    d.arrHeight = d.height.metric.split("-"); // ["3" - "6"]
    if (d.arrHeight.length === 2) {
      d.height_min = isNaN(d.arrHeight[0]) ? 0 : parseInt(d.arrHeight[0]);
      d.height_max = isNaN(d.arrHeight[1]) ? 0 : parseInt(d.arrHeight[1]);
    } else if (!isNaN(d.height.metric)) {
      d.height_min = parseInt(d.height.metric);
      d.height_max = parseInt(d.height.metric);
    }

    // d.arrHeight = d.height.metric.split("-")// ["3" - "6"]
    // if(d.arrHeight.length === 2){
    //     d.height_min = isNaN(d.arrHeight[0]) ? 0 : parseInt(d.arrHeight[0])
    //     d.height_max = isNaN(d.arrHeight[1]) ? 0 : parseInt(d.arrHeight[1])
    // } else if (!isNaN(d.height.metric)) {
    //     d.height_min = parseInt(d.height.metric)
    //     d.height_max = parseInt(d.height.metric)
    // }

    return {
      id: d.id,
      name: d.name,
      image: d.image.url,
      height_min: d.height_min,
      height_max: d.height_max,
      weight_min: d.weight_min,
      weight_max: d.weight_max,
      life_span: d.life_span,
      //
      breed_group: d.breed_group,
      temperament: d.temperament?.split(", "),
    };
  });
  return dogsApi;
};
//me traigo la data de mi BD
const getDataDB = async () => {
  const dogDB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //return dogDB;
  const arrDogDb = await dogDB.map((d) => {
    return {
      id: d.id,
      name: d.name,
      image: d.image,
      height_min: d.height_min,
      height_max: d.height_max,
      weight_min: d.weight_min,
      weight_max: d.weight_max,
      life_span: d.life_span,
      breed_group: d.breed_group,
      temperament: d.temperaments?.map((t) => t.name),
      //["feliz", "triste", "contento"]
    };
  });
  return arrDogDb;
};

//por ultimo tengo que unir estas dos funciones y devolverlas para obtener la info de la tabla y de la DB
const getAllData = async () => {
  const dbData = await getDataDB();
  const apiData = await getDataApi();
  // const dataTotal = apiData.concat(dbData);
  const dataTotal = dbData.concat(apiData);
  return dataTotal;
};

//----------------------RUTA DE GENERAL +
//----------------------RUTA DE QUERY--------------
///dogs?name=
router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  let allDogs = await getAllData();
  // console.log("ESTO ME TRAE el get de /dogs:" , allDogs)
  //CANICHE---caniche
  //cAniChe
  if (name) {
    try {
      const dogName = await allDogs.filter((d) =>
        d.name.toLowerCase().includes(name.toLowerCase())
      );

      if (dogName.length) return res.status(200).send(dogName);
      return res.status(404).send("Dog not found");
    } catch (error) {
      console.error(error);
    }
  } else {
    res.send(allDogs);
  }
});

//buscar por otra cosa

////FILTRO DEL BACK ALFABETICAMENTE

///ordenamiento

//----------------------RUTA DE ID--------------

router.get("/dogs/:idBreed", async (req, res) => {
  const { idBreed } = req.params;
  let allData = await getAllData();
  try {
    //== ===
    const dogId = await allData.filter((d) => d.id == idBreed);
    dogId.length
      ? res.status(200).send(dogId)
      : res.status(400).send("ID not found");
  } catch (error) {
    console.error(error);
  }
});

//----------------------RUTA DEL POST--------------

router.post("/dog", async (req, res) => {
  const {
    name,
    height_min,
    height_max,
    weight_min,
    weight_max,
    minlife_span,
    maxlife_span,
    image,
    temperaments,
  } = req.body;
  // console.log(req.body)
  // if (name && height_min && height_max && weight_min && weight_max && life_span && temperament) {
  //     try {
  const newDog = await Dog.create({
    name: name,
    height_min: Number(height_min),
    height_max: Number(height_max),
    weight_min: Number(weight_min),
    weight_max: Number(weight_max),
    life_span: `${minlife_span} - ${maxlife_span} years`,
    image: image,
  });
  let tempDB = await Temperament.findAll({
    where: { name: temperaments },
  });
  await newDog.addTemperament(tempDB);
  // allTemps?.forEach( t => {
  //     Temperament.findOrCreate({
  //            where: {name: t}
  //        })
  //    });
  // console.log(temperaments)
  return res.status(200).send("Dog created successfully!");
  // } catch (error) {
  //     next(error)    }
  // } else {
  //     res.status(404).send('Faltan datos');
  //}
});

router.get("/temperament", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
    );

    const apiTemperament = await data
      .map((d) => d.temperament) //me llega un arreglo con los strings largos
      /* [
        "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
     "Aloof, Clownish, Dignified, Independent, Happy",
     ]
     */
      .join() //me devuelve todo junto en una cadena gigante
      .split(/\s*,\s*/); //separo en cada uno de los temperamentos del string gigante por elemento
    // console.log(apiTemperament)

    const info = apiTemperament.filter(
      (t) => t !== null && t !== undefined && t !== ""
    );

    /*  //Me filtro la info para sacar los temperamentos repetidos, se invoca con tres argumentos: El valor de cada elemento, El índice del elemento, El objeto Array que se está recorriendo */
    const dataFiltered = info.filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });
    // console.log(dataFiltered)

    dataFiltered?.map(async (t) => {
      await Temperament.findOrCreate({
        where: { name: t },
      });
    });
    const allTemperaments = await Temperament.findAll();

    let tempsTotal = allTemperaments?.map((t) => t.name);
    //vuelvo a mapear porque me llegaban los datos como un arreglo de objetos [{ } {} { }{ }]

    res.json(tempsTotal);

    //console.log(tempsTotal)
    //return//para no hacer muchos pedidos
  } catch (error) {
    console.error(error);
  }
});

//comprobar si ya existe

// attributes:  {
//     exclude: [
//         "id", "createdAt", "updatedAt"
//     ]
// },
// where: {name: t}

// const allTemps = []
// const arr = info.map(element => {
//                 if (!allTemps.includes(element)){
//                     allTemps.push(element);
//                 }})
// allTemps?.forEach( t => {
//           Temperament.findOrCreate({
//                  where: {name: t}
//              })
//          });

module.exports = router;

//////////////////////////////////////BACK

//ORDENAMIENTO:
//ALFABETICAMENTE
// router.get("order/:order", async (req, res) => {
//     const {order} = req.params

// if () {

// }

// })

//POR PESO

//////////////////////////////////FILTRADO:

//TEMPERAMENTOS

router.get("/filter/:temps", async (req, res) => {
  const { temps } = req.params;

  let allData = await getAllData();

  try {
    let filtered = await allData.filter((el) =>
      el.temperament?.includes(temps)
    );

    filtered.length
      ? res.status(200).json(filtered)
      : res.status(400).send("No hay nada");
    //    let filtered = await allData.map(el => el.temperament?.includes(temps)) NOOOOOOOOOOOO
    //  console.log(filtered)
  } catch (error) {
    console.error(error);
  }
});

//BASE DE DATOS
router.get("/source/:source", async (req, res) => {
  const { source } = req.params;

  let dbData = await getDataDB();
  let apiData = await getDataApi();
  let allData = await getAllData();

  if (source)
    try {
      if (source === "ALL") {
        res.json(apiData);
      } else if (source === "DB") {
        res.json(dbData);
      } else {
        res.json(allData);
      } //SI O SI TIENE QUE HABER ALGO ESCRITO DESPUES DE LA BARRA DE SOURCE PARA QUE FUNCIONE
    } catch (error) {
      console.error(error);
    }
});

// METODO PUT(modificar)
router.put("/dogs:idBreed", async (req, res) => {
  const { idBreed } = req.params;

  try {
    const newDog = await Dog.update(
      { height_max: 2 },
      {
        where: {
          name: "Pepe",
        },
      }
    );

    // UPDATE
  } catch (error) {
    console.error(error);
  }
});

// METODO DELETE(eliminar)
router.delete("/dog/:idBreed", async (req, res) => {
  const { idBreed } = req.params;

  try {
    const eliminado = await Dog.destroy({
      where: { id: idBreed },
    });

    dbDogs = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    res.json(eliminado)
  } catch (error) {
    console.error(error);
  }
});

// router.get("/dogs:idBreed", async (req, res) => {

//     const {idBreed} = req.params
//     let infoDB = await getDataDB()

//  try {
//  const dogFiltered = await infoDB.filter(d => d.id === idBreed)
//  if (dogFiltered.length) {
//      res.send(dogFiltered)
//      console.log(dogFiltered)
//  } else {
//      res.send("no hay nada")
// }
//      //DESTROY DE SEQUELIZE

//  } catch (error) {
//      console.error(error)
//  }

// })

//BUSCAR ALGO QUE NO ES EN LA RUTA
