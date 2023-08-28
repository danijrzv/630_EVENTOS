// IMPORTANDO JWT
import jwt from "jsonwebtoken"
// IMPORTANDO MODELO DEL USUARIO
import Usuario from "../models/Usuario.js"

const checkAuth = async (req, res, next) => {
    // DECLARANDO TOKEN Y DECODED VACIOS
    let token
    let decoded
    // SI EXISTE UNA AUTORIZACIÓN Y ADEMÁS EMÍEZA CON BEARER
    // Si existe una autorización, y además empieza con Bearer, reescribir token y decoded
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            // REESCRIBIR TOKEN CON EL TOKEM GENERADO POR JWT
            token = req.headers.authorization.split(" ")[1]
            // REESCRIBIR DECODED CON LA VERIFICACIÓN DEL JWT QUE DEVUELVE EL OBJETO CON EL ID DEL USUARIO
            decoded = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            // SI HAY UN ERROR
            const e = new Error("Token no valido")
            // SE DETIENE LA EJECUCIÓN Y SE ENVIA MENSAJE DE ERROR
            return res.status(403).json({msg: e.message})
        }
    }
    // SI HAY UN DECODED
    if(decoded){
        // BUSCAR EN LA DB POR ID Y DESTRUCTURAR ID, EMAIL Y NAME
        const {id, email, name} = await Usuario.findByPk(decoded.id)
        // DECLARANDO EL OBJETO DEL USUARIO
        const usuario = {id, email, name}
        // CREANDO LA SESIÓN DEL USUARIO
        req.usuario = usuario
        // DETENER LA EJECUCIÓN DE LAS SIGUIENTES LINEAS Y EJECUTAR LA SIGUIENTE FUNCIÓN (CONTROLADOR)
        return next()
    }
    // SI NO HAY TOKEN
    if(!token){
        // GENERAR MENSAJE DE ERROR
        const error = new Error("Token no valido o inexistente")
        // Y ENVIAR MENSAJE AL CLIENTE
        res.status(403).json({msg: error.message})
    }
    // EJECUTAR LA SIGUIENTE FUNCIÓN (CONTROLADOR)
    next()
}

// EXPORTANDO FUNCIÓN
export default checkAuth