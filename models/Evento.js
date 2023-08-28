// IMPORTANDO SEQUELIZE PARA CREAR EL MODELO DEL USUARIO
import Sequelize from "sequelize";
// IMPORTANDO DB
import db from "../config/db.js";

// IMPORTANDO LA TABLA PARA LOS EVENTOS Y DEFINIENDO EL MODELO
const Evento = db.define("events",{
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    start_time: {
        type: Sequelize.DATE
    },
    end_time: {
        type: Sequelize.DATE,
    },
    location: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: false
    },
    user_id:{
        type: Sequelize.STRING
    }
})

// EXPORTANDO TABLA DE EVENTOS
export default Evento