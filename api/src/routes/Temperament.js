// const {  axios } = require('axios');
// const { Router } = require('express');
// const router = Router();
// const {Dog, Temperament } = require ("../db")
// const {API_KEY}= process.env



// router.get("/", async (req, res) => {
//     try {        
//     const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds?key=${API_KEY}`); 
      
//     const apiTemperament = await data
//      .map(d => d.temperament)//me llega un arreglo con los strings largos
//     /* [
//         "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
//      "Aloof, Clownish, Dignified, Independent, Happy",
//      ]
//      */
//      .join()//me devuelve todo junto en una cadena gigante
//      .split(/\s*,\s*/)//separo en cada uno de los temperamentos del string gigante por elemento
//     // console.log(apiTemperament)
       
//     const info = apiTemperament.filter(t => t !== null && t !== undefined && t !== "" )

    
//    /*  //Me filtro la info para sacar los temperamentos repetidos, se invoca con tres argumentos: El valor de cada elemento, El índice del elemento, El objeto Array que se está recorriendo */
//         const dataFiltered = info.filter((item, index, arr) => {
//             return arr.indexOf(item) === index
//           }) 
//          // console.log(dataFiltered)

//           dataFiltered?.map( async (t) => {
//                await Temperament.findOrCreate({
//                        where: {name: t}
//                    })
//                });   
//     const allTemperaments = await Temperament.findAll();

//      let tempsTotal = allTemperaments?.map(t => t.name)
//      //vuelvo a mapear porque me llegaban los datos como un arreglo de objetos [{ } {} { }{ }]

//      res.json(tempsTotal);

//      //console.log(tempsTotal)
//      //return//para no hacer muchos pedidos
//     } catch (error) {
//         console.error(error)
//     }}
// )




// module.exports = router;