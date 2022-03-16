// const { Router } = require('express');
// const router = Router();

// const {Dog, Temperament } = require ("../db")

// const axios = require("axios");

// const {Op} = require("sequelize")

// const { getAllData } = require("./Controllers/index")


// //----------------------RUTA DE GENERAL + 
// //----------------------RUTA DE QUERY--------------
// ///dogs?name=
// router.get("/", async (req, res) => {
//     const {name} = req.query
//     let allDogs = await getAllData();
//  // console.log("ESTO ME TRAE el get de /dogs:" , allDogs)
//  //CANICHE---caniche
//  //cAniChe  
//       if (name) {
//       try {      
//       const dogName = await allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
      
//          if (dogName.length) return res.status(200).send(dogName)
//            return res.status(404).send("Dog not found")       
//       } catch (error) {
//       console.error(error)
//       }
//   } else {
//       res.send (allDogs)
//   }          
//   })



//   //buscar por otra cosa
  

// ////FILTRO DEL BACK ALFABETICAMENTE

// ///ordenamiento


// //----------------------RUTA DE ID--------------

// router.get("/:idBreed", async (req, res) => {
//     const {idBreed} = req.params
//     let allData = await getAllData();
// try {
//     //== ===
//     const dogId = await allData.filter(d => d.id == idBreed)
//     dogId.length 
//     ? res.status(200).send(dogId) 
//     : res.status(400).send("ID not found")       
// } catch (error) {
//     console.error(error)
// }
// })




// module.exports = router;


