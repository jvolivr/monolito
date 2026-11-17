import { DataTypes } from "sequelize";
import { sequelize } from "../core/sequelize.js";

const Produto = sequelize.define("produto", {
  referencia: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(200),
    defaultValue: "0",

  },
  preco: {
    type: DataTypes.STRING(20),
    defaultValue: "0",
  },
  estoque: {
    type: DataTypes.STRING(200),
    defaultValue: "0",
  },
});

export default Produto;
