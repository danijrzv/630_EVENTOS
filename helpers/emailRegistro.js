// IMPORTANDO NODEMAILER PARA ENVIAR CORREOS
import nodemailer from "nodemailer"

// CREANDO FUNCIÓN PARA ENVIAR CORREOS
const emailRegistro = async (datos)=>{
    // CREANDO EL USUARIO DE NODEMAILER
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    // OBTENIENDO LOS DATOS DEL CLIENTE
    const {email, nombre, token} = datos
    // CONSTRUYENDO EL CORREO
    const info = await transporter.sendMail({
        from: "630 EVENTOS",
        to: email,
        subject: "Comprueba tu cuenta en 630 EVENTOS",
        text: "Comprueba tu cuenta en 630 EVENTOS",
        html: `
            <p>Hola: ${nombre}, comprueba tu cuenta en 630 EVENTOS.</p>
            <p>Tu cuenta ya está lista, solo debes comprobarla en el siguiente enlace:
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>

            <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })
}

// EXPORTANDO FUNCIÓN PARA ENVIAR CORREOS
export default emailRegistro;