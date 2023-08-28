// IMPORTANDO EXPRESS PARA HACER USO DE LA APP
import express from "express"
// IMPORTANDO DB
import db from "./config/db.js"
// IMPORTANDO DOTENV PARA VARIABLES DE ENTORNO
import dotenv from "dotenv"
// IMPORTANDO ROUTERS
import usuarioRoutes from "./routes/usuarioRoutes.js"
import eventoRoutes from "./routes/eventoRoutes.js"
// IMPORTANDO CORS
import cors from "cors"

// INSTANCIAR EXPRESS
const app = express()

// INDICAR QUE EL TIPO DE DATOS SERÁN DE TIPO JSON
app.use(express.json())

// CONECTAR A DB
db.authenticate()
    .then(() => {
        console.log("Base de datos conectada")
    })
    .catch(error => {
        console.log(error)
    })

// SOLUCIONANDO PROBLEMAS DE CORS
const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen del request está permitido
            callback(null, true)
        }else{
            callback(new Error("No permitido por CORS"))
        }
    }
}
app.use(cors(corsOptions))

// CREANDO RUTAS PARA EL USUARIO Y EVENTOS
app.use("/api/usuarios", usuarioRoutes)    
app.use("/api/eventos", eventoRoutes)    

// ENCONTRAR UN PUERTO DISPONIBLE O SELECCIONAR EL 4000
const PORT = process.env.PORT || 4000

// CREAR SERVIDOR
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})
