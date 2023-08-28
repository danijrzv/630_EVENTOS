// IMPORTANDO NODEMAILER PARA ENVIAR CORREOS
import nodemailer from "nodemailer"

// CREANDO FUNCIÓN PARA ENVIAR CORREOS
const emailOlvidePassword = async (datos)=>{
    // CREANDO EL USUARIO DE NODEMAILER
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    // OBTENIENDO LOS DATOS DEL USUARIO
    const {email, nombre, token} = datos
    // CONSTRUYENDO EL CORREO
    const info = await transporter.sendMail({
        from: "630 EVENTOS",
        to: email,
        subject: "Restablece tu Password",
        text: "Restablece tu Password",
        html: `
            <p>Hola: ${nombre}, has solicitado restablecer tu password.</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer password</a></p>

            <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    })
}

// EXPORTANDO FUNCIÓN PARA ENVIAR CORREOS
export default emailOlvidePassword;