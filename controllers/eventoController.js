import Evento from "../models/Evento.js";
import generarId from "../helpers/generarId.js";

const agregarEvento = async (req, res) => {
    // CREAR EVENTO CON LOS DATOS DEL BODY
    const evento = new Evento(req.body)
    // AGREGAR ID DE EVENTO
    evento.id = generarId()
    // AGREGAR FECHA DE CREACIÓN
    evento.created_at = Date.now()
    // AGREGAR FECHA DE ACTUALIZACIÓN
    evento.updated_at = Date.now()
    // AGREGAR ID DEL USUARIO
    evento.user_id = req.usuario.id
    // GUARDAR EVENTO
    try {
        const eventoAlmacenado = await evento.save()
        // ENVIAR NUEVO EVENTO
        res.json(eventoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}
const obtenerEventos = async (req, res) => {
    // OBTENET TODOS LOS EVENTOS POR USUARIO
    const eventos = await Evento.findAll({where: {user_id: req.usuario.id}})
    // ENVIAR LOS EVENTOS AL CLIENTE
    res.json(eventos)
}

const actualizarEvento = async (req, res) => {
    // OBTENIENDO ID DE EVENTO DE LA URL
    const {id} = req.params
    // ISNTANCIANDO EL EVENTO POR ID
    const evento = await Evento.findByPk(id)
    // SI EL EVENTO NO EXISTE
    if(!evento){
        // ENVIAR MENSAJE AL CLIENTE
        res.status(404).json({msg: "No encontrado"})
    }
    // SI EL EVENTO EXISTE, PERO NO PERTENECE AL USUARIO QUE HACE LA PETICIÓN
    if(evento.user_id !== req.usuario.id){
        // ENVIAR MENSAJE AL CLIENTE
        return res.json({msg: "Acción no valida"})
    }
    // SI EL EVENTO EXISTE, ACTUALIZAR
    evento.title = req.body.title || evento.title
    evento.description = req.body.description || evento.description
    evento.start_time = req.body.start_time || evento.start_time
    evento.end_time = req.body.end_time || evento.end_time
    evento.updated_at = Date.now() || evento.updated_at
    evento.location = req.body.location || evento.location
    // GUARDAR EVENTO
    try {
        const eventoActualizado = await evento.save()
        // ENVIAR EVENTO ACTUALIZADO A CLIENTE
        res.json(eventoActualizado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarEvento = async (req, res) => {
    // OBTENER EVENTO POR ID DE LA URL
    const {id} = req.params
    // INSTANCIAR EVENTO POR ID
    const evento = await Evento.findByPk(id)
    // SI EL EVENTO NO EXISTE
    if(!evento){
        // ENVIAR MENSAJE AL CLIENTE
        res.status(404).json({msg: "No encontrado"})
    }
    // SI EL EVENTO NO PERTENECE AL USUARIO QUE HACE LA PETICIÓN
    if(evento.user_id !== req.usuario.id){
        // ENVIAR MENSAJE AL CLIENTE
        return res.json({msg: "Acción no valida"})
    }
    // ELIMINAR EVENTO
    try {
        await evento.destroy()
        // ENVIAR MENSAJE AL CLIENTE
        res.json({msg: "Evento eliminado"})
    } catch (error) {
        console.log(error)
    }
}

export {
    agregarEvento,
    obtenerEventos,
    actualizarEvento,
    eliminarEvento
}