//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

//IMPORTAR LOS MODELOS DE LA BASE DE DATOS y AXIOS
// import axios from "axios";
// import Temperaments from "./src/models/Temperaments.js";


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {

// //PRECARGAR LOS temperamentos de mi DB
// const control = await Temperaments.findAll()

// //VERIFICAR SI HAY ALGO EN MI BASE DE DATOS
// if(control.lenght < 1) {
//   const pedidoApi = await axios.get()
// }


  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
