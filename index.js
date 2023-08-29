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
// IMPORTANDO HERRAMIENTAS PARA UTILIZAR EN PRODUCCIÓN (COMENTAR ESTAS DOS LINEAS PARA DESARROLLO)
import {fileURLToPath} from "url"
import path from "path"

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
// PARA DESARROLLO
// app.use(cors(corsOptions))

// PARA PRODUCCIÓN
app.use(cors())

// CREANDO CONSTANTES DE RUTAS DE DIRECTORIO (COMENTAR ESTAS DOS LINEAS PARA DESARROLLO)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CREANDO RUTAS PARA EL USUARIO Y EVENTOS
app.use("/api/usuarios", usuarioRoutes)    
app.use("/api/eventos", eventoRoutes)    

// HACER USO DEL FRONTEND (CLIENTE)
app.use(express.static("dist"))

// ENCONTRAR UN PUERTO DISPONIBLE O SELECCIONAR EL 4000
const PORT = process.env.PORT || 4000

// CREAR SERVIDOR
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`)
})

// ENVIAR ARCHIVO DEL CLIENTE (COMENTAR APP.GE PARA DESARROLLO)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./dist", "index.html"))
})
