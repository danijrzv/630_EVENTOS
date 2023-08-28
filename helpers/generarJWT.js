import jwt from "jsonwebtoken"

const generarJWT = (id)=>{
    // GENERAR JWT Y AGREGAR AL ARREGLO DE INFORMACIÓN SOLO EL ID
    return jwt.sign({id}, process.env.JWT_SECRET, {
        // DEFINIENDO TIEMPO PARA QUE EXPIRE EL TOKEN
        expiresIn: "30d"
    })
}

// EXPORTANDO FUNCIÓN
export default generarJWT