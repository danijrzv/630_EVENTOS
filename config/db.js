import Sequelize from "sequelize";
import dotenv from "dotenv/config";

// CREANDO LA CONEXIÓN A LA DB
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
        timestamps: false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    operatorAliases: false,
    logging: false
    }
)

// EXPORTANDO DB
export default db