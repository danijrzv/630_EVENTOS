import Usuario from "../models/Usuario.js"
import emailRegistro from "../helpers/emailRegistro.js"
import emailOlvidePassword from "../helpers/emailOlvidePassword.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"

const registrar = async (req, res) => {
    // OBTENER EMAIL Y NOMBRE DE LA PETICIÓN
    const {email, nombre} = req.body 
    // VALIDAR SI EL USUARIO EXISTE EN LA DB
    const existeUsuario = await Usuario.findOne({where: {email}})
    // SI EL USUARIO YA EXISTE
    if (existeUsuario){
        // CREAR MENSAJE DE ERROR
        const error = new Error("Usuario ya registrado")
        // ENVIAR MENSAJE DE ERROR
        return res.status(400).json({msg: error.message})
    }
    // SI EL USUARIO NO EXISTE
   try {
        // INSTANCIAR USUARIO
        const usuario = new Usuario(req.body)
        // GUARDAR USUARIO EN DB
        usuario.name = nombre
        usuario.id = generarId()
        usuario.token = generarId()
        const usuarioGuardado = await usuario.save()
        // ENVIAR EMAIL PARA REGISTRAR
        emailRegistro({
            email,
            nombre,
            token: usuarioGuardado.token
        })
    // ENVIAR MENSAJE DE VALIDACIÓN
        res.json({msg: "Usuario registrado correctamente"})
   } catch (error) {
        console.log(error)
   }
}

const perfil = (req,res)=>{
    // OBTENIENDO PERFIL
    const { usuario } = req
    // ENVIANDO PERFIL 
    res.json(usuario)
}

const confirmar = async (req, res)=>{
    // OBTENER TOKEN DE LA URL
    const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne({where: {token}})
    // SI EL TOKEN NO EXISTE
    if (!usuarioConfirmar){
        //GENERAR MENSAJE DE ERROR Y ENVIAR AL CLIENTE
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
    // SI EL TOKEN EXISTE
    try {
        // ELIMINAR TOKEN DEL USUARIO
        usuarioConfirmar.token = null
        // CONFIRMAR USUARIO
        usuarioConfirmar.confirmed = true
        // ACTUALIZAR USUARIO
        await usuarioConfirmar.save()
        // ENVIAR MENSAJE DE VALIDACIÓN AL CLIENTE
        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async (req, res) =>{
    // DESTRUCTURAR EMAIL Y PASSWORD DEL BODY
    const {email, password} = req.body
    // COMPORBAR SI EL USUARIO EXISTE
    const usuario = await Usuario.findOne({where: {email}})
    //SI EL USUARIO NO EXISTE
    if (!usuario){
        // GENERAR MENSAJE DE ERROR Y ENVIARLO AL CLIENTE
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }
    // SI LA CUENTA NO HA SIDO CONFIRMADA
    if (!usuario.confirmed){
        // GENERAR MENSAJE DE ERROR Y ENVIARLO AL CLIENTE
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({msg: error.message})
    }
    // AUTENTICAR USUARIO
    if (await usuario.comprobarPassword(password)){
        //Autenticar
        res.json({
            id: usuario.id,
            nombre: usuario.name,
            email: usuario.email,
            token: generarJWT(usuario.id)
        })
    }else{
        const error = new Error("El password es incorrecto")
        return res.status(403).json({msg: error.message})
    }
}

const olvidePassword = async (req, res)=>{
    // OBTENER EL CORREO DEL BODY
    const {email} = req.body
    // INSTANCIAR EL USUARIO
    const existeUsuario = await Usuario.findOne({where: {email}})
    // SI EL USUARIO NO EXISTE
    if (!existeUsuario){
        //GENERAR MENSAJE DE ERROR Y ENVIAR AL CLIENTE
        const error = new Error("El usuario no existe")
        return res.status(400).json({msg: error.message})
    }
    // SI EL USUARIO EXISTE
    try {
        // GENERAR NUEVO TOKEN
        existeUsuario.token = generarId()
        // GUARDAR EL USUARIO CON EL NUEVO TOKEN
        await existeUsuario.save()
        // ENVIAR EMAIL CON LAS INSTRUCCIONES 
        emailOlvidePassword({
            email, 
            nombre: existeUsuario.name,
            token: existeUsuario.token
        })
        // ENVIAR MENSAJE AL CLIENTE
        res.json({msg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res)=>{
    // OBTENER TOKEN DE LA URL
    const {token} = req.params
    // INSTANCIAR EL TOKEN
    const tokenValido = await Usuario.findOne({where: {token}})
    // SI EL TOKEN EXISTE
    if (tokenValido){
        // ENVIAR MENSAJE DE APROBACIÓN
        res.json({msg: "Token valido, el usaurio existe"})
    }else{
        // SI NO EXISTE, GENERAR MENSAJE DE ERROR Y ENVIAR AL CLIENTE
        const error = new Error("Token no valido")
        return res.status(400).json({msg: error.message})
    }
}

const nuevoPassword = async (req, res)=>{
    // OBTENER EL TOKEN DE LA URL
    const {token} = req.params
    // OBTENER PASSWORD DEL BODY
    const {password} = req.body
    // INSTANCIAR EL USUARIO
    const usuario = await Usuario.findOne({where: {token}})
    // SI EL USUARIO NO EXISTE
    if(!usuario){
        // GENERAR MENSAJE DE ERROR Y ENVIAR AL CLIENTE
        const error = new Error("Hubo un error")
        return res.status(400).json({msg: error.message})
    }
    // SI EL USUARIO EXISTE
    try {
        // ELIMINAR TOKEN
        usuario.token = null
        // ALMANCENAR NUEVO PASSWORD
        usuario.password = password
        // ACTUALIZAR USUARIO
        await usuario.save()
        // ENVIAR MENSAJE DE SATISFACCIÓN AL CLIENTE
        res.json({msg: "Password modificado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

// EXPORTAR CONTROLLERS
export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}