// IMPORTANDO EXPRESS PARA HACER USO DEL ROUTER
import express from "express"
// IMPORTANDO MIDDLEWERE PARA AUTORIZACIÓN
import checkAuth from "../middleware/authMiddleware.js"
// IMPORTANDO CONTROLADORES
import { 
    registrar,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
} from "../controllers/usuarioController.js"

// INSTANCIANDO ROUTER
const router = express.Router()

// CREANDO RUTAS PÚBLICAS
router.post("/", registrar)
router.get("/confirmar/:token", confirmar)
router.post("/login", autenticar)
router.post("/olvide-password", olvidePassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

// CREANDO RUTAS PRIVADAS
router.get("/perfil", checkAuth, perfil)

// EXPORTANDO ROUTER
export default router