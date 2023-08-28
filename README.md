# Introducción

La app 630 EVENTOS te ayuda a administrar tus eventos, permitiendote agregar, actualizar y eliminarlos, contando con un frontend muy interactivo. Puedes registrarte con tu correo, solo tendrás que confirmar tu cuenta por medio del correo que recibiras por 630 EVENTOS y posteriormente podrás ingresar al área privada. Todos tus datos están protegidos, y solo tú podrás administrar tus eventos, ya que tu contraseña es hasheada para evitar plagio. Agregar título, descripción, fecha de inicio y final, y ubicación de tus eventos. Puedes restablecer tu contraseña en caso de olvidarla.


# Tecnólogias 

- NodeJS
- ExpressJS
- REACT
- SEQUELIZE

# Requisitos para su uso

Debes contar con NodeJS instalado. Puedes instalarlo descargando el ejecutable en la siguiente página web:

- https://nodejs.org/en/download/current

# Ejecución

La aplicación se ejecuta, para desarrollo, abriendo las dos carpetas dentro de FullStack (backend y fronend) y ejecutar desde ambas ventanas de consola el comando "npm run dev", y se podrá interactuar con la aplicación abriendo desde el navegador la ruta http://localhost:5173, la cual te dirige al login de la página. Se debe resgistrar el usuario y posteriormente confirmar su cuenta a través del correo que se recibirá al correo registrado del emitente 630 EVENTOS configurado por NODEMAILER. 

La base debe crearse en POSTGRESQL, puede agregarse otra base relacional con la que trabaja SEQUELIZE, pero debe agregarse su respectiva configuración. Trabajando con POSTGRESQL, se deben crear en una base de datos las siguientes dos trablas:

- create table users (
	id text not null,
	email varchar(60),
	name varchar (80),
	token text,
	confirmed boolean,
	password text
  )

- create table events (
	id text not null primary key,
	title text,
	description text,
	start_time date,
	end_time date,
	location text,
	created_at date,
	updated_at date,
	user_id text
  )

Y para la conexión a la Base de Datos (DB, DataBase) deben agregarse las credenciales en un archivo .env de la siguiente manera:
- DB_NAME=NOMBRE_DE_LA_DB
- DB_USER=USUARIO_DE_LA_DB
- DB_PASSWORD=PASSWORD_DEL_USUARIO
- DB_HOST=DIRECCIÓN_IP_DONDE_SE_ENCUENTRA_LA_DB
- DB_PORT=PUERTO_DE_ESCUCHA_DE_LA_DB_CONFIGURADA

Para la configuración de NODEMAILER, se debe crear una cuenta en https://mailtrap.io/home y posteriormente solicitar las credenciales de configuración en el mismo dashboard, para agregarlo en el archivo .env de la siguiente manera:

- EMAIL_USER=AQUI_VA_EL_USER_DADO_POR_MAILTRAP
- EMAIL_PASS=AQUI_VA_EL_PASSWORD_DADO_POR_MAILTRAP
- EMAIL_HOST=sandbox.smtp.mailtrap.io
- EMAIL_PORT=AQUI_VA_EL_PORT_DADO_POR_MAILTRAP

Se debe configurar un password para JWT, este puede ser cualqueira y también se agrega al archivo .env:

- JWT_SECRET=AQUI_VA_CUALQUIER_PASSWORD

Por último debe agregarse la URL del cliente que hará la petición (dirección del frontend) al mismo archivo .env, que en en mi equipo fue:

- FRONTEND_URL=http://localhost:5173

Con está configuración del archivo .env, puede ejecutarse el siguiente comando desde ambas carptetas, backend y frontend, desde una ventada de comandos:

- npm run dev

# Autor

Jesús Daniel Juárez, user danijrzv en GitHub.