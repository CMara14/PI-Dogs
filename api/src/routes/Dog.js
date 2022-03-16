// const { Router } = require('express');
// const router = Router();

// const {Dog, Temperament } = require ("../db")


// //----------------------RUTA DEL POST--------------

// router.post("/", async (req, res) => {
//     const {name, height_min, height_max, weight_min, weight_max, minlife_span, maxlife_span, image, temperaments} = req.body
//     // console.log(req.body)
//     // if (name && height_min && height_max && weight_min && weight_max && life_span && temperament) {   
//     //     try {        
//     const newDog = await Dog.create({
//         name: name,
//         height_min: Number(height_min),
//         height_max: Number(height_max),
//         weight_min: Number(weight_min),
//         weight_max: Number(weight_max),
//         life_span: `${minlife_span} - ${maxlife_span} years`,
//         image: image
//      });
//     let tempDB = await Temperament.findAll({
//         where: {name : temperaments}
//     }) 
//     await newDog.addTemperament(tempDB);
//     // allTemps?.forEach( t => {
//     //     Temperament.findOrCreate({
//     //            where: {name: t}
//     //        })
//     //    });
//     // console.log(temperaments)
//     return res.status(200).send("Dog created successfully!");
//         // } catch (error) {
//         //     next(error)    }    
//     // } else {
//     //     res.status(404).send('Faltan datos');
//     //}
//     })
    



// module.exports = router;
