const { DataTypes, Sequelize } = require('sequelize');


/*     DB
_________
DOG                 TEMPERAMENTOS */




// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,//ID: 1, 2, 3. db: 12334-asdas-12312_asdase
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
      },
    name: {
      type: DataTypes.STRING,//("haru")
      allowNull: false,
    },
    height_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    }
    // createdInDB : {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: true
    // } 
  });
};
