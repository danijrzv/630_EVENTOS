// IMPORTANDO SEQUELIZE PARA CREAR EL MODELO DEL USUARIO
import Sequelize from "sequelize";
// IMPORTANDO DB
import db from "../config/db.js";
// IMPORTANDO BCRYPT PARA HASHEAR PASSWORD
import bcrypt from "bcrypt"

// IMPORTANDO LA TABLA PARA LOS USUARIOS Y DEFINIENDO EL MODELO
const Usuario = db.define("users",{
    id:{
        type: Sequelize.STRING,
        primaryKey: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    name:{
        type: Sequelize.STRING
    },
    token:{
        type: Sequelize.STRING,
    },
    confirmed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    password:{
        type: Sequelize.STRING
    }
},
{   
    // HACIENDO USO DE LOS HOOKS DE SEQUELIZE
    hooks: {
    // HASHEAR PASSWORD ANTES DE CREAR EL USUARIO
    beforeCreate: async (user) => {
        if (user.password) {
            // PROCESAMIENTO DE DATOS Y VERSIÓN
            const salt = bcrypt.genSaltSync(10, 'a');
            // HASHEANDO PASSWORD
            user.password = bcrypt.hashSync(user.password, salt);
        }
    },
    // ANTES DE ACTUALIZAR
    beforeUpdate: async (user) => {
        // SI NO ESTÁ CAMBIANDO PASSWORD
        if (!user.changed("password")) {
            // DETENER LA EJECUCIÓN
            return
        }
        // SI ESTÁ CAMBIANDO PASSWORD, HASHEAR ANTES DE ALMACENAR
        const salt = bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
    }
    }
})
// HACER DISPONIBLE LA FUNCIÓN PARA COMPROBAR PASSWORD EN EL MODELO DEL USUARIO
Usuario.prototype.comprobarPassword = async function(passwordFormulario){
    // COMPARA PASSWORD DEL FORMULARIO Y EL PASSWORD DE LA DB HASHEADA
    return await bcrypt.compare(passwordFormulario, this.password)
}
// EXPORTAR USUARIO
export default Usuario