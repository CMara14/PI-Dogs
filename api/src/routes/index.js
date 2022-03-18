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


const { Op } = require("sequelize");
const { API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperament } = require("../db");

// https://api.thedogapi.com/v1/breeds?key=161f728c-b548-4bb1-9b4e-d94f27297e36

const getDataApi = async () => {
  const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
  );
  const dogsApi = await data.map((d) => {
    d.arrWeight = d.weight.metric.split("-");
    if (d.arrWeight.length === 2) {
      d.weight_min = isNaN(d.arrWeight[0]) ? 0 : parseInt(d.arrWeight[0]);
      d.weight_max = isNaN(d.arrWeight[1]) ? 0 : parseInt(d.arrWeight[1]);
    } else if (!isNaN(d.weight.metric)) {
      d.weight_min = parseInt(d.weight.metric);
      d.weight_max = parseInt(d.weight.metric);
    }

    d.arrHeight = d.height.metric.split("-"); 
    if (d.arrHeight.length === 2) {
      d.height_min = isNaN(d.arrHeight[0]) ? 0 : parseInt(d.arrHeight[0]);
      d.height_max = isNaN(d.arrHeight[1]) ? 0 : parseInt(d.arrHeight[1]);
    } else if (!isNaN(d.height.metric)) {
      d.height_min = parseInt(d.height.metric);
      d.height_max = parseInt(d.height.metric);
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
    };
  });
  return arrDogDb;
};


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


//----------------------RUTA DE ID--------------

router.get("/dogs/:idBreed", async (req, res) => {
  const { idBreed } = req.params;
  let allData = await getAllData();
  try {
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

  return res.status(200).send("Dog created successfully!");
 
});


router.get("/temperament", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
    );

    const apiTemperament = await data
      .map((d) => d.temperament)
      .join() 
      .split(/\s*,\s*/); 

    const info = apiTemperament.filter(
      (t) => t !== null && t !== undefined && t !== ""
    );

    const dataFiltered = info.filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });
  

    dataFiltered?.map(async (t) => {
      await Temperament.findOrCreate({
        where: { name: t },
      });
    });
    const allTemperaments = await Temperament.findAll();

    let tempsTotal = allTemperaments?.map((t) => t.name);

    res.json(tempsTotal);

  } catch (error) {
    console.error(error);
  }
});


module.exports = router;

