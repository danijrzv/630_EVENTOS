// IMPORTANDO EXPRESS PARA HACER USO DEL ROUTER
import express from "express"
// IMPORTTANDO CONTROLADORES
import {
    agregarEvento,
    obtenerEventos,
    actualizarEvento,
    eliminarEvento
} from "../controllers/eventoController.js"
import checkAuth from "../middleware/authMiddleware.js"

// INSTANCIANDO ROUTER
const router = express.Router()

// CREANDO RUTAS PARA AGREGAR Y OBTENER EVENTOS
router.route("/")
    .post(checkAuth, agregarEvento)
    .get(checkAuth, obtenerEventos)

// CREANDO RUTAS PARA ACTUALIZAR Y ELIMINAR EVENTOS
router
    .route("/:id")
    .put(checkAuth, actualizarEvento)
    .delete(checkAuth, eliminarEvento)

// EXPORTANDO ROUTER
export default router